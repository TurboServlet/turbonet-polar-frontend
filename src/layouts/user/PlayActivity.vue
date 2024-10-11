<script setup>
import {onMounted, onUnmounted, ref, toRef} from 'vue';
import CalHeatmap from 'cal-heatmap';
import CalTooltip from 'cal-heatmap/plugins/Tooltip';
import moment from 'moment';

// 定义 props
const props = defineProps({
  playActivity: {
    type: Object,
    required: true
  }
});

// 将 playActivity 定义为响应式数据
const playActivity = toRef(props, 'playActivity');

// 定义转换数据的函数
const convertToDataFormat = (input) => {
  const pairs = input.split(':');
  return pairs.map(pair => {
    const [daysAgo, value] = pair.split(',');
    return {
      date: moment().subtract(Number(daysAgo), 'days').toDate(), // 转换为日期对象
      value: Number(value) // 转换为数值
    };
  });
};

const data = convertToDataFormat(playActivity.value.heatmapPoints);

const dayTemplate = (DateHelper) => {
  const ROWS_COUNT = 7;
  const ALLOWED_DOMAIN_TYPE = ['month'];

  return {
    name: 'ghDayFix',
    allowedDomainType: ALLOWED_DOMAIN_TYPE,
    rowsCount: () => ROWS_COUNT,
    columnsCount: (ts) => {
      let count = DateHelper.getWeeksCountInMonth(ts);
      const endOfMonth = moment().endOf('month').toDate();
      const clampEnd = DateHelper.getFirstWeekOfMonth(endOfMonth).toDate();

      if (moment(ts).isSame(new Date(), 'month') && endOfMonth > clampEnd) {
        count++;
      }
      return count;
    },
    mapping: (startTimestamp, endTimestamp) => {
      const clampStart = DateHelper.getFirstWeekOfMonth(startTimestamp);
      let clampEnd = DateHelper.getFirstWeekOfMonth(endTimestamp);

      if (moment(startTimestamp).isSame(new Date(), 'month')) {
        clampEnd = DateHelper.date().add(1, 'day');
      }

      let x = -1;
      const pivotDay = clampStart.weekday();

      return DateHelper.intervals('day', clampStart, clampEnd).map((ts) => {
        const weekday = DateHelper.date(ts).weekday();
        if (weekday === pivotDay) {
          x += 1;
        }

        return {
          t: ts,
          x,
          y: weekday,
        };
      });
    },
    extractUnit: (ts) => DateHelper.date(ts).startOf('day').valueOf(),
  };
};

onMounted(() => {
  const cal = new CalHeatmap();
  cal.addTemplates(dayTemplate);

  cal.paint({
    itemSelector: "#cal-heatmap",
    domain: {
      type: 'month',
      label: { text: 'MMM', textAlign: 'start', position: 'top' },
    },
    subDomain: {
      type: 'ghDayFix', // 使用自定义的子域模板
      radius: 2,
      width: 11,
      height: 11,
      gutter: 4,
    },
    range: 12, // 显示过去 12 个月
    data: {
      source: data.filter((x) => x.value > 0), // 过滤掉没有贡献的数据
      x: 'date',
      y: 'value',
    },
    scale: {
      color: {
        type: 'linear',
        range: ['#14432a', '#4dd05a'],
        domain: [0, data.reduce((a, b) => Math.max(a, b.value), 0)],
      },
    },
    date: {
      start: moment().subtract(1, 'year').add(1, 'month').toDate(),
    },
  }, [
    [CalTooltip, {
      text: (_, v, d) => `${v ?? 'No'} songs played on ${d.format('MMMM D, YYYY')}`,
    }],
  ]);

  onUnmounted(() => {
    cal.destroy();
  })

});
</script>

<template>
  <div><h2 class="text-2xl mt-3.5 mb-3.5"><i class="fa-solid fa-bolt"></i> 游玩活跃度</h2>
    <div class="activity-info">
      <div class="hide-scrollbar heatmap" id="cal-heatmap"></div>
      <div class="info-bottom">
        <div class="plays"><span class="font-title">游玩次数</span> <span>{{ playActivity.playCount }}</span>
        </div>
        <div class="time"><span class="font-title">累计游玩时长</span> <span>{{ playActivity.playTime.toFixed(1) }} hr</span></div>
        <div class="first-play"><span class="font-title">第一次游玩</span> <span>{{ playActivity.firstPlay }}</span>
        </div>
        <div class="last-play"><span class="font-title">最后一次游玩</span> <span>{{ playActivity.lastPlay }}</span>
        </div>
        <div class="last-version"><span class="font-title">游玩版本</span> <span>{{ playActivity.playVersion }}</span></div>
      </div>
    </div>
  </div>
</template>

<style>
[data-theme=dark] .ch-subdomain-bg {
  fill: #a6adbb
}

.ch-subdomain-bg {
  fill: #a6adbb
}

[data-theme=dark] .ch-subdomain-bg:hover {
  stroke: #2a323c;
}

.ch-subdomain-bg:hover {
  stroke: #2b3440;
}

.ch-domain-bg {
  fill: #f2f2f2;
}

[data-theme=dark] .ch-domain-bg {
  fill: #191e24;
}

.ch-container {
  background-color: #f2f2f2;
}

[data-theme=dark] .ch-container {
  background-color: #191e24;
}

#ch-tooltip[data-theme=dark] {
  background: #636e7b;
  color: #cdd9e5;
}

#ch-tooltip[data-show] {
  display: block;
}

#ch-tooltip {
  background: #222;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #0003;
  box-sizing: border-box;
  color: #bbb;
  display: none;
  font-size: 12px;
  line-height: 1.4;
  padding: 5px 10px;
  text-align: center;
}

.ch-domain-text {
  fill: currentColor;
  font-size: 10px;
}

[data-theme=dark] .ch-domain-text {
  fill: #a6adbb;
  font-size: 10px;
}

</style>

<style scoped>

.activity-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hide-scrollbar {
  -ms-overflow-style: none;
}

.heatmap {
  overflow-x: auto;
}

.info-bottom {
  max-width: 100%;
  flex-wrap: wrap;
  row-gap: .5rem;
  width: max-content;
  display: flex;
  gap: 20px;
}

.plays {
  display: flex;
  flex-direction: column;
}

.time {
  display: flex;
  flex-direction: column;
}

.first-play {
  display: flex;
  flex-direction: column;
}

.last-play {
  display: flex;
  flex-direction: column;
}

.last-version {
  display: flex;
  flex-direction: column;
}

.font-title {
  font-weight: 700;
  font-size: .8rem;
  letter-spacing: .1em;
  color: oklch(var(--p))
}
</style>
<script setup>
import {onMounted, onUnmounted, ref, toRef} from "vue";
import {defineProps} from "vue";
import * as echarts from "echarts/core";
import {LineChart, MapChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";
import {UniversalTransition} from "echarts/features";
import {GridComponent, TooltipComponent} from "echarts/components";
echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

let daysAgo = [];
let ratings = [];

const dataFormatter = (value) => {
  if (value === "") return
  const pairs = value.split(':');
  pairs.forEach(pair => {
    const [first, second] = pair.split(',');
    daysAgo.push(String(first + ' 天前'));
    ratings.push(Number(second));
  });
};

const option = ref({
  color: ['#7480ff'],
  grid: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  },
  xAxis: {
    type: 'category',
    data: daysAgo,
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      return '<b>' + params[0].name + '</b><br>Rating: ' + params[0].value;
    }
  },
  series: [
    {
      data: ratings,
      type: 'line',
      smooth: true,
      showSymbol: false
    }
  ]
});

let myChart = null;

const initChart = () => {
  myChart = echarts.init(document.getElementById('chart'), 'light');
  myChart.setOption(option.value);
};

const props = defineProps({
  maiStatistics: {
    type: Object,
    required: true
  }
});
const maiStatistics = toRef(props, 'maiStatistics');

if (maiStatistics.value && maiStatistics.value.echartsLine) {
  dataFormatter(maiStatistics.value.echartsLine);
} else {
  console.error('echartsLine data is missing or undefined');
}


onMounted(() => {
  if (maiStatistics.value.echartsLine !== "") {
    initChart();
    window.addEventListener('resize', myChart.resize); // 监听窗口变化
  }
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  if (maiStatistics.value.echartsLine !== "") {
  window.removeEventListener('resize', myChart.resize);
  myChart.dispose();
  }
});

</script>

<template>
  <div><h2 class="text-2xl mt-3.5 mb-3.5"><i class="fa-solid fa-square-poll-vertical"></i> maimai 统计资料</h2>
    <div class="scoring-info">
      <div class="chart">
        <div class="info-top">
          <div class="rating"><span class="font-title">DX Rating</span> <span class="font-top-text">{{ maiStatistics.deluxRating }}</span>
          </div>
          <div class="rank"><span class="font-title">服务器排名</span> <span
              class="font-top-text">#{{ maiStatistics.serverRanking }}</span>
          </div>
        </div>
        <div class="trend">
          <div class="chartjs-box-reference" id="chart">
            <div v-if="maiStatistics.echartsLine === ''">当前数据不足呢，快去出勤吧！</div>
          </div>
        </div>
        <div class="info-bottom">
          <div class="score"><span class="font-title">SSS+</span><span>{{ maiStatistics.achievementCount.sssPlus }}</span>
          </div>
          <div class="score"><span class="font-title">SSS</span><span>{{ maiStatistics.achievementCount.sss }}</span></div>
          <div class="score"><span class="font-title">SS+</span><span>{{ maiStatistics.achievementCount.ssPlus }}</span></div>
          <div class="score"><span class="font-title">SS</span><span>{{ maiStatistics.achievementCount.ss }}</span></div>
          <div class="score"><span class="font-title">S+</span><span>{{ maiStatistics.achievementCount.splus }}</span></div>
          <div class="score"><span class="font-title">S</span><span>{{ maiStatistics.achievementCount.s }}</span></div>
        </div>
      </div>
      <div class="other-info">
        <div class="accuracy"><span class="font-title">平均完成度</span> <span>{{ maiStatistics.averageAccuracy.toFixed(2) }}%</span>
        </div>
        <div class="max-combo"><span class="font-title">最多连击数</span> <span>{{ maiStatistics.maxCombo }}</span>
        </div>
        <div class="full-combo"><span class="font-title">全连次数</span> <span>{{ maiStatistics.fullCombo }}</span></div>
        <div class="all-perfect"><span class="font-title">收歌次数</span> <span>{{ maiStatistics.allPerfect }}</span></div>
        <div class="total-dx-score"><span class="font-title">累计完成分数</span> <span>{{ maiStatistics.totalScores.toFixed(0) }} %</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.font-title {
  font-weight: 700;
  font-size: .8rem;
  letter-spacing: .1em;
  color: oklch(var(--p))
}

.font-top-text {
  font-size: 1.5rem;
}


.scoring-info {
  display: flex;
  gap: 20px;
  max-height: 250px;
}

.chart {
  flex: 0 1 790px;
  display: flex;
  flex-direction: column;
}

.info-top {
  display: flex;
  gap: 20px;
}

.rating {
  display: flex;
  flex-direction: column;
}

.rank {
  display: flex;
  flex-direction: column;
}

.score {
  display: flex;
  flex-direction: column;
}

.trend {
  height: 300px;
  width: 100%;
  max-width: 790px;
  position: relative;
}

.chartjs-box-reference {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-bottom {
  max-width: 100%;
  flex-wrap: wrap;
  row-gap: .5rem;
  width: max-content;
  display: flex;
  gap: 20px;
}

.clickable {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.other-info {
  flex: 1 0 100px;
  flex-direction: column;
  gap: 0;
  justify-content: space-between;
}

.accuracy {
  display: flex;
  flex-direction: column;
}

.max-combo {
  display: flex;
  flex-direction: column;
}

.full-combo {
  display: flex;
  flex-direction: column;
}

.all-perfect {
  display: flex;
  flex-direction: column;
}

.total-dx-score {
  display: flex;
  flex-direction: column;
}

@media (max-width: 560px) {
  .accuracy {
    flex-direction: row;
    justify-content: space-between;
  }
  .max-combo {
    flex-direction: row;
    justify-content: space-between;
  }
  .full-combo {
    flex-direction: row;
    justify-content: space-between;
  }
  .all-perfect {
    flex-direction: row;
    justify-content: space-between;
  }
  .total-dx-score {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (max-width: 560px) {
  .scoring-info {
    flex-direction: column;
    max-height: unset;
  }
}

@media (max-width: 560px) {
  .scoring-info .chart {
    flex: 0;
  }
}

@media (max-width: 560px) {
  .scoring-info .chart .trend {
    max-height: 130px;
  }
}

@media (max-width: 560px) {
  .scoring-info .info-bottom {
    justify-content: space-between;
  }
}

</style>
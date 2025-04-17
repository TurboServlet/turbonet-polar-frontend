<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import * as echarts from "echarts/core";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import {ScatterChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";
import {UniversalTransition} from "echarts/features";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

echarts.use([
  TitleComponent,
  GridComponent,
  LegendComponent,
  ScatterChart,
  CanvasRenderer,
  TooltipComponent,
  UniversalTransition
]);

const isLoading = ref(true)
const isSuccess = ref(false)
const responseData = ref()

const option = ref({
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "cross"
    }
  },
  grid: {
    top: '55',
    bottom: '20',
    left: '55',
    right: '55'
  },
  xAxis: {
    type: "time",
    name: t('serverRequests.echarts.time'),
    min: 0,
    max: 0,
    minInterval: 300001
  },
  yAxis: {
    type: "value",
    name: t('serverRequests.echarts.delay')
  },
  series: [
    {
      name: t('serverRequests.echarts.cacheDelay'),
      type: "scatter",
      data: [],
      smooth: false,
      symbolSize: 8
    },
    {
      name: t('serverRequests.echarts.whalapDelay'),
      type: "scatter",
      data: [],
      smooth: false,
      symbolSize: 8
    }
  ]
})

const serverRequestsEcharts = async () => {
  await sendGetRequest('/web/serverRequestsEcharts', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      option.value.xAxis.min = response.data.startTimeStamp
      option.value.xAxis.max = response.data.endTimeStamp
      option.value.series[0].data = removeTop5Percent(response.data.cachedLatency)
      option.value.series[1].data = removeTop5Percent(response.data.unCachedLatency)
      myChart.setOption(option.value);
    } else {
      isLoading.value = false
      isSuccess.value = false
      responseData.data = t('error.jsError')
    }
  }).catch((e) => {
    isLoading.value = false
    isSuccess.value = false
    responseData.data = t('error.jsError')
  })
}

const removeTop5Percent = (dataList) => {
  const sortedList = dataList.sort((a, b) => b[1] - a[1]);
  const removeCount = Math.ceil(sortedList.length * 0.05);
  return sortedList.slice(removeCount);
};

let myChart = null;

const initChart = () => {
  myChart = echarts.init(document.getElementById('chart'), 'light');
  myChart.setOption(option.value);
};

onMounted(() => {
  serverRequestsEcharts()
  initChart();
  window.addEventListener('resize', myChart.resize);
})

onUnmounted(() => {
  window.removeEventListener('resize', myChart.resize);
  myChart.dispose();
})

</script>

<template>
  <div id="chart" style="width: 100%; height: 400px"/>
</template>

<style scoped>

</style>
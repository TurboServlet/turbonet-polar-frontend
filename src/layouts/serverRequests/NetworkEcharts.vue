<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import * as echarts from "echarts/core";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import {ScatterChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";
import {UniversalTransition} from "echarts/features";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";

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
    name: "时间(t)",
    min: 0,
    max: 0,
    minInterval: 300001
  },
  yAxis: {
    type: "value",
    name: "延迟(ms)"
  },
  series: [
    {
      name: "缓存内延迟",
      type: "scatter",
      data: [],
      smooth: false,
      symbolSize: 8
    },
    {
      name: "缓存外延迟",
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
      responseData.data = '验证失败，请重新登录。'
    }
  }).catch((e) => {
    isLoading.value = false
    isSuccess.value = false
    responseData.data = '验证失败，请重新登录。'
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
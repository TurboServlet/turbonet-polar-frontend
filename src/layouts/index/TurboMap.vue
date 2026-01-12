<script setup>

import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent
} from 'echarts/components';
import {MapChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {onMounted, onUnmounted, ref} from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer
]);

let option = ref({
  title: {
    subtext: t('turboMap.mapSource'),
    sublink:
        'https://datav.aliyun.com/'
  },
  tooltip: {
    trigger: 'item'
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  visualMap: {
    min: 0,
    max: 8,
    text: [t('turboMap.visualMap.intensive'), t('turboMap.visualMap.sparse')],
    realtime: false,
    calculable: false,
    inRange: {
      color: ['lightgrey', 'green']
    }
  },
  series: [
    {
      name: t('turboMap.series.name'),
      type: 'map',
      map: 'china',
      label: {
        show: false
      },
      data: [
        {
          name: "北京市",
          value: 6,
        },
        {
          name: "天津市",
          value: 1,
        },
        {
          name: "上海市",
          value: 29,
        },
        {
          name: "重庆市",
          value: 3,
        },
        {
          name: "河北省",
          value: 2,
        },
        {
          name: "河南省",
          value: 9,
        },
        {
          name: "云南省",
          value: 2,
        },
        {
          name: "辽宁省",
          value: 5,
        },
        {
          name: "黑龙江省",
          value: 5,
        },
        {
          name: "湖南省",
          value: 2,
        },
        {
          name: "安徽省",
          value: 3,
        },
        {
          name: "山东省",
          value: 7,
        },
        {
          name: "新疆维吾尔自治区",
          value: 1,
        },
        {
          name: "江苏省",
          value: 6,
        },
        {
          name: "浙江省",
          value: 31,
        },
        {
          name: "江西省",
          value: 3,
        },
        {
          name: "湖北省",
          value: 4,
        },
        {
          name: "广西壮族自治区",
          value: 4,
        },
        {
          name: "甘肃省",
          value: 3,
        },
        {
          name: "山西省",
          value: 4,
        },
        {
          name: "内蒙古自治区",
          value: 7,
        },
        {
          name: "陕西省",
          value: 1,
        },
        {
          name: "吉林省",
          value: 2,
        },
        {
          name: "福建省",
          value: 6,
        },
        {
          name: "贵州省",
          value: 1,
        },
        {
          name: "广东省",
          value: 20,
        },
        {
          name: "青海省",
          value: 1,
        },
        {
          name: "西藏自治区",
          value: 0,
        },
        {
          name: "四川省",
          value: 6,
        },
        {
          name: "宁夏回族自治区",
          value: 0,
        },
        {
          name: "海南省",
          value: 4,
        },
        {
          name: "台湾省",
          value: 0,
        },
        {
          name: "香港特别行政区",
          value: 0,
        },
        {
          name: "澳门特别行政区",
          value: 0,
        },
        {
          name: "南海诸岛",
          value: 0,
        }
      ]
    }
  ]
})

let myChart = null;

const initChart = (theme) => {
  myChart = echarts.init(document.getElementById('echarts'), theme);
  fetch('https://r2.sys-allnet.com/china.json')
      .then(response => response.json())
      .then(geoJson => {
        echarts.registerMap('china', geoJson);
        myChart.setOption(option.value);
      })
      .catch(error => {
        console.error('Error fetching the map:', error);
      });
}

onMounted(() => {
  initChart('light');
  window.addEventListener('resize', myChart.resize);
});

onUnmounted(() => {
  myChart.dispose();
  window.removeEventListener('resize', myChart.resize);
});

</script>

<template>
  <div class="card bg-base-100 home-product-intro shadow-2xl"><br>
    <div class="card-title product-intro-title">{{ $t('turboMap.title') }}</div>
    <div class="card-body product-intro-content">
      {{ $t('turboMap.context.1') }}
    </div>
    <div class="home-product-container">
      <div class="home-product-view">
        <div id="echarts" style="width: 100%; height: 400px"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.home-product-container {
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 18px;
}

.home-product-intro {
  margin-top: 18px;
  margin-left: 40px;
  margin-right: 40px;
  padding-bottom: 40px;
  border-radius: 18px;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.home-product-container .home-product-view {
  margin-left: 0;
}

.home-product-intro .product-intro-title {
  font-size: 30px;
  padding-left: 30px;
}

.home-product-intro .product-intro-content {
  display: flex;
  flex-direction: column;
  padding: 10px 30px 30px 30px;
  justify-content: center;
}

</style>
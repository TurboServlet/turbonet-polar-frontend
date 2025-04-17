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
          name: t('turboMap.series.regions.Beijing'),
          value: 2,
        },
        {
          name: t('turboMap.series.regions.Tianjin'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Shanghai'),
          value: 18,
        },
        {
          name: t('turboMap.series.regions.Chongqing'),
          value: 2,
        },
        {
          name: t('turboMap.series.regions.Hebei'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Henan'),
          value: 9,
        },
        {
          name: t('turboMap.series.regions.Yunnan'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Liaoning'),
          value: 5,
        },
        {
          name: t('turboMap.series.regions.Heilongjiang'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Hunan'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Anhui'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Shandong'),
          value: 7,
        },
        {
          name: t('turboMap.series.regions.Xinjiang'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Jiangsu'),
          value: 6,
        },
        {
          name: t('turboMap.series.regions.Zhejiang'),
          value: 25,
        },
        {
          name: t('turboMap.series.regions.Jiangxi'),
          value: 2,
        },
        {
          name: t('turboMap.series.regions.Hubei'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Guangxi'),
          value: 4,
        },
        {
          name: t('turboMap.series.regions.Gansu'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Shan1xi'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Neimenggu'),
          value: 2,
        },
        {
          name: t('turboMap.series.regions.Shan3xi'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Jilin'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Fujian'),
          value: 4,
        },
        {
          name: t('turboMap.series.regions.Guizhou'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Guangdong'),
          value: 10,
        },
        {
          name: t('turboMap.series.regions.Qinghai'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Xizang'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Sichuan'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Ningxia'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Hainan'),
          value: 1,
        },
        {
          name: t('turboMap.series.regions.Taiwan'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Xianggang'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Aomen'),
          value: 0,
        },
        {
          name: t('turboMap.series.regions.Nanhaizhudao'),
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
  <div class="card home-product-intro shadow-2xl"><br>
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
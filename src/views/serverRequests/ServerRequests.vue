<script setup>

import NetworkEcharts from "@/layouts/serverRequests/NetworkEcharts.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()

const showServerRequests = async () => {
  await sendGetRequest('/web/showServerRequests', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      responseData.value = response.data
    } else {
      isLoading.value = false
      isSuccess.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    isLoading.value = false
    isSuccess.value = false
    responseData.value = '验证失败，请重新登录。'
  })
}

onMounted(() => {
  showServerRequests()
})

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> 加载失败
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">返回主页</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>服务器请求统计</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div class="grid">
      <div class="stats-vertical bg-base-100 rounded-box mb-2 p-3">
        <div class="p-4">
          <h1 class="font-bold text-3xl">服务器请求统计</h1>
          <p class="text-sm text-gray-500">
            响应数据的「Z-LIB」压缩跳过率与请求重试次数可以反应当前网络情况。<br>
            压缩跳过率超过「>3%」时，可能会出现网络不稳定现象。<br>
            请求重试率和失败率较高时，网络或服务器可能存在问题。</p>
        </div>
      </div>
      <div class="stats stats-vertical lg:stats-horizontal lg:w-full shadow">
        <div class="stat">
          <div class="stat-title">一小时内总包数</div>
          <div class="stat-value">{{ responseData.requestsCount.toLocaleString() }}</div>
          <div class="stat-desc">缓存内 {{ responseData.cachedRequestsCount.toLocaleString() }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">一小时内总异常包数</div>
          <div class="stat-value">{{ responseData.exceptionRequestsCount.toLocaleString() }}</div>
          <div class="stat-desc">缓存内 {{ responseData.exceptionRequestsCachedCount.toLocaleString() }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">一小时内异常包数占比</div>
          <div class="stat-value">{{ responseData.exceptionRequestsRate.toFixed(2) }}%</div>
          <div class="stat-desc">缓存内 {{ responseData.exceptionRequestsCachedRate.toFixed(2) }} %, 缓存外 {{ responseData.exceptionRequestsUnCachedRate.toFixed(2) }} %</div>
        </div>
      </div>

      <div class="stats stats-vertical mt-2 lg:stats-horizontal lg:w-full shadow">
        <div class="stat">
          <div class="stat-title">Z-LIB压缩跳过数量</div>
          <div class="stat-value">{{ responseData.zlibSkippedRequestsCount.toLocaleString() }}</div>

          <div :class="{
      'text-success': responseData.zlibSkippedRequestsRateThanBefore > 0,
      'text-error': responseData.zlibSkippedRequestsRateThanBefore < 0
    }" class="stat-desc">
            <span v-if="responseData.zlibSkippedRequestsRateThanBefore > 0">↗︎</span>
            <span v-else-if="responseData.zlibSkippedRequestsRateThanBefore === 0">→︎</span>
            <span v-else>↘︎</span>

            {{ (responseData.zlibSkippedRequestsCount - responseData.zlibSkippedRequestsBefore).toLocaleString() }} ({{
              responseData.zlibSkippedRequestsRateThanBefore.toFixed(0)
            }}%)
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">尝试重试数量</div>
          <div class="stat-value">{{ responseData.retryRequestsCount.toLocaleString() }}</div>
          <div :class="{
      'text-success': responseData.retryRequestsRateThanBefore > 0,
      'text-error': responseData.retryRequestsRateThanBefore < 0
    }" class="stat-desc">
            <span v-if="responseData.retryRequestsRateThanBefore > 0">↗︎</span>
            <span v-else-if="responseData.retryRequestsRateThanBefore === 0">→︎</span>
            <span v-else>↘︎</span>

            {{ (responseData.retryRequestsCount - responseData.retryRequestsBefore).toLocaleString() }} ({{
              responseData.retryRequestsRateThanBefore.toFixed(0)
            }}%)
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">尝试失败数量</div>
          <div class="stat-value">{{ responseData.panicRequestsCount.toLocaleString() }}</div>
          <div :class="{
      'text-success': responseData.panicRequestsRateThanBefore > 0,
      'text-error': responseData.panicRequestsRateThanBefore < 0
    }" class="stat-desc">
            <span v-if="responseData.panicRequestsRateThanBefore > 0">↗︎</span>
            <span v-else-if="responseData.panicRequestsRateThanBefore === 0">→︎</span>
            <span v-else>↘︎</span>

            {{ (responseData.panicRequestsCount - responseData.panicRequestsBefore).toLocaleString() }} ({{
              responseData.panicRequestsRateThanBefore.toFixed(0)
            }}%)
          </div>
        </div>
      </div>

      <div class="mt-2 bg-base-100 p-4 rounded-box">
        <NetworkEcharts/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
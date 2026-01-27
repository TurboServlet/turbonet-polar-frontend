<script setup>

import NetworkEcharts from "@/layouts/serverRequests/NetworkEcharts.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
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
    responseData.value = t('error.jsError')
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
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.loadingError') }}
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>{{ $t('menu.serverRequests') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div class="grid">
      <div class="stats-vertical border-2 border-base-200 rounded-box mb-2 p-3">
        <div class="p-4">
          <h1 class="font-bold text-3xl">{{ $t('serverRequests.title') }}</h1>
          <p class="text-sm text-gray-500">
            {{ $t('serverRequests.contact.1') }}<br>
            {{ $t('serverRequests.contact.2') }}<br>
            {{ $t('serverRequests.contact.3') }}</p>
        </div>
      </div>
      <div class="stats stats-vertical lg:stats-horizontal lg:w-full border-2 border-base-200">
        <div class="stat">
          <div class="stat-title">{{ $t('serverRequests.totalRequests') }}</div>
          <div class="stat-value">{{ responseData.requestsCount.toLocaleString() }}</div>
          <div class="stat-desc">{{ $t('serverRequests.inCache') }} {{ responseData.cachedRequestsCount.toLocaleString() }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">{{ $t('serverRequests.totalException') }}</div>
          <div class="stat-value">{{ responseData.exceptionRequestsCount.toLocaleString() }}</div>
          <div class="stat-desc">{{ $t('serverRequests.inCache') }} {{ responseData.exceptionRequestsCachedCount.toLocaleString() }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">{{ $t('serverRequests.totalExceptionRate') }}</div>
          <div class="stat-value">{{ responseData.exceptionRequestsRate.toFixed(2) }}%</div>
          <div class="stat-desc">{{ $t('serverRequests.inCache') }} {{ responseData.exceptionRequestsCachedRate.toFixed(2) }} %, {{ $t('serverRequests.unCache') }} {{ responseData.exceptionRequestsUnCachedRate.toFixed(2) }} %</div>
        </div>
      </div>

      <div class="stats stats-vertical mt-2 lg:stats-horizontal lg:w-full border-2 border-base-200">
        <div class="stat">
          <div class="stat-title">{{ $t('serverRequests.totalZlibSkipped') }}</div>
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
          <div class="stat-title">{{ $t('serverRequests.totalServerNoCookie') }}</div>
          <div class="stat-value">{{ responseData.serverNoCookieRequestsCount.toLocaleString() }}</div>
          <div :class="{
      'text-success': responseData.serverNoCookieRequestsRateThanBefore > 0,
      'text-error': responseData.serverNoCookieRequestsRateThanBefore < 0
    }" class="stat-desc">
            <span v-if="responseData.serverNoCookieRequestsRateThanBefore > 0">↗︎</span>
            <span v-else-if="responseData.serverNoCookieRequestsRateThanBefore === 0">→︎</span>
            <span v-else>↘︎</span>

            {{ (responseData.serverNoCookieRequestsCount - responseData.serverNoCookieRequestsBefore).toLocaleString() }} ({{
              responseData.serverNoCookieRequestsRateThanBefore.toFixed(0)
            }}%)
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">{{ $t('serverRequests.totalClientMissCookie') }}</div>
          <div class="stat-value">{{ responseData.clientMissCookieRequestsCount.toLocaleString() }}</div>
          <div :class="{
      'text-success': responseData.clientMissCookieRequestsRateThanBefore > 0,
      'text-error': responseData.clientMissCookieRequestsRateThanBefore < 0
    }" class="stat-desc">
            <span v-if="responseData.clientMissCookieRequestsRateThanBefore > 0">↗︎</span>
            <span v-else-if="responseData.clientMissCookieRequestsRateThanBefore === 0">→︎</span>
            <span v-else>↘︎</span>

            {{ (responseData.clientMissCookieRequestsCount - responseData.clientMissCookieRequestsBefore).toLocaleString() }} ({{
              responseData.clientMissCookieRequestsRateThanBefore.toFixed(0)
            }}%)
          </div>
        </div>
      </div>

      <div class="stats stats-vertical mt-2 lg:stats-horizontal lg:w-full border-2 border-base-200">
        <div class="stat">
          <div class="stat-title">{{ $t('serverRequests.totalRetry') }}</div>
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
          <div class="stat-title">{{ $t('serverRequests.totalPanic') }}</div>
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

      <div class="mt-2 p-4 rounded-box border-2 border-base-200 mb-8">
        <NetworkEcharts/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
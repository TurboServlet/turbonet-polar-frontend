<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {ArcadeTypeEnumToString} from "@/assets/js/ArcadeUtils.js";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref('')

const showNetworkStatus = async () => {
  await sendGetRequest('/web/showNetworkStatus', true).then((response) => {
    if (response.statusCode === 200) {
      responseData.value = response.data
      isLoading.value = false;
      isSuccess.value = true;
    } else {
      isLoading.value = false
      isSuccess.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    return t('error.jsError')
  })
}

const heartbeatColor = (heartbeat) => {
  if (heartbeat === "WORKING") {
    return 'bg-success'
  } else if (heartbeat === "WARNING") {
    return 'bg-warning'
  } else if (heartbeat === "ERROR") {
    return 'bg-error'
  }
}

const textColor = (workingStatus) => {
  if (workingStatus === "WORKING") {
    return 'text-success'
  } else if (workingStatus === "WARNING") {
    return 'text-warning'
  } else if (workingStatus === "ERROR") {
    return 'text-error'
  } else {
    return ''
  }
}

const workingText = (workingStatus) => {
  if (workingStatus === "WORKING") {
    return t('networkStatus.workingText.working')
  } else if (workingStatus === "WARNING") {
    return t('networkStatus.workingText.warning')
  } else if (workingStatus === "ERROR") {
    return t('networkStatus.workingText.error')
  } else {
    return t('networkStatus.workingText.unknown')
  }
}

onMounted(() => {
  showNetworkStatus()
  const interval = setInterval(() => {
    showNetworkStatus()
  }, 10000)

  onUnmounted(() => {
    clearInterval(interval)
  })
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
        <li>{{ $t('menu.arcade.title') }}</li>
        <li>{{ $t('menu.arcade.networkStatus') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div v-for="arcade in responseData">
      <div v-if="arcade.arcadeType === 'TURBO'" class="border-2 border-base-200 p-8 rounded-box mb-4">
        <div class="flex-wrap gap-1.5 flex items-center">
          <div class="badge badge-primary gap-2 font-bold"><i
              class="fa-solid fa-wifi"></i>{{ ArcadeTypeEnumToString(arcade.arcadeType) }}
          </div>
          <div class="font-bold">{{ arcade.arcadeName }}</div>
        </div>
        <div class="mt-4"/>
        <div v-if="arcade.lastHeartbeatSecond !== '未知'" :class="textColor(arcade.workingStatus)" class="flex flex-wrap gap-2">
          <span class="loading loading-bars"></span>
          <span class="font-bold">{{ workingText(arcade.workingStatus) }}</span>
          {{ $t('networkStatus.lastBeat', { time: arcade.lastHeartbeatSecond }) }}
        </div>
        <div v-else :class="textColor(arcade.workingStatus)" class="flex flex-wrap gap-2">
          <span class="loading loading-bars"></span>
          <span class="font-bold">{{ workingText(arcade.workingStatus) }}</span>
          {{ $t('networkStatus.longTimeOffline') }}
        </div>
        <div class="mt-3 flex">
          <div v-for="heartbeat in arcade.heartbeatMap" :class="heartbeatColor(heartbeat)"
               class="tick w-full rounded-[1px] last:rounded-r-[4px] mr-[1px] block first:rounded-l-[4px] h-8"></div>
        </div>
      </div>
      <div v-else class="border-2 border-base-200 p-8 rounded-box mb-4">
        <div class="flex-wrap gap-1.5 flex items-center">
          <div class="badge badge-primary gap-2 font-bold"><i
              class="fa-solid fa-wifi"></i>{{ ArcadeTypeEnumToString(arcade.arcadeType) }}
          </div>
          <div class="font-bold">{{ arcade.arcadeName }}</div>
        </div>
        <div class="mt-4"/>
        <div class="flex flex-wrap gap-2 text-gray-500">
          <span class="loading loading-bars"></span>
          <span class="font-bold">{{ ArcadeTypeEnumToString(arcade.arcadeType) }}</span>
          {{ $t('networkStatus.notSupport') }}
        </div>
        <div class="mt-3 flex">
          <div v-for="heartbeat in arcade.heartbeatMap" :class="heartbeatColor(heartbeat)"
               class="tick w-full rounded-[1px] last:rounded-r-[4px] mr-[1px] block first:rounded-l-[4px] h-8"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
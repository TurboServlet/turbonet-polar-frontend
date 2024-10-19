<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";

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
    return '验证失败，请重新登录。'
  })
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
        <li>机厅相关</li>
        <li>机厅网络状态</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div v-for="arcade in responseData" class="bg-base-100 p-8 rounded-box mb-4">
      <div class="flex-wrap gap-1.5 flex items-center">
        <div class="badge badge-primary gap-2 font-bold"><i class="fa-solid fa-wifi"></i>{{ arcade.arcadeType }}</div>
        <div class="font-bold">{{ arcade.arcadeName }}</div>
      </div>
      <div class="mt-4"/>
      <div class="flex flex-wrap gap-2 text-green-400">
        <span class="loading loading-bars"></span>
        <span class="font-bold">Turbo运行中</span>
        距离上一次心跳包 {{ arcade.lastHeartbeatSecond }} 秒
      </div>
      <div class="mt-3 flex">
        <div v-for="i in arcade.heartbeatMap" class="tick w-full rounded-[1px] last:rounded-r-[4px] mr-[1px] bg-success block first:rounded-l-[4px] h-8"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
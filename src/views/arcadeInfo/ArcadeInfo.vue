<script setup>

import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, ref} from "vue";
import {ArcadeSettingEnumToString} from "@/assets/js/ArcadeUtils.js";
import ArcadeInfoDetailDialog from "@/layouts/arcadeInfo/ArcadeInfoDetailDialog.vue";
import {openDialogModal} from "@/assets/js/DialogManager.js";

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()

const arcadeInfo = async () => {
  await sendGetRequest('/web/arcadeInfo', true).then((response) => {
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
  arcadeInfo()
})

const selectedArcadeName = ref('')

const showDetail = (arcadeName) => {
  selectedArcadeName.value = arcadeName
  openDialogModal('arcadeInfoDetailDialog')
}

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
        <li>机厅信息</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" class="alert bg-base-100 shadow-lg">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info h-6 w-6 shrink-0">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <h3 class="font-bold">注意</h3>
        <div class="text-xs">机厅信息会随着你去过更多的Turbo机厅自动增加并可看哦</div>
      </div>
    </div>
    <div class="mt-2"></div>
    <div class="flex-col">
      <div v-for="arcade in responseData" @click="showDetail(arcade.arcadeName)" class="bg-base-100 p-8 rounded-box mb-4 arcade-info">
        <div class="flex-wrap gap-1.5 flex items-center">
          <div class="badge badge-primary gap-2 font-bold"><i class="fa-solid fa-wifi"></i>{{ arcade.arcadeType }}</div>
          <div class="font-bold">{{ arcade.arcadeName }}</div>
        </div>
        <div class="mt-4"/>
        当日内总发送请求 <span class="font-bold">{{ arcade.arcadeRequested }}</span> 次。缓存击中 <span class="font-bold">{{ arcade.arcadeCachedRequest }}</span> 次，修复了 <span
          class="font-bold">{{ arcade.arcadeFixedRequest }}</span> 次错误，缓存击中率 <span class="font-bold">{{ (arcade.arcadeCachedHitRate * 100).toFixed(2) }}</span> %
        <div class="mt-4"/>
        <div class="mt-4" v-for="info in arcade.singleArcadeInfo">
          {{ arcade.singleArcadeInfo.length > 1 ? info.singleName : ''}}
          <div class="flex flex-wrap gap-2">
            <div v-if="info.isEnableCustomName" class="badge badge-success gap-2 font-bold"><i class="fa-regular fa-circle-check"></i>允许自定义名称</div>
            <div v-else class="badge badge-error gap-2 font-bold"><i class="fa-regular fa-circle-xmark"></i>不允许自定义名称</div>
            <div v-if="info.isEnableCustomAvatar" class="badge badge-success gap-2 font-bold"><i class="fa-regular fa-circle-check"></i>允许自定义头像</div>
            <div v-else class="badge badge-error gap-2 font-bold"><i class="fa-regular fa-circle-xmark"></i>不允许自定义头像</div>
            <div v-if="info.isEnableTurboTicket" class="badge badge-success gap-2 font-bold"><i class="fa-regular fa-circle-check"></i>允许Turbo功能票</div>
            <div v-else class="badge badge-error gap-2 font-bold"><i class="fa-regular fa-circle-xmark"></i>不允许Turbo功能票</div>
          </div>
          <div class="mt-2"/>
          <div v-for="setting in info.arcadeEnableSetting" class="badge badge-accent gap-2 font-bold"><i class="fa-solid fa-gear"></i>{{ ArcadeSettingEnumToString(setting) }}</div>
        </div>
      </div>
    </div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      没有您的机厅? 请联系管理组对机厅进行入库与绑定。
    </div>
  </div>
  <ArcadeInfoDetailDialog :arcade-name="selectedArcadeName"/>
</template>

<style scoped>
.arcade-info {
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.arcade-info:hover {
  transform: translateY(-5px);
  background-color: oklch(var(--n))
}
</style>
<script setup>

import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {defineProps, onMounted, ref, toRef} from "vue";
import {ArcadeSettingEnumToString, ArcadeTypeEnumToString} from "@/assets/js/ArcadeUtils.js";
import ArcadeInfoDetailDialog from "@/layouts/arcadeInfo/ArcadeInfoDetailDialog.vue";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import NewArcadeDialog from "@/layouts/arcadeInfo/NewArcadeDialog.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()
const permission = ref('')

const showPermission = async () => {
  await sendGetRequest('/permission/showPermission', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      permission.value = response.data
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

const arcadeInfo = async () => {
  await sendGetRequest('/web/arcadeInfo', true).then((response) => {
    if (response.statusCode === 200) {
      responseData.value = response.data
      showPermission()
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
        <li>{{ $t('menu.arcade.info') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" class="alert alert-info">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0 stroke-current">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <h3 class="font-bold">{{ $t('arcadeInfo.notice.title') }}</h3>
        <div class="text-xs">{{ $t('arcadeInfo.notice.contact') }}</div>
      </div>
    </div>
    <div class="mt-4"></div>
    <div class="flex-col">
      <div v-if="permission === 'ADMIN'" @click="openDialogModal('newArcadeDialog')" class="p-8 rounded-box outline-dashed mb-4 arcade-info">
        <div class="flex text-center justify-center items-center">
          <div class="font-bold"><i class="fa-solid fa-square-plus"></i> {{ $t('arcadeInfo.newArcade') }}</div>
        </div>
      </div>
      <div v-for="arcade in responseData" @click="showDetail(arcade.arcadeName)" class="border-2 border-base-200 p-8 rounded-box mb-4 arcade-info">
        <div class="flex-wrap gap-1.5 mb-1 flex items-center">
          <div class="badge badge-primary gap-2 font-bold"><i class="fa-solid fa-wifi"></i>{{ ArcadeTypeEnumToString(arcade.arcadeType) }}</div>
          <div class="font-bold">{{ arcade.arcadeName }}</div>
        </div>
        <div class="mt-4"/>
        <div v-if="arcade.arcadeType === 'TURBO'">
          {{ $t('arcadeInfo.arcadeContact.1') }} <span class="font-bold">{{ arcade.arcadeRequested }}</span> {{ $t('arcadeInfo.arcadeContact.2') }} <span class="font-bold">{{ arcade.arcadeCachedRequest }}</span> {{ $t('arcadeInfo.arcadeContact.3') }} <span
          class="font-bold">{{ arcade.arcadeFixedRequest }}</span> {{ $t('arcadeInfo.arcadeContact.4') }} <span class="font-bold">{{ (arcade.arcadeCachedHitRate * 100).toFixed(2) }}</span> %
        </div>
          <div class="mt-4"/>
        <div class="mt-4" v-for="info in arcade.singleArcadeInfo">
          {{ arcade.singleArcadeInfo.length > 1 ? info.singleName : ''}}
          <div class="flex flex-wrap gap-2">
            <div v-if="info.isEnableCustomName" class="badge badge-success gap-2 font-bold"><i class="fa-regular fa-circle-check"></i>{{ $t('arcadeInfo.enable') }}{{ $t('arcadeInfo.arcadeFeature.CustomName') }}</div>
            <div v-else class="badge badge-error gap-2 font-bold"><i class="fa-regular fa-circle-xmark"></i>{{ $t('arcadeInfo.disable') }}{{ $t('arcadeInfo.arcadeFeature.CustomName') }}</div>
            <div v-if="info.isEnableCustomAvatar" class="badge badge-success gap-2 font-bold"><i class="fa-regular fa-circle-check"></i>{{ $t('arcadeInfo.enable') }}{{ $t('arcadeInfo.arcadeFeature.CustomAvatar') }}</div>
            <div v-else class="badge badge-error gap-2 font-bold"><i class="fa-regular fa-circle-xmark"></i>{{ $t('arcadeInfo.disable') }}{{ $t('arcadeInfo.arcadeFeature.CustomAvatar') }}</div>
            <div v-if="info.isEnableTurboTicket" class="badge badge-success gap-2 font-bold"><i class="fa-regular fa-circle-check"></i>{{ $t('arcadeInfo.enable') }}{{ $t('arcadeInfo.arcadeFeature.TurboTicket') }}</div>
            <div v-else class="badge badge-error gap-2 font-bold"><i class="fa-regular fa-circle-xmark"></i>{{ $t('arcadeInfo.disable') }}{{ $t('arcadeInfo.arcadeFeature.TurboTicket') }}</div>
          </div>
          <div class="mt-2"/>
          <div v-for="setting in info.arcadeEnableSetting" class="badge badge-accent gap-2 font-bold"><i class="fa-solid fa-gear"></i>{{ ArcadeSettingEnumToString(setting) }}</div>
        </div>
      </div>
    </div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      {{ $t('arcadeInfo.noData') }}
    </div>
  </div>
  <ArcadeInfoDetailDialog :arcade-name="selectedArcadeName"/>
  <NewArcadeDialog/>
</template>

<style scoped>
.arcade-info {
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.arcade-info:hover {
  transform: translateY(-5px);
  background-color: oklch(var(--b3));
}

.alias-badge {
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}
</style>
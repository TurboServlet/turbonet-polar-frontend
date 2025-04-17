<script setup>

import {onMounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isLoading = ref(true);
const isSuccess = ref(false)

const responseData = ref()

const panel = async () => {
  await sendGetRequest('/web/panel', true).then((response) => {
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
    isLoading.value = false;
    isSuccess.value = false;
    responseData.value = t('error.jsError');
  })
}

onMounted(() => {
  panel()
})

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="loading loading-spinner size-8 mt-20 mb-20"/>
    <div class="mt-10 mb-10" v-if="!isLoading && !isSuccess">
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
  <div v-else class="breadcrumbs text-sm">
    <ul>
      <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
      <li>{{ $t('menu.panel') }}</li>
    </ul>
  </div>
  <div class="mt-2"/>
  <div v-for="announce in responseData" >
    <div role="alert" v-if="announce.type === 'info'" class="alert alert-info">
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
        <h3 class="font-bold">{{ announce.title }}</h3>
        <div class="text-xs">{{ announce.description }}</div>
      </div>
    </div>
    <div role="alert" v-if="announce.type === 'warning'" class="alert alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ announce.title }}</h3>
        <div class="text-xs">{{ $t('panel.reason') }}：{{ announce.description }}</div>
      </div>
    </div>
    <div class="mt-4"/>
  </div>
</template>

<style scoped>

</style>
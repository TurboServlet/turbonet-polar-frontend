<script setup>

import {onMounted, ref, watch} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isLoading = ref(true);
const isSuccess = ref(false);
const responseData = ref()

const showUserSettings = async () => {
  await sendGetRequest('/web/showUserSettings', true).then((response) => {
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

const setUserSettings = async (policyName) => {
  const payload = {
    "policyName": policyName,
    "policy": responseData.value[policyName],
  }
  await sendPostRequest('/web/setUserSettings', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('user.settingDialog.toast.success'))
    } else {
      toast.error(response.data)
    }
  })
}

onMounted(() => {
  showUserSettings()
})

</script>

<template>
  <dialog id="userSettingDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('userSettingDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('user.settingDialog.title') }}</h3>
      <div class="mt-5"></div>
      <div v-if="isLoading || !isSuccess" class="main-container-center">
        <span v-if="isLoading" class="loading loading-spinner size-8"/>
        <div v-if="!isLoading && !isSuccess">
          <h1 class="font-bold text-3xl">
            <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.loadingError') }}
          </h1>
          <div class="mt-3"></div>
          <p>
            {{ responseData }} <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
          </p>
        </div>
      </div>
      <div v-else class="flex flex-col">
        <div class="flex-between items-center flex">
          <div class="w-full">
            {{ $t('user.settingDialog.userPage') }}
          </div>
          <select v-model="responseData.userPageAccessible" @change="setUserSettings('userPageAccessible')" class="select select-bordered w-full">
            <option value="EVERYONE">{{ $t('user.settingDialog.option.everyone') }}</option>
            <option value="ONLY_FRIENDS">{{ $t('user.settingDialog.option.onlyFriends') }}</option>
            <option value="ONLY_ME">{{ $t('user.settingDialog.option.onlyMe') }}</option>
          </select>
        </div>
        <div class="mt-4"></div>
        <div class="flex-between items-center flex">
          <div class="w-full">
            {{ $t('user.settingDialog.best35') }}
          </div>
          <select v-model="responseData.best35Accessible" @change="setUserSettings('best35Accessible')" class="select select-bordered w-full">
            <option value="EVERYONE">{{ $t('user.settingDialog.option.everyone') }}</option>
            <option value="ONLY_FRIENDS">{{ $t('user.settingDialog.option.onlyFriends') }}</option>
            <option value="ONLY_ME">{{ $t('user.settingDialog.option.onlyMe') }}</option>
          </select>
        </div>
        <div class="mt-4"></div>
        <div class="flex-between items-center flex">
          <div class="w-full">
            {{ $t('user.settingDialog.best15') }}
          </div>
          <select v-model="responseData.best15Accessible" @change="setUserSettings('best15Accessible')" class="select select-bordered w-full">
            <option value="EVERYONE">{{ $t('user.settingDialog.option.everyone') }}</option>
            <option value="ONLY_FRIENDS">{{ $t('user.settingDialog.option.onlyFriends') }}</option>
            <option value="ONLY_ME">{{ $t('user.settingDialog.option.onlyMe') }}</option>
          </select>
        </div>
        <div class="mt-4"></div>
        <div class="flex-between items-center flex">
          <div class="w-full">
            {{ $t('user.settingDialog.recentScores') }}
          </div>
          <select v-model="responseData.recentScoresAccessible" @change="setUserSettings('recentScoresAccessible')" class="select select-bordered w-full">
            <option value="EVERYONE">{{ $t('user.settingDialog.option.everyone') }}</option>
            <option value="ONLY_FRIENDS">{{ $t('user.settingDialog.option.onlyFriends') }}</option>
            <option value="ONLY_ME">{{ $t('user.settingDialog.option.onlyMe') }}</option>
          </select>
        </div>
      </div>
    </div>
    <div @click="closeDialogModal('userSettingDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
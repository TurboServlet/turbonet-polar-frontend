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

const showFriendSearchPolicy = async () => {
  await sendGetRequest('/web/showFriendSearchPolicy', true).then((response) => {
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

const setFriendSearchPolicy = async () => {
  const payload = {
    "policy": responseData.value,
  }
  await sendPostRequest('/web/setFriendSearchPolicy', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('friends.dialog.option.toast.success'));
    } else {
      toast.error(response.data)
    }
  })
}

onMounted(() => {
  showFriendSearchPolicy()
})

</script>

<template>
  <dialog id="friendSettingDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('friendSettingDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('friends.dialog.title') }}</h3>
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
      <div v-else class="flex items-center flex-between">
        <div class="w-full">
          {{ $t('friends.dialog.option.title') }}
        </div>
        <select v-model="responseData" @change="setFriendSearchPolicy" class="select select-bordered w-full">
          <option value="AUTO_ACCEPT">{{ $t('friends.dialog.option.value.autoAccept') }}</option>
          <option value="MANUAL">{{ $t('friends.dialog.option.value.manual') }}</option>
          <option value="FRIENDS_OF_FRIENDS">{{ $t('friends.dialog.option.value.friendsOfFriends') }}</option>
          <option value="NOBODY">{{ $t('friends.dialog.option.value.nobody') }}</option>
        </select>
      </div>
    </div>
    <div @click="closeDialogModal('friendSettingDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
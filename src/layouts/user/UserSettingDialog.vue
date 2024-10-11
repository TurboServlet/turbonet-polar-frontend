<script setup>

import {onMounted, ref, watch} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {toast} from "vue-sonner";
import {useReCaptcha} from "vue-recaptcha-v3";
import {closeDialogModal} from "@/assets/js/DialogManager.js";

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
    responseData.value = '验证失败，请重新登录。'
  })
}

const setUserSettings = async (policyName) => {
  const payload = {
    "policyName": policyName,
    "policy": responseData.value[policyName],
  }
  await sendPostRequest('/web/setUserSettings', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('调整成功')
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
      <h3 class="text-lg font-bold">我的设置</h3>
      <div class="mt-5"></div>
      <div v-if="isLoading || !isSuccess" class="main-container-center">
        <span v-if="isLoading" class="loading loading-spinner size-8"/>
        <div v-if="!isLoading && !isSuccess">
          <h1 class="font-bold text-3xl">
            <i class="fa-regular fa-circle-xmark"></i> 加载失败
          </h1>
          <div class="mt-3"></div>
          <p>
            {{ responseData }} <router-link class="text-primary" to="/">返回主页</router-link>
          </p>
        </div>
      </div>
      <div v-else class="flex flex-col">
        <div class="flex-between items-center flex">
          <div class="w-full">
            查看我的用户页
          </div>
          <select v-model="responseData.userPageAccessible" @change="setUserSettings('userPageAccessible')" class="select select-bordered w-full">
            <option value="EVERYONE">所有人</option>
            <option value="ONLY_FRIENDS">仅限好友</option>
            <option value="ONLY_ME">仅我自己</option>
          </select>
        </div>
        <div class="mt-4"></div>
        <div class="flex-between items-center flex">
          <div class="w-full">
            查看我的B35
          </div>
          <select v-model="responseData.best35Accessible" @change="setUserSettings('best35Accessible')" class="select select-bordered w-full">
            <option value="EVERYONE">所有人</option>
            <option value="ONLY_FRIENDS">仅限好友</option>
            <option value="ONLY_ME">仅我自己</option>
          </select>
        </div>
        <div class="mt-4"></div>
        <div class="flex-between items-center flex">
          <div class="w-full">
            查看我的B15
          </div>
          <select v-model="responseData.best15Accessible" @change="setUserSettings('best15Accessible')" class="select select-bordered w-full">
            <option value="EVERYONE">所有人</option>
            <option value="ONLY_FRIENDS">仅限好友</option>
            <option value="ONLY_ME">仅我自己</option>
          </select>
        </div>
        <div class="mt-4"></div>
        <div class="flex-between items-center flex">
          <div class="w-full">
            查看我的最近游玩记录
          </div>
          <select v-model="responseData.recentScoresAccessible" @change="setUserSettings('recentScoresAccessible')" class="select select-bordered w-full">
            <option value="EVERYONE">所有人</option>
            <option value="ONLY_FRIENDS">仅限好友</option>
            <option value="ONLY_ME">仅我自己</option>
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
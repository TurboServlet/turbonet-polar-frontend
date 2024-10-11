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
    responseData.value = '验证失败，请重新登录。'
  })
}

const setFriendSearchPolicy = async () => {
  const payload = {
    "policy": responseData.value,
  }
  await sendPostRequest('/web/setFriendSearchPolicy', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('调整成功')
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
      <h3 class="text-lg font-bold">好友政策设置</h3>
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
      <div v-else class="flex items-center flex-between">
        <div class="w-full">
          当前策略
        </div>
        <select v-model="responseData" @change="setFriendSearchPolicy" class="select select-bordered w-full">
          <option value="AUTO_ACCEPT">自动同意申请</option>
          <option value="MANUAL">手动同意申请</option>
          <option value="FRIENDS_OF_FRIENDS">仅允许有共同好友申请</option>
          <option value="NOBODY">不允许申请</option>
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
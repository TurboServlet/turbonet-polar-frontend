<script setup>

import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import ExecuteRecordBadge from "@/components/ExecuteRecordBadge.vue";
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import {toast} from "vue-sonner";
import {useReCaptcha} from "vue-recaptcha-v3";

const { executeRecaptcha } = useReCaptcha()

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()
const forgiveStates = ref({});

const executeRecordList = async () => {
  await sendGetRequest('/web/executeRecordList', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      responseData.value = response.data
      responseData.value.forEach(friend => {
        forgiveStates.value[friend.recordId] = {btnLoading: false};
      });
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

const forgiveUser = async (recordId) => {
  forgiveStates.value[recordId].btnLoading = true
  const token = await executeRecaptcha('forgiveUser')
  const payload = {
    "recordId": recordId,
    "captchaToken": token,
  }
  await sendPostRequest('/permission/forgiveUser', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('撤销成功')
      forgiveStates.value[recordId].btnLoading = false
      executeRecordList()
    } else {
      toast.error(response.data)
      forgiveStates.value[recordId].btnLoading = false
    }
  })
}

onMounted(() => {
  executeRecordList()
})

</script>

<template>
  <dialog id="executeRecordDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('executeRecordDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">历史执行管理</h3>
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
      <div v-else class="overflow-x-auto">
        <div v-if="responseData.length === 0" class="main-container-center">
          <h1 class="font-bold text-3xl">
            暂无数据
          </h1>
          <div class="mt-3"></div>
          <p>
            你没有使用过任何权限
          </p>
        </div>
        <table v-else class="table table-zebra">
          <!-- head -->
          <thead>
          <tr>
            <th>用户名</th>
            <th>执行内容</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in responseData">
            <td>{{ user.turboName }}</td>
            <td>
              <ExecuteRecordBadge :execute-type="user.type" />
            </td>
            <td>
              <button @click="forgiveUser(user.recordId)" class="btn btn-xs gap-1.5 btn-error" :disabled="forgiveStates[user.recordId].btnLoading">
                <span v-if="forgiveStates[user.recordId].btnLoading" class="loading loading-spinner size-4"></span>
                <i v-else class="fa-solid fa-rotate-left"></i>
                撤销
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div @click="closeDialogModal('executeRecordDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
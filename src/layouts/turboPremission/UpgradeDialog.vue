<script setup>

import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {toast} from "vue-sonner";
import {useReCaptcha} from "vue-recaptcha-v3";
import {closeDialogModal} from "@/assets/js/DialogManager.js";

const isLoading = ref(true);
const isSuccess = ref(false);
const downgradeStates = ref({});
const responseData = ref()

const { executeRecaptcha } = useReCaptcha()

const upgradeTurboPermissionList = async () => {
  await sendGetRequest('/web/upgradeTurboPermissionList', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      responseData.value = response.data
      responseData.value.forEach(friend => {
        downgradeStates.value[friend.turboName] = {btnLoading: false};
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

const downgradePermission = async (turboName) => {
  downgradeStates.value[turboName].btnLoading = true
  const token = await executeRecaptcha('downgradePermission')
  const payload = {
    "turboName": turboName,
    "captchaToken": token,
  }
  await sendPostRequest('/permission/downgradePermission', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('降级成功')
      downgradeStates.value[turboName].btnLoading = false
      upgradeTurboPermissionList()
    } else {
      toast.error(response.data)
      downgradeStates.value[turboName].btnLoading = false
    }
  })
}

onMounted(() => {
  upgradeTurboPermissionList()
})

</script>

<template>
  <dialog id="upgradeDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('upgradeDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">历史授权管理</h3>
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
            你还没有授权过人呢，快去试试吧！
          </p>
        </div>
        <table v-else class="table table-zebra">
          <!-- head -->
          <thead>
          <tr>
            <th>用户名</th>
            <th>授权后</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in responseData">
            <td>{{ user.turboName }}</td>
            <td>
              <TurboPermissionBadge :turbo-permission="user.permission"/>
            </td>
            <td>
              <button @click="downgradePermission(user.turboName)" class="btn btn-xs gap-1.5 btn-error" :disabled="downgradeStates[user.turboName].btnLoading">
                <span v-if="downgradeStates[user.turboName].btnLoading" class="loading loading-spinner size-4"></span>
                <i v-else class="fa-solid fa-user-slash"></i>
                撤销
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div @click="closeDialogModal('upgradeDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
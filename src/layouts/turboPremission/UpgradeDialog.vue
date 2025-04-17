<script setup>

import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isLoading = ref(true);
const isSuccess = ref(false);
const downgradeStates = ref({});
const responseData = ref()



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
    responseData.value = t('error.jsError')
  })
}

const downgradePermission = async (turboName) => {
  downgradeStates.value[turboName].btnLoading = true
  const {token, a} = await executeRecaptcha('downgradePermission')
  const payload = {
    "turboName": turboName,
    "captchaToken": token,
    "a": a,
  }
  await sendPostRequest('/permission/downgradePermission', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('turboPermission.upgradeDialog.toast.success'))
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
      <h3 class="text-lg font-bold">{{ $t('turboPermission.upgradeDialog.title') }}</h3>
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
      <div v-else class="overflow-x-auto">
        <div v-if="responseData.length === 0" class="main-container-center">
          <h1 class="font-bold text-3xl">
            {{ $t('turboPermission.upgradeDialog.noData.title') }}
          </h1>
          <div class="mt-3"></div>
          <p>
            {{ $t('turboPermission.upgradeDialog.noData.content') }}
          </p>
        </div>
        <table v-else class="table table-zebra">
          <!-- head -->
          <thead>
          <tr>
            <th>{{ $t('turboPermission.upgradeDialog.table.turboName') }}</th>
            <th>{{ $t('turboPermission.upgradeDialog.table.upgradeAfter') }}</th>
            <th>{{ $t('turboPermission.upgradeDialog.table.operate') }}</th>
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
                {{ $t('turboPermission.upgradeDialog.table.cancel') }}
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
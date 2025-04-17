<script setup>

import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import UpgradeDialog from "@/layouts/turboPremission/UpgradeDialog.vue";
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import ExecuteRecordDialog from "@/layouts/turboPremission/ExecuteRecordDialog.vue";
import ExecuteRecordBadge from "@/components/ExecuteRecordBadge.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const turboName = ref('')
const selectedType = ref('WARNING')
const isBtnLoading = ref(false)
const selectedTime = ref('1')
const reason = ref('')

const selectedTimeToHour = () => {
  switch (selectedTime.value.toString()) {
    case '1':
      return 1
    case '2':
      return 24
    case '3':
      return 7 * 24
    case '4':
      return 30 * 24
    case '5':
      return 365 * 24
    case '6':
      return 0
  }
}

const execute = async () => {
  isBtnLoading.value = true
  if (reason.value === '') {
    toast.error(t('turboPermission.executePage.toast.reason'))
    isBtnLoading.value = false
    return
  }
  const {token, a} = await executeRecaptcha('execute')
  if (selectedType.value === 'WARNING') {
    const payload = {
      "turboName": turboName.value,
      "reason": reason.value,
      "captchaToken": token,
      "a": a,
    }
    await sendPostRequest('/permission/warnUser', payload, true).then((response) => {
      if (response.statusCode === 200) {
        toast.success(t('turboPermission.executePage.toast.warnSuccess'))
        isBtnLoading.value = false
      } else {
        toast.error(response.data)
        isBtnLoading.value = false
      }
    })
  }
  if (selectedType.value === 'BANNED') {
    const payload = {
      "turboName": turboName.value,
      "reason": reason.value,
      "isPermanent": selectedTime.value === '6',
      "endHours": selectedTimeToHour(),
      "captchaToken": token,
      "a": a,
    }
    await sendPostRequest('/permission/banUser', payload, true).then((response) => {
      if (response.statusCode === 200) {
        toast.success(t('turboPermission.executePage.toast.banSuccess'))
        isBtnLoading.value = false
      } else {
        toast.error(response.data)
        isBtnLoading.value = false
      }
    })
  }
}

</script>

<template>
  <div class="ml-4 mr-4 flex flex-col">
    <form @submit.prevent="execute" class="flex flex-col" >
      <label class="input max-sm:input-sm input-bordered flex items-center gap-2">
        <i class="fa-solid fa-user"></i>
        <input
            type="text"
            class="grow"
            :placeholder="$t('turboPermission.executePage.turboName')"
            v-model="turboName"
            autocomplete="current-username"
            required/>
      </label>
      <div class="mt-4"></div>
      <textarea v-model="reason" class="textarea max-sm:textarea-sm textarea-bordered" :placeholder="$t('turboPermission.executePage.reason')"></textarea>
      <div class="mt-4"></div>
      <div class="form-control">
        <label class="label cursor-pointer">
        <span class="label-text">
          <ExecuteRecordBadge execute-type="WARNING" />
        </span>
          <input type="radio" name="radio-10" class="radio checked:bg-warning" value="WARNING"
                 v-model="selectedType"/>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
        <span class="label-text">
           <ExecuteRecordBadge execute-type="BANNED" />
        </span>
          <input type="radio" name="radio-10" class="radio checked:bg-error" value="BANNED"
                 v-model="selectedType"/>
        </label>
      </div>
      <input type="range" min="1" max="6" value="1" class="range max-sm:range-sm range-primary mt-4" v-model="selectedTime" v-if="selectedType === 'BANNED'" />
      <div class="flex w-full justify-between px-2 text-xs mt-0.5" v-if="selectedType === 'BANNED'">
        <span>{{ $t('turboPermission.executePage.banTime.1hr') }}</span>
        <span>{{ $t('turboPermission.executePage.banTime.24hrs') }}</span>
        <span>{{ $t('turboPermission.executePage.banTime.7days') }}</span>
        <span>{{ $t('turboPermission.executePage.banTime.30days') }}</span>
        <span>{{ $t('turboPermission.executePage.banTime.365days') }}</span>
        <span>{{ $t('turboPermission.executePage.banTime.permanent') }}</span>
      </div>
      <div class="mt-8"></div>
      <button class="btn max-sm:btn-sm w-2/3 mx-auto" :disabled="isBtnLoading">
        <span v-if="isBtnLoading" class="loading loading-spinner"></span>
        {{ $t('turboPermission.executePage.execute') }}
      </button>
    </form>
    <div class="mt-2"></div>
    <button class="btn max-sm:btn-sm w-2/3 mx-auto" @click="openDialogModal('executeRecordDialog')">
      <i class="fa-solid fa-clock-rotate-left"></i> {{ $t('turboPermission.executePage.executeLog') }}
    </button>
    <div class="mt-6"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      {{ $t('turboPermission.executePage.executeNotice.1') }}
      <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link> {{ $t('turboPermission.executePage.executeNotice.2') }}
    </div>
  </div>
  <ExecuteRecordDialog/>
</template>

<style scoped>

</style>
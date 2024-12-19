<script setup>

import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import UpgradeDialog from "@/layouts/turboPremission/UpgradeDialog.vue";
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import {useReCaptcha} from "vue-recaptcha-v3";
import ExecuteRecordDialog from "@/layouts/turboPremission/ExecuteRecordDialog.vue";
import ExecuteRecordBadge from "@/components/ExecuteRecordBadge.vue";

const {executeRecaptcha} = useReCaptcha()

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
    toast.error('请填写理由')
    isBtnLoading.value = false
    return
  }
  const token = await executeRecaptcha('execute')
  if (selectedType.value === 'WARNING') {
    const payload = {
      "turboName": turboName.value,
      "reason": reason.value,
      "captchaToken": token,
    }
    await sendPostRequest('/permission/warnUser', payload, true).then((response) => {
      if (response.statusCode === 200) {
        toast.success('警告该用户成功')
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
    }
    await sendPostRequest('/permission/banUser', payload, true).then((response) => {
      if (response.statusCode === 200) {
        toast.success('封禁该用户成功')
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
            placeholder="Turbo用户名"
            v-model="turboName"
            autocomplete="current-username"
            required/>
      </label>
      <div class="mt-4"></div>
      <textarea v-model="reason" class="textarea max-sm:textarea-sm textarea-bordered" placeholder="理由"></textarea>
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
        <span>1小时</span>
        <span>24小时</span>
        <span>7天</span>
        <span>30天</span>
        <span>365天</span>
        <span>永久</span>
      </div>
      <div class="mt-8"></div>
      <button class="btn max-sm:btn-sm w-2/3 mx-auto" :disabled="isBtnLoading">
        <span v-if="isBtnLoading" class="loading loading-spinner"></span>
        执行
      </button>
    </form>
    <div class="mt-2"></div>
    <button class="btn max-sm:btn-sm w-2/3 mx-auto" @click="openDialogModal('executeRecordDialog')">
      <i class="fa-solid fa-clock-rotate-left"></i> 历史执行管理
    </button>
    <div class="mt-6"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      请在使用权限之前慎重考虑。您的一切操作都将被记录，该用户后续行为所引发的所有后果以及舆论影响将由您负责。TurboServlet 有权根据
      <router-link class="text-primary" target="_blank" to="/tos">使用条款</router-link> 对您采取措施。
    </div>
  </div>
  <ExecuteRecordDialog/>
</template>

<style scoped>

</style>
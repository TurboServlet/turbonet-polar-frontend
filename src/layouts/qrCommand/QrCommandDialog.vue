<script setup>

import {closeDialogModal} from "@/assets/js/DialogManager.js";
import {ArcadeFunctionTypeStringToEnum, ArcadeSettingEnumToString} from "@/assets/js/ArcadeUtils.js";
import {onMounted, ref, toRef, watch} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import QrcodeVue from 'qrcode.vue';

const props = defineProps({
  qrCommandVal: {
    type: Object,
    required: true,
  }
})

const qrCommandVal = toRef(props, 'qrCommandVal')

const isLoading = ref(true)
const isSuccess = ref(false)
const responseData = ref()

onMounted(() => {
  watch(() => qrCommandVal.value, (newVal) => {
    isLoading.value = true
    isSuccess.value = false
    sendGetRequest('/web/getQrCommandData?functionType=' + newVal.functionType + '&setting=' + newVal.setting, true).then((response) => {
      if (response.statusCode === 200) {
        isLoading.value = false
        isSuccess.value = true
        responseData.value = response.data
      } else {
        isLoading.value = false
        isSuccess.value = false
        responseData.value = response.data
      }
    }).catch((e) => {
      isLoading.value = false
      isSuccess.value = false
      responseData.value = '验证失败，请重新登录。'
    })
  })
})

</script>

<template>
  <dialog id="qrCommandDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                @click="closeDialogModal('qrCommandDialog')">✕
        </button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('qrCommand.dialog.title') }}</h3>
      <div class="mt-4"/>
      <div v-if="isLoading || !isSuccess" class="main-container-center">
        <span v-if="isLoading" class="loading loading-spinner size-8"/>
        <div v-if="!isLoading && !isSuccess">
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
      <div v-else>
        <div class="flex flex-col items-center text-center">
          <div
              v-if="qrCommandVal.functionType === 'LOGIN' || qrCommandVal.functionType === 'KASTANJ_LOGIN' || qrCommandVal.functionType === 'PING' || qrCommandVal.functionType === 'SPECIAL_TYPE_ONE_LOGIN'"
              class="font-bold text-2xl">
            {{ ArcadeFunctionTypeStringToEnum(qrCommandVal.functionType) }}
          </div>
          <div v-else class="font-bold text-2xl">
            {{ ArcadeSettingEnumToString(qrCommandVal.setting) }}
          </div>
          <div class="mt-1">
            {{ $t('qrCommand.dialog.content.1') }}<br>
            {{ $t('qrCommand.dialog.content.2') }}
          </div>
          <div class="p-4 my-4 bg-white rounded-box shadow">
            <qrcode-vue :size="220" :value="responseData.qrData"/>
          </div>
          <div class="qr-code-footer">{{ $t('qrCommand.dialog.expireTime', { time: responseData.valid }) }}</div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" @click="closeDialogModal('qrCommandDialog')">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
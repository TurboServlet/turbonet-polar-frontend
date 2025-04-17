<script setup>

import {ref} from "vue";
import MAIDHelpDialog from "@/layouts/register/MAIDHelpDialog.vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import {useRouter} from "vue-router";
import {openDialogModal} from "@/assets/js/DialogManager.js";


const isShowInner = ref(false)
const changeShow = () => {
  isShowInner.value = !isShowInner.value
}

const isBtnLoading = ref(false)
const weChatID = ref()

const router = useRouter()

const weChatIDVerify = async () => {
  isBtnLoading.value = true
  const {token, a} = await executeRecaptcha('weChatIDVerify')
  const payload = {
    "weChatID": weChatID.value,
    "captchaToken": token,
    "a": a,
  }
  await sendPostRequest('/support/weChatIDVerify', payload, false).then((response) => {
    if (response.statusCode === 200) {
      isBtnLoading.value = false
      router.push('/support/session/' + response.data.sessionId)
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

</script>

<template>
  <div class="bg-base-100 rounded-box p-6">
    <form @submit.prevent="weChatIDVerify" class="h-full flex flex-col">
      <div v-if="!isShowInner">
        <div class="flex items-center gap-2 font-bold text-xl">
          <div>{{ $t('support.qrCard.title') }}</div>
          <div class="badge badge-primary gap-1.5 font-bold">
            {{ $t('support.qrCard.recommend') }}
          </div>
        </div>
        <div class="mt-2"></div>
        <div class="text-sm">{{ $t('support.qrCard.subTitle') }}</div>
        <div class="mt-4"></div>
        <div class="flex justify-end">
          <button type="button" class="btn btn-primary" @click="changeShow">{{ $t('support.qrCard.validation') }}</button>
        </div>
      </div>
      <div v-else>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('support.qrCard.qrField') }}</span>
          </div>
          <input v-model="weChatID" class="input input-bordered w-full" placeholder="SGWCMAIDxxxxxxxxxxxxxxxxxxx" type="text" required/>
          <div class="label">
            <span class="label-text-alt"></span>
            <span class="label-text-alt" @click="openDialogModal('registerDialog')">
              <i class="fa-regular fa-circle-question"></i> {{ $t('support.qrCard.notUnderstand') }}
            </span>
          </div>
        </label>
        <div class="mt-6"></div>
        <div class="flex mt-auto justify-end gap-4">
          <button type="button" class="btn btn-error" @click="changeShow">{{ $t('support.back') }}</button>
          <button :disabled="isBtnLoading" type="submit" class="btn btn-primary">
            <span v-if="isBtnLoading" class="loading loading-spinner"></span>
            {{ $t('support.qrCard.validation') }}
          </button>
        </div>
      </div>
    </form>
  </div>
  <MAIDHelpDialog />
</template>


<style scoped>
</style>
<script setup>
import {ref} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isShowInner = ref(false)
const changeShow = () => {
  isShowInner.value = !isShowInner.value
}

const isBtnLoading = ref(false)
const isSuccess = ref(false)
const email = ref('')

const emailSendVerify = async () => {
  isBtnLoading.value = true
  const {token, a} = await executeRecaptcha('emailSendVerify')
  const payload = {
    "email": email.value,
    "captchaToken": token,
    "a": a,
  }
  await sendPostRequest('/support/emailSendVerify', payload, false).then((response) => {
    if (response.statusCode === 200) {
      isBtnLoading.value = false
      isSuccess.value = true
      toast.success(t('support.emailCard.toast.success'))
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

</script>

<template>
  <div v-if="!isSuccess" class="bg-base-100 rounded-box p-6">
    <form @submit.prevent="emailSendVerify" class="h-full flex flex-col">
      <div v-if="!isShowInner">
        <div class="font-bold text-xl">{{ $t('support.emailCard.title') }}</div>
        <div class="mt-2"></div>
        <div class="text-sm">{{ $t('support.emailCard.subTitle') }}</div>
        <div class="mt-4"></div>
        <div class="flex mt-auto justify-end gap-4">
          <button type="button" class="btn btn-primary" @click="changeShow">{{ $t('support.emailCard.validation') }}</button>
        </div>
      </div>
      <div v-else>
        <label class="input input-bordered flex items-center gap-2 w-full">
          <i class="fa-solid fa-at"></i>
          <input v-model="email" class="grow" :placeholder="$t('support.emailCard.detail.email')" required type="email"/>
        </label>
        <div class="mt-6"></div>
        <div class="flex mt-auto justify-end gap-4">
          <button type="button" class="btn btn-error" @click="changeShow">{{ $t('support.back') }}</button>
          <button :disabled="isBtnLoading" type="submit" class="btn btn-primary">
            <span v-if="isBtnLoading" class="loading loading-spinner"></span>
            {{ $t('support.emailCard.validation') }}
          </button>
        </div>
      </div>
    </form>
  </div>
  <div v-else class="bg-base-100 rounded-box p-6 h-full flex flex-col">
    <div class="font-bold text-xl">{{ $t('support.emailCard.success') }}</div>
    <div class="mt-2"></div>
    <div>{{ $t('support.emailCard.notice') }}</div>
  </div>
</template>

<style scoped>

</style>
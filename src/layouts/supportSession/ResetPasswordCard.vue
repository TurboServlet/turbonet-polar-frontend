<script setup>
import {ref, toRef} from "vue";
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
const password = ref('')
const passwordConfirm = ref('')

const props = defineProps({
  sessionId: {
    type: String,
    required: true
  }
})

const sessionId = toRef(props, 'sessionId')

const resetPassword = async () => {
  if (password.value !== passwordConfirm.value) {
    toast.error(t('supportSession.resetPassword.toast.validError'))
    return
  }
  isBtnLoading.value = true
  const {token, a} = await executeRecaptcha('resetPassword')
  const payload = {
    "password": password.value,
    "sessionId": sessionId.value,
    "captchaToken": token,
    "a": a,
  }
  await sendPostRequest('/support/resetPassword', payload, false).then((response) => {
    if (response.statusCode === 200) {
      isBtnLoading.value = false
      isSuccess.value = true
      toast.success(t('supportSession.resetPassword.toast.success'))
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

</script>

<template>
  <div v-if="!isSuccess" class="bg-base-100 rounded-box p-6">
    <div v-if="!isShowInner" class="h-full flex items-center justify-between">
      <div class="font-bold text-xl">{{ $t('supportSession.resetPassword.title') }}</div>
      <button class="btn btn-primary gap-4" @click="changeShow">{{ $t('supportSession.choose') }}</button>
    </div>
    <div v-else class="h-full flex flex-col">
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-key"></i>
        <input
            type="password"
            class="grow"
            :placeholder="$t('supportSession.resetPassword.details.newPassword')"
            v-model="password"
            autocomplete="current-password"
            required/>
      </label>
      <div class="mt-4"></div>
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-key"></i>
        <input
            type="password"
            class="grow"
            :placeholder="$t('supportSession.resetPassword.details.confirmPassword')"
            v-model="passwordConfirm"
            autocomplete="current-password"
            required/>
      </label>
      <div class="mt-6"></div>
      <div class="flex mt-auto justify-end gap-4">
        <button class="btn btn-error" @click="changeShow">{{ $t('supportSession.back') }}</button>
        <button :disabled="isBtnLoading" class="btn btn-primary" @click="resetPassword">
          <span v-if="isBtnLoading" class="loading loading-spinner"></span>
          {{ $t('supportSession.resetPassword.submit') }}
        </button>
      </div>
    </div>
  </div>
  <div v-else class="bg-base-100 rounded-box p-6 h-full flex flex-col">
    <div class="font-bold text-xl">{{ $t('supportSession.success') }}</div>
    <div class="mt-2"></div>
    <div>{{ $t('supportSession.resetPassword.notice') }}</div>
  </div>
</template>

<style scoped>

</style>
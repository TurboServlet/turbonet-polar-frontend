<script setup>
import {ref} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import {useRouter} from "vue-router";



const isShowInner = ref(false)
const changeShow = () => {
  isShowInner.value = !isShowInner.value
}

const isBtnLoading = ref(false)
const username = ref('')
const password = ref('')

const router = useRouter()

const credentialVerify = async () => {
  isBtnLoading.value = true
  const {token, a} = await executeRecaptcha('credentialVerify')
  const payload = {
    "username": username.value,
    "password": password.value,
    "captchaToken": token,
    "a": a,
  }
  await sendPostRequest('/support/credentialVerify', payload, false).then((response) => {
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
  <form @submit.prevent="credentialVerify" class="bg-base-100 rounded-box p-6">
    <div class="h-full flex flex-col" v-if="!isShowInner">
      <div class="font-bold text-xl">{{ $t('support.credentialCard.title') }}</div>
      <div class="mt-2"></div>
      <div class="text-sm">{{ $t('support.credentialCard.subTitle') }}</div>
      <div class="mt-4"></div>
      <div class="flex mt-auto justify-end">
        <button type="button" @click="changeShow" class="btn btn-primary">{{ $t('support.credentialCard.validation') }}</button>
      </div>
    </div>
    <div class="h-full flex flex-col" v-else>
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-user"></i>
        <input
            type="text"
            class="grow"
            :placeholder="$t('support.credentialCard.detail.userName')"
            v-model="username"
            autocomplete="current-username"
            required
        />
      </label>

      <div class="mt-5"></div>

      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-key"></i>
        <input
            type="password"
            class="grow"
            :placeholder="$t('support.credentialCard.detail.userPassword')"
            v-model="password"
            autocomplete="current-password"
            required
        />
      </label>

      <div class="mt-6"></div>
      <div class="flex mt-auto justify-end gap-4">
        <button type="button" class="btn btn-error" @click="changeShow">{{ $t('support.back') }}</button>
        <button :disabled="isBtnLoading" type="submit" class="btn btn-primary">
          <span v-if="isBtnLoading" class="loading loading-spinner"></span>
          {{ $t('support.credentialCard.validation') }}
        </button>
      </div>
    </div>
  </form>
</template>


<style scoped>

</style>
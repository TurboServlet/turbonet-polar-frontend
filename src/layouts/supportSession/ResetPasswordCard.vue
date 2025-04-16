<script setup>
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSovler.js";



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
    toast.error('两次密码不一致，请重新输入')
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
      toast.success('重置成功')
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
      <div class="font-bold text-xl">重置密码</div>
      <button class="btn btn-primary gap-4" @click="changeShow">选择此帮助</button>
    </div>
    <div v-else class="h-full flex flex-col">
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-key"></i>
        <input
            type="password"
            class="grow"
            placeholder="新密码"
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
            placeholder="确认密码"
            v-model="passwordConfirm"
            autocomplete="current-password"
            required/>
      </label>
      <div class="mt-6"></div>
      <div class="flex mt-auto justify-end gap-4">
        <button class="btn btn-error" @click="changeShow">返回</button>
        <button :disabled="isBtnLoading" class="btn btn-primary" @click="resetPassword">
          <span v-if="isBtnLoading" class="loading loading-spinner"></span>
          重置密码
        </button>
      </div>
    </div>
  </div>
  <div v-else class="bg-base-100 rounded-box p-6 h-full flex flex-col">
    <div class="font-bold text-xl">成功！</div>
    <div class="mt-2"></div>
    <div>我们已重置您的密码，请重新登录。</div>
  </div>
</template>

<style scoped>

</style>
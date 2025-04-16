<script setup>
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSovler.js";



const isShowInner = ref(false)
const changeShow = () => {
  isShowInner.value = !isShowInner.value
}

const props = defineProps({
  email: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  }
})

const email = toRef(props, 'email')
const sessionId = toRef(props, 'sessionId')

const isBtnLoading = ref(false)
const isSuccess = ref(false)
const newEmail = ref('')

const resetEmail = async () => {
  isBtnLoading.value = true
  const {token, a} = await executeRecaptcha('resetEmail')
  const payload = {
    "email": newEmail.value,
    "captchaToken": token,
    "a": a,
    "sessionId": sessionId.value
  }
  await sendPostRequest('/support/resetEmail', payload, false).then((response) => {
    if (response.statusCode === 200) {
      isBtnLoading.value = false
      isSuccess.value = true
      toast.success('已发送邮件')
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
      <div>
        <div class="font-bold text-xl">重置电子邮箱</div>
        <div class="opacity-60">当前邮箱: {{ email }}</div>
      </div>
      <button class="btn btn-primary gap-4" @click="changeShow">选择此帮助</button>
    </div>
    <div v-else class="h-full flex flex-col">
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-at"></i>
        <input
            type="text"
            class="grow"
            placeholder="新电子邮箱"
            v-model="newEmail"
            required/>
      </label>
      <div class="mt-6"></div>
      <div class="flex mt-auto justify-end gap-4">
        <button class="btn btn-error" @click="changeShow">返回</button>
        <button :disabled="isBtnLoading" class="btn btn-primary" @click="resetEmail">
          <span v-if="isBtnLoading" class="loading loading-spinner"></span>
          重置电子邮箱
        </button>
      </div>
    </div>
  </div>
  <div v-else class="bg-base-100 rounded-box p-6 h-full flex flex-col">
    <div class="font-bold text-xl">成功！</div>
    <div class="mt-2"></div>
    <div>我们已发送验证邮件至您的新邮箱，请查看您的邮件。</div>
  </div>
</template>

<style scoped>

</style>
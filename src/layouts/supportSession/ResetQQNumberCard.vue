<script setup>
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {useReCaptcha} from "vue-recaptcha-v3";

const {executeRecaptcha} = useReCaptcha()

const isShowInner = ref(false)
const changeShow = () => {
  isShowInner.value = !isShowInner.value
}

const props = defineProps({
  qqNumber: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  }
})

const sessionId = toRef(props, 'sessionId')
const qqNumber = toRef(props, 'qqNumber')

const isBtnLoading = ref(false)
const isSuccess = ref(false)
const newQQNumber = ref('')

const resetQQNumber = async () => {
  isBtnLoading.value = true
  const token = await executeRecaptcha('resetQQNumber')
  const payload = {
    "qqNumber": newQQNumber.value,
    "sessionId": sessionId.value,
    "captchaToken": token
  }
  await sendPostRequest('/support/resetQQNumber', payload, false).then((response) => {
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
      <div>
        <div class="font-bold text-xl">重置QQ号</div>
        <div class="opacity-60">当前QQ号: {{ qqNumber }}</div>
      </div>
      <button class="btn btn-primary gap-4" @click="changeShow">选择此帮助</button>
    </div>
    <div v-else class="h-full flex flex-col">
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-at"></i>
        <input
            type="text"
            class="grow"
            placeholder="新QQ号"
            v-model="newQQNumber"
            required/>
      </label>
      <div class="mt-6"></div>
      <div class="flex mt-auto justify-end gap-4">
        <button class="btn btn-error" @click="changeShow">返回</button>
        <button :disabled="isBtnLoading" class="btn btn-primary" @click="resetQQNumber">
          <span v-if="isBtnLoading" class="loading loading-spinner"></span>
          重置QQ号
        </button>
      </div>
    </div>
  </div>
  <div v-else class="bg-base-100 rounded-box p-6 h-full flex flex-col">
    <div class="font-bold text-xl">成功！</div>
    <div class="mt-2"></div>
    <div>我们已重置您的QQ号，请重新登录。</div>
  </div>
</template>

<style scoped>

</style>
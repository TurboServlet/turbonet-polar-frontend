<script setup>

import {onMounted, onUnmounted, ref, defineProps} from "vue";
import {useReCaptcha} from "vue-recaptcha-v3";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

const { executeRecaptcha } = useReCaptcha()

const minutes = ref(9);
const seconds = ref(30);

const isExpired = ref(false);
const registerToken = ref('')

const props = defineProps({
  registerToken: {
    type: String,
    required: true
  }
});

onMounted(() => {
  registerToken.value = props.registerToken
  const interval = setInterval(() => {
    if (seconds.value === 0) {
      if (minutes.value === 0) {
        isExpired.value = true;
      } else {
        minutes.value--;
        seconds.value = 59;
      }
    } else {
      seconds.value--;
    }
  }, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});

const step2IsProcessing = ref(false);

const step2 = async () => {
  step2IsProcessing.value = true;
  await register();
  if (isSubmitted.value) {
    changeStep();
  }
  step2IsProcessing.value = false;
}

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const qqNumber = ref('')

const isSubmitted = ref(false)

const register = async () => {
  if (password.value !== confirmPassword.value) {
    toast.error('两次输入的密码不一致')
    return
  }
  const token = await executeRecaptcha('register')
  const payload = {
    "username": username.value,
    "password": password.value,
    "email": email.value,
    "qqNumber": qqNumber.value,
    "captchaToken": token,
    "registerToken": registerToken.value
  }
  await sendPostRequest('/auth/register', payload, false).then((response) => {
    if (response.statusCode === 200) {
      isSubmitted.value = true
    } else {
      toast.error(response.data)
    }
  })
}

const emit = defineEmits(['changeStep'])

const changeStep = () => {
  emit('changeStep', 3)
}

</script>

<template>
  <div class="body flex align-middle" style="flex-direction: column;">
    <h1 class="font-bold text-3xl">
      注册您的账号
    </h1>
    <div class="mt-4"></div>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">填写基础资料</span>
      </div>
      <label class="input input-bordered flex items-center gap-2">
        <i class="fa-solid fa-user"></i>
        <input type="text" class="grow" placeholder="用户名" v-model="username" required/>
      </label>
    </label>
    <div class="mt-2"></div>
    <label class="input input-bordered flex items-center gap-2 w-full max-w-xs">
      <i class="fa-solid fa-key"></i>
      <input type="password" class="grow" placeholder="密码" v-model="password" required/>
    </label>
    <div class="mt-2"></div>
    <label class="input input-bordered flex items-center gap-2 w-full max-w-xs">
      <i class="fa-solid fa-key"></i>
      <input type="password" class="grow" placeholder="确认密码" v-model="confirmPassword" required/>
    </label>
    <div class="mt-2"></div>
    <label class="input input-bordered flex items-center gap-2 w-full max-w-xs">
      <i class="fa-solid fa-at"></i>
      <input type="email" class="grow" placeholder="电子邮箱" v-model="email" required/>
    </label>
    <div class="mt-2"></div>
    <label class="input input-bordered flex items-center gap-2 w-full max-w-xs">
      <i class="fa-brands fa-qq"></i>
      <input type="text" class="grow" placeholder="QQ号" v-model="qqNumber" required/>
    </label>
    <div class="mt-4"></div>
    <button @click="step2" :disabled="isExpired || step2IsProcessing" class="btn btn-active btn-primary btn-wide indicator">
        <span v-if="isExpired" class="indicator-item badge badge-error">
          请重新注册
        </span>
      <span v-else class="indicator-item badge badge-secondary countdown">
        <span :style="`--value: ${minutes}`"></span>
        :
        <span :style="`--value: ${seconds}`"></span>
        后失效</span>
      <span v-if="step2IsProcessing" class="loading loading-spinner"/>申请注册
    </button>
    <div class="mt-3"></div>
    <div class="text-right text-xs opacity-60">
      提交注册并注册完成即代表您同意 <a class="text-primary" target="_blank" href="/tos">使用条款</a> 和 <a class="text-primary" target="_blank" href="/privacy">隐私政策</a>
    </div>
  </div>
</template>

<style scoped>

</style>
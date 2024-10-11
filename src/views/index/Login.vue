<script setup>
import {ref} from 'vue'
import {toast} from "vue-sonner";
import {useReCaptcha} from "vue-recaptcha-v3";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {closeDialogModal} from "@/assets/js/DialogManager.js";

const {executeRecaptcha} = useReCaptcha()

const username = ref('')
const password = ref('')
const loginIsProcessing = ref(false)

const login = async () => {
  loginIsProcessing.value = true
  await getToken()
  loginIsProcessing.value = false
}

const getToken = async () => {
  const token = await executeRecaptcha('login')
  const payload = {
    "username": username.value,
    "password": password.value,
    "captchaToken": token,
  }
  await sendPostRequest('/auth/login', payload, false).then((response) => {
    if (response.statusCode === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('botToken', response.data.botToken);
      window.location.href = '/panel';
    } else {
      toast.error(response.data)
    }
  })
}

</script>

<template>
  <dialog id="login" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('login')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold text-center">欢迎回来！</h3>
      <div class="divider"></div>
      <form @submit.prevent="login" class="space-y-6">
        <label class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-user"></i>
          <input
              type="text"
              class="grow"
              placeholder="用户名"
              v-model="username"
              autocomplete="current-username"
              required/>
        </label>

        <div class="mt-5"></div>

        <label class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-key"></i>
          <input
              type="password"
              class="grow"
              placeholder="用户密码"
              v-model="password"
              autocomplete="current-password"
              required/>
          <router-link to="/support" class="badge badge-ghost">需要帮助?</router-link>
        </label>

        <div class="mt-8"></div>

        <div class="flex w-full flex-col lg:flex-row">
          <router-link to="/register" type="button" class="btn btn-active btn-ghost flex-1">注册</router-link>
          <div class="divider divider-horizontal computer-divider"></div>
          <div class="divider phone-divider"></div>
          <button type="submit" :disabled="loginIsProcessing" class="btn btn-active btn-primary flex-1">
            <span v-if="loginIsProcessing" class="loading loading-spinner"/>登录
          </button>
        </div>
      </form>
      <div class="mt-3"></div>
      <div class="text-right text-xs opacity-60">
        登录或注册完成即代表您同意 <a class="text-primary" target="_blank" href="/tos">使用条款</a> 和 <a class="text-primary" target="_blank" href="/privacy">隐私政策</a>
      </div>
    </div>
    <div @click="closeDialogModal('login')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>
@media (min-width: 1024px) {
  .phone-divider {
    display: none;
  }
}

@media (max-width: 1024px) {
  .computer-divider {
    display: none;
  }
}
</style>
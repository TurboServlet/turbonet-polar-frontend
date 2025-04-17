<script setup>
import {ref} from 'vue'
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import {useRouter} from "vue-router";

const router = useRouter()



const username = ref('')
const password = ref('')
const loginIsProcessing = ref(false)

const login = async () => {
  loginIsProcessing.value = true
  await getToken()
  loginIsProcessing.value = false
}

const getToken = async () => {
  const {token, a} = await executeRecaptcha('login')
  const payload = {
    "username": username.value,
    "password": password.value,
    "captchaToken": token,
    "a": a
  }
  await sendPostRequest('/auth/login', payload, false).then((response) => {
    if (response.statusCode === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('botToken', response.data.botToken);
      router.push('/panel')
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
      <h3 class="text-lg font-bold text-center">{{ $t('login.title') }}</h3>
      <div class="divider"></div>
      <form @submit.prevent="login" class="space-y-6">
        <label class="input input-bordered flex items-center gap-2">
          <i class="fa-solid fa-user"></i>
          <input
              type="text"
              class="grow"
              :placeholder="$t('login.fields.username')"
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
              :placeholder="$t('login.fields.password')"
              v-model="password"
              autocomplete="current-password"
              required/>
          <router-link to="/support" class="badge badge-ghost">{{ $t('login.support') }}</router-link>
        </label>

        <div class="mt-8"></div>

        <div class="flex w-full flex-col lg:flex-row">
          <router-link to="/register" type="button" class="btn btn-active btn-ghost flex-1">{{ $t('login.register') }}</router-link>
          <div class="divider divider-horizontal computer-divider"></div>
          <div class="divider phone-divider"></div>
          <button type="submit" :disabled="loginIsProcessing" class="btn btn-active btn-primary flex-1">
            <span v-if="loginIsProcessing" class="loading loading-spinner"/>{{ $t('login.button') }}
          </button>
        </div>
      </form>
      <div class="mt-3"></div>
      <div class="text-right text-xs opacity-60">
        {{ $t('login.notice.1') }} <router-link class="text-primary" target="_blank" to="/tos">{{ $t('footer.tos') }}</router-link>
        {{ $t('login.notice.2') }} <router-link class="text-primary" target="_blank" to="/privacy">
        {{ $t('footer.privacy') }}</router-link>
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
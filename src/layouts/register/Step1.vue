<script setup>
import {ref} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {useReCaptcha} from "vue-recaptcha-v3";
import {openDialogModal} from "@/assets/js/DialogManager.js";
const { executeRecaptcha } = useReCaptcha()

const weChatID = ref('');

const step1IsProcessing = ref(false);

const registerToken = ref('');

const step1 = async () => {
  step1IsProcessing.value = true;
  await getRegisterToken();
  if (registerToken.value !== '') {
    changeStep()
  }
  step1IsProcessing.value = false;
}

const getRegisterToken = async () => {
  const token = await executeRecaptcha('getRegisterToken')
  const payload = {
    "weChatID": weChatID.value,
    "captchaToken": token,
  }
  await sendPostRequest('/auth/weChatIDCheck', payload, false).then((response) => {
    if (response.statusCode === 200) {
      registerToken.value = response.data.token
    } else {
      toast.error(response.data)
    }
  })
}

const emit = defineEmits(['changeStep', 'registerToken'])

const changeStep = () => {
  emit('changeStep', 2)
  emit('registerToken', registerToken.value)
}
</script>

<template>
  <div class="body flex align-middle" style="flex-direction: column;">
    <h1 class="font-bold text-3xl">
      注册您的账号
    </h1>
    <div class="mt-2"></div>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">填写舞萌二维码ID</span>
      </div>
      <input type="text" placeholder="SGWCMAIDxxxxxxxxxxxxxxxxxxx" v-model="weChatID"
             class="input input-bordered w-full max-w-xs"/>
      <div class="label">
        <span class="label-text-alt"></span>
        <span class="label-text-alt" @click="openDialogModal('registerDialog')"><i class="fa-regular fa-circle-question"></i> 我不理解</span>
      </div>
    </label>
    <div class="mt-2"></div>
    <button @click="step1()" :disabled="step1IsProcessing" class="btn btn-active btn-primary btn-wide"><span
        v-if="step1IsProcessing" class="loading loading-spinner"/>下一步
    </button>
    <div class="mt-3"></div>
    <div class="text-right text-xs opacity-60">
      已经拥有帐号了?
      <router-link class="text-primary" to="/">返回主页</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
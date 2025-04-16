<script setup>
import Footer from "@/layouts/Footer.vue";
import Header from "@/layouts/Header.vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import CredentialCard from "@/layouts/support/CredentialCard.vue";
import EmailCard from "@/layouts/support/EmailCard.vue";
import ResetPasswordCard from "@/layouts/supportSession/ResetPasswordCard.vue";
import ResetTurboNameCard from "@/layouts/supportSession/ResetTurboNameCard.vue";
import ResetEmailCard from "@/layouts/supportSession/ResetEmailCard.vue";
import ResetQQNumberCard from "@/layouts/supportSession/ResetQQNumberCard.vue";
import {toast} from "vue-sonner";

const route = useRoute();

const isLoading = ref(true);
const isSuccess = ref(false);
const responseData = ref();
const sessionId = ref('');
const seconds = ref(0);

watchEffect(async () => {
  try {
    sessionId.value = route.params.sessionId;

    if (sessionId.value !== '') {
      await sendGetRequest('/support/showUserInfo?sessionId=' + sessionId.value,).then((response) => {
        if (response.statusCode === 200) {
          isLoading.value = false
          isSuccess.value = true
          responseData.value = response.data
          seconds.value = response.data.sessionExpireTime
          const interval = setInterval(() => {
            if (seconds.value === 0) {
              isClosed.value = true
            } else {
              seconds.value--;
            }
          }, 1000);
          onUnmounted(() => {
            clearInterval(interval);
          });
        } else {
          isLoading.value = false
          responseData.value = response.data
        }
      })
    } else {
      isLoading.value = false
      responseData.value = '请求体不全，请补全后重试。';
    }
  } catch (e) {
    isLoading.value = false
    responseData.value = '请求体不全，请补全后重试。';
  }
})

const isClosed = ref(false)
const isBtnLoading = ref(false)

const closeSession = async () => {
  isBtnLoading.value = true
  const payload = {
    "sessionId": sessionId.value,
  }
  await sendPostRequest('/support/closeSession', payload, false).then((response) => {
    if (response.statusCode === 200) {
      isBtnLoading.value = false
      isClosed.value = true
      toast.success('关闭成功')
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

</script>

<template>
  <Header :have-list="false"/>
  <div v-if="isLoading || !isSuccess" class="body flex align-middle" style="height: calc(100vh - 64px)">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> 访问失败
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else class="body-container p-10 rounded-box m-auto max-w-[1000px] bg-base-200">
    <div
        class="font-bold text-4xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text [-webkit-text-fill-color:transparent]">
      TurboNET 支持会话
    </div>
    <div class="mt-6"></div>
    <div class="font-bold text-xl">您的本次会话 ID：{{ sessionId }}</div>
    <div v-if="!isClosed">该会话将在 {{ seconds }} 秒后销毁，请及时完成您所需要的帮助。</div>
    <div v-else>该会话已销毁，请重新发起会话。</div>
    <div class="mt-6"></div>
    <div class="flex justify-between flex-col">
      <ResetPasswordCard :session-id="sessionId" v-if="!isClosed"/>
      <div class="mt-4" v-if="!isClosed"></div>
      <ResetTurboNameCard :turbo-name="responseData.turboName" :session-id="sessionId" v-if="!isClosed"/>
      <div class="mt-4" v-if="!isClosed"></div>
      <ResetEmailCard :email="responseData.email" :session-id="sessionId" v-if="!isClosed"/>
      <div class="mt-4" v-if="!isClosed"></div>
      <ResetQQNumberCard :qq-number="responseData.qqNumber" :session-id="sessionId" v-if="!isClosed"/>
      <div class="mt-4" v-if="!isClosed"></div>
      <div class="bg-base-100 rounded-box p-6">
        <div class="font-bold text-xl">问题反馈</div>
        <div class="mt-2"></div>
        <div class="text-sm">若您有任何疑问，请向管理员提交邮件工单。</div>
        <div class="mt-4"></div>
        <div class="bg-base-300 rounded-box p-4"><i class="fa-regular fa-envelope"></i> ctrlcvs@uwu.cat</div>
      </div>
      <div class="divider"></div>
      <div class="h-full flex items-center flex-col text-center">
        <div>
          <div class="font-bold text-xl">关闭会话</div>
          <div class="opacity-60">当您全部处理完成后，请在此处安全关闭会话</div>
        </div>
        <button v-if="!isClosed" class="btn btn-error gap-4 mt-4" @click="closeSession" :disabled="isBtnLoading">
          <span v-if="isBtnLoading" class="loading loading-spinner"></span>
          关闭会话 ({{ seconds }} 秒后自动提交)
        </button>
        <button v-else class="btn btn-neutral gap-4 mt-4" disabled>该会话已销毁</button>
      </div>
    </div>
    <div class="mt-16"></div>
  </div>
</template>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
}
</style>
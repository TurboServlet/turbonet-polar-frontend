<script setup>

import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
import MAIDCard from "@/layouts/support/MAIDCard.vue";
import CredentialCard from "@/layouts/support/CredentialCard.vue";
import EmailCard from "@/layouts/support/EmailCard.vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const isLoading = ref(true)
const isSuccess = ref(false)
const responseData = ref()

const router = useRouter()

const fastVerify = async () => {
  const payload = {}
  await sendPostRequest('/support/fastVerify', payload, true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      router.push('/support/session/' + response.data.sessionId)
    } else {
      toast.error('快速验证失败，请手动验证身份')
      isLoading.value = false
      isSuccess.value = true
    }
  })
}

onMounted(() => {
  fastVerify()
})

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
        <router-link class="text-primary" to="/">返回主页</router-link>
      </p>
    </div>
  </div>
  <div v-else class="body-container p-10 rounded-box m-auto max-w-[1000px] bg-base-200">
    <div
        class="font-bold text-4xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text [-webkit-text-fill-color:transparent]">
      TurboNET 支持
    </div>
    <div class="mt-6"></div>
    <div class="font-bold text-xl">当前自助提供：</div>
    <div class="">重置密码、更换邮箱、更改 QQ 账号、更改 Turbo 用户名、问题反馈</div>
    <div class="mt-4"></div>
    <div>该支持仅向 TurboNET <span style="color: oklch(var(--p))">Polar <i class="fa-solid fa-meteor"></i></span>
      会员提供。请先选择您可以接受的验证身份方式，以便于 TurboNET Support 为您提供更多服务与支持。如果您有其他的需求，请与管理员联系。
    </div>
    <div class="mt-6"></div>
    <MAIDCard/>
    <div class="divider">或者</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CredentialCard/>
      <EmailCard/>
      <div class="bg-base-100 rounded-box p-6">
        <div class="font-bold text-xl">人工验证</div>
        <div class="mt-2"></div>
        <div class="text-sm">若以上方式您均无法验证身份，请向管理员提交邮件工单。</div>
        <div class="mt-4"></div>
        <div class="bg-base-300 rounded-box p-4"><i class="fa-regular fa-envelope"></i> ctrlcvs@uwu.cat</div>
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
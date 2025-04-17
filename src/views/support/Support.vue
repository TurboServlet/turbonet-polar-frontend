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
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
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
      toast.error(t('support.toast.error'))
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
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('support.page.accessFailed') }}
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
      TurboNET {{ $t('support.page.title') }}
    </div>
    <div class="mt-6"></div>
    <div class="font-bold text-xl">{{ $t('support.page.selfService.title') }}</div>
    <div class="">{{ $t('support.page.selfService.function') }}</div>
    <div class="mt-4"></div>
    <div>{{ $t('support.page.selfService.notice.1') }} <span style="color: oklch(var(--p))">{{ $t('support.page.selfService.notice.2') }} <i class="fa-solid fa-meteor"></i></span>
      {{ $t('support.page.selfService.notice.3') }}
    </div>
    <div class="mt-6"></div>
    <MAIDCard/>
    <div class="divider">{{ $t('support.page.or') }}</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CredentialCard/>
      <EmailCard/>
      <div class="bg-base-100 rounded-box p-6">
        <div class="font-bold text-xl">{{ $t('support.page.agent') }}</div>
        <div class="mt-2"></div>
        <div class="text-sm">{{ $t('support.page.exception') }}</div>
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
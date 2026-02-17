<script setup>
import AvatarUpload from "@/components/changeAvatar/AvatarUpload.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const isResetBtnLoading = ref(false)
const isLoading = ref(true)
const isSuccess = ref(false)
const responseData = ref()

const showPermission = async () => {
  await sendGetRequest('/permission/showPermission', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      responseData.value = response.data
    } else {
      isLoading.value = false
      isSuccess.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    isLoading.value = false
    isSuccess.value = false
    responseData.value = t('error.jsError')
  })
}

const resetAvatar = async () => {
  isResetBtnLoading.value = true
  const payload = {}
  await sendPostRequest('/web/resetAvatar', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('changeAvatar.toast.resetSuccess'))
      isResetBtnLoading.value = false
    } else {
      toast.error(response.data)
      isResetBtnLoading.value = false
    }
  })
}

onMounted(() => {
  showPermission()
})


</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.loadingError') }}
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>{{ $t('menu.turbo.title') }}</li>
        <li>{{ $t('menu.turbo.changeAvatar') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" v-if="responseData === 'USER'" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ $t('changeAvatar.noPermission.title') }}</h3>
        <div class="text-xs">{{ $t('changeAvatar.noPermission.content') }}</div>
      </div>
    </div>
    <div role="alert" v-else class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ $t('changeAvatar.notWorking.title') }}</h3>
        <div class="text-xs">{{ $t('changeAvatar.notWorking.content') }}</div>
      </div>
    </div>
    <div class="mt-2"/>
    <div class="hero hero-content text-center">
      <div>
        <h1 class="text-5xl max-sm:text-4xl font-bold">{{ $t('changeAvatar.title') }}</h1>
        <div class="mt-10"/>
        <div class="flex">
          <button class="btn max-sm:btn-sm btn-active btn-primary flex-1 mr-2" @click="openDialogModal('avatarUpload')" :disabled="responseData === 'USER'">
            {{ $t('changeAvatar.dialogTitle') }}
          </button>
          <button @click="resetAvatar" class="btn max-sm:btn-sm btn-active btn-error flex-1 ml-2" :disabled="isResetBtnLoading">
            <span v-if="isResetBtnLoading" class="loading loading-spinner"/>{{ $t('changeAvatar.button.toDefault') }}
          </button>
        </div>
        <div class="mb-4"></div>
        <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
          {{ $t('changeAvatar.changeNotice.1') }}
          <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link> {{ $t('changeAvatar.changeNotice.2') }}
        </div>
      </div>
    </div>
  </div>
    <AvatarUpload/>
</template>

<style scoped>

</style>
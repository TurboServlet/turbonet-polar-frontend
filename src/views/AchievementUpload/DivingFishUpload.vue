<script setup>

import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, ref} from "vue";
import {toast} from "vue-sonner";
import {useI18n} from 'vue-i18n';
import {openDialogModal} from "@/assets/js/DialogManager.js";
import TurboWarningBadge from "@/components/TurboWarningBadge.vue";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import AchievementSaverStatusBadge from "@/components/AchievementSaverStatusBadge.vue";

const {t} = useI18n()
const isLoading = ref(true)
const isSuccess = ref(false)
const responseData = ref()

const isSetBtnLoading = ref(false)
const isDelBtnLoading = ref(false)

const token = ref()

const showDivingTokenStatus = async () => {
  await sendGetRequest('/web/showDivingTokenStatus', true).then((response) => {
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

const updateDivingToken = async () => {
  isSetBtnLoading.value = true
  const payload = {
    "token": token.value,
  }
  await sendPostRequest('/web/updateDivingToken', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('achievementUpload.toast.success'))
      isSetBtnLoading.value = false
      location.reload()
    } else {
      toast.error(response.data)
      isSetBtnLoading.value = false
    }
  })
}

const deleteDivingToken = async () => {
  isDelBtnLoading.value = true
  const payload = {}
  await sendPostRequest('/web/deleteDivingToken', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('achievementUpload.toast.deleteSuccess'))
      isDelBtnLoading.value = false
      location.reload()
    } else {
      toast.error(response.data)
      isDelBtnLoading.value = false
    }
  })
}

const dataSourceEnumToString = (dataSource) => {
  switch (dataSource) {
    case 'MUSIC_DETAIL':
      return t('achievementUpload.dataSource.musicDetail')
    case 'USER_ALL':
      return t('achievementUpload.dataSource.userAll')
    default:
      return t('achievementUpload.dataSource.unknown')
  }
}

onMounted(() => {
  showDivingTokenStatus()
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
        <li>{{ $t('menu.upload.title') }}</li>
        <li>{{ $t('menu.upload.divingFishUpload') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div v-if="responseData.isImportTokenExist === false" role="alert" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ $t('achievementUpload.warning.title') }}</h3>
        <div class="text-xs">{{ $t('achievementUpload.warning.divingContent') }}</div>
      </div>
    </div>
    <div class="mt-2"/>
    <div v-if="responseData.isImportTokenExist === false" class="hero hero-content text-center">
      <div>
        <h1 class="text-5xl max-sm:text-4xl font-bold">{{ $t('achievementUpload.title') }}</h1>
        <label class="input max-sm:input-sm input-bordered flex items-center gap-2 mt-4 mb-1">
          <input v-model="token" type="text" class="grow" :placeholder="$t('achievementUpload.placeholder')"/>
        </label>
        <div class="mt-10"></div>
        <div class="flex">
          <button type="submit" @click="updateDivingToken" :disabled="isSetBtnLoading"
                  class="btn max-sm:btn-sm btn-active btn-primary flex-1 mr-2">
            <span v-if="isSetBtnLoading" class="loading loading-spinner"/>{{ $t('achievementUpload.button.submit') }}
          </button>
        </div>
        <div class="mb-4"></div>
        <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
          {{ $t('achievementUpload.uploadNotice.1') }}
          <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link>
          {{ $t('achievementUpload.uploadNotice.2') }}
        </div>
      </div>
    </div>
    <div v-else class="border-2 border-base-200 rounded-box p-4 flex flex-col">
      <div class="flex">
        <div class="flex flex-wrap gap-2 flex-1" style="align-items: center">
          <span class="text-sm">
            {{ $t('achievementUpload.recordTime') }} {{ responseData.importDate }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2 justify-end">
          <button @click="deleteDivingToken" :disabled="isDelBtnLoading" class="btn btn-error btn-sm">
            {{ $t('achievementUpload.button.delete') }}
            <span v-if="isDelBtnLoading" class="loading loading-spinner"/>
          </button>
        </div>
      </div>
    </div>

    <div v-if="responseData.isImportTokenExist === true">
      <div v-if="responseData.history.length === 0" class="opacity-60 mt-10 main-container-center">
        {{ $t('achievementUpload.noData') }}
      </div>
      <div v-else class="overflow-x-auto">
        <table class="table table-zebra">
          <!-- head -->
          <thead>
          <tr>
            <th>{{ t('achievementUpload.table.updateTime') }}</th>
            <th>{{ t('achievementUpload.table.dataSource') }}</th>
            <th>{{ t('achievementUpload.table.status') }}</th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr v-for="history in responseData.history">
            <td>{{ history.uploadDate }}</td>
            <td>{{ dataSourceEnumToString(history.dataSource) }}</td>
            <td>
              <AchievementSaverStatusBadge :status="history.status"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
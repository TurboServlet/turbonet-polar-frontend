<script setup>

import {onMounted, ref, toRef} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import TurboWarningBadge from "@/components/TurboWarningBadge.vue";

const isLoading = ref(true);
const isSuccess = ref(false)

const responseData = ref()

const showUserPermission = async () => {
  await sendGetRequest('/web/showTurboPermission', true).then((response) => {
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
    responseData.value = '验证失败，请重新登录。'
  })
}

const props = defineProps({
  turboPermissionInfo: {
    type: Object,
    required: true
  }
})

const turboPermission = toRef(props, 'turboPermissionInfo')

const badgeColor = (isGranted) => {
  return isGranted ? 'badge-success' : 'badge-neutral'
}

onMounted(() => {
  showUserPermission()
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
        {{ responseData }} <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else>
  <div class="avatar-info flex">
    <div class="avatar">
      <div class="w-24 rounded">
        <img v-if="turboPermissionInfo.avatar === ''" alt="" class="user-image" src="/img/avatar.jpg">
        <img v-else alt="" class="user-image" :src="`data:image/png;base64,${turboPermissionInfo.avatar}`">
      </div>
    </div>
    <div class="flex flex-col ml-4 truncate">
      <div class="font-bold text-2xl truncate">{{ turboPermissionInfo.turboName }}</div>
      <div class="status">
        <TurboPermissionBadge :turbo-permission="turboPermissionInfo.permission" />
        <TurboWarningBadge :times="turboPermissionInfo.warningTimes"/>
      </div>
    </div>
  </div>
  <div class="mt-4"/>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
    <!-- head -->
    <thead>
    <tr>
      <th>{{ $t('turboPermission.showTurboPermission.permissions') }}</th>
      <th>
        <TurboPermissionBadge :turbo-permission="turboPermissionInfo.permission" />
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="permission in responseData">
      <td>{{ permission.permissionDescription }}</td>
      <td>
        <div class="badge" :class="badgeColor(permission.isGranted)">{{ permission.isGranted ? $t('turboPermission.showTurboPermission.granted') : $t('turboPermission.showTurboPermission.notGranted') }}</div>
      </td>
    </tr>
    </tbody>
  </table>
  </div>
  </div>
</template>

<style scoped>
.status {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.avatar-info {
  max-width: 100%;
}

.text {
  max-width: 100%;
}
</style>

<script setup>
import AvatarUpload from "@/components/changeAvatar/AvatarUpload.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {openDialogModal} from "@/assets/js/DialogManager.js";
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
    responseData.value = '验证失败，请重新登录。'
  })
}

const resetAvatar = async () => {
  isResetBtnLoading.value = true
  const payload = {}
  await sendPostRequest('/web/resetAvatar', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('重置成功')
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
        <i class="fa-regular fa-circle-xmark"></i> 加载失败
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">返回主页</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>加速盒子功能</li>
        <li>更改头像</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" v-if="responseData === 'USER'" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">注意</h3>
        <div class="text-xs">您的权限不足，暂无法使用此功能。</div>
      </div>
    </div>
    <div class="mt-2"/>
    <div class="hero hero-content text-center">
      <div>
        <h1 class="text-5xl max-sm:text-4xl font-bold">更改头像</h1>
        <div class="mt-10"/>
        <div class="flex">
          <button class="btn max-sm:btn-sm btn-active btn-primary flex-1 mr-2" @click="openDialogModal('avatarUpload')" :disabled="responseData === 'USER'">
            上传头像
          </button>
          <button @click="resetAvatar" class="btn max-sm:btn-sm btn-active btn-error flex-1 ml-2" :disabled="isResetBtnLoading">
            <span v-if="isResetBtnLoading" class="loading loading-spinner"/>使用舞萌头像
          </button>
        </div>
        <div class="mb-4"></div>
        <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
          请在使用权限之前慎重考虑。您的一切操作都将被记录，您后续行为所引发的所有后果以及舆论影响将由您负责。TurboServlet 有权根据
          <router-link class="text-primary" target="_blank" to="/tos">使用条款</router-link> 对您采取措施。
        </div>
      </div>
    </div>
  </div>
    <AvatarUpload/>
</template>

<style scoped>

</style>
<script setup>
import UserQrCommand from "@/layouts/qrCommand/UserQrCommand.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import ArcadeQrCommand from "@/layouts/qrCommand/ArcadeQrCommand.vue";
import QrCommandDialog from "@/layouts/qrCommand/QrCommandDialog.vue";
import {openDialogModal} from "@/assets/js/DialogManager.js";

const isLoading = ref(true);
const isSuccess = ref(false)
const isShowArcadeSetting = ref(false)
const responseData = ref()

const showQrCommandList = async () => {
  await sendGetRequest('/web/showQrCommandList', true).then((response) => {
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

const showUserPermission = async () => {
  await sendGetRequest('/permission/showPermission', true).then((response) => {
    if (response.statusCode === 200) {
      if (response.data === 'ADMIN' || response.data === 'BUILDER') {
        isShowArcadeSetting.value = true
      }
    }
  })
}

onMounted(() => {
  showQrCommandList()
  showUserPermission()
})

const dialogQrCommandVal = ref('')

const showDialog = (qrCommandVal) => {
  dialogQrCommandVal.value = qrCommandVal
  openDialogModal('qrCommandDialog')
}

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
        <li>指令二维码</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div class="tabs tabs-lifted" role="tablist">
      <input aria-label="用户二维码" checked="checked" class="tab" name="my_tabs_2" role="tab" type="radio"/>
      <div class="tab-content bg-base-100 border-base-300 rounded-box p-6" role="tabpanel">
        <UserQrCommand @qr-command-val="showDialog"/>
      </div>

      <input
          aria-label="机台二维码"
          class="tab"
          name="my_tabs_2"
          role="tab"
          type="radio"
          :disabled="!isShowArcadeSetting"
      />
      <div class="tab-content bg-base-100 border-base-300 rounded-box p-6" role="tabpanel">
        <ArcadeQrCommand :commands="responseData.filter((command) => command.functionType === 'SETTING')" @qr-command-val="showDialog" />
      </div>
    </div>
    <QrCommandDialog :qr-command-val="dialogQrCommandVal"/>
  </div>
</template>

<style scoped>
.tabs {
  flex-direction: row !important;
}

.tab {
  writing-mode: horizontal-tb !important;
  text-align: center !important;
  white-space: nowrap !important; /* 确保文字不换行 */
}
</style>
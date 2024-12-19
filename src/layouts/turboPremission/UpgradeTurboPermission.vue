<script setup>

import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import UpgradeDialog from "@/layouts/turboPremission/UpgradeDialog.vue";
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

import {useReCaptcha} from "vue-recaptcha-v3";
import {openDialogModal} from "@/assets/js/DialogManager.js";

const {executeRecaptcha} = useReCaptcha()

const turboName = ref('')
const selectedPermission = ref('AUTHORIZER')
const isBtnLoading = ref(false)

const props = defineProps({
  turboPermission: {
    type: String,
    required: true
  }
})

const turboPermission = toRef(props, 'turboPermission')

const upgradeTurboPermission = async () => {
  isBtnLoading.value = true
  const token = await executeRecaptcha('upgradePermission')
  const payload = {
    "turboName": turboName.value,
    "permission": selectedPermission.value,
    "captchaToken": token,
  }
  await sendPostRequest('/permission/upgradePermission', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('授权成功')
      isBtnLoading.value = false
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

</script>

<template>
  <div class="ml-4 mr-4 flex flex-col">
    <form @submit.prevent="upgradeTurboPermission" class="flex flex-col" >
      <label class="input max-sm:input-sm input-bordered flex items-center gap-2">
        <i class="fa-solid fa-user"></i>
        <input
            type="text"
            class="grow"
            placeholder="Turbo用户名"
            v-model="turboName"
            autocomplete="current-username"
            required/>
      </label>
      <div class="mt-4"></div>
      <div class="form-control">
        <label class="label cursor-pointer">
        <span class="label-text">
        <TurboPermissionBadge turbo-permission="AUTHORIZER"/>
        </span>
          <input type="radio" name="radio-10" class="radio checked:bg-success" value="AUTHORIZER"
                 v-model="selectedPermission"/>
        </label>
      </div>
      <div class="form-control" v-if="turboPermission === 'ADMIN'">
        <label class="label cursor-pointer">
        <span class="label-text">
        <TurboPermissionBadge turbo-permission="BUILDER"/>
        </span>
          <input type="radio" name="radio-10" class="radio checked:bg-warning" value="BUILDER"
                 v-model="selectedPermission"/>
        </label>
      </div>
      <div class="mt-8"></div>
      <button class="btn max-sm:btn-sm w-2/3 mx-auto" :disabled="isBtnLoading">
        <span v-if="isBtnLoading" class="loading loading-spinner"></span>
        授权
      </button>
    </form>
    <div class="mt-2"></div>
    <button class="btn max-sm:btn-sm w-2/3 mx-auto" @click="openDialogModal('upgradeDialog')">
      <i class="fa-solid fa-clock-rotate-left"></i> 历史授权管理
    </button>
    <div class="mt-6"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      请在授予授权之前慎重考虑。您的一切操作都将被记录，该用户后续行为所引发的所有后果以及舆论影响将由您负责。我们有权根据
      <router-link class="text-primary" target="_blank" to="/tos">使用条款</router-link> 对您以及该用户的账号采取措施。
    </div>
  </div>
  <UpgradeDialog/>
</template>

<style scoped>

</style>
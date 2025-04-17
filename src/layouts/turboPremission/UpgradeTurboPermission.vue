<script setup>

import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import UpgradeDialog from "@/layouts/turboPremission/UpgradeDialog.vue";
import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {executeRecaptcha} from "@/assets/js/CaptchaSolver.js";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
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
  const {token, a} = await executeRecaptcha('upgradePermission')
  const payload = {
    "turboName": turboName.value,
    "permission": selectedPermission.value,
    "captchaToken": token,
    "a": a,
  }
  await sendPostRequest('/permission/upgradePermission', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('turboPermission.upgradeTurboPermission.toast.success'));
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
            :placeholder="$t('turboPermission.upgradeTurboPermission.turboName')"
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
        {{ $t('turboPermission.upgradeTurboPermission.upgrade') }}
      </button>
    </form>
    <div class="mt-2"></div>
    <button class="btn max-sm:btn-sm w-2/3 mx-auto" @click="openDialogModal('upgradeDialog')">
      <i class="fa-solid fa-clock-rotate-left"></i> {{ $t('turboPermission.upgradeTurboPermission.upgradeLog') }}
    </button>
    <div class="mt-6"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      {{ $t('turboPermission.upgradeTurboPermission.upgradeNotice.1') }}
      <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link>
      {{ $t('turboPermission.upgradeTurboPermission.upgradeNotice.2') }}
    </div>
  </div>
  <UpgradeDialog/>
</template>

<style scoped>

</style>
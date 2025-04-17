<script setup>
import {onMounted, ref} from "vue";
import Login from "@/views/index/Login.vue";
import {clearToken, sendGetRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {openDialogModal} from "@/assets/js/DialogManager.js";
const isLogin = ref(false)

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onMounted(() => {
  if (localStorage.getItem('token')) {
    verify()
  }
})

const verify = async () => {
  await sendGetRequest('/web/mainLayouts', true).then((response) => {
    if (response.statusCode === 200) {
      isLogin.value = true
    } else {
      clearToken();
    }
  }).catch(() => {
    clearToken();
  })
}

const logout = () => {
  clearToken();
  toast.success(t('indexButton.jsLogout'));
  isLogin.value = false
}

</script>

<template>
  <div class="button" v-if="isLogin">
    <div class="btn-body">
      <router-link to="/panel" class="block-btn btn">{{ $t('indexButton.member') }}</router-link>
      <button @click="logout" class="btn btn-circle ml-5" style="height: 62px; width: 62px">
        <i class="fa-solid fa-right-from-bracket" style="font-size: 17px"></i>
      </button>
    </div>
  </div>
  <div class="button" v-else>
    <div @click="openDialogModal('login')" class="btn-body btn">{{ $t('indexButton.guest') }}</div>
  </div>
</template>

<style scoped>

.header .header-all .button {
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.header .header-all .button .btn-body {
  width: 245px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.block-btn {
  flex: 1;
  display: flex;
  height: 70px;
}

@media (max-width: 780px) and (orientation: portrait) {
  .header .header-all .container .button {
    margin-top: 0;
  }
}

@media (orientation: landscape) and (max-height: 460px) {
  .header .header-all .container .button {
    margin-top: 0;
  }
}

</style>
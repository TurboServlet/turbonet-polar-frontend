<script setup>

import Header from "@/layouts/Header.vue";
import Menu from "@/layouts/Menu.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";

const turboName = ref('')

const isLoading = ref(true);
const isSuccess = ref(false)

const message = ref('')

const verify = async () => {
  await sendGetRequest('/web/mainLayouts', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      turboName.value = response.data.turboName
    } else {
      isLoading.value = false
      isSuccess.value = false
      message.value = response.data
    }
  }).catch(() => {
    isLoading.value = false
    isSuccess.value = false
    message.value = '验证失败，请重新登录。'
  })
}

onMounted(() => {
  verify()
})

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="body flex align-middle">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-else>
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.validateError') }}
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ message }} <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>

  <div v-if="isSuccess">
    <Header/>
  </div>
  <div v-if="isSuccess" class="body-container">
    <div class="menu-container">
      <Menu :turbo-name="turboName"/>
    </div>
    <div class="main-container bg-base-100 rounded-box">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>

.body-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 64px);
  width: 100%;
}

.main-container {
  flex: 1;
  height: calc(100vh - 64px - 35px);
  padding: 10px 20px 10px 20px;
  scrollbar-width: none;
  overflow: auto;
}

.menu-container {
  z-index: 999;
}

@media (min-width: 1000px) {
  .body-container {
    width: 1000px;
    margin-left: calc((100% - 1000px) / 2);
  }
}

@media (max-width: 1000px) and (min-width: 640px) {
  .menu-container {
    margin-left: 10px;
  }
  .main-container {
    margin-right: 10px;
  }
}

@media (min-width: 640px) {
  .main-container {
    margin-left: 10px;
  }
}

@media (max-width: 640px) {
  .main-container {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  font-size: 14px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}

</style>
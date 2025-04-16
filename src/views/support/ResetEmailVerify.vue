<script setup>

import {ref, watchEffect} from "vue";
import ThemeChanger from "@/components/themeChanger.vue";
import {useRoute} from "vue-router";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

const isLoading = ref(true);
const isSuccess = ref(false)

const message = ref('')

const route = useRoute();

watchEffect(async () => {
  try {
    const token = route.query.token;

    if (token) {
      const payload = {
        "resetToken": token,
      };
      await sendPostRequest('/support/resetEmailVerify', payload, false).then((response) => {
        if (response.statusCode === 200) {
          isLoading.value = false
          isSuccess.value = true
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          isLoading.value = false
          message.value = response.data
        }
      })
    } else {
      isLoading.value = false
      message.value = '请求体不全，请补全后重试。';
    }
  } catch (e) {
    isLoading.value = false
    message.value = '请求体不全，请补全后重试。';
  }
});

</script>

<template>
  <themeChanger/>
  <div class="body flex align-middle">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-else>
      <h1 class="font-bold text-3xl"  v-if="isSuccess">
        <i class="fa-regular fa-circle-check"></i> 验证成功
      </h1>
      <h1 class="font-bold text-3xl" v-else>
        <i class="fa-regular fa-circle-xmark"></i> 验证失败
      </h1>
      <div class="mt-3"></div>
      <p v-if="isSuccess">
        已更改邮箱完成，将在三秒后返回至主页。 <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
      <p v-else>
        {{ message }} <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
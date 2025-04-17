<script setup>

import {ref, watchEffect} from "vue";
import HeadModule from "@/components/headModule.vue";
import {useRoute} from "vue-router";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
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
      message.value = t('error.bodyError');
    }
  } catch (e) {
    isLoading.value = false
    message.value = t('error.bodyError');
  }
});

</script>

<template>
  <HeadModule/>
  <div class="body flex align-middle">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-else>
      <h1 class="font-bold text-3xl"  v-if="isSuccess">
        <i class="fa-regular fa-circle-check"></i> {{ $t('supportSession.resetEmail.verify.succeed') }}
      </h1>
      <h1 class="font-bold text-3xl" v-else>
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('supportSession.resetEmail.verify.failed') }}
      </h1>
      <div class="mt-3"></div>
      <p v-if="isSuccess">
        {{ $t('supportSession.resetEmail.verify.notice') }} <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
      <p v-else>
        {{ message }} <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {ref, defineProps, toRef, onMounted} from 'vue';
import {sendGetRequest} from "@/assets/js/RequestHandler.js";

const isLoading = ref(true);
const isSuccess = ref(false)

const responseData = ref()

const props = defineProps({
  photoId: {
    type: Number,
    required: true
  }
})

const photoId = toRef(props, 'photoId')

const getImage = async () => {
  await sendGetRequest('/data/photos?id=' + photoId.value, true).then((response) => {
    if (response.statusCode === 200) {
      responseData.value = response.data
      isLoading.value = false;
      isSuccess.value = true;
    } else {
      isLoading.value = false
      isSuccess.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    return '验证失败，请重新登录。'
  })
}

onMounted(() => {
  getImage()
})

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="loading loading-spinner size-8 mt-20 mb-20"/>
    <div class="mt-10 mb-10" v-if="!isLoading && !isSuccess">
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
    <img :src="`data:image/png;base64,${responseData}`" alt="photo"/>
  </div>
</template>

<style scoped>
</style>
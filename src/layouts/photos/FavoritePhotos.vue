<script setup>

import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, ref} from "vue";
import PhotoHandler from "@/components/PhotoHandler.vue";
import {toast} from "vue-sonner";

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()
const page = ref(1)

const loadingFavorites = ref({})

const getFavoritePhotos = async () => {
  await sendGetRequest('/web/favoritePhotos?page=' + page.value, true).then((response) => {
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

const nextPage = () => {
  if (page.value === responseData.value.totalPages) {
    toast.warning('已经是最后一页了哦')
    return
  }
  page.value += 1
  getFavoritePhotos()
}

const previousPage = () => {
  if (page.value === 1) {
    toast.warning('已经是第一页了哦')
    return
  }
  page.value -= 1
  getFavoritePhotos()
}

const removeFavorite = async (photoId) => {
  loadingFavorites.value[photoId] = true

  const payload = {
    photoId: photoId
  }
  await sendPostRequest('/web/removeFavorite', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('取消收藏成功')
      getFavoritePhotos()
    } else {
      toast.error(response.data)
    }
  }).finally(() => {
    loadingFavorites.value[photoId] = false
  })
}

onMounted(() => {
  getFavoritePhotos()
})

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="mt-10 loading loading-spinner size-8"/>
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
    <div class="main-container-center" v-if="responseData.content.length === 0">
      <div class="mt-10"></div>
      <p>
        你还没有任何收藏的相片呢
      </p>
    </div>
    <div v-if="responseData.totalPages > 1" class="flex mb-2 justify-center">
      <div class="join">
        <button class="join-item btn" @click="previousPage">«</button>
        <button class="join-item btn">第 {{ page }} 页</button>
        <button class="join-item btn" @click="nextPage">»</button>
      </div>
    </div>
    <div v-for="photo in responseData.content" class="rounded-box bg-primary text-primary-content">
      <div class="relative flex flex-col">
        <PhotoHandler :photo-id="photo"/>
      </div>
      <div class="mb-4 flex justify-between">
        <div class="mt-1 mb-1 flex justify-between">
          <div class="ml-5 flex flex-col">
          <span class="font-bold">TurboNET Polar <i
              class="fa-solid fa-meteor"></i></span>
            <span class="text-xs">@2024 TurboServlet</span>
          </div>
        </div>
        <div class="flex items-center">
          <button @click="removeFavorite(photo)" class="mr-5 btn btn-sm btn-success" :disabled="loadingFavorites[photo]">
            <i v-if="loadingFavorites[photo]" class="loading loading-spinner"></i>
            <i v-else class="fa-solid fa-star"></i> 已收藏
          </button>
        </div>
      </div>
    </div>
    <div v-if="responseData.totalPages > 1" class="flex justify-center mt-4">
      <div class="join">
        <button class="join-item btn" @click="previousPage">«</button>
        <button class="join-item btn">第 {{ page }} 页</button>
        <button class="join-item btn" @click="nextPage">»</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
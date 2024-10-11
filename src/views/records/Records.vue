<script setup>
import RecordCard from "@/layouts/records/RecordCard.vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, ref} from "vue";
import {toast} from "vue-sonner";

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()

const recordIsLoading = ref(false)

const page = ref(1)

const records = async () => {
  recordIsLoading.value = true
  await sendGetRequest('/web/records?page=' + page.value, true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      recordIsLoading.value = false
      responseData.value = response.data
    } else {
      isLoading.value = false
      isSuccess.value = false
      recordIsLoading.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    isLoading.value = false
    isSuccess.value = false
    recordIsLoading.value = false
    responseData.value = '验证失败，请重新登录。'
  })
}

const nextPage = () => {
  if (page.value === responseData.value.totalPages) {
    toast.warning('已经是最后一页了哦')
    return
  }
  page.value += 1
  records()
}

const previousPage = () => {
  if (page.value === 1) {
    toast.warning('已经是第一页了哦')
    return
  }
  page.value -= 1
  records()
}

onMounted(() => {
  records()
})

</script>

<template>  <div v-if="isLoading || !isSuccess" class="main-container-center">
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
        <li>舞萌相关</li>
        <li>游戏记录</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div v-if="responseData.totalPages > 1" class="flex mb-2 justify-center">
      <div class="join">
        <button class="join-item btn" @click="previousPage">«</button>
        <button class="join-item btn">第 {{ page }} 页</button>
        <button class="join-item btn" @click="nextPage">»</button>
      </div>
    </div>
    <div v-if="recordIsLoading" class="body flex align-middle" style="height: calc(100vh - 64px)">
      <span class="loading loading-spinner size-8"/>
    </div>
    <div v-else class="outer">
      <div v-for="music in responseData.content" class="inner">
        <RecordCard :record="music" />
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
.outer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.inner {
  flex: 1 1 100%;
  margin-bottom: 15px;
}

</style>
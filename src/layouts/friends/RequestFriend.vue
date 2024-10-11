<script setup>

import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {ref} from "vue";
import {toast} from "vue-sonner";

const isBtnLoading = ref(false)
const turboName = ref('')

const addFriend = async () => {
  isBtnLoading.value = true
  const payload = {
    "turboName": turboName.value
  }
  await sendPostRequest('/web/addFriend', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('已发送申请')
      isBtnLoading.value = false
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

</script>

<template>
  <div class="flex flex-col">
    <form class="flex flex-col" @submit.prevent="addFriend">
      <label class="input max-sm:input-sm input-bordered flex items-center gap-2 mt-4 mb-1">
        <input v-model="turboName" type="text" class="grow" placeholder="TurboNET用户名" required/>
      </label>
      <button class="btn max-sm:btn-sm my-4" @click="addFriend" :disabled="isBtnLoading">
        <span v-if="isBtnLoading" class="loading loading-spinner"/>申请好友</button>
    </form>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      因安全原因不提供搜索用户的功能，当您点击申请好友即向对应用户发送请求。
    </div>
  </div>
</template>

<style scoped>

</style>
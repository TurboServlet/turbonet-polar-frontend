<script setup>

import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {ref} from "vue";
import {toast} from "vue-sonner";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const isBtnLoading = ref(false)
const turboName = ref('')

const addFriend = async () => {
  isBtnLoading.value = true
  const payload = {
    "turboName": turboName.value
  }
  await sendPostRequest('/web/addFriend', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('addFriends.requestFriend.toast.success'))
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
        <input v-model="turboName" type="text" class="grow" :placeholder="$t('addFriends.requestFriend.placeholder')" required/>
      </label>
      <button class="btn max-sm:btn-sm my-4" @click="addFriend" :disabled="isBtnLoading">
        <span v-if="isBtnLoading" class="loading loading-spinner"/>{{ $t('addFriends.requestFriend.requestButton') }}</button>
    </form>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      {{ $t('addFriends.requestFriend.notice') }}
    </div>
  </div>
</template>

<style scoped>

</style>
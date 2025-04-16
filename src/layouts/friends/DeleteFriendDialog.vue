<script setup>

import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps({
  friend: {
    type: Object,
    required: true
  }
})

const friend = toRef(props, 'friend')
const isDeleteBtnLoading = ref(false)

const deleteFriend = async () => {
  isDeleteBtnLoading.value = true
  const payload = {
    "turboName": friend.value,
  }
  await sendPostRequest('/web/removeFriend', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('friends.removeFriendDialog.toast.success'))
      isDeleteBtnLoading.value = false
      location.reload()
    } else {
      toast.error(response.data)
      isDeleteBtnLoading.value = false
    }
  })
}

</script>

<template>
  <dialog id="deleteDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('deleteDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('friends.friendCard.removeFriend') }}</h3>
      <p class="pt-4">{{ $t('friends.removeFriendDialog.content', { friend: friend }) }}</p>
      <p class="text-warning pb-4">{{ $t('friends.removeFriendDialog.notice') }}</p>
      <div class="flex justify-end gap-2">
        <button class="btn btn-error" @click="deleteFriend" :disabled="isDeleteBtnLoading">
          <span v-if="isDeleteBtnLoading" class="loading loading-spinner"></span>{{ $t('friends.removeFriendDialog.submit') }}</button>
        <form method="dialog">
          <button @click="closeDialogModal('deleteDialog')" class="btn btn-neutral">{{ $t('friends.removeFriendDialog.cancel') }}</button>
        </form>
      </div>
    </div>
    <div @click="closeDialogModal('deleteDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
<script setup>

import {ref, toRef} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {closeDialogModal} from "@/assets/js/DialogManager.js";

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
      toast.success('删除好友成功')
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
      <h3 class="text-lg font-bold">确认删除</h3>
      <p class="pt-4">你确定要删除 {{ friend }} 的好友吗？</p>
      <p class="text-warning pb-4">在好友关系中，若任一方删除了对方，该好友在双方的视角中均将消失。</p>
      <div class="flex justify-end gap-2">
        <button class="btn btn-error" @click="deleteFriend" :disabled="isDeleteBtnLoading">
          <span v-if="isDeleteBtnLoading" class="loading loading-spinner"></span>确认删除</button>
        <form method="dialog">
          <button class="btn btn-neutral">取消删除</button>
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
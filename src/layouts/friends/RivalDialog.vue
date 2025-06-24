<script setup>

import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

</script>

<template>
  <dialog id="rivalDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('rivalDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('friends.friendCard.rival') }}</h3>
      <p class="pt-4">{{ $t('friends.rivalDialog.content') }}</p>
      <img src="https://r2.sys-allnet.com/rival.png" alt="rival" class="w-3/4 mx-auto mt-4 mb-4">
    </div>
    <div @click="closeDialogModal('rivalDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
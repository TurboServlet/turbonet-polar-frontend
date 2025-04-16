<script setup>
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import {ref, toRef, watch} from "vue";
import {ArcadeTypeEnumToString} from "../../assets/js/ArcadeUtils.js";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

const props = defineProps({
  arcadeAliasDialog: {
    type: Object,
    required: true
  }
})

const arcadeAliasDialog = toRef(props, 'arcadeAliasDialog')

const newAlias = ref('')
const aliasLength = ref(0)

watch(newAlias, (value) => {
  aliasLength.value = value.length
})

const isBtnLoading = ref(false)

const addArcadeAlias = async () => {
  isBtnLoading.value = true
  const payload = {
    "arcadeName": arcadeAliasDialog.value.arcadeName,
    "arcadeAlias": newAlias.value
  }
  await sendPostRequest('/web/addArcadeAlias', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('添加简称成功')
      isBtnLoading.value = false
      location.reload()
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

const closeDialog = () => {
  newAlias.value = ''
  closeDialogModal('arcadeAliasDialog')
}

</script>

<template>
  <dialog id="arcadeAliasDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialog" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('arcadeAlias.dialog.title') }}</h3>
      <div role="alert" class="mt-4 alert shadow-lg alert-warning">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>
          <h3 class="font-bold">{{ $t('arcadeAlias.dialog.notice.title') }}</h3>
          <div class="text-xs">{{ $t('arcadeAlias.dialog.notice.content') }}</div>
        </div>
      </div>
      <div class="flex-wrap mt-4 mb-2 gap-1.5 flex items-center">
        <div class="badge badge-primary gap-2 font-bold"><i class="fa-solid fa-wifi"></i>{{ ArcadeTypeEnumToString(arcadeAliasDialog.arcadeType) }}</div>
        <div class="font-bold">{{ arcadeAliasDialog.arcadeName }}</div>
      </div>
      <div class="flex-wrap mb-4 gap-1.5 flex items-center">
        <div class="badge badge-outline gap-2 font-bold"><i class="fa-solid fa-comment"></i>{{ arcadeAliasDialog.arcadeAlias.length }}/5</div>
        <div class="gap-1.5 flex">
          <div v-for="alias in arcadeAliasDialog.arcadeAlias">{{ alias }}</div>
          <div v-if="arcadeAliasDialog.arcadeAlias.length === 0" class="opacity-60">{{ $t('arcadeAlias.noData') }}</div>
        </div>
      </div>
      <label class="input max-sm:input-sm input-bordered flex mt-4 mb-8 items-center gap-2">
        <input type="text" maxlength="6" v-model="newAlias" class="grow" :placeholder="$t('arcadeAlias.dialog.placeholder')" required/>
        <span>{{ aliasLength }}/6</span>
      </label>
      <div class="flex justify-end gap-2">
          <button @click="closeDialog" class="btn max-sm:btn-sm btn-neutral">{{ $t('arcadeAlias.dialog.cancel') }}</button>
          <button @click="addArcadeAlias" class="btn max-sm:btn-sm btn-primary">{{ $t('arcadeAlias.dialog.submit') }}</button>
      </div>
    </div>
    <div @click="closeDialog" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
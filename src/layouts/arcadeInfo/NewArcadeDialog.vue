<script setup>
import {closeDialogModal} from "@/assets/js/DialogManager.js";
import {ref, toRef, watch} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

const newAlias = ref('')

const isBtnLoading = ref(false)

const arcadeType = ref('TURBO')

const arcadeName = ref('')

const arcadeNums = ref(1)

const keychipIdList = ref([]);

watch(arcadeNums, (newCount) => {
  if (newCount > keychipIdList.value.length) {
    for (let i = keychipIdList.value.length; i < newCount; i++) {
      keychipIdList.value.push('');
    }
  } else if (newCount < keychipIdList.value.length) {
    keychipIdList.value.splice(newCount);
  }
});

const addArcadeAlias = async () => {
  isBtnLoading.value = true
  const payload = {
    "arcadeName": arcadeName.value,
    "arcadeType": arcadeType.value,
    "keychipIdList": keychipIdList.value,
  }
  await sendPostRequest('/web/addNewArcade', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('添加机厅成功')
      isBtnLoading.value = false
      location.reload()
    } else {
      toast.error(response.data)
      isBtnLoading.value = false
    }
  })
}

const closeDialog = () => {
  arcadeType.value = 'TURBO'
  arcadeName.value = ''
  arcadeNums.value = 1
  keychipIdList.value = []
  closeDialogModal('newArcadeDialog')
}

</script>

<template>
  <dialog id="newArcadeDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialog" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">机厅入库</h3>
      <div class="mt-5"></div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center flex-between">
          <div class="w-full">
            机厅类型
          </div>
          <select v-model="arcadeType" class="select select-bordered">
            <option value="TURBO">Turbo</option>
            <option value="SPECIAL_TYPE_ONE">2077</option>
          </select>
        </div>
        <div class="flex items-center flex-between">
          <div class="w-full">
            机台数量
          </div>
          <select v-model="arcadeNums" class="select select-bordered">
            <option v-for="num in 8" :value="num" :key="num">{{ num }}</option>
          </select>
        </div>
        <div class="flex items-center flex-between">
          <div class="w-full">
            机厅全称
          </div>
          <input type="text" v-model="arcadeName" placeholder="入库机厅全称" class="input input-bordered w-full" />
        </div>
        <div v-for="n in arcadeNums" v-if="arcadeType === 'TURBO'" :key="n" class="flex items-center flex-between">
          <div class="w-full">
            第{{ n }}台 KeyChipID (短)
          </div>
          <input type="text" v-model="keychipIdList[n - 1]" placeholder="A63E01E0000" class="input input-bordered w-full" />
        </div>
        <div v-else v-for="ne in arcadeNums" :key="ne" class="flex items-center flex-between">
          <div class="w-full">
            第{{ ne }}台 KeyChipID (长)
          </div>
          <input type="text" v-model="keychipIdList[ne - 1]" placeholder="A63E-01E00000000" class="input input-bordered w-full" />
        </div>
      </div>
      <div class="mt-5"></div>
      <div class="flex justify-end gap-2">
        <button @click="closeDialog" class="btn max-sm:btn-sm btn-neutral">取消</button>
        <button @click="addArcadeAlias" class="btn max-sm:btn-sm btn-primary" :disabled="isBtnLoading">
          <span v-if="isBtnLoading" class="loading loading-spinner"/>
          机厅入库</button>
      </div>
    </div>
    <div @click="closeDialog" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
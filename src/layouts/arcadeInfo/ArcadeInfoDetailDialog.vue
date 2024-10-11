<script setup>

import {closeDialogModal} from "@/assets/js/DialogManager.js";
import {ArcadeSettingEnumToString} from "@/assets/js/ArcadeUtils.js";
import {onMounted, ref, toRef, watch} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";

const props = defineProps({
  arcadeName: {
    type: String,
    required: true,
  }
})

const arcadeName = toRef(props, 'arcadeName')

const isLoading = ref(true)
const isSuccess = ref(false)
const responseData = ref()

onMounted(() => {
  watch(() => arcadeName.value, (newVal) => {
    isLoading.value = true
    isSuccess.value = false
    sendGetRequest('/web/arcadeInfoDetail?arcadeName=' + newVal, true).then((response) => {
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
  })
})

</script>

<template>
  <dialog id="arcadeInfoDetailDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                @click="closeDialogModal('arcadeInfoDetailDialog')">✕
        </button>
      </form>
      <h3 class="text-lg font-bold">机厅详细信息</h3>
      <div class="mt-4"/>
      <div v-if="isLoading || !isSuccess" class="main-container-center">
        <span v-if="isLoading" class="loading loading-spinner size-8"/>
        <div v-if="!isLoading && !isSuccess">
          <h1 class="font-bold text-3xl">
            <i class="fa-regular fa-circle-xmark"></i> 加载失败
          </h1>
          <div class="mt-3"></div>
          <p>
            {{ responseData }} <router-link class="text-primary" to="/">返回主页</router-link>
          </p>
        </div>
      </div>
      <div v-else>
        <div class="shadow bg-base-200 rounded-box">
          <div class="font-bold justify-center text-center py-3">机厅人数</div>
          <div class="stats bg-base-200 w-full">
            <div class="stat place-items-center">
              <div class="stat-title">30 分钟内</div>
              <div class="stat-value">{{ responseData.thirtyMinutesPlayer }}</div>
              <div class="stat-desc">共 {{ responseData.thirtyMinutesPlayCount }}pc</div>
            </div>

            <div class="stat place-items-center">
              <div class="stat-title">60 分钟内</div>
              <div class="stat-value">{{ responseData.oneHourPlayer }}</div>
              <div class="stat-desc">共 {{ responseData.oneHourPlayCount }}pc</div>
            </div>

            <div class="stat place-items-center">
              <div class="stat-title">120 分钟内</div>
              <div class="stat-value">{{ responseData.twoHoursPlayer }}</div>
              <div class="stat-desc">共 {{ responseData.twoHoursPlayCount }}pc</div>
            </div>
          </div>
        </div>
        <div class="mt-4"></div>
        <div v-if="responseData.playerList.length > 0" class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
            <tr>
              <th>游戏名</th>
              <th>下机时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="player in responseData.playerList">
              <td>
                <a v-if="player.turboName !== ''" :href="`/u/${player.turboName}`" class="flex flex-row items-center gap-2 group">
                                  <span
                                      class="text-[#ff7043] group-hover:link truncate max-w-[150px] lg:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">{{ player.maimaiName }}</span>
                </a>
                <span v-else
                      class="flex flex-row items-center gap-2 truncate max-w-[150px] lg:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">{{ player.maimaiName }}</span>
              </td>
              <td>{{ player.playdate }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="main-container-center p-4">
          <p>
            该机厅还没有人，快去霸机！
          </p>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" @click="closeDialogModal('arcadeInfoDetailDialog')">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

</style>
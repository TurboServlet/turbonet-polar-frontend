<script setup>

import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, ref} from "vue";
import {ticketIdToImg, ticketIdToName} from "@/assets/js/TicketUtils.js";

const isLoading = ref(true);
const isSuccess = ref(false)

const responseData = ref()

const currentTickets = async () => {
  await sendGetRequest('/web/currentTickets', true).then((response) => {
    if (response.statusCode === 200) {
      responseData.value = response.data
      isLoading.value = false;
      isSuccess.value = true;
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

onMounted(() => {
  currentTickets()
})

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
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
        <li>加速盒子功能</li>
        <li>功能票</li>
        <li>当前持有的功能票</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">注意</h3>
        <div class="text-xs">Turbo功能票优先级高于官方功能票，当Turbo功能票启用时不能使用官方功能票。</div>
      </div>
    </div>
    <div class="mt-4"/>
    <div class="indicator" style="width: unset; display: unset">
      <span class="indicator-item badge badge-warning"><i class="fa-solid fa-thumbtack"></i></span>
      <div class="rounded-box bg-primary text-primary-content">
        <div class="stat">
          <div class="mb-2 font-bold">Turbo功能票</div>
          <div class="flex align-middle">
            <img :src="ticketIdToImg(responseData.turboTicket.ticketId)" class="size-20">
            <div class="flex flex-col justify-center mx-8">
              <div class="font-bold">
                {{ ticketIdToName(responseData.turboTicket.ticketId) }}
              </div>

              <div class="text-green-500" v-if="responseData.turboTicket.isEnable">
                <i class="fa-solid fa-circle-check"></i> Turbo功能票已开启
              </div>
              <div class="text-red-500" v-else>
                <i class="fa-solid fa-circle-xmark"></i> Turbo功能票未开启
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-for="ticket in responseData.maimaiTickets" class="mt-4 rounded-box bg-primary text-primary-content">
      <div class="stat">
        <div class="mb-2 font-bold">官方功能票</div>
        <div class="flex align-middle">
          <img :src="ticketIdToImg(ticket.ticketId)" class="size-20">
          <div class="flex flex-col justify-center mx-8">
            <div>
              {{ ticketIdToName(ticket.ticketId) }} {{ ticket.stock }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
<script setup>

import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

const isLoading = ref(true);
const isSuccess = ref(false)

const responseData = ref()

const unbindBtnLoadingStates = ref({});

const getBindList = async () => {
  await sendGetRequest('/bot/bindList', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false
      isSuccess.value = true
      responseData.value = response.data
      responseData.value.forEach(bot => {
        unbindBtnLoadingStates.value[bot.botId] = false
      });
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

const unbind = async (botId) => {
  unbindBtnLoadingStates.value[botId] = true
  const payload = {
    "token": localStorage.getItem('token'),
    "botId": botId,
  }
  await sendPostRequest('/bot/unbind', payload, false).then((response) => {
    if (response.statusCode === 200) {
      toast.success('取消授权成功')
      unbindBtnLoadingStates.value[botId] = false
      isSuccess.value = false
      isLoading.value = true
      getBindList()
    } else {
      unbindBtnLoadingStates.value[botId] = false
      toast.error(response.data)
    }
  })
}

const botToken = ref('')

const botTokenIsLoading = ref(true)

const showBotToken = async () => {
  await sendGetRequest('/bot/showBotToken', true).then((response) => {
    if (response.statusCode === 200) {
      botTokenIsLoading.value = false
      botToken.value = response.data
    } else {
      botTokenIsLoading.value = false
      botToken.value = response.data
    }
  }).catch(() => {
    botTokenIsLoading.value = false
    botToken.value = '加载 BotToken 失败，请重新登录。'
  })
}

onMounted(() => {
  showBotToken()
  getBindList()
})

const copyToClipboard = () => {
  navigator.clipboard.writeText(botToken.value).then(() => {
    toast.success('已复制到剪贴板')
  })
}

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
        {{ responseData }} <router-link class="text-primary" to="/">返回主页</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>BOT管理</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div class="indicator" style="width: unset; display: unset">
      <span class="indicator-item badge badge-warning"><i class="fa-solid fa-thumbtack"></i></span>
      <div class="rounded-box bg-primary text-primary-content">
        <div class="stat">
          <div>BOT TOKEN</div>
          <div class="font-bold text-2xl" v-if="botTokenIsLoading"><i class="fa-solid fa-key"></i> 加载中 ...</div>
          <div class="font-bold text-2xl" v-else><i class="fa-solid fa-key"></i> {{ botToken }}</div>
          <div class="stat-actions">
            <button class="btn btn-sm btn-success" @click="copyToClipboard">复制到剪贴板</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2"/>
    <div v-if="responseData.length === 0" class="opacity-60 mt-10 main-container-center">
      你还没有授权任何BOT呢
    </div>
    <div v-else class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
        <tr>
          <th>BOT名称</th>
          <th>被调用次数及授权时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="bot in responseData">
          <td><i class="fa-solid fa-robot"></i> {{ bot.botName }}</td>
          <td>
            <div class="tooltip" :data-tip="`(ID: ${bot.botId}) 授权于: ${bot.bindDate}`">
              <div class="badge gap-1.5 font-bold badge-neutral">
                <i class="fa-solid fa-user-clock"></i>
                {{ bot.useCount }} 次
              </div>
            </div>
          </td>
          <td>
            <button @click="unbind(bot.botId)" class="btn btn-xs gap-1.5 btn-error" :disabled="unbindBtnLoadingStates[bot.botId]">
              <i v-if="unbindBtnLoadingStates[bot.botId]" class="loading loading-spinner size-4"></i>
              <i v-else class="fa-solid fa-user-slash"></i> 取消
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
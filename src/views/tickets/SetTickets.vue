<script setup>
import {ticketIdToFlatImg, ticketIdToImg, ticketIdToName} from "@/assets/js/TicketUtils.js";
import {onMounted, ref, watch} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";

const isLoading = ref(true);
const isSuccess = ref(false)
const responseData = ref()

const showPermission = async () => {
  await sendGetRequest('/permission/showPermission', true).then((response) => {
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
}

const isResetBtnLoading = ref(false)
const isSetBtnLoading = ref(false)

const resetTickets = async () => {
  isResetBtnLoading.value = true
  const payload = {}
  await sendPostRequest('/web/resetTickets', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('重置成功')
      isResetBtnLoading.value = false
    } else {
      toast.error(response.data)
      isResetBtnLoading.value = false
    }
  })
}

const setTickets = async () => {
  isSetBtnLoading.value = true
  const payload = {
    "ticketId": selectedTicketValue.value
  }
  await sendPostRequest('/web/setTickets', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('设置成功')
      isSetBtnLoading.value = false
    } else {
      toast.error(response.data)
      isSetBtnLoading.value = false
    }
  })
}

onMounted(() => {
  showPermission()
})

const selectedTicketType = ref('select')
const selectedTicketValue = ref(0)

const ticketTypeList = {
  options: [
    {
      value: 'paid',
      label: '付费类功能票',
    },
    {
      value: 'event',
      label: '活动类功能票',
    },
    {
      value: 'free',
      label: '免费类功能票',
    },
    {
      value: 'special',
      label: '特殊类功能票',
    }
  ],
}

const ticketPaidList = [
  {
    value: 2,
    label: '付费2倍票',
  },
  {
    value: 3,
    label: '付费3倍票',
  },
  {
    value: 4,
    label: '付费4倍票',
  },
  {
    value: 5,
    label: '付费5倍票',
  },
  {
    value: 6,
    label: '付费6倍票',
  }
]

const ticketEventList = [
  {
    value: 10005,
    label: '活动5倍票 (类型1)',
  },
  {
    value: 10105,
    label: '活动5倍票 (类型2)',
  },
  {
    value: 10205,
    label: '活动5倍票 (类型3)',
  }
]

const ticketFreeList = [
  {
    value: 11001,
    label: '免费1.5倍票',
  },
  {
    value: 11002,
    label: '免费2倍票',
  },
  {
    value: 11003,
    label: '免费3倍票',
  },
  {
    value: 11005,
    label: '免费5倍票',
  }
]

const ticketSpecialList = [
  {
    value: 30001,
    label: '特殊2倍票',
  }]

watch(selectedTicketType, (newValue) => {
  if (newValue !== 'select') {
    selectedTicketValue.value = 0
  }
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
        <li>设置功能票</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" v-if="responseData === 'USER'" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">注意</h3>
        <div class="text-xs">您的权限不足，暂无法使用此功能。</div>
      </div>
    </div>
    <div class="mt-2"/>
    <div class="hero hero-content text-center">
      <div>
        <h1 class="text-5xl max-sm:text-4xl font-bold">设置功能票</h1>
        <div class="mt-4"/>
        <div class="flex flex-col justify-center items-center">
          <select v-model="selectedTicketType" class="select mb-4 select-bordered w-full max-w-xs"
                  :disabled="responseData === 'USER'">
            <option disabled value="select">功能票类型</option>
            <option v-for="option in ticketTypeList.options" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'paid'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>请选择需要的付费功能票</option>
            <option v-for="option in ticketPaidList" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'free'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>请选择需要的免费功能票</option>
            <option v-for="option in ticketFreeList" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'special'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>请选择需要的特殊功能票</option>
            <option v-for="option in ticketSpecialList" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'event'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>请选择需要的活动功能票</option>
            <option v-for="option in ticketEventList" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
        <div class="rounded-box bg-base-100">
          <div class="stat">
            <div class="mb-2 font-bold">{{ ticketIdToName(selectedTicketValue) }}</div>
            <div class="flex flex-col items-center justify-center">
              <img :src="ticketIdToFlatImg(selectedTicketValue)" class="w-full max-w-[240px] max-sm:max-w-[200px] mb-2">
              <div class="flex flex-col justify-center mx-8 w-full border border-base-300 rounded-box my-2 p-1">
                锁定保持1枚
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4"></div>
        <div class="flex">
          <button class="btn max-sm:btn-sm btn-active btn-primary flex-1 mr-2" @click="setTickets"
                  :disabled="responseData === 'USER' || selectedTicketValue === 0 || isSetBtnLoading">
            <span v-if="isSetBtnLoading" class="loading loading-spinner"/>锁定功能票
          </button>
          <button @click="resetTickets" class="btn max-sm:btn-sm btn-active btn-error flex-1 ml-2" :disabled="isResetBtnLoading">
            <span v-if="isResetBtnLoading" class="loading loading-spinner"/>取消锁定
          </button>
        </div>
        <div class="mb-4"></div>
        <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
          请在使用权限之前慎重考虑。您的一切操作都将被记录，您后续行为所引发的所有后果以及舆论影响将由您负责。TurboServlet
          有权根据
          <router-link class="text-primary" target="_blank" to="/tos">使用条款</router-link> 对您采取措施。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
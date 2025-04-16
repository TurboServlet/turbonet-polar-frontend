<script setup>
import {ticketIdToFlatImg, ticketIdToImg, ticketIdToName} from "@/assets/js/TicketUtils.js";
import {onMounted, ref, watch} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";
const { t } = useI18n()

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
      label: t('setTickets.ticketTypeList.paid'),
    },
    {
      value: 'event',
      label: t('setTickets.ticketTypeList.event'),
    },
    {
      value: 'free',
      label: t('setTickets.ticketTypeList.free'),
    },
    {
      value: 'special',
      label: t('setTickets.ticketTypeList.special'),
    }
  ],
}

const ticketPaidList = [
  {
    value: 2,
    label: t('ticketUtils.ticketIdToName.2'),
  },
  {
    value: 3,
    label: t('ticketUtils.ticketIdToName.3'),
  },
  {
    value: 4,
    label: t('ticketUtils.ticketIdToName.4'),
  },
  {
    value: 5,
    label: t('ticketUtils.ticketIdToName.5'),
  },
  {
    value: 6,
    label: t('ticketUtils.ticketIdToName.6'),
  }
]

const ticketEventList = [
  {
    value: 10005,
    label: t('ticketUtils.ticketIdToName.10005'),
  },
  {
    value: 10105,
    label: t('ticketUtils.ticketIdToName.10105'),
  },
  {
    value: 10205,
    label: t('ticketUtils.ticketIdToName.10205'),
  }
]

const ticketFreeList = [
  {
    value: 11001,
    label: t('ticketUtils.ticketIdToName.11001'),
  },
  {
    value: 11002,
    label: t('ticketUtils.ticketIdToName.11002'),
  },
  {
    value: 11003,
    label: t('ticketUtils.ticketIdToName.11003'),
  },
  {
    value: 11005,
    label: t('ticketUtils.ticketIdToName.11005'),
  }
]

const ticketSpecialList = [
  {
    value: 30001,
    label: t('ticketUtils.ticketIdToName.30001')
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
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.loadingError') }}
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>{{ $t('menu.turbo.title') }}</li>
        <li>{{ $t('menu.tickets.title') }}</li>
        <li>{{ $t('menu.tickets.setTickets') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" v-if="responseData === 'USER'" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ $t('setTickets.noPermission.title') }}</h3>
        <div class="text-xs">{{ $t('setTickets.noPermission.content') }}</div>
      </div>
    </div>
    <div class="mt-2"/>
    <div class="hero hero-content text-center">
      <div>
        <h1 class="text-5xl max-sm:text-4xl font-bold">{{ $t('setTickets.title') }}</h1>
        <div class="mt-4"/>
        <div class="flex flex-col justify-center items-center">
          <select v-model="selectedTicketType" class="select mb-4 select-bordered w-full max-w-xs"
                  :disabled="responseData === 'USER'">
            <option disabled value="select">{{ $t('setTickets.ticketType.title') }}</option>
            <option v-for="option in ticketTypeList.options" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'paid'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>{{ $t('setTickets.ticketType.paid') }}</option>
            <option v-for="option in ticketPaidList" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'free'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>{{ $t('setTickets.ticketType.free') }}</option>
            <option v-for="option in ticketFreeList" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'special'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>{{ $t('setTickets.ticketType.special') }}</option>
            <option v-for="option in ticketSpecialList" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="selectedTicketType === 'event'" v-model="selectedTicketValue"
                  class="select mb-4 select-bordered w-full max-w-xs">
            <option disabled :value=0>{{ $t('setTickets.ticketType.event') }}</option>
            <option v-for="option in ticketEventList" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
        <div class="rounded-box bg-base-100">
          <div class="stat">
            <div class="mb-2 font-bold">{{ ticketIdToName(selectedTicketValue) }}</div>
            <div class="flex flex-col items-center justify-center">
              <img :src="ticketIdToFlatImg(selectedTicketValue)" class="w-full max-w-[240px] max-sm:max-w-[200px] mb-2">
              <div class="flex flex-col justify-center mx-8 w-full border border-base-300 rounded-box my-2 p-1">
                {{ $t('setTickets.lock') }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4"></div>
        <div class="flex">
          <button class="btn max-sm:btn-sm btn-active btn-primary flex-1 mr-2" @click="setTickets"
                  :disabled="responseData === 'USER' || selectedTicketValue === 0 || isSetBtnLoading">
            <span v-if="isSetBtnLoading" class="loading loading-spinner"/>{{ $t('setTickets.button.submit') }}
          </button>
          <button @click="resetTickets" class="btn max-sm:btn-sm btn-active btn-error flex-1 ml-2" :disabled="isResetBtnLoading">
            <span v-if="isResetBtnLoading" class="loading loading-spinner"/>{{ $t('setTickets.button.toDefault') }}
          </button>
        </div>
        <div class="mb-4"></div>
        <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
          {{ $t('setTickets.setNotice.1') }}
          <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link> {{ $t('setTickets.setNotice.2') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
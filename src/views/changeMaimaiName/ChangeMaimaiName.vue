<script setup>

import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const username = ref('')

const addSymbol = (symbol) => {
  if (username.value.length >= 32) {
    return;
  }
  username.value += symbol
}

const isFullWidthEnabled = ref(false);
let lastUsernameLength = 0

const isLoading = ref(true)
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
    responseData.value = t('error.jsError')
  })
}

const handleInputChange = () => {
  if (isFullWidthEnabled.value) {
    const newInput = username.value.slice(lastUsernameLength);
    const fullWidthNewInput = newInput.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 33 && code <= 126) {
        return String.fromCharCode(code + 0xFEE0);
      }
      if (code === 32) {
        return '　';
      }
      return char;
    }).join('');
    username.value = username.value.slice(0, lastUsernameLength) + fullWidthNewInput;
  }
  lastUsernameLength = username.value.length;
};

const isSetBtnLoading = ref(false)
const isResetBtnLoading = ref(false)

const setMaimaiName = async () => {
  isSetBtnLoading.value = true
  const payload = {
    "maimaiName": username.value,
  }
  await sendPostRequest('/web/setMaimaiName', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('changeMaimaiName.toast.setSuccess'))
      isSetBtnLoading.value = false
    } else {
      toast.error(response.data)
      isSetBtnLoading.value = false
    }
  })
}

const resetMaimaiName = async () => {
  isResetBtnLoading.value = true
  const payload = {}
  await sendPostRequest('/web/resetMaimaiName', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success(t('changeMaimaiName.toast.resetSuccess'))
      isResetBtnLoading.value = false
    } else {
      toast.error(response.data)
      isResetBtnLoading.value = false
    }
  })
}

onMounted(() => {
  showPermission()
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
        <li>{{ $t('menu.turbo.changeMaimaiName') }}</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="alert" v-if="responseData === 'USER'" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ $t('changeMaimaiName.noPermission.title') }}</h3>
        <div class="text-xs">{{ $t('changeMaimaiName.noPermission.content') }}</div>
      </div>
    </div>
    <div class="mt-2"/>
    <div class="hero hero-content text-center">
      <div>
        <h1 class="text-5xl max-sm:text-4xl font-bold">{{ $t('changeMaimaiName.title') }}</h1>
        <label class="input max-sm:input-sm input-bordered flex items-center gap-2 mt-4 mb-1">
          <input v-model="username" @input="handleInputChange" maxlength="32" type="text" class="grow" :placeholder="$t('changeMaimaiName.placeholder')" :disabled="responseData === 'USER'" />
          {{ username.length }}/32
        </label>
        <div class="form-control items-end">
          <label class="label cursor-pointer">
            <span class="label-text">{{ $t('changeMaimaiName.notice') }}</span>
            <input type="checkbox" v-model="isFullWidthEnabled" checked="checked" class="ml-1.5 checkbox checkbox-primary" :disabled="responseData === 'USER'" />
          </label>
        </div>
        <p class="py-4 font-bold text-center">
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('・')">・</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('：')">：</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('；')">；</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('？')">？</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('！')">！</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('～')">～</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('／')">／</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＋')">＋</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('－')">－</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('×')">×</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('÷')">÷</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＝')">＝</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('♂')">♂</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('♀')">♀</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('∀')">∀</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＃')">＃</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＆')">＆</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＊')">＊</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＠')">＠</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('☆')">☆</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('○')">○</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('◎')">◎</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('◇')">◇</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('□')">□</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('△')">△</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('▽')">▽</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('♪')">♪</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('†')">†</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('‡')">‡</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('Σ')">Σ</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('α')">α</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('β')">β</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('γ')">γ</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('θ')">θ</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('φ')">φ</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('ψ')">ψ</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('ω')">ω</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('Д')">Д</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('ё')">ё</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('＄')">＄</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('（')">（</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('）')">）</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'"  @click="addSymbol('．')">．</button>
          <button type="button" class="btn btn-sm btn-square btn-outline m-0.5 max-sm:btn-xs" :disabled="responseData === 'USER'" @click="addSymbol('＿')">＿</button>
        </p>
        <div class="flex">
          <button type="submit" :disabled="isSetBtnLoading || responseData === 'USER'" @click="setMaimaiName" class="btn max-sm:btn-sm btn-active btn-primary flex-1 mr-2">
            <span v-if="isSetBtnLoading" class="loading loading-spinner"/>{{ $t('changeMaimaiName.button.submit') }}
          </button>
          <button type="submit" :disabled="isResetBtnLoading" @click="resetMaimaiName" class="btn max-sm:btn-sm btn-active btn-error flex-1 mr-2">
            <span v-if="isResetBtnLoading" class="loading loading-spinner"/>{{ $t('changeMaimaiName.button.toDefault') }}
          </button>
        </div>
        <div class="mb-4"></div>
        <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
          {{ $t('changeMaimaiName.changeNotice.1') }}
          <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link> {{ $t('changeMaimaiName.changeNotice.2') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
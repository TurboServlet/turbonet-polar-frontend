<script setup>

import {ArcadeFunctionTypeStringToEnum} from "../../assets/js/ArcadeUtils.js";

const emit = defineEmits(['QrCommandVal'])

const submit = (functionType, setting) => {
  emit('QrCommandVal', {functionType, setting})
}

</script>

<template>
  <div class="flex flex-col">
    <div class="flex mb-4 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col max-sm:gap-4">
      <div class="font-bold">{{ ArcadeFunctionTypeStringToEnum('KASTANJ_LOGIN') }}</div>
      <button @click="submit('KASTANJ_LOGIN', 'NONE')" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> {{ $t('qrCommand.generateQrCode') }}</button>
    </div>
    <div class="flex mb-4 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col max-sm:gap-4">
      <div class="font-bold">{{ ArcadeFunctionTypeStringToEnum('SPECIAL_TYPE_ONE_LOGIN') }}</div>
      <button @click="submit('SPECIAL_TYPE_ONE_LOGIN', 'NONE')" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> {{ $t('qrCommand.generateQrCode') }}</button>
    </div>
    <div class="mt-4"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      {{ $t('qrCommand.useNotice.1') }}
      <router-link class="text-primary" target="_blank" to="/tos">{{ $t('termsofservice.title') }}</router-link> {{ $t('qrCommand.useNotice.2') }}
    </div>
  </div>
</template>

<style scoped>

</style>
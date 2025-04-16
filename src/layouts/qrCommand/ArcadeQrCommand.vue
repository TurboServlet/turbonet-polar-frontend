<script setup>

import {toRef} from "vue";
import {ArcadeFunctionTypeStringToEnum, ArcadeSettingEnumToString} from "@/assets/js/ArcadeUtils.js";

const props = defineProps({
  commands: {
    type: Object,
    required: true
  },
})

const emit = defineEmits(['QrCommandVal'])

const submit = (functionType, setting) => {
  emit('QrCommandVal', {functionType, setting})
}

const commands = toRef(props, 'commands')

</script>

<template>
  <div class="flex flex-col">
    <div role="alert" class="alert shadow-lg alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <h3 class="font-bold">{{ $t('qrCommand.arcadeNotice.title') }}</h3>
        <div class="text-xs">{{ $t('qrCommand.arcadeNotice.content') }}</div>
      </div>
    </div>
    <div class="mt-4"></div>
    <div class="flex mb-4 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col max-sm:gap-4">
      <div class="font-bold">{{ ArcadeFunctionTypeStringToEnum('PING') }}</div>
      <button @click="submit('PING', 'NONE')" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> {{ $t('qrCommand.generateQrCode') }}</button>
    </div>
    <div v-for="command in commands" class="flex mb-4 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col max-sm:gap-4">
      <div class="font-bold">{{ ArcadeSettingEnumToString(command.setting) }}</div>
      <button @click="submit(command.functionType, command.setting)" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> {{ $t('qrCommand.generateQrCode') }}</button>
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
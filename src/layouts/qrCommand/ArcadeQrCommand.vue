<script setup>

import {toRef} from "vue";
import {ArcadeSettingEnumToString} from "@/assets/js/ArcadeUtils.js";

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
        <h3 class="font-bold">注意</h3>
        <div class="text-xs">该部分功能较为高危，您在机台上应用的设置将作用于全部玩家，请谨慎使用。</div>
      </div>
    </div>
    <div class="mt-4"></div>
    <div class="flex mb-2 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col">
      <div class="font-bold">PING 机台</div>
      <button @click="submit('PING', 'NONE')" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> 生成二维码</button>
    </div>
    <div v-for="command in commands" class="flex mb-2 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col">
      <div class="font-bold">{{ ArcadeSettingEnumToString(command.setting) }}</div>
      <button @click="submit(command.functionType, command.setting)" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> 生成二维码</button>
    </div>
    <div class="mt-4"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      请在使用权限之前慎重考虑。您的一切操作都将被记录，您的操作所引发的所有后果以及舆论影响将由您负责。TurboServlet 有权根据
      <a class="text-primary" target="_blank" href="/tos">使用条款</a> 对您采取措施。
    </div>
  </div>
</template>

<style scoped>

</style>
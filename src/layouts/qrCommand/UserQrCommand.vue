<script setup>

const emit = defineEmits(['QrCommandVal'])

const submit = (functionType, setting) => {
  emit('QrCommandVal', {functionType, setting})
}

</script>

<template>
  <div class="flex flex-col">
    <div class="flex mb-2 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col">
      <div class="font-bold">加速盒子机台登入</div>
      <button @click="submit('LOGIN', 'NONE')" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> 生成二维码</button>
    </div>
    <div class="flex mb-2 p-4 bg-base-200 rounded-box shadow items-center justify-between max-sm:flex-col">
      <div class="font-bold">加速盒子机台 Kastanj 服务登入</div>
      <button @click="submit('KASTANJ_LOGIN', 'NONE')" class="btn btn-sm btn-primary"><i class="fa-solid fa-qrcode"></i> 生成二维码</button>
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
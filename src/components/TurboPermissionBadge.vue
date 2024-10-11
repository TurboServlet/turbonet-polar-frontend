<script setup>
import {defineProps, toRef} from 'vue'

const props = defineProps({
  turboPermission: {
    type: String,
    required: true
  }
})

const turboPermission = toRef(props, 'turboPermission')

const badgeColor = () => {
  switch (turboPermission.value) {
    case 'ADMIN':
      return 'badge-error'
    case 'BUILDER':
      return 'badge-warning'
    case 'AUTHORIZER':
      return 'badge-success'
    case 'USER':
      return 'badge-primary'
    default:
      return 'badge-neutral'
  }
}

const badgeName = () => {
  switch (turboPermission.value) {
    case 'ADMIN':
      return '全权管理员'
    case 'BUILDER':
      return '技术实施员'
    case 'AUTHORIZER':
      return '许可用户'
    case 'USER':
      return '标准用户'
    default:
      return '未知'
  }
}

</script>

<template>
  <div class="badge gap-1.5 font-bold" :class="badgeColor()">
    <i class="fa-solid fa-user-gear"></i>
    {{ badgeName() }}
  </div>
</template>

<style scoped>

</style>
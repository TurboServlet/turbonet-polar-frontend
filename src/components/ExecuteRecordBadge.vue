<script setup>
import {defineProps, toRef} from 'vue'

const props = defineProps({
  executeType: {
    type: String,
    required: true
  }
})

const executeType = toRef(props, 'executeType')

const badgeColor = () => {
  switch (executeType.value) {
    case 'WARNING':
      return 'badge-warning'
    case 'BANNED':
      return 'badge-error'
    default:
      return 'badge-neutral'
  }
}

const badgeName = () => {
  switch (executeType.value) {
    case 'WARNING':
      return '警告一次'
    case 'BANNED':
      return '封禁'
    default:
      return '未知'
  }
}

</script>

<template>
  <div class="badge gap-1.5 font-bold" :class="badgeColor()">
    <i class="fa-solid fa-triangle-exclamation" v-if="executeType !== 'BANNED'"></i>
    <i class="fa-solid fa-user-slash" v-else></i>
    {{ badgeName() }}
  </div>
</template>

<style scoped>

</style>
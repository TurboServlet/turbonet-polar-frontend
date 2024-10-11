<script setup>
import {defineProps, toRef} from 'vue'

const props = defineProps({
  times: {
    type: Number,
    required: true
  }
})

const times = toRef(props, 'times')

const badgeName = () => {
  if (times.value === 0) {
    return '无警告记录'
  } else {
    return '被警告' + times.value + '次'
  }
}

const badgeColor = () => {
  switch (times.value) {
    case 0:
      return 'badge-success'
    default:
      return 'badge-warning'
  }
}

</script>

<template>
  <div class="badge gap-1.5 font-bold" :class="badgeColor()">
    <i class="fa-solid fa-circle-check" v-if="times === 0"></i>
    <i class="fa-solid fa-triangle-exclamation" v-else></i>
    {{ badgeName() }}
  </div>
</template>

<style scoped>

</style>
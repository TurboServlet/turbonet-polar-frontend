<script setup>
import {defineProps, toRef} from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  times: {
    type: Number,
    required: true
  }
})

const times = toRef(props, 'times')

const badgeName = () => {
  if (times.value === 0) {
    return t('turboWarningBadge.noWarning')
  } else {
    return t('turboWarningBadge.warned') + times.value + t('turboWarningBadge.times')
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
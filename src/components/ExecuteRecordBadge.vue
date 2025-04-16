<script setup>
import {defineProps, toRef} from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
      return t('executeRecordBadge.warning')
    case 'BANNED':
      return t('executeRecordBadge.ban')
    default:
      return t('executeRecordBadge.unknown')
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
<script setup>
import {defineProps, toRef} from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const status = toRef(props, 'status')

const badgeColor = () => {
  switch (status.value) {
    case 'ERROR':
      return 'badge-error'
    case 'OK':
      return 'badge-success'
    default:
      return 'badge-neutral'
  }
}

const badgeName = () => {
  switch (status.value) {
    case 'ERROR':
      return t('achievementUpload.badge.error')
    case 'OK':
      return t('achievementUpload.badge.ok')
    default:
      return t('achievementUpload.badge.unknown')
  }
}

</script>

<template>
  <div class="badge gap-1.5 font-bold" :class="badgeColor()">
    {{ badgeName() }}
  </div>
</template>

<style scoped>

</style>
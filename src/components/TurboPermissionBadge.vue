<script setup>
import {defineProps, toRef} from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
      return t('turboPermissionBadge.admin')
    case 'BUILDER':
      return t('turboPermissionBadge.builder')
    case 'AUTHORIZER':
      return t('turboPermissionBadge.authorizer')
    case 'USER':
      return t('turboPermissionBadge.user')
    default:
      return t('turboPermissionBadge.unknown')
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
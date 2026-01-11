<script setup>

import TurboWarningBadge from "@/components/TurboWarningBadge.vue";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {ref, toRef} from "vue";
import DeleteFriendDialog from "@/layouts/friends/DeleteFriendDialog.vue";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import RivalDialog from "@/layouts/friends/RivalDialog.vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  friends: {
    type: Object,
    required: true
  },
  rivals: {
    type: Object,
    required: true
  }
})

const friends = toRef(props, 'friends')
const rivals = toRef(props, 'rivals')

const selectedFriend = ref()
const deleteFriend = (friend) => {
  selectedFriend.value = friend
  openDialogModal('deleteDialog')
}

/* ---------- 状态锁，防止重复点击 ---------- */
const pending = ref(false)

/* ---------- 调用后端：添加 / 移除 ---------- */
const addRival = async (turboName) => {
  const payload = { turboName }
  const res = await sendPostRequest('/web/addRival', payload, true)
  if (res.statusCode === 200) {
    toast.success(t('friends.rivalDialog.success'))
    return true
  }
  toast.error(res.data)
  return false
}

const removeRival = async (turboName) => {
  const payload = { turboName }
  const res = await sendPostRequest('/web/removeRival', payload, true)
  if (res.statusCode === 200) {
    toast.success(t('friends.rivalDialog.remove'))
    return true
  }
  toast.error(res.data)
  return false
}

/* ---------- 勾选框切换 ---------- */
const toggleRival = async (name) => {
  if (pending.value) return               // 防抖
  pending.value = true

  const list = rivals.value.turboNameList
  const existed = list.includes(name)

  // ➜ 取消关注
  if (existed) {
    const ok = await removeRival(name)
    if (ok) {
      const idx = list.indexOf(name)
      if (idx !== -1) list.splice(idx, 1)
    }
  }
  // ➜ 新增关注
  else {
    if (list.length >= 3) {
      toast.error(t('friends.rivalDialog.limit'))   // 需要在 i18n 文件里加对应键
    } else {
      const ok = await addRival(name)
      if (ok) list.push(name)
    }
  }

  pending.value = false
}
</script>

<template>
  <div v-for="friend in friends" class="border-2 border-base-200 rounded-box mb-4 p-4 flex flex-col">
    <div class="avatar-info flex">
      <div class="avatar">
        <div class="w-24 h-24 rounded">
          <img v-if="friend.avatar === ''" alt="" class="user-image" src="/img/avatar.jpg">
          <img v-else alt="" class="user-image" :src="`data:image/png;base64,${friend.avatar}`">
        </div>
      </div>
      <div class="flex flex-col ml-4 truncate">
        <div class="font-bold text-2xl truncate">{{ friend.turboName }}</div>
        <div v-if="friend.lastPlayHour === '0'"
             class="flex text-success text-sm flex-wrap whitespace-normal break-all gap-1.5 items-center">
          {{ friend.lastPlayPlace }} ({{ $t('friends.friendCard.playing') }})
        </div>
        <div v-else class="flex text-success text-sm flex-wrap whitespace-normal break-all gap-1.5 items-center">
          {{ friend.lastPlayPlace }} ({{ $t('friends.friendCard.lastPlayTime', {hour: friend.lastPlayHour}) }})
        </div>
        <div class="status">
          <TurboPermissionBadge :turbo-permission="friend.permission"/>
          <TurboWarningBadge :times="friend.warningTimes"/>
        </div>
      </div>
    </div>
    <div class="divider mb-0"></div>
    <div class="flex mt-4">
      <div class="flex flex-wrap gap-2 flex-1" style="align-items: center">
        <input
            v-if="!pending"
            type="checkbox"
            class="checkbox checkbox-sm"
            :checked="rivals.turboNameList.includes(friend.turboName)"
            :disabled="rivals.turboNameList.length >= 3
                 && !rivals.turboNameList.includes(friend.turboName)"
            @change="toggleRival(friend.turboName)"
        />
        <span v-else class="loading loading-spinner size-4"/>
        <span class="text-sm">
    {{ $t('friends.friendCard.rival') }}
    <i @click="openDialogModal('rivalDialog')" class="fa-solid clickable fa-circle-info opacity-80"></i>
  </span>
      </div>
      <div class="flex flex-wrap gap-2 justify-end">
        <router-link :to="`/u/${friend.turboName}`" class="btn btn-primary btn-sm"><i class="fa-solid fa-user"></i>
          {{ $t('friends.friendCard.userPage') }}
        </router-link>
        <button @click="deleteFriend(friend.turboName)" class="btn btn-error btn-sm"><i
            class="fa-solid fa-user-slash"></i> {{ $t('friends.friendCard.removeFriend') }}
        </button>
      </div>
    </div>
  </div>
  <DeleteFriendDialog :friend="selectedFriend"/>
  <RivalDialog/>
</template>

<style scoped>
.status {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.avatar-info {
  max-width: 100%;
}

.clickable {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
</style>
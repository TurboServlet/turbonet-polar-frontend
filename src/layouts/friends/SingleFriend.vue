<script setup>

import TurboWarningBadge from "@/components/TurboWarningBadge.vue";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {ref, toRef} from "vue";
import DeleteFriendDialog from "@/layouts/friends/DeleteFriendDialog.vue";
import {openDialogModal} from "@/assets/js/DialogManager.js";

const props = defineProps({
  friends: {
    type: Object,
    required: true
  }
})

const friends = toRef(props, 'friends')

const selectedFriend = ref()
const deleteFriend = (friend) => {
  selectedFriend.value = friend
  openDialogModal('deleteDialog')
}

</script>

<template>
  <div v-for="friend in friends" class="bg-base-100 rounded-box mb-4 p-4 flex flex-col">
    <div class="avatar-info flex">
      <div class="avatar">
        <div class="w-24 h-24 rounded">
          <img v-if="friend.avatar === ''" alt="" class="user-image" src="/img/avatar.jpg">
          <img v-else alt="" class="user-image" :src="`data:image/png;base64,${friend.avatar}`">
        </div>
      </div>
      <div class="flex flex-col ml-4 truncate">
        <div class="font-bold text-2xl truncate">{{ friend.turboName }}</div>
        <div v-if="friend.lastPlayHour === '0'" class="flex text-success text-sm flex-wrap whitespace-normal break-all gap-1.5 items-center">
          {{ friend.lastPlayPlace }} (正在游玩)
        </div>
        <div v-else class="flex text-success text-sm flex-wrap whitespace-normal break-all gap-1.5 items-center">
          {{ friend.lastPlayPlace }} ({{ friend.lastPlayHour }}小时前)
        </div>
        <div class="status">
          <TurboPermissionBadge :turbo-permission="friend.permission" />
          <TurboWarningBadge :times="friend.warningTimes"/>
        </div>
      </div>
    </div>
    <div class="divider mb-0"></div>
    <div class="mt-4 flex flex-wrap gap-2 justify-end">
      <router-link :to="`/u/${friend.turboName}`" class="btn btn-primary btn-sm"><i class="fa-solid fa-user"></i> 用户主页</router-link>
      <button @click="deleteFriend(friend.turboName)" class="btn btn-error btn-sm"><i class="fa-solid fa-user-slash"></i> 删除好友</button>
    </div>
  </div>
  <DeleteFriendDialog :friend="selectedFriend"/>
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
</style>
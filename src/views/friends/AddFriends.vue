<script setup>

import RequestFriend from "@/layouts/friends/RequestFriend.vue";
import RequstFriendList from "@/layouts/friends/RequstFriendList.vue";

</script>

<template>
  <div>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>NET好友</li>
        <li>添加好友</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div role="tablist" class="tabs tabs-lifted">
      <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="添加好友" checked="checked"/>
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <RequestFriend/>
      </div>

      <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="申请列表"
      />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <RequstFriendList/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  flex-direction: row !important;
}

.tab {
  writing-mode: horizontal-tb !important;
  text-align: center !important;
  white-space: nowrap !important; /* 确保文字不换行 */
}

</style>
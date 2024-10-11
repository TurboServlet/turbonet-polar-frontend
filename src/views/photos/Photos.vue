<script setup>
import {ref} from 'vue';
import HistoryPhotos from "@/layouts/photos/HistoryPhotos.vue";
import FavoritePhotos from "@/layouts/photos/FavoritePhotos.vue";

const activeTab = ref(1);
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
      <li>舞萌相关</li>
      <li>相片</li>
    </ul>
  </div>
  <div class="mt-2"/>
  <div role="tablist" class="tabs tabs-boxed">
    <a role="tab" :class="activeTab === 1 ? 'tab tab-active' : 'tab'" @click="activeTab = 1">历史相片</a>
    <a role="tab" :class="activeTab === 2 ? 'tab tab-active' : 'tab'" @click="activeTab = 2">我的收藏</a>
  </div>
  <div class="mt-2">
    <HistoryPhotos v-if="activeTab === 1" />
    <FavoritePhotos v-if="activeTab === 2" />
  </div>
</template>

<style scoped>
</style>
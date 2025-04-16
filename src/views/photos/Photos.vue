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
      <li>{{ $t('menu.maimai.title') }}</li>
      <li>{{ $t('menu.maimai.photos') }}</li>
    </ul>
  </div>
  <div class="mt-2"/>
  <div role="tablist" class="tabs tabs-boxed">
    <a role="tab" :class="activeTab === 1 ? 'tab tab-active' : 'tab'" @click="activeTab = 1">{{ $t('photos.historyPhotos') }}</a>
    <a role="tab" :class="activeTab === 2 ? 'tab tab-active' : 'tab'" @click="activeTab = 2">{{ $t('photos.favoritePhotos') }}</a>
  </div>
  <div class="mt-2">
    <HistoryPhotos v-if="activeTab === 1" />
    <FavoritePhotos v-if="activeTab === 2" />
  </div>
</template>

<style scoped>
</style>
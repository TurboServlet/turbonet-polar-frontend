<template>
  <div id="app">
    <Toaster position="top-center" :closeButton="isHovered"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseLeave"
             rich-colors
             style="z-index: 9999"/>
    <RouterView/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Toaster, toast} from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const isHovered = ref(false);
function handleMouseEnter() {
  isHovered.value = true;
}
function handleMouseLeave() {
  isHovered.value = false;
}

onMounted(() => {
  const theme = localStorage.getItem("theme");
  const language = localStorage.getItem("language");
  const { locale } = useI18n()
  if (language) {
    locale.value = language;
  }
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
});
</script>

<style>
html, body, #app {
  font-family: ubuntu, system-ui;
  transition: background-color .5s;
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

html {
  scrollbar-gutter: auto !important;
}
</style>
<script setup>

import HeadModule from "@/components/headModule.vue";
import {defineProps, toRef} from "vue";

const props = defineProps({
  haveList: {
    type: Boolean,
    required: false,
    default: true
  }
})

const haveList = toRef(props, 'haveList')

</script>

<template>
  <div class="navbar">
    <div class="flex-none">
      <label v-if="haveList" for="my-drawer-2" class="btn btn-square btn-ghost drawer-button lg:hidden">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current">
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="hidden sm:flex flex-1">
      <a class="btn btn-ghost text-xl">TurboNET <span style="color: oklch(var(--p))">Polar <i
          class="fa-solid fa-meteor"></i></span></a>
    </div>
    <div class="flex-none gap-8">
      <HeadModule style="top: unset"/>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .lg\:hidden {
    display: none;
  }
}
</style>
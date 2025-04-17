<script setup>

import {ref} from "vue";
import MAIDHelpDialog from "@/layouts/register/MAIDHelpDialog.vue";
import Step1 from "@/layouts/register/Step1.vue";
import Step2 from "@/layouts/register/Step2.vue";
import Step3 from "@/layouts/register/Step3.vue";
import HeadModule from "@/components/headModule.vue";

const step = ref(1);
const registerToken = ref('');

const changeStep = (newStep) => {
  step.value = newStep;
}

</script>

<template>
  <HeadModule/>
  <Step1 v-if="step === 1" @change-step="changeStep" @register-token="token => registerToken = token" />
  <Step2 v-if="step === 2" @change-step="changeStep" :register-token="registerToken" />
  <Step3 v-if="step === 3" />
  <MAIDHelpDialog/>
</template>

<style scoped>
</style>
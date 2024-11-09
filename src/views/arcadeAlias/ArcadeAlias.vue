<script setup>
import {openDialogModal} from "@/assets/js/DialogManager.js";
import ArcadeAliasDialog from "@/layouts/arcadeAlias/ArcadeAliasDialog.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {ArcadeTypeEnumToString} from "../../assets/js/ArcadeUtils.js";

const isLoading = ref(true);
const isSuccess = ref(false);
const responseData = ref();
const arcadeAliasDialog = ref({
  arcadeAlias: '',
  arcadeName: '',
  arcadeType: ''
});

const showArcadeAlias = async () => {
  await sendGetRequest('/web/showArcadeAlias', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false;
      isSuccess.value = true;
      responseData.value = response.data;
    } else {
      isLoading.value = false;
      isSuccess.value = false;
      responseData.value = response.data;
    }
  }).catch(() => {
    isLoading.value = false;
    isSuccess.value = false;
    responseData.value = '验证失败，请重新登录。';
  });
};

const openDialog = (arcade) => {
  arcadeAliasDialog.value = arcade
  openDialogModal('arcadeAliasDialog');
}

onMounted(() => {
  showArcadeAlias();
});

</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> 加载失败
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">返回主页</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="breadcrumbs text-sm">
      <ul>
        <i class="fa-solid fa-link"></i>&nbsp;&nbsp;
        <li>机厅相关</li>
        <li>机厅简称</li>
      </ul>
    </div>
    <div class="mt-2"/>
    <div v-for="arcade in responseData.arcadeList" class="bg-base-100 p-8 rounded-box mb-4">
      <div class="flex-wrap gap-1.5 flex items-center">
        <div class="badge badge-primary gap-2 font-bold"><i class="fa-solid fa-wifi"></i>{{ ArcadeTypeEnumToString(arcade.arcadeType) }}</div>
        <div class="font-bold">{{ arcade.arcadeName }}</div>
      </div>
      <div class="mt-2"></div>
      <div class="flex-wrap gap-1.5 flex items-center">
        <div class="badge badge-outline gap-2 font-bold"><i class="fa-solid fa-comment"></i>{{ arcade.arcadeAlias.length }}/3</div>
        <div class="gap-1.5 flex">
          <div v-for="alias in arcade.arcadeAlias">{{ alias }}</div>
          <div v-if="arcade.arcadeAlias.length === 0" class="opacity-60">暂无简称</div>
          <button v-if="responseData.permission === 'BUILDER' || responseData.permission === 'ADMIN'" class="btn btn-xs btn-circle" @click="openDialog(arcade)"><i
              class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    </div>
    <div class="mt-6"></div>
    <div class="text-center text-xs opacity-60 w-5/6 mx-auto">
      请在使用权限之前慎重考虑。您的一切操作都将被记录，您将对行为所引发的所有后果以及舆论影响负责。TurboServlet 有权根据
      <a class="text-primary" href="/tos" target="_blank">使用条款</a> 对您采取措施。
    </div>
  </div>
  <ArcadeAliasDialog :arcade-alias-dialog="arcadeAliasDialog"/>
</template>

<style scoped>

</style>
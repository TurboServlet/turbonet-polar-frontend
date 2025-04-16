<script setup>
import TurboWarningBadge from "@/components/TurboWarningBadge.vue";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import {onMounted, ref} from "vue";
import {sendGetRequest, sendPostRequest} from "@/assets/js/RequestHandler.js";
import {toast} from "vue-sonner";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const isLoading = ref(true);
const isSuccess = ref(false);
const responseData = ref();
const loadingStates = ref({});

const showFriendRequests = async () => {
  await sendGetRequest('/web/showFriendRequests', true).then((response) => {
    if (response.statusCode === 200) {
      isLoading.value = false;
      isSuccess.value = true;
      responseData.value = response.data;
      responseData.value.forEach(friend => {
        loadingStates.value[friend.turboName] = {accept: false, deny: false};
      });
    } else {
      isLoading.value = false;
      isSuccess.value = false;
      responseData.value = response.data;
    }
  }).catch(() => {
    isLoading.value = false;
    isSuccess.value = false;
    responseData.value = t('error.jsError');
  });
};

const acceptFriend = async (turboName) => {
  loadingStates.value[turboName].accept = true;
  const payload = {
    "turboName": turboName,
  };
  await sendPostRequest('/web/acceptFriend', payload, true).then((response) => {
    loadingStates.value[turboName].accept = false;
    if (response.statusCode === 200) {
      toast.success(t('addFriends.requestFriendList.toast.accept'));
      showFriendRequests();
    } else {
      toast.error(response.data);
    }
  });
};

const denyFriend = async (turboName) => {
  loadingStates.value[turboName].deny = true;
  const payload = {
    "turboName": turboName,
  };
  await sendPostRequest('/web/denyFriend', payload, true).then((response) => {
    loadingStates.value[turboName].deny = false;
    if (response.statusCode === 200) {
      toast.success(t('addFriends.requestFriendList.toast.deny'));
      showFriendRequests();
    } else {
      toast.error(response.data);
    }
  });
};

onMounted(() => {
  showFriendRequests();
});
</script>

<template>
  <div v-if="isLoading || !isSuccess" class="main-container-center">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.loadingError') }}
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ responseData }}
        <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="flex text-center justify-center my-10" v-if="responseData.length === 0">
      {{ $t('addFriends.requestFriendList.noData') }}
    </div>
    <div v-for="friend in responseData" :key="friend.turboName" class="bg-base-200 rounded-box mb-4 p-4 flex flex-col">
      <div class="avatar-info flex">
        <div class="avatar">
          <div class="w-24 h-24 rounded">
            <img v-if="friend.avatar === ''" alt="" class="user-image" src="/img/avatar.jpg">
            <img v-else alt="" class="user-image" :src="`data:image/png;base64,${friend.avatar}`">
          </div>
        </div>
        <div class="flex flex-col ml-4 truncate">
          <div class="font-bold text-2xl truncate">{{ friend.turboName }}</div>
          <div class="status">
            <TurboPermissionBadge :turbo-permission="friend.permission"/>
            <TurboWarningBadge :times="friend.warningTimes"/>
          </div>
          <div class="flex mt-2 text-sm flex-wrap whitespace-normal break-all items-center">
            {{ $t('addFriends.requestFriendList.requestTime', { time: friend.requestTime }) }}
          </div>
        </div>
      </div>
      <div class="divider mb-0"></div>
      <div class="mt-4 flex flex-wrap gap-2 justify-end">
        <button @click="acceptFriend(friend.turboName)" class="btn btn-success btn-sm"
                :disabled="loadingStates[friend.turboName]?.accept">
          <span v-if="loadingStates[friend.turboName]?.accept" class="loading loading-spinner"></span>
          <i v-else class="fa-solid fa-user-plus"></i> {{ $t('addFriends.requestFriendList.button.accept') }}
        </button>
        <button @click="denyFriend(friend.turboName)" class="btn btn-error btn-sm"
                :disabled="loadingStates[friend.turboName]?.deny">
          <span v-if="loadingStates[friend.turboName]?.deny" class="loading loading-spinner"></span>
          <i v-else class="fa-solid fa-user-slash"></i> {{ $t('addFriends.requestFriendList.button.deny') }}
        </button>
      </div>
    </div>
  </div>
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

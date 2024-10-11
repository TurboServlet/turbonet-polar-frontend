<script setup>

import Header from "@/layouts/Header.vue";
import MaiStatistics from "@/layouts/user/MaiStatistics.vue";
import PlayActivity from "@/layouts/user/PlayActivity.vue";
import Best35 from "@/layouts/user/Best35.vue";
import RecentScores from "@/layouts/user/RecentScores.vue";
import {ref, watchEffect} from "vue";
import {sendPostRequest} from "@/assets/js/RequestHandler.js";
import {useRoute, useRouter} from "vue-router";
import Best15 from "@/layouts/user/Best15.vue";
import TurboPermissionBadge from "@/components/TurboPermissionBadge.vue";
import TurboWarningBadge from "@/components/TurboWarningBadge.vue";
import UserSettingDialog from "@/layouts/user/UserSettingDialog.vue";
import {openDialogModal} from "@/assets/js/DialogManager.js";
import {toast} from "vue-sonner";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const isSuccess = ref(false)
const isMe = ref(false)
const message = ref('')

const isBanned = ref(false)

const responseData = ref()

const parseMessages = (messageString) => {

  if (messageString === '') {
    return [];
  }

  const messages = messageString.split(',');
  return messages.map((message) => {
    const parts = message.split(';');
    return {
      date: parts[0],
      reason: parts[1],
      executorName: parts[2],
      isPermanent: parts[3] === 'true',
      endHours: parseInt(parts[4], 10),
    };
  });
};

watchEffect(async () => {
  try {
    const turboName = route.params.username;

    if (turboName) {
      const payload = {
        turboName: turboName,
      };
      await sendPostRequest('/web/user', payload, true).then((response) => {
        if (response.statusCode === 200) {
          isLoading.value = false
          isSuccess.value = true
          isBanned.value = response.data.isBanned
          isMe.value = response.data.isMe
          responseData.value = response.data
        } else {
          isLoading.value = false
          message.value = response.data
        }
      })
    } else {
      isLoading.value = false
      message.value = '请求体不全，请补全后重试。';
    }
  } catch (e) {
    isLoading.value = false
    message.value = '请求体不全，请补全后重试。';
  }
});

const userSetting = () => {
  openDialogModal('userSettingDialog')
}

const isFriendBtnLoading = ref(false)

const addFriend = async () => {
  isFriendBtnLoading.value = true
  const payload = {
    "turboName": responseData.value.turboName
  }
  await sendPostRequest('/web/addFriend', payload, true).then((response) => {
    if (response.statusCode === 200) {
      toast.success('已发送申请')
      isFriendBtnLoading.value = false
    } else {
      toast.error(response.data)
      isFriendBtnLoading.value = false
    }
  })
}


</script>

<template>
  <div v-if="isBanned" class="account_banned">封禁中</div>
  <Header :have-list="false"/>
  <div v-if="isLoading || !isSuccess" class="body flex align-middle" style="height: calc(100vh - 64px)">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> 访问失败
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ message }}
        <router-link class="text-primary" to="/">返回主页</router-link>
      </p>
    </div>
  </div>
  <div v-else class="body-container bg-base-200">
    <div class="user-info">
      <img v-if="responseData.avatar === ''" alt="" class="user-image" src="/img/avatar.jpg">
      <img v-else :src="`data:image/png;base64,${responseData.avatar}`" alt="" class="user-image">
      <div class="name-box whitespace-nowrap font-bold overflow-hidden text-ellipsis">
        <div class="m-0 whitespace-nowrap font-bold overflow-hidden text-ellipsis" style="font-size: 1.5rem">
          {{ responseData.maimaiName }}
        </div>
        <a v-if="isMe" @click="userSetting" class="clickable inside"><i class="fa-solid fa-sliders"></i> 我的设置</a>
        <a v-else @click="addFriend" class="clickable inside" :disabled="isFriendBtnLoading">
          <span v-if="isFriendBtnLoading" class="loading loading-spinner size-4"></span>
          <i v-else class="fa-solid fa-user-plus"></i> 添加好友
        </a>
      </div>
      <nav class="small-text">
        <a v-if="isMe" @click="userSetting" class="clickable outside"><i class="fa-solid fa-sliders"></i> 我的设置</a>
        <a v-else @click="addFriend" class="clickable outside" :disabled="isFriendBtnLoading">
          <span v-if="isFriendBtnLoading" class="loading loading-spinner size-4"></span>
          <i v-else class="fa-solid fa-user-plus"></i> 添加好友
        </a>
        <a class="active clickable" @click="router.go(-1)"><i class="fa-solid fa-rotate-left"></i> 返回上一页</a>
      </nav>
    </div>
    <div>
      <div class="overflow-hidden text-ellipsis whitespace-nowrap opacity-75">@{{ responseData.turboName }}</div>
      <div class="status">
        <TurboPermissionBadge v-if="!responseData.isBanned" :turbo-permission="responseData.permission"/>
        <div v-else class="badge gap-1.5 font-bold badge-error">
          <i class="fa-solid fa-user-slash"></i>
          TurboNET封禁
        </div>
        <TurboWarningBadge :times="responseData.warningTimes"/>
      </div>
      <div v-for="(msg, index) in parseMessages(responseData.bannedMessage)" :key="index"
           class="mt-2 text-xs font-bold text-error">
        <i class="fa-solid fa-user-slash"></i> 在 {{ msg.date }} 被 {{ msg.executorName }}
        {{ msg.isPermanent ? '永久' : '临时' }}封禁 {{
          msg.isPermanent ? '' : msg.endHours + ' 小时'
        }}，理由：{{ msg.reason }}
      </div>
      <div v-for="(msg, index) in parseMessages(responseData.warningMessage)" :key="index"
           class="mt-2 text-xs text-warning">
        <i class="fa-solid fa-triangle-exclamation"></i> 第 {{ index + 1 }} 次在 {{ msg.date }} 被 {{
          msg.executorName
        }} 警告，理由：{{ msg.reason }}
      </div>
    </div>
    <div class="mt-2"></div>
    <MaiStatistics :mai-statistics="responseData.maiStatistics"/>
    <PlayActivity :play-activity="responseData.playActivity"/>
    <Best35 :best35="responseData.best35"/>
    <Best15 :best15="responseData.best15"/>
    <RecentScores :recent-scores="responseData.recentScores"/>
    <div class="mt-2"></div>
    <div class="announcement-content text-xs">
      <p>根据 Creative Commons Public Licenses 4.0,</p>
      <p>该页面参考 <a href="https://github.com/hykilpikonna/AquaDX" target="_blank">hykilpikonna/AquaDX <i
          class="fa-brands fa-github"></i></a> 并 <span class="text-pink-500"> 进行了修改 </span>, 本页面开源于
        <a href="https://github.com/TurboServlet/turbonet-polar-userpage" target="_blank">TurboServlet/turbonet-polar-userpage
          <i
              class="fa-brands fa-github"></i></a></p>
    </div>
  </div>
  <UserSettingDialog v-if="isMe"/>
</template>

<style scoped>
.account_banned {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  margin: -80px 0 0 -240px;
  width: 480px;
  border: 8px solid #E60012;
  text-align: center;
  font-size: 100px;
  color: #E60012;
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.status {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.announcement-content {
  text-align: right;
  opacity: 0.6;
}

.clickable {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

a {
  font-weight: 500;
  color: oklch(var(--p));
  text-decoration: inherit;
}

.body-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 100px auto 0;
  padding: 32px 32px 40px;
  min-height: 100%;
  max-width: 1000px;
  border-radius: 16px 16px 0 0;
}

.user-info {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-top: -72px;
  position: relative;
}

.user-image {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.name-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.small-text {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: -26px;
  right: 0;
}

.inside {
  display: none;
}

@media (min-width: 1000px) {

  .outside {
    display: none;
  }

  .inside {
    display: unset;
  }

  .small-text {
    top: 4px;
  }
}

@media (max-width: 1000px) {
  .name-box {
    flex: unset;
    display: unset;
  }
}
</style>
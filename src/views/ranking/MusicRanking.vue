<script setup>
import Header from "@/layouts/Header.vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {diffName, fixIcon, badgeColor} from '@/assets/js/MusicUtils.js'
import {toast} from "vue-sonner";


const route = useRoute();

const router = useRouter();

const page = ref(1)

const isLoading = ref(true);
const isSuccess = ref(false)

const rankingIsLoading = ref(true)
const rankingIsSuccess = ref(false)
const musicIsLoading = ref(true)
const musicIsSuccess = ref(false)

const onlyTurbo = ref(false)

const responseData = ref()
const musicData = ref()
const musicId = ref(null)
const diff = ref(null)

const turboChanger = () => {
  page.value = 1
  onlyTurbo.value = !onlyTurbo.value
  musicRanking()
}

watchEffect(async () => {
  try {
    musicId.value = route.params.musicId;
    diff.value = route.params.diff;

    if (musicId.value !== null && diff.value !== null) {
      await sendGetRequest(`/web/musicRanking?musicId=${musicId.value}&musicDiff=${diff.value}&onlyTurbo=${onlyTurbo.value}&page=${page.value}`, true).then((response) => {
        if (response.statusCode === 200) {
          rankingIsLoading.value = false
          rankingIsSuccess.value = true
          responseData.value = response.data
        } else {
          rankingIsLoading.value = false
          rankingIsSuccess.value = false
          responseData.value = response.data
        }
      }).catch(() => {
        rankingIsLoading.value = false
        rankingIsSuccess.value = false
        responseData.value = '验证失败，请重新登录。'
      })
      await sendGetRequest(`/data/music?musicId=${musicId.value}&musicDiff=${diff.value}`, true).then((response) => {
        if (response.statusCode === 200) {
          musicIsLoading.value = false
          musicIsSuccess.value = true
          musicData.value = response.data
        } else {
          musicIsLoading.value = false
          musicIsSuccess.value = false
          musicData.value = response.data
        }
      }).catch(() => {
        musicIsLoading.value = false
        musicIsSuccess.value = false
        responseData.value = '验证失败，请重新登录。'
      })
    } else {
      isLoading.value = false
      responseData.value = '请求体不全，请补全后重试。';
    }
  } catch (e) {
    isLoading.value = false
    responseData.value = '请求体不全，请补全后重试。';
  }
});

const musicRanking = async () => {
  rankingIsLoading.value = true
  await sendGetRequest(`/web/musicRanking?musicId=${musicId.value}&musicDiff=${diff.value}&onlyTurbo=${onlyTurbo.value}&page=${page.value}`, true).then((response) => {
    if (response.statusCode === 200) {
      rankingIsLoading.value = false
      rankingIsSuccess.value = true
      responseData.value = response.data
    } else {
      rankingIsLoading.value = false
      rankingIsSuccess.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    rankingIsLoading.value = false
    rankingIsSuccess.value = false
    responseData.value = '验证失败，请重新登录。'
  })
}

watch([rankingIsSuccess, musicIsSuccess], () => {
  if (rankingIsSuccess.value && musicIsSuccess.value) {
    isSuccess.value = true;
  }
});

watch([rankingIsLoading, musicIsLoading], () => {
  if (!rankingIsLoading.value && !musicIsLoading.value) {
    isLoading.value = false;
  }
});

const nextPage = () => {
  if (page.value === responseData.value.totalPages) {
    toast.warning('已经是最后一页了哦')
    return
  }
  page.value += 1
  musicRanking()
}

const previousPage = () => {
  if (page.value === 1) {
    toast.warning('已经是第一页了哦')
    return
  }
  page.value -= 1
  musicRanking()
}

const addPage = (number) => {
  if (page.value + number > responseData.value.totalPages) {
    toast.warning('超过总页数了哦')
    return
  }
  page.value += number
  musicRanking()
}

const toMaxPage = () => {
  page.value = responseData.value.totalPages
  musicRanking()
}

</script>

<template>
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
  <div v-else>
    <div class="-mt-28 illustration w-full h-screen bg-fixed bg-blend-overlay bg-cover bg-center bg-img-color"
         :style="`background-image: url(https://assets.lxns.net/maimai/jacket/${fixIcon(musicData.musicId)}.png!webp); transition: background-color 0.5s;`"></div>
    <div class="w-full h-48 -mt-48 bg-gradient-to-b from-transparent to-base-100"></div>
    <div class="w-full mt-10">
      <div class="relative">
        <div class="flex flex-col items-center -mt-[35vh] mb-24">
          <div class="px-8 max-w-[1000px] w-full lg:px-0 lg:w-3/4 gap-8">
            <div class="flex flex-col">
              <h1 class="opacity-60">{{ musicData.musicAuthor }}</h1>
              <h1 class="text-5xl font-black">{{ musicData.musicName }}</h1>
              <div v-if="musicData.musicId < 100000" class="max-h-8 badge diff-badge space-x-2 badge-lg mt-4 h-8" :class="badgeColor(musicData.musicDiff)">
                <span class="truncate">{{ diffName(musicData.musicDiff) }}</span><span>{{ musicData.musicLevel.toFixed(1) }}</span>
              </div>
              <div v-else class="max-h-8 badge diff-badge space-x-2 badge-lg mt-4 h-8 diff-badge-buddies">
                <span class="truncate">宴</span><span>{{ musicData.musicLevel.toFixed(1) }}</span></div>
              <a @click="router.go(-1)" class="active clickable text-right pr-10"><i class="fa-solid fa-rotate-left"></i> 返回上一页</a>
              <div class="mt-16 flex flex-col lg:flex-row-reverse gap-8">
                <div class="grow -mt-8 lg:w-3/4">
                  <div class="card bg-base-100 shadow-xl p-4 rounded-box">
                    <div class="flex flex-col">
                      <div class="flex flex-row justify-between gap-3">
                        <div class="mt-2 ml-4">
                          <div class="text-2xl font-black">乐曲排行榜</div>
                        </div>
                        <button v-if="!onlyTurbo" @click="turboChanger" class="btn btn-ghost"><i class="fa-solid fa-repeat"></i>全国加速盒子玩家排名</button>
                        <button v-else @click="turboChanger" class="btn btn-ghost"><i class="fa-solid fa-repeat"></i>TurboNET注册玩家排名</button>
                      </div>
                      <div v-if="rankingIsLoading" class="body flex align-middle" style="height: calc(100vh - 64px)">
                        <span class="loading loading-spinner size-8"/>
                      </div>
                      <div v-else class="overflow-x-auto flex flex-col items-end gap-2 mt-2">
                        <div class="overflow-x-auto w-full">
                          <table class="table">
                            <thead>
                            <tr>
                              <th>排名</th>
                              <th>玩家</th>
                              <th>完成度</th>
                              <th>DX分数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="player in responseData.content" class="hover text-lg">
                              <th class="text-center w-5">
                                <i v-if="player.ranking === 1" class="fa-solid fa-trophy text-yellow-400"></i>
                                <i v-if="player.ranking === 2" class="fa-solid fa-trophy text-zinc-400"></i>
                                <i v-if="player.ranking === 3" class="fa-solid fa-trophy text-orange-400"></i>
                                {{ player.ranking }}
                              </th>
                              <td>
                                <a v-if="player.turboName !== ''" :href="`/u/${player.turboName}`" class="flex flex-row items-center gap-2 group">
                                  <span
                                      class="text-[#ff7043] group-hover:link truncate max-w-[150px] lg:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">{{ player.maimaiName }}</span>
                                </a>
                                  <span v-else
                                      class="flex flex-row items-center gap-2 truncate max-w-[150px] lg:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">{{ player.maimaiName }}</span>
                              </td>
                              <td class="font-black font-mono text-2xl">{{ player.achievement.toFixed(4) }}%</td>
                              <td class="font-black font-mono text-2xl">{{ player.deluxScore }}</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="join flex-wrap justify-center">
                          <button class="join-item btn" @click="previousPage" :disabled="page === 1">«</button>
                          <button class="join-item btn btn-accent">{{ page }}</button>
                          <button class="join-item btn" @click="addPage(1)" :disabled="page+1 > responseData.totalPages">{{ page+1 }}</button>
                          <button class="join-item btn" @click="addPage(2)" :disabled="page+2 > responseData.totalPages">{{ page+2 }}</button>
                          <button class="join-item btn btn-disabled">…</button>
                          <button class="join-item btn" @click="toMaxPage" :disabled="page === responseData.totalPages">{{ responseData.totalPages }}</button>
                          <button class="join-item btn" @click="nextPage" :disabled="page === responseData.totalPages">»</button>
                        </div>
                      </div>
                    </div><!----></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.diff-badge {
  border-style: none !important;
  --tw-text-opacity: 1 !important;
  color: whitesmoke !important;
}

.diff-badge-basic {
  background: linear-gradient(to top left, rgb(110, 212, 62), rgb(110, 152, 62));
}

.diff-badge-advanced {
  background: linear-gradient(to top left, rgb(247, 184, 7), rgb(247, 124, 7));
}

.diff-badge-expert {
  background: linear-gradient(to top left, rgb(255, 130, 141), #6f0000);
}

.diff-badge-master {
  background: linear-gradient(to top left, rgb(200, 81, 220), rgb(160, 81, 220));
}

.diff-badge-remaster {
  background: linear-gradient(to top left, rgb(194, 153, 231), #9d65c9);
}

.diff-badge-buddies {
  background: linear-gradient(to top left, #ff71cf, #ff41c7);
}

.bg-img-color {
  --tw-bg-opacity: 1;
  background-color: rgb(187 187 187 / var(--tw-bg-opacity));
}

[data-theme=dark] .bg-img-color {
  background-color: #000b;
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


</style>
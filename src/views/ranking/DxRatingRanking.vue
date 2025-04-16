<script setup>
import Header from "@/layouts/Header.vue";
import {sendGetRequest} from "@/assets/js/RequestHandler.js";
import {onMounted, ref, watch, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {diffName, fixIcon, badgeColor} from '@/assets/js/MusicUtils.js'
import {toast} from "vue-sonner";


const router = useRouter();

const page = ref(1)

const isLoading = ref(true);
const isSuccess = ref(false)
const rankingIsLoading = ref(false)

const onlyTurbo = ref(false)

const responseData = ref()

const turboChanger = () => {
  page.value = 1
  onlyTurbo.value = !onlyTurbo.value
  dxRatingRanking()
}

const dxRatingRanking = async () => {
  rankingIsLoading.value = true
  await sendGetRequest(`/web/dxRatingRanking?onlyTurbo=${onlyTurbo.value}&page=${page.value}`, true).then((response) => {
    if (response.statusCode === 200) {
      rankingIsLoading.value = false
      isSuccess.value = true
      responseData.value = response.data
    } else {
      rankingIsLoading.value = false
      isSuccess.value = false
      responseData.value = response.data
    }
  }).catch(() => {
    rankingIsLoading.value = false
    isSuccess.value = false
    responseData.value = '验证失败，请重新登录。'
  })
}

const nextPage = () => {
  if (page.value === responseData.value.totalPages) {
    toast.warning('已经是最后一页了哦')
    return
  }
  page.value += 1
  dxRatingRanking()
}

const previousPage = () => {
  if (page.value === 1) {
    toast.warning('已经是第一页了哦')
    return
  }
  page.value -= 1
  dxRatingRanking()
}

const addPage = (number) => {
  if (page.value + number > responseData.value.totalPages) {
    toast.warning('超过总页数了哦')
    return
  }
  page.value += number
  dxRatingRanking()
}

const toMaxPage = () => {
  page.value = responseData.value.totalPages
  dxRatingRanking()
}

onMounted(() => {
  dxRatingRanking()
  isLoading.value = false
  isSuccess.value = true
})

</script>

<template>
  <Header :have-list="false"/>
  <div v-if="isLoading || !isSuccess" class="body flex align-middle" style="height: calc(100vh - 64px)">
    <span v-if="isLoading" class="loading loading-spinner size-8"/>
    <div v-if="!isLoading && !isSuccess">
      <h1 class="font-bold text-3xl">
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('error.enterError') }}
      </h1>
      <div class="mt-3"></div>
      <p>
        {{ message }}
        <router-link class="text-primary" to="/">{{ $t('error.back') }}</router-link>
      </p>
    </div>
  </div>
  <div v-else>
    <div class="-mt-28 illustration w-full h-screen bg-fixed bg-blend-overlay bg-cover bg-center bg-img-color"
         style="background-image: url('https://r2.sys-allnet.com/ranking_bg.jpg') ; transition: background-color 0.5s;"></div>
    <div class="w-full h-48 -mt-48 bg-gradient-to-b from-transparent to-base-200"></div>
    <div class="w-full mt-10">
      <div class="relative">
        <div class="flex flex-col items-center -mt-[35vh] mb-24">
          <div class="px-8 max-w-[1000px] w-full lg:px-0 lg:w-3/4 gap-8">
            <div class="flex flex-col">
              <h1 class="opacity-60">TurboNET Polar <i class="fa-solid fa-meteor"></i></h1>
              <h1 class="text-5xl font-black">{{ $t('ranking.dxRatingRanking.title') }}</h1>
              <a @click="router.go(-1)" class="active clickable text-right pr-10"><i class="fa-solid fa-rotate-left"></i>
                {{ $t('ranking.return') }}</a>
              <div class="mt-16 flex flex-col lg:flex-row-reverse gap-8">
                <div class="grow -mt-8 lg:w-3/4">
                  <div class="card bg-base-100 shadow-xl p-4 rounded-box">
                    <div class="flex flex-col">
                      <div class="flex flex-row justify-between gap-3">
                        <div class="mt-2 ml-4">
                          <div class="text-2xl font-black">{{ $t('ranking.title') }}</div>
                        </div>
                        <button v-if="!onlyTurbo" @click="turboChanger" class="btn btn-ghost"><i class="fa-solid fa-repeat"></i>{{ $t('ranking.button.global') }}</button>
                        <button v-else @click="turboChanger" class="btn btn-ghost"><i class="fa-solid fa-repeat"></i>{{ $t('ranking.button.turbo') }}</button>
                      </div>
                      <div v-if="rankingIsLoading" class="body flex align-middle" style="height: calc(100vh - 64px)">
                        <span class="loading loading-spinner size-8"/>
                      </div>
                      <div v-else class="overflow-x-auto flex flex-col items-end gap-2 mt-2">
                        <div class="overflow-x-auto w-full">
                          <table class="table">
                            <thead>
                            <tr>
                              <th>{{ $t('ranking.dxRatingRanking.table.ranking') }}</th>
                              <th>{{ $t('ranking.dxRatingRanking.table.username') }}</th>
                              <th>{{ $t('ranking.dxRatingRanking.table.dxRating') }}</th>
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
                              <td class="font-black font-mono text-2xl">{{ player.rating }}</td>
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
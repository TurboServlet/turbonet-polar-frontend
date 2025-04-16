<script setup>

import {defineProps, toRef} from 'vue'

import {diffName, badgeColor, fixIcon} from '@/assets/js/MusicUtils.js'

const props = defineProps({
  record: {
    type: Object,
    required: true
  },
})

const record = toRef(props, 'record')

const diffFix = (musicId, diff) => {
  if (musicId > 100000) {
    return 10
  }
  return diff
}

</script>

<template>
  <div class="card-body border-2 border-base-200 rounded-box">
    <div class="grid grid-cols-1 items-center gap-4 sm:grid-flow-dense sm:grid-cols-12 sm:gap-6">
      <div class="min-w-84 card flex max-h-60 flex-col bg-base-100 h-48 sm:col-span-7 sm:h-full">
        <!---->
        <router-link :to="`/musicRanking/${record.musicId}/${diffFix(record.musicId ,record.musicDiff)}`" class="flex flex-1">
        <div class="base-card bg-image-loading w-full flex-1">
          <div class="card absolute flex size-full overflow-hidden">
            <div class="base-card-bg flex-1 bg-cover bg-center transition-all"
                 :style="`background-image: url(https://assets.lxns.net/maimai/jacket/${fixIcon(record.musicId)}.png!webp);`">
              <div class="base-card-bg-cover size-full bg-black/50 transition"></div>
            </div>
          </div>
          <div class="absolute size-full">
            <div class="flex size-full flex-col p-3">
              <div class="flex w-full flex-row px-2">
                <div class="flex gap-1"></div>
              </div>
              <div class="flex-1"></div>
              <div class="flex w-full flex-row px-2">
                <div class="w-[95%]"><h2 class="card-title text-neutral-content block truncate">{{ record.musicName }}</h2>
                  <!---->
                  <h2 class="truncate text-neutral-content opacity-80">{{ record.musicAuthor }}</h2></div>
                <div class="flex-1"></div>
                <div></div>
              </div>
              <div v-if="record.musicId < 100000" class="mt-2 flex w-full flex-row">
                <div class="flex items-center">
                  <div class="flex max-h-8 badge diff-badge space-x-2 badge-lg mx-1 h-8" :class="badgeColor(record.musicDiff)">
                    <span class="truncate">{{ diffName(record.musicDiff) }}</span><span
                      >{{ record.musicLevel.toFixed(1) }}</span></div>
                </div>
                <div class="flex-1"></div>
                <div class="badge badge-primary badge-sm h-8">{{ record.isDxMusic? 'DX' : 'SD' }}</div>
              </div>
              <div v-else class="mt-2 flex w-full flex-row">
                <div class="flex items-center">
                  <div class="flex max-h-8 badge diff-badge diff-badge-buddies space-x-2 badge-lg mx-1 h-8">
                    <span class="truncate">宴</span><span
                  >{{ record.musicLevel.toFixed(1) }}</span></div>
                </div>
                <div class="flex-1"></div>
                <div class="badge badge-primary badge-sm h-8">{{ record.isDxMusic? 'DX' : 'SD' }}</div>
              </div>
            </div>
          </div>
        </div>
        </router-link></div>
      <div class="flex flex-col gap-2 sm:col-span-5">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2"><p class="w-fit text-2xl font-light lg:text-4xl">{{ record.achievement.toFixed(4) }}%</p>
            <div class="flex flex-wrap-reverse items-center gap-x-2 gap-y-1">
              <div class="badge badge-warning flex-nowrap" v-if="record.isNewRecord"> {{ $t('records.newRecord') }}</div>
              <div class="badge badge-neutral flex-nowrap" v-if="record.addRating === 0"> Rating +0</div>
              <div class="badge badge-success flex-nowrap" v-else> Rating +{{record.addRating}}</div>
            </div>
            <div class="flex flex-wrap-reverse items-center gap-x-4 gap-y-1">
              <span class="flex flex-nowrap text-color" v-if="record.comboInfo.type === 1">Full Combo! </span>
              <span class="flex flex-nowrap text-color" v-if="record.comboInfo.type === 2">Full Combo+! </span>
              <span class="flex flex-nowrap text-color" v-if="record.comboInfo.type === 3">All Perfect! </span>
              <span class="flex flex-nowrap text-color" v-if="record.comboInfo.type === 4">All Critical! </span>
              <span class="flex flex-nowrap" v-if="record.comboInfo.type === 0">{{ record.comboInfo.combo }}/{{ record.comboInfo.maxCombo }} combo </span>
              <span class="flex flex-nowrap text-color" v-if="record.syncInfo.type === 1">Full Sync! </span>
              <span class="flex flex-nowrap text-color" v-if="record.syncInfo.type === 2">Full Sync+! </span>
              <span class="flex flex-nowrap text-color" v-if="record.syncInfo.type === 3">Full Sync DX! </span>
              <span class="flex flex-nowrap text-color" v-if="record.syncInfo.type === 4">Full Sync DX+! </span>
              <span class="flex flex-nowrap text-blue-400" v-if="record.syncInfo.type === 5">Sync Play </span>
              <span class="flex flex-nowrap" v-if="record.syncInfo.type === 0 && record.syncInfo.maxSync !== 0">{{ record.syncInfo.sync }}/{{ record.syncInfo.maxSync }} sync </span>
            </div>
          </div>
          <div class="flex flex-wrap gap-x-4">
            <div class="flex-nowarp flex gap-1 text-orange-500"><span class="text-orange-400"> Critical </span> {{ record.score.critical }}</div>
            <div class="flex-nowarp flex gap-1 text-yellow-500"><span class="text-yellow-400"> Perfect </span> {{ record.score.perfect }}</div>
            <div class="flex-nowarp flex gap-1 text-red-500"><span class="text-red-400"> Great </span> {{ record.score.great }}</div>
            <div class="flex-nowarp flex gap-1 text-green-500"><span class="text-green-400"> Good </span> {{ record.score.good }}</div>
            <div class="flex-nowarp flex gap-1 text-slate-500"><span class="text-slate-400"> Miss </span> {{ record.score.miss }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a:hover {
  filter: brightness(1.6);
  transform: scale(1.05);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.text-color {
  background: linear-gradient(90deg, #ff6f69, #ffcc5c, #ffc22d, #00ca92, #88d8b0, #6a89cc, #9d65c9);
  -webkit-background-clip: text;
  color: transparent;
}

.diff-badge {
  border-style: none !important;
  --tw-text-opacity: 1 !important;
  color: whitesmoke !important;
}

.diff-badge-basic {
  background: linear-gradient(to top left, rgb(110, 212, 62), rgb(110, 152, 62));
  order: 3;
}

.diff-badge-advanced {
  background: linear-gradient(to top left, rgb(247, 184, 7), rgb(247, 124, 7));
  order: 3;
}

.diff-badge-expert {
  background: linear-gradient(to top left, rgb(255, 130, 141), #6f0000);
  order: 3;
}

.diff-badge-master {
  background: linear-gradient(to top left, rgb(200, 81, 220), rgb(160, 81, 220));
  order: 3;
}

.diff-badge-remaster {
  background: linear-gradient(to top left, rgb(194, 153, 231), #9d65c9);
  order: 3;
}

.diff-badge-buddies {
  background: linear-gradient(to top left, #ff71cf, #ff41c7);
  order: 3;
}

</style>
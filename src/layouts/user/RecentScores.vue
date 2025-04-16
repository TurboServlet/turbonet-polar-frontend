<script setup>

import {defineProps, toRef} from 'vue';

import {fixIcon, levelColor, rankColor} from '@/assets/js/MusicUtils.js'

const props = defineProps({
  recentScores: {
    type: Array,
    required: true
  }
});

const recentScores = toRef(props, 'recentScores');

</script>

<template>
  <div class="recent">
    <h2 class="text-2xl mt-3.5 mb-3.5"> {{ $t('user.recentScores.title') }}</h2>
    <div v-if="recentScores.length > 0" class="scores">
      <div
          v-for="(music, index) in recentScores"
          :key="music.musicId"
          :class="['scores-single', { 'bg-base-200 alt': index % 2 === 0 }]"
      ><img :src="`https://assets.lxns.net/maimai/jacket/${fixIcon(music.musicId)}.png!webp`" alt="" class="score-image" loading="lazy">
        <div class="info">
          <div class="song-title">{{ music.musicName }}</div>
          <div class="whitespace-nowrap"><span class="lv" :class="levelColor(music.diff)">{{ music.level.toFixed(1) }}</span> <span :class="rankColor(music.achievement.toFixed(0))"><span
              class="rank-text">{{ music.scoreRank }}</span> <span class="rank-num">{{ music.achievement.toFixed(2) }}%</span></span> <span
              class="dx-change text-green-500">{{ music.score === 0 ? '-' : music.score }}</span></div>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-20 mb-20">{{ $t('user.private') }}</div>
  </div>
</template>

<style scoped>

.recent {
  display: block;
  unicode-bidi: isolate;
}

.scores {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
}

.scores-single {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 16px;
  max-width: 100%;
  box-sizing: border-box;
}

.score-image {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  object-fit: cover;
}

.info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.song-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lv {
  min-width: 45px;
  text-align: center;
  background: rgba(var(--lv-color), .6);
  padding: 0 6px;
  border-radius: 12px;
  margin-right: 10px;
  display: inline-block;
}

.level-0 {
  --lv-color: 110, 212, 62
}

.level-1 {
  --lv-color: 247, 184, 7
}

.level-2 {
  --lv-color: 255, 130, 141
}

.level-3 {
  --lv-color: 160, 81, 220
}

.level-4 {
  --lv-color: 194, 153, 231
}


.rank-S {
  background: linear-gradient(90deg, #ff6f69, #ffcc5c, #ffc22d, #00ca92, #88d8b0, #6a89cc, #9d65c9);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  text-align: left;
}

.rank-A {
  color: #ff8a8a
}

.rank-B {
  color: #6ba6ff
}

.rank-text {
  min-width: 40px;
  display: inline-block;
  text-align: left;
}

.rank-num {
  min-width: 60px;
  display: inline-block;
  text-align: left;
}

.dx-change {
  min-width: 30px;
  margin-right: .5rem;
  display: inline-block;
  text-align: center;
}

.alt {
  border-radius: 12px;
}

</style>
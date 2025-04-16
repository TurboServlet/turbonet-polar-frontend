<script setup>

import {computed, defineProps, toRef} from 'vue';

import {fixIcon, levelColor, rankColor} from '@/assets/js/MusicUtils.js'

const props = defineProps({
  best35: {
    type: Object,
    required: true
  }
});

const best35 = toRef(props, 'best35');

const sortedBest35 = computed(() => {
  return best35.value.sort((a, b) => b.score - a.score);
});

</script>

<template>
  <div>
    <h2 class="text-2xl mt-3.5 mb-3.5"> Best 35</h2>
    <div v-if="best35.length > 0" class="rating-composition">
      <div v-for="music in sortedBest35" :key="music.musicId">
        <div class="map-detail-container">
          <div class="scores">
            <div class="scores-single">
              <img :src="`https://assets.lxns.net/maimai/jacket/${fixIcon(music.musicId)}.png!webp`" alt="" class="score-image" loading="lazy">
              <div class="info">
                <div class="first-line">
                  <div class="song-title">{{ music.musicName }}</div>
                  <span class="lv" :class="levelColor(music.diff)">{{ music.level.toFixed(1) }}</span></div>
                <div class="second-line"><span :class="rankColor(music.achievement.toFixed(0) )"><span
                    class="rank-text">{{ music.scoreRank }}</span>
                  <span class="rank-num">{{ music.achievement.toFixed(1) }}%</span>
                </span> <span class="dx-change">{{ music.score }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-20 mb-20">{{ $t('user.private') }}</div>
  </div>
</template>

<style scoped>

.rating-composition {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.map-detail-container {
  background-color: oklch(var(--b2));
  border-radius: 12px;
  overflow: hidden;
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
  gap: 12px;
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
  flex-direction: column;
}

.first-line {
  display: flex;
  flex-direction: row;
}

.song-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lv {
  width: 45px;
  text-align: center;
  background: rgba(var(--lv-color), .6);
  padding: 0 6px;
  border-radius: 0 12px;
  box-shadow: inset 0 0 10px #00000080;
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


.second-line {
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-right: .5rem;
  display: inline-block;
  text-align: left;
  color: #00ca92;
}

</style>
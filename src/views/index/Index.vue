<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import {ref} from 'vue';
import DevInfo from "@/layouts/index/DevInfo.vue";
import TurboMap from "@/layouts/index/TurboMap.vue";
import IndexButton from "@/components/index/IndexButton.vue";
import HeadModule from "@/components/headModule.vue";
import CooperatorInfo from "@/layouts/index/CooperatorInfo.vue";
import Footer from "@/layouts/Footer.vue";
import Login from "@/views/index/Login.vue";

const isCoverHidden = ref(false);

const videoPlayer = ref(null);

onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.volume = 0.08;
  }
});

const coverChanger = () => {
  isCoverHidden.value = !isCoverHidden.value;
}

const videos = [
  "https://r2.kiwi.cat/ctrlcvs/video/119044303-1-208.mp4",
  "https://r2.kiwi.cat/ctrlcvs/video/351183712-1-208.mp4",
  "https://r2.kiwi.cat/ctrlcvs/video/399128338-1-208.mp4",
  "https://r2.kiwi.cat/ctrlcvs/video/588044390-1-208.mp4",
  "https://r2.kiwi.cat/ctrlcvs/video/1475665570-1-192.mp4",
];
const randomVideoLink = computed(() => {
  return videos[Math.floor(Math.random() * videos.length)];
});

</script>

<template>
  <div class="body">
    <section class="header shadow-2xl mb-16">
      <div class="video-wrapper">
        <video
            ref="videoPlayer"
            :src="randomVideoLink"
            autoplay
            :muted="!isCoverHidden"
            loop
            playsinline
            style="object-fit: cover;width: 100%;height: 100vh"
        ></video>
        <transition name="cover-animation">
          <div v-show="!isCoverHidden" style="background-image: unset; !important;" class="glass-cover glass">
          </div>
        </transition>
      </div>

      <HeadModule/>
      <div class="header-all">
        <label class="corner swap">
          <input type="checkbox" @click="coverChanger"/>

          <svg
              class="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24">
            <path
                d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
          </svg>

          <!-- volume off icon -->
          <svg
              class="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24">
            <path
                d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/>
          </svg>
        </label>

        <div class="container">
          <div class="big-text">
            <h1><span
                class="font-black bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text [-webkit-text-fill-color:transparent]">TurboNET</span><br><span
                style="color: oklch(var(--p))">Polar <i class="fa-solid fa-meteor"></i></span></h1>
          </div>
          <div class="small-text">
            <p>{{ $t('index.title') }}</p>
          </div>
          <IndexButton/>
          <button type="button" class="scroll_down scroller">
          </button>
        </div>
      </div>
    </section>
    <DevInfo/>
    <div class="mb-3"></div>
    <CooperatorInfo/>
    <div class="mb-3"></div>
    <TurboMap/>
    <div class="mb-10"></div>
    <Footer/>
  </div>
  <Login/>
</template>

<style scoped>

.glass-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  transition: transform 0.5s ease;
}

.corner {
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 100;
  transition: transform 0.5s ease;
}

.cover-animation-enter-active, .cover-animation-leave-active {
  transition: opacity 0.5s ease;
}

.cover-animation-enter, .cover-animation-leave-to {
  opacity: 0;
}

@media (max-width: 780px) and (orientation: portrait) {
  .header {
    min-height: 100%;
  }
}

@media (orientation: landscape) and (max-height: 460px) {
  .header {
    min-height: 100%;
  }
}

.header {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.header .header-all {
  display: grid;
  flex-line-pack: center;
  align-content: center;
  height: 100%;
  position: relative;
  z-index: 5;
}

@media (max-width: 780px) and (orientation: portrait) {
  .header .header-all .container, .header .header-all .container .soc {
    display: flex;
    box-orient: vertical;
    box-direction: normal;
    flex-direction: column;
    box-pack: center;
    flex-pack: center;
    justify-content: center;
  }
}

@media (max-width: 1170px) {
  .container {
    width: 90%;
  }
}

@media (max-width: 1170px) {
  .container {
    width: 90%;
  }
}

.container {
  margin: 0 auto;
  height: 100%;
}

.header .header-all .big-text {
  text-align: center;
  font-size: 68px;
  line-height: 102px;
  font-weight: 900;
}

.header .header-all .small-text {
  margin-top: 30px;
  text-align: center;
}

.header .scroll_down {
  transition: all .5s ease-in-out;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: 50px;
  width: 30px;
  bottom: 60px;
  background-color: transparent;
  border: 2px solid oklch(var(--bc));
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  opacity: .4;
}

.header .scroll_down:before {
  position: absolute;
  top: 10px;
  left: 50%;
  content: "";
  width: 6px;
  height: 6px;
  margin-left: -3px;
  background-color: oklch(var(--bc));
  border-radius: 100%;
  animation: scroll_down_btn-animation 1.3s infinite;
  box-sizing: border-box;
}

@keyframes scroll_down_btn-animation {
  0% {
    transform: translate(0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.video-wrapper {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  box-shadow: 0 3px 20px 20px rgba(0, 0, 0, .18);
  pointer-events: none;
  margin-bottom: 24px;
  z-index: 1;
}

@media (max-width: 780px) and (orientation: portrait) {
  .header .header-all {
    width: 100%;
    display: block;
    position: absolute;
  }
}

@media (max-width: 780px) and (orientation: portrait) {
  .header .header-all .container .big-text {
    margin: 0;
    padding-top: 120px;
    font-size: 40px;
    line-height: 60px;
  }
}

@media (max-width: 780px) and (orientation: portrait) {
  .header .header-all .container .small-text {
    padding: 30px 0;
    font-size: 14px;
    line-height: 21px;
    margin-top: 0;
  }
}

@media (max-width: 780px) and (orientation: portrait) {
  .header .scroll_down {
    display: none;
  }
}

@media (orientation: landscape) and (max-height: 600px) {
  .header .scroll_down {
    display: none;
  }
}

@media (orientation: landscape) and (max-height: 460px) {
  .header .header-all {
    width: 100%;
    display: block;
    position: absolute;
  }
}

@media (orientation: landscape) and (max-height: 460px) {
  .header .header-all .container .big-text {
    margin: 0;
    padding-top: 120px;
    font-size: 40px;
    line-height: 60px;
  }
}

@media (orientation: landscape) and (max-height: 460px) {
  .header .header-all .container .small-text {
    padding: 30px 0;
    font-size: 14px;
    line-height: 21px;
    margin-top: 0;
  }
}

</style>
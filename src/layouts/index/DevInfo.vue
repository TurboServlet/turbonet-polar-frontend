<script setup>

import {onMounted, ref} from "vue";

const membersContainer = ref(null);

onMounted(() => {
  if (membersContainer.value) {
    membersContainer.value.addEventListener('wheel', (e) => {
      if ((e.deltaY < 0 && membersContainer.value.scrollLeft <= 0) ||
          (e.deltaY > 0 && membersContainer.value.scrollLeft + membersContainer.value.offsetWidth >= membersContainer.value.scrollWidth)) {
        return;
      }
      e.preventDefault();
      membersContainer.value.scrollBy({left: 4 * e.deltaY, behavior: 'smooth'});
    });
  }
})

function scrollToLeft() {
  if (membersContainer.value) {
    membersContainer.value.scrollBy({left: -195, behavior: 'smooth'});
  }
}

function scrollToRight() {
  if (membersContainer.value) {
    membersContainer.value.scrollBy({left: 195, behavior: 'smooth'});
  }
}

</script>

<template>
  <div class="card bg-base-100 home-self-intro shadow-2xl"><br>
    <div class="card-title home-intro-title mb-1">{{ $t('devInfo.title') }}</div>
    <div class="card-body home-intro-content">TurboNET
      <span class="font-bold" style="color: oklch(var(--p))">Polar <i class="fa-solid fa-meteor"></i></span>
      {{ $t('devInfo.context.1') }}<br>
      {{ $t('devInfo.context.2') }}<br>
      {{ $t('devInfo.context.3') }}
    </div>
    <div class="scroll-container">
      <div class="members" ref="membersContainer">
        <div class="member"><img class="member-image"
                                 src="https://q.qlogo.cn/headimg_dl?dst_uin=752779988&amp;spec=640&amp;img_type=jpg"
                                 alt="Ctrlcvs">
          <div class="member-name"><a class="contributor-link" href="https://github.com/CtrlcvsNya">Ctrlcvs🧊&nbsp;<i
              class="fa-brands fa-github"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.ctrlcvs') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="https://q.qlogo.cn/headimg_dl?dst_uin=1034868772&amp;spec=640&amp;img_type=jpg"
                                 alt="Kiwi">
          <div class="member-name"><a class="contributor-link" href="https://github.com/moeKiwiSAMA">🥝 Kiwi is not
            tasty.&nbsp;<i
                class="fa-brands fa-github"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.kiwi') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="https://avatars.githubusercontent.com/u/49825304?v=4"
                                 alt="404">
          <div class="member-name"><a class="contributor-link" href="https://github.com/Shaped404">Shaped404&nbsp;<i
              class="fa-brands fa-github"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.404') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="https://q.qlogo.cn/headimg_dl?dst_uin=3034582021&amp;spec=640&amp;img_type=jpg"
                                 alt="apple">
          <div class="member-name"><a class="contributor-link" href="https://github.com/Apple-QAQ">Apple.catwaii()&nbsp;<i
              class="fa-brands fa-github"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.apple') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="https://q.qlogo.cn/headimg_dl?dst_uin=953743075&amp;spec=640&amp;img_type=jpg"
                                 alt="taojiu">
          <div class="member-name"><a class="contributor-link" href="https://github.com/luoyeye001">桃玖不酒 <i
              class="fa-brands fa-github"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.taojiu') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="https://q.qlogo.cn/headimg_dl?dst_uin=3501007365&amp;spec=640&amp;img_type=jpg"
                                 alt="yuuluo">
          <div class="member-name"><a class="contributor-link" href="https://github.com/YuuLuo">雨落 <i
              class="fa-brands fa-github"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.yuuluo') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="https://q.qlogo.cn/headimg_dl?dst_uin=1148850688&amp;spec=640&amp;img_type=jpg"
                                 alt="tenshi">
          <div class="member-name"><a class="contributor-link" href="https://x.com/Strelexia">申必名居天子 <i
              class="fa-brands fa-twitter"></i></a></div>
          <div class="member-role">{{ $t('devInfo.devContext.tenshi') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.contributor-link {
  color: inherit;
  text-decoration: inherit;
  transition: color 0.2s ease;
}

.contributor-link:hover {
  color: oklch(var(--in))
}

.home-self-intro {
  margin: 40px;
  border-radius: 18px;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.home-self-intro .home-intro-title {
  font-size: 30px;
  padding-left: 30px;
  padding-top: 5px;
}

.home-self-intro .home-intro-content {
  display: inline;
  flex-direction: column;
  padding: 10px 30px 30px 30px;
  justify-content: center;
  overflow: auto;
}

.home-self-intro .scroll-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-self-intro .members {
  z-index: 1;
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 70px;
  display: flex;
  width: 95%;
  overflow: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.home-self-intro .member {
  flex: 0 0 auto;
  width: 200px;
  height: 200px;
  padding-right: 25px;
  position: relative;
}

.home-self-intro .member-image {
  width: 170px;
  height: 170px;
  overflow: hidden;
  position: relative;
  border-radius: 18px;
}

.home-self-intro .member-name {
  font-weight: 700;
  padding-top: 8px;
  text-align: center;
}

.home-self-intro .member-role {
  padding-top: 5px;
  text-align: center;
}
</style>
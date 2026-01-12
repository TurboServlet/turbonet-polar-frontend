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
    <div class="card-title home-intro-title mb-1">{{ $t('cooperatorInfo.title') }}</div>
    <div class="card-body home-intro-content">
      {{ $t('cooperatorInfo.context.1') }}<br>
      {{ $t('cooperatorInfo.context.2') }}<br>
      {{ $t('cooperatorInfo.context.3') }}
      <a class="font-bold inline-block text-green-500" href="https://api.sys-allnet.com/swagger-ui/index.html#/">
        <svg width="20px" class="inline-block" fill="rgb(34 197 94 / var(--tw-text-opacity))" viewBox="0 0 24 24" role="none" xmlns="http://www.w3.org/2000/svg">
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c6.616 0 12-5.383 12-12S18.616 0 12 0zm0 1.144c5.995 0 10.856 4.86 10.856 10.856 0 5.995-4.86 10.856-10.856 10.856-5.996 0-10.856-4.86-10.856-10.856C1.144 6.004 6.004 1.144 12 1.144zM8.37 5.868a6.707 6.707 0 0 0-.423.005c-.983.056-1.573.517-1.735 1.472-.115.665-.096 1.348-.143 2.017-.013.35-.05.697-.115 1.038-.134.609-.397.798-1.016.83a2.65 2.65 0 0 0-.244.042v1.463c1.126.055 1.278.452 1.37 1.629.033.429-.013.858.015 1.287.018.406.073.808.156 1.2.259 1.075 1.307 1.435 2.575 1.218v-1.283c-.203 0-.383.005-.558 0-.43-.013-.591-.12-.632-.535-.056-.535-.042-1.08-.075-1.62-.064-1.001-.175-1.988-1.153-2.625.503-.37.868-.812.983-1.398.083-.41.134-.821.166-1.237.028-.415-.023-.84.014-1.25.06-.665.102-.937.9-.91.12 0 .235-.017.369-.027v-1.31c-.16 0-.31-.004-.454-.006zm7.593.009a4.247 4.247 0 0 0-.813.06v1.274c.245 0 .434 0 .623.005.328.004.577.13.61.494.032.332.031.669.064 1.006.065.669.101 1.347.217 2.007.102.544.475.95.941 1.283-.817.549-1.057 1.333-1.098 2.215-.023.604-.037 1.213-.069 1.822-.028.554-.222.734-.78.748-.157.004-.31.018-.484.028v1.305c.327 0 .627.019.927 0 .932-.055 1.495-.507 1.68-1.412.078-.498.124-1 .138-1.504.032-.461.028-.927.074-1.384.069-.715.397-1.01 1.112-1.057a.972.972 0 0 0 .199-.046v-1.463c-.12-.014-.204-.027-.291-.032-.536-.023-.804-.203-.937-.71a5.146 5.146 0 0 1-.152-.993c-.037-.618-.033-1.241-.074-1.86-.08-1.192-.794-1.753-1.887-1.786zm-6.89 5.28a.844.844 0 0 0-.083 1.684h.055a.83.83 0 0 0 .877-.78v-.046a.845.845 0 0 0-.83-.858zm2.911 0a.808.808 0 0 0-.834.78c0 .027 0 .05.004.078 0 .503.342.826.859.826.507 0 .826-.332.826-.853-.005-.503-.342-.836-.855-.831zm2.963 0a.861.861 0 0 0-.876.835c0 .47.378.849.849.849h.009c.425.074.853-.337.881-.83.023-.457-.392-.854-.863-.854z"/>
        </svg>&nbsp;Swagger V3</a> {{ $t('cooperatorInfo.context.4') }} <a class="text-primary font-bold" href="https://github.com/TurboServlet"><i class="fa-brands fa-github"></i> TurboServlet</a> {{ $t('cooperatorInfo.context.5') }}
    </div>
    <div class="scroll-container">
      <div class="members" ref="membersContainer">
        <div class="member"><img class="member-image"
                                 src="/img/logo/2078.jfif"
                                 alt="2078">
          <div class="member-name"><span class="contributor-link">2078</span></div>
          <div class="member-role">{{ $t('cooperatorInfo.partner') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="/img/logo/ProjectSalt.jfif"
                                 alt="Project-Salt">
          <div class="member-name"><span class="contributor-link">Project-Salt</span></div>
          <div class="member-role">{{ $t('cooperatorInfo.partner') }}</div>
        </div>
        <div class="member"><img class="member-image"
                                 src="/img/logo/salt.jpg"
                                 alt="Project-Salt">
          <div class="member-name"><span class="contributor-link">Salt Bot</span></div>
          <div class="member-role">{{ $t('cooperatorInfo.partner') }}</div>
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
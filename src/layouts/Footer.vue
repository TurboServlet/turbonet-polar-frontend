<script setup>

</script>

<template>
  <footer class="footer footer-center bg-primary text-primary-content p-10">
    <aside>
      <img src="/img/logo.png" style="width: 60px" load="async">
      <p class="font-bold">
        TurboServlet
        <br/>
        WE DO WHAT SEGA DON'T.
      </p>
      <p>© TurboServlet 2024。保留所有权利。网站上显示的所有商标、标识和服务标记如若侵权，请联系我们 ctrlcvs@uwu.cat。</p>
    </aside>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a target="_blank" href="https://github.com/TurboServlet">
          Github <i class="fa-brands fa-github"></i>
        </a>
        <router-link to="/tos" target="_blank">
          使用条款
        </router-link>
        <router-link to="/privacy" target="_blank">
          隐私政策
        </router-link>
      </div>
    </nav>
  </footer>
</template>

<style scoped>

</style>
<script setup>

</script>

<template>
  <footer class="footer footer-center bg-primary text-primary-content p-10">
    <aside>
      <img src="/img/logo.png" style="width: 120px" load="async">
      <p class="font-bold">
        TurboServlet
        <br/>
        WE DO WHAT SEGA DON'T.
      </p>
      <p>{{ $t('footer.contact', {email: "ctrlcvs@uwu.cat"}) }}</p>
    </aside>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a target="_blank" href="https://github.com/TurboServlet">
          Github <i class="fa-brands fa-github"></i>
        </a>
        <router-link to="/tos" target="_blank">
          {{ $t('footer.tos') }}
        </router-link>
        <router-link to="/privacy" target="_blank">
          {{ $t('footer.privacy') }}
        </router-link>
      </div>
    </nav>
  </footer>
</template>

<style scoped>

</style>
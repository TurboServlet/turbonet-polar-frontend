<script setup>

import ThemeChanger from "@/components/themeChanger.vue";
import Footer from "@/layouts/Footer.vue";
</script>

<template>
  <div class="max-w-[1000px] m-auto my-20">
    <themeChanger/>
    <div class="card prose max-w-none w-full shadow-2xl bg-base-200 text-wrap break-words overflow-hidden p-8">
      <h1>{{ $t('termsofservice.title') }}</h1>

      <p>{{ $t('termsofservice.introduction.p1') }}</p>
      <p>{{ $t('termsofservice.introduction.p2') }}</p>
      <p>
        {{ $t('termsofservice.introduction.p3') }}
        <router-link to="/privacy" class="">
          {{ $t('footer.privacy') }}
        </router-link>
      </p>

      <h2>{{ $t('termsofservice.serviceDescription.title') }}</h2>
      <p>{{ $t('termsofservice.serviceDescription.p1') }}</p>
      <p>{{ $t('termsofservice.serviceDescription.p2') }}</p>

      <h2>{{ $t('termsofservice.modification.title') }}</h2>
      <p>{{ $t('termsofservice.modification.p1') }}</p>
      <p>{{ $t('termsofservice.modification.p2') }}</p>

      <h2>{{ $t('termsofservice.serviceModification.title') }}</h2>
      <p>{{ $t('termsofservice.serviceModification.p1') }}</p>
      <p>{{ $t('termsofservice.serviceModification.p2') }}</p>

      <h2>{{ $t('termsofservice.disclaimer.title') }}</h2>
      <p>{{ $t('termsofservice.disclaimer.p1') }}</p>
      <p>{{ $t('termsofservice.disclaimer.p2') }}</p>
      <p>{{ $t('termsofservice.disclaimer.p3') }}</p>

      <h2>{{ $t('termsofservice.liability.title') }}</h2>
      <p>{{ $t('termsofservice.liability.p1') }}</p>
      <p>{{ $t('termsofservice.liability.p2') }}</p>
      <p>{{ $t('termsofservice.liability.p3') }}</p>
      <p>{{ $t('termsofservice.liability.p4') }}</p>
      <p>{{ $t('termsofservice.liability.p5') }}</p>
      <p>{{ $t('termsofservice.liability.p6') }}</p>
      <p>{{ $t('termsofservice.liability.p7') }}</p>
      <p>{{ $t('termsofservice.liability.p8') }}</p>

      <h2>{{ $t('termsofservice.clientInstallation.title') }}</h2>
      <p>{{ $t('termsofservice.clientInstallation.p1') }}</p>

      <h2>{{ $t('termsofservice.siteContent.title') }}</h2>
      <p>{{ $t('termsofservice.siteContent.p1') }}</p>

      <h2>{{ $t('termsofservice.userContent.title') }}</h2>
      <p>{{ $t('termsofservice.userContent.p1') }}</p>
      <p>{{ $t('termsofservice.userContent.p2') }}</p>
      <p>{{ $t('termsofservice.userContent.p3') }}</p>

      <h2>{{ $t('termsofservice.privacyPolicy.title') }}</h2>
      <p>
        {{ $t('termsofservice.privacyPolicy.p1') }}
        <router-link to="/privacy" class="">
          {{ $t('footer.privacy') }}
        </router-link>
      </p>

      <h2>{{ $t('termsofservice.proprietaryRights.title') }}</h2>
      <p>{{ $t('termsofservice.proprietaryRights.p1') }}</p>
      <p>{{ $t('termsofservice.proprietaryRights.p2') }}</p>

      <h2>{{ $t('termsofservice.links.title') }}</h2>
      <p>{{ $t('termsofservice.links.p1') }}</p>
      <p>{{ $t('termsofservice.links.p2') }}</p>
      <p>{{ $t('termsofservice.links.p3') }}</p>

      <h2>{{ $t('termsofservice.governingLaw.title') }}</h2>
      <p>{{ $t('termsofservice.governingLaw.p1') }}</p>

      <h2>{{ $t('termsofservice.acknowledgement.title') }}</h2>
      <p>{{ $t('termsofservice.acknowledgement.p1') }}</p>
    </div>
  </div>
  <Footer/>
</template>

<style scoped>
</style>
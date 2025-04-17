<script setup>

import HeadModule from "@/components/headModule.vue";
import Footer from "@/layouts/Footer.vue";
</script>

<template>
  <div class="max-w-[1000px] m-auto my-20">
    <HeadModule/>
    <div class="card prose max-w-none w-full shadow-2xl bg-base-200 text-wrap break-words overflow-hidden p-8">
      <h1>{{ $t('privacy.title') }}</h1>
      <p>
        {{ $t('privacy.intro-1') }}
      </p>
      <p>
        {{ $t('privacy.intro-2.beforeLink') }}
        <router-link to="/tos">{{ $t('termsofservice.title') }}</router-link>
        {{ $t('privacy.intro-2.betweenLink') }}
        <router-link to="/tos">{{ $t('termsofservice.title') }}</router-link>
        {{ $t('privacy.intro-2.afterLink') }}
      </p>

      <h2>{{ $t('privacy.collect-info.title') }}</h2>

      <h3>{{ $t('privacy.collect-info.play.title') }}</h3>
      <p>{{ $t('privacy.collect-info.play.desc') }}</p>
      <ol>
        <li>{{ $t('privacy.collect-info.play.list.1') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.2') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.3') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.4') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.5') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.6') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.7') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.8') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.9') }}</li>
        <li>{{ $t('privacy.collect-info.play.list.10') }}</li>
      </ol>
      <p>{{ $t('privacy.collect-info.play.note') }}</p>

      <h3>{{ $t('privacy.collect-info.register.title') }}</h3>
      <p>{{ $t('privacy.collect-info.register.desc') }}</p>
      <ol>
        <li>{{ $t('privacy.collect-info.register.list.1') }}</li>
        <li>{{ $t('privacy.collect-info.register.list.2') }}</li>
        <li>{{ $t('privacy.collect-info.register.list.3') }}</li>
        <li>{{ $t('privacy.collect-info.register.list.4') }}</li>
        <li>{{ $t('privacy.collect-info.register.list.5') }}</li>
      </ol>
      <p>{{ $t('privacy.collect-info.register.note') }}</p>

      <h3>{{ $t('privacy.collect-info.login.title') }}</h3>
      <p>{{ $t('privacy.collect-info.login.desc') }}</p>
      <ol>
        <li>{{ $t('privacy.collect-info.login.list.1') }}</li>
      </ol>
      <p>{{ $t('privacy.collect-info.login.note') }}</p>

      <h2>{{ $t('privacy.disclosure.title') }}</h2>
      <p>{{ $t('privacy.disclosure.desc') }}</p>
      <ol>
        <li>{{ $t('privacy.disclosure.list.1') }}</li>
        <li>{{ $t('privacy.disclosure.list.2') }}</li>
        <li>{{ $t('privacy.disclosure.list.3') }}</li>
        <li>
          {{ $t('privacy.disclosure.list.4.beforeLink') }}
          <router-link to="/tos">{{ $t('termsofservice.title') }}</router-link>
          {{ $t('privacy.disclosure.list.4.afterLink') }}
        </li>
        <li>
          {{ $t('privacy.disclosure.list.5.beforeLink') }}
          <router-link to="/tos">{{ $t('termsofservice.title') }}</router-link>
          {{ $t('privacy.disclosure.list.5.afterLink') }}
        </li>
      </ol>

      <h2>{{ $t('privacy.cookies.title') }}</h2>
      <p>{{ $t('privacy.cookies.desc') }}</p>

      <h2>{{ $t('privacy.data-security.title') }}</h2>
      <p>{{ $t('privacy.data-security.desc') }}</p>

      <h2>{{ $t('privacy.policy-update.title') }}</h2>
      <p>{{ $t('privacy.policy-update.desc') }}</p>
    </div>

  </div>
  <Footer/>
</template>

<style scoped>
</style>
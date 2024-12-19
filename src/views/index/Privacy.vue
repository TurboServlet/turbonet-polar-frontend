<script setup>

import ThemeChanger from "@/components/themeChanger.vue";
import Footer from "@/layouts/Footer.vue";
</script>

<template>
  <div class="max-w-[1000px] m-auto my-20">
    <themeChanger/>
    <div class="card prose max-w-none w-full shadow-2xl bg-base-200 text-wrap break-words overflow-hidden p-8">
      <h1>隐私政策</h1>
      <p>Turbo
        为了提供服务，我们不得不经常收集、存储和传输个人信息。我们持续努力使这个过程尽可能透明化。</p>
      <p> 在使用我们的服务前，您必须确认您已阅读并理解 <router-link to="/tos">使用条款</router-link>
        和隐私政策，包括我们如何以及为何使用您的信息，且您使用服务的行为均受到 <router-link to="/tos">使用条款</router-link> 和隐私政策约束。
      </p>
      <h2>我们收集的信息</h2>
      <h3>游玩</h3>
      <p>在您游玩时，由于缓存的需要，我们会收集并储存您的：</p>
      <ol>
        <li>用户ID</li>
        <li>游玩时间</li>
        <li>账号信息</li>
        <li>游玩歌曲成绩</li>
        <li>账号流速及其他设置</li>
        <li>账号背包</li>
        <li>区域完成进度</li>
        <li>集章情况</li>
        <li>游玩记录</li>
        <li>上传日志</li>
      </ol>
      <p>
        您的用户ID永远不会向任何人可见，上传日志、集章情况、账号流速及其他设置将不会被公开，游玩时间、账号信息、游玩歌曲成绩、账号背包、区域完成进度、游玩记录会根据你的意愿决定可能用于网站内容的更新与展示，以提升用户体验和系统功能。</p>
      <h3>注册网页</h3>
      <p>在您注册账号时，我们将会收集并储存您的：</p>
      <ol>
        <li>用户ID</li>
        <li>用户名</li>
        <li>邮箱地址</li>
        <li>密码（使用 SHA256 SALT 不可逆加密储存）</li>
        <li>注册时间</li>
      </ol>
      <p>您的用户ID永远不会向任何人可见，只有您的用户名会被公开。我们不会将您的邮箱地址售卖给第三方。</p>
      <h3>登录</h3>
      <p>在您登录时，我们会收集并储存您的：</p>
      <ol>
        <li>IP 地址</li>
      </ol>
      <p>您的 IP 永远不会向任何人可见。</p>
      <h2>关于您隐私的披露</h2>
      <p>我们不会在未经您允许的情况下披露您的隐私，但以下内容除外：</p>
      <ol>
        <li>您的用户名、注册和登录时间、游玩时间、账号信息、游玩歌曲成绩、游玩记录（均可以在网页选择是否披露）。</li>
        <li>您明确表达愿意披露的信息。</li>
        <li>根据法律的有关规定或行政或司法机构的要求，需要向第三方或者行政、司法机构披露</li>
        <li> 您出现违反中国有关法律、法规或者 Turbo <router-link to="/tos">使用条款</router-link> 或相关规则的情况，需要向第三方披露
        </li>
        <li> 其他为执行 <router-link to="/tos">使用条款</router-link> 而需要披露的信息。
        </li>
      </ol>
      <h2>Cookies</h2>
      <p>我们不使用 cookies 来追踪您的在线活动。</p>
      <h2>数据安全</h2>
      <p>我们致力于保证您的信息安全，然而任何系统均不可能保证不可被攻击。即使出现不可抗因素导致 Turbo
        被攻击，我们也会尽全力防止您的信息泄露。</p>
      <h2>政策更新</h2>
      <p>我们保留更新此隐私政策的权利。若有更新，我们将会在网站和应用上通知。</p>
    </div>
  </div>
  <Footer/>
</template>

<style scoped>
</style>
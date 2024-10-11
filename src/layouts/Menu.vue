<script setup>

import {useRouter} from "vue-router";
import {toRef} from "vue";

const router = useRouter()

function handleSelect(index) {
  router.push(index)
}

const props = defineProps({
  turboName: {
    type: String,
    required: true
  },
})

const turboName = toRef(props, 'turboName')

</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-side" style="height: unset; top: unset">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu max-sm:rounded-tl-none max-sm:rounded-bl-none bg-base-200 rounded-box w-56 menu-height overflow-auto" style="flex: unset !important;">
        <li>
          <router-link to="/panel">
            <i class="fa-solid fa-bullhorn text-orange-500"></i> 讯息
          </router-link>
        </li>
        <li>
          <router-link to="/turboPermission">
            <i class="fa-solid fa-user-gear text-red-500"></i> 用户权限
          </router-link>
        </li>
        <li>
          <router-link to="/botManager">
            <i class="fa-solid fa-robot text-blue-500"></i> BOT管理
          </router-link>
        </li>
        <li>
          <router-link to="/arcadeInfo"><i class="fa-solid fa-sitemap text-pink-500"></i> 机厅信息</router-link>
        </li>
        <li>
          <details open>
            <summary>
              <i class="fa-solid fa-gamepad text-fuchsia-500"></i> 舞萌相关
            </summary>
            <ul>
              <li>
                <router-link :to="`/u/${turboName}`"><i class="fa-solid fa-user"></i> <span
                    class="overflow-hidden text-ellipsis whitespace-nowrap">{{ turboName }}</span></router-link>
              </li>
              <li>
                <router-link to="/photos"><i class="fa-solid fa-camera-retro"></i> 相片</router-link>
              </li>
              <li>
                <router-link to="/records"><i class="fa-regular fa-file-lines"></i> 游戏记录</router-link>
              </li>
              <li>
                <details open>
                  <summary><i class="fa-solid fa-medal"></i> 排行榜</summary>
                  <ul>
                    <li>
                      <router-link to="/dxRatingRanking">DX RATING排行榜</router-link>
                    </li>
                    <li>
                      <router-link to="/achievementRanking">总分数排行榜</router-link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary><i class="fa-solid fa-toolbox text-teal-500"></i> 加速盒子功能</summary>
            <ul>
              <li>
                <router-link to="/changeMaimaiName"><i class="fa-solid fa-pen-to-square"></i> 更改舞萌名称</router-link>
              </li>
              <li>
                <router-link to="/changeAvatar"><i class="fa-regular fa-id-card"></i> 更改头像</router-link>
              </li>
              <li>
                <details open>
                  <summary><i class="fa-solid fa-ticket"></i> 功能票</summary>
                  <ul>
                    <li>
                      <router-link to="/currentTickets">当前持有的功能票</router-link>
                    </li>
                    <li>
                      <router-link to="/setTickets">设置功能票</router-link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <router-link to="/qrCommand"><i class="fa-solid fa-qrcode"></i> 指令二维码</router-link>
              </li>
<!--              <li>-->
<!--                <details open>-->
<!--                  <summary><i class="fa-solid fa-upload"></i> 查分器上传</summary>-->
<!--                  <ul>-->
<!--                    <li>-->
<!--                      <router-link to="/DivingFishUpload">水鱼查分器上传</router-link>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <router-link to="/LxnsUpload">落雪查分器上传</router-link>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </details>-->
<!--              </li>-->
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary><i class="fa-solid fa-user-group text-sky-500"></i> NET好友</summary>
            <ul>
              <li>
                <router-link to="/friends"><i class="fa-solid fa-address-book"></i> 我的好友</router-link>
              </li>
              <li>
                <router-link to="/addFriends"><i class="fa-solid fa-user-plus"></i> 添加好友</router-link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary><i class="fa-solid fa-globe text-lime-500"></i> 网络状态</summary>
            <ul>
              <li>
                <router-link to="/networkStatus"><i class="fa-solid fa-ethernet"></i> 机厅网络状态</router-link>
              </li>
              <li>
                <router-link to="/serverRequests"><i class="fa-solid fa-server"></i> 服务器请求统计</router-link>
              </li>
            </ul>
          </details>
        </li>
        <div class="mt-32"></div>
      </ul>
    </div>
  </div>
</template>


<style scoped>

.menu-height {
  height: calc(100vh - 64px - 35px);
  overflow-y: auto;
  scrollbar-width: none;
  flex-wrap: unset;
}

@media (min-width: 640px) {
  .lg\:drawer-open > .drawer-toggle {
    display: none;
  }
}

@media (min-width: 640px) {
  .lg\:drawer-open > .drawer-toggle:checked ~ .drawer-side {
    pointer-events: auto;
    visibility: visible;
  }
}

@media (min-width: 640px) {
  .lg\:drawer-open > .drawer-toggle ~ .drawer-side {
    pointer-events: auto;
    visibility: visible;
    position: sticky;
    display: block;
    width: auto;
    overscroll-behavior: auto;
  }
}

@media (min-width: 640px) {
  .lg\:drawer-open > .drawer-toggle ~ .drawer-side > .drawer-overlay {
    cursor: default;
    background-color: transparent;
  }
}

@media (min-width: 640px) {
  .lg\:drawer-open > .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay) {
    transform: translateX(0%);
  }
}

</style>
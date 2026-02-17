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
    <input id="my-drawer-2" class="drawer-toggle" type="checkbox"/>
    <div class="drawer-side" style="height: unset; top: unset">
      <label aria-label="close sidebar" class="drawer-overlay" for="my-drawer-2"></label>
      <ul class="menu max-sm:rounded-tl-none max-sm:rounded-bl-none bg-base-100 rounded-box w-56 menu-height overflow-auto"
          style="flex: unset !important;">
        <li>
          <router-link to="/panel">
            <i class="fa-solid fa-bullhorn text-orange-500"></i> {{ $t('menu.panel') }}
          </router-link>
        </li>
        <li>
          <router-link to="/turboPermission">
            <i class="fa-solid fa-user-gear text-red-500"></i> {{ $t('menu.turboPermission') }}
          </router-link>
        </li>
        <li>
          <router-link to="/botManager">
            <i class="fa-solid fa-robot text-blue-500"></i> {{ $t('menu.botManager') }}
          </router-link>
        </li>
        <li>
          <router-link to="/serverRequests">
            <i class="fa-solid fa-server text-lime-500"></i> {{ $t('menu.serverRequests') }}
          </router-link>
        </li>
        <li>
          <details open>
            <summary><i class="fa-solid fa-rectangle-list text-pink-500"></i> {{ $t('menu.arcade.title') }}</summary>
            <ul>
              <li>
                <router-link to="/arcadeInfo"><i class="fa-solid fa-sitemap"></i> {{ $t('menu.arcade.info') }}</router-link>
              </li>
              <li>
                <router-link to="/arcadeAlias"><i class="fa-solid fa-table"></i> {{ $t('menu.arcade.alias') }}</router-link>
              </li>
              <li>
                <router-link to="/networkStatus"><i class="fa-solid fa-ethernet"></i> {{ $t('menu.arcade.networkStatus') }}</router-link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>
              <i class="fa-solid fa-gamepad text-fuchsia-500"></i> {{ $t('menu.maimai.title') }}
            </summary>
            <ul>
              <li>
                <router-link :to="`/u/${turboName}`"><i class="fa-solid fa-user"></i> <span
                    class="overflow-hidden text-ellipsis whitespace-nowrap">{{ turboName }}</span></router-link>
              </li>
              <li>
                <router-link to="/photos"><i class="fa-solid fa-camera-retro"></i> {{ $t('menu.maimai.photos') }}</router-link>
              </li>
              <li>
                <router-link to="/records"><i class="fa-regular fa-file-lines"></i> {{ $t('menu.maimai.records') }}</router-link>
              </li>
              <li>
                <details open>
                  <summary><i class="fa-solid fa-medal"></i> {{ $t('menu.ranking.title') }}</summary>
                  <ul>
                    <li>
                      <router-link to="/dxRatingRanking">{{ $t('menu.ranking.dxRatingRanking') }}</router-link>
                    </li>
                    <li>
                      <router-link to="/achievementRanking">{{ $t('menu.ranking.achievementRanking') }}</router-link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary><i class="fa-solid fa-toolbox text-teal-500"></i> {{ $t('menu.turbo.title') }}</summary>
            <ul>
              <li>
                <router-link to="/changeMaimaiName"><i class="fa-solid fa-pen-to-square"></i> {{ $t('menu.turbo.changeMaimaiName') }}</router-link>
              </li>
              <li>
                <router-link to="/changeAvatar"><i class="fa-regular fa-id-card"></i> {{ $t('menu.turbo.changeAvatar') }}</router-link>
              </li>
              <li>
                <details open>
                  <summary><i class="fa-solid fa-ticket"></i> {{ $t('menu.tickets.title') }}</summary>
                  <ul>
                    <li>
                      <router-link to="/currentTickets">{{ $t('menu.tickets.currentTickets') }}</router-link>
                    </li>
                    <li>
                      <router-link to="/setTickets">{{ $t('menu.tickets.setTickets') }}</router-link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <router-link to="/qrCommand"><i class="fa-solid fa-qrcode"></i> {{ $t('menu.qrCommand') }}</router-link>
              </li>
                            <li>
                              <details open>
                                <summary><i class="fa-solid fa-upload"></i> {{ $t('menu.upload.title') }}</summary>
                                <ul>
                                  <li>
                                    <router-link to="/DivingFishUpload">{{ $t('menu.upload.divingFishUpload') }}</router-link>
                                  </li>
                                  <li>
                                    <router-link to="/LxnsUpload">{{ $t('menu.upload.lxnsUpload') }}</router-link>
                                  </li>
                                </ul>
                              </details>
                            </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary><i class="fa-solid fa-user-group text-sky-500"></i> {{ $t('menu.friends.title') }}</summary>
            <ul>
              <li>
                <router-link to="/friends"><i class="fa-solid fa-address-book"></i> {{ $t('menu.friends.friends') }}</router-link>
              </li>
              <li>
                <router-link to="/addFriends"><i class="fa-solid fa-user-plus"></i> {{ $t('menu.friends.addFriends') }}</router-link>
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
  height: calc(100vh - 64px - 10px);
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
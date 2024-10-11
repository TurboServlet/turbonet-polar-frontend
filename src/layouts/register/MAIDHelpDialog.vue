<script setup>

import {closeDialogModal} from "@/assets/js/DialogManager.js";
</script>

<template>
  <dialog id="registerDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialogModal('registerDialog')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="mt-5"></div>
      <div class="info-box">
        <div class="mockup-phone phone-block">
          <div class="camera" style="width: 80px"></div>
          <div class="display" style="border-radius: 20px">
            <div class="artboard artboard-demo phone-px">
              <video autoplay loop muted src="/video/sgwcmaid.mp4" style="width: 600px; height: 400px; max-width: unset"></video>
            </div>
          </div>
        </div>
        <div class="divider divider-horizontal horizontal"></div>
        <div class="divider vertical"></div>
        <div class="text">
          <h3 class="text-lg font-bold">获取方法</h3>
          <p>
            - 打开「舞萌 | 中二」公众号<br>
            - 获取玩家二维码并点击<br>
            - 长按识别图中二维码<br>
            - 扫描结果复制到网站
          </p>
        </div>
      </div>
    </div>
    <div @click="closeDialogModal('registerDialog')" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<style scoped>

.phone-px {
  height: 343px;
  width: 155px;
}

.phone-block {
  border-radius: 30px;
}

@media (max-width: 640px) {
  .phone-block {
    margin: 0 0 20px 0
  }

  .horizontal {
    display: none;
  }

  .text {
    margin: unset;
  }

  .info-box {
    text-align: center;
  }

}

@media (min-width: 640px) {

  .text {
    margin: 0 20px 20px 0;
  }

  .phone-block {
    margin: 0 0 20px 20px
  }

  .vertical {
    display: none;
  }

  .info-box {
    display: flex;
    justify-content: space-between;
  }
}

</style>
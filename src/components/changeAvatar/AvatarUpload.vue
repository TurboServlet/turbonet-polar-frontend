<template>
  <dialog id="avatarUpload" ref="avatarDialog" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeDialog" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ $t('changeAvatar.dialogTitle') }}</h3>
      <div class="avatar-container">
        <div v-show="!options.img">
          <div class="flex flex-col items-center">
            <!-- 自定义上传按钮 -->
            <button class="btn max-sm:btn-sm btn-primary" @click="triggerFileUpload">{{ $t('changeAvatar.selectPhoto') }}</button>

            <!-- 隐藏的 input 文件上传 -->
            <input
                type="file"
                ref="fileInput"
                accept="image/jpeg, image/jpg"
                @change="upload"
                class="hidden"
            />
          </div>
        </div>
        <div v-show="options.img" class="avatar-crop">
          <vueCropper
              class="crop-box"
              ref="cropper"
              :img="options.img"
              :autoCrop="options.autoCrop"
              :fixedBox="options.fixedBox"
              :canMoveBox="options.canMoveBox"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :centerBox="options.centerBox"
              :fixed="options.fixed"
              :fixedNumber="options.fixedNumber"
              :canMove="options.canMove"
              :canScale="options.canScale"
          ></vueCropper>
        </div>
      </div>
      <div class="modal-action flex">
        <button class="btn max-sm:btn-sm btn-active" @click="closeDialog">{{ $t('changeAvatar.button.cancel') }}</button>
        <button class="btn max-sm:btn-sm btn-active flex-1 btn-primary" @click="getCrop" :disabled="isSetBtnLoading">
          <span v-if="isSetBtnLoading" class="loading loading-spinner"/>
          {{ $t('changeAvatar.button.submit') }}</button>
      </div>
    </div>
    <div @click="closeDialog" class="modal-backdrop">
      <button>close</button>
    </div>
  </dialog>
</template>

<script lang="ts">
import {ref, reactive, onMounted, defineComponent} from "vue";
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import {sendPostRequest} from "@/assets/js/RequestHandler";
import {toast} from "vue-sonner";
import {closeDialogModal} from "@/assets/js/DialogManager.js";

export default defineComponent({
  components: {
    VueCropper,
  },
  setup() {
    const isSetBtnLoading = ref(false)
    const avatarDialog = ref<HTMLDialogElement | null>(null); // 明确指定类型
    const cropper = ref();
    const options = reactive({
      img: "",
      autoCrop: true,
      fixedBox: false,
      canMoveBox: true,
      autoCropWidth: 256,
      autoCropHeight: 256,
      fixed: true,
      fixedNumber: [1, 1],
      centerBox: true,
      canMove: false,
      canScale: true,
    });

    const fileInput = ref<HTMLInputElement | null>(null);

    const triggerFileUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const upload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files[0];
      const isIMAGE = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isIMAGE) {
        toast.warning("请选择 jpg 格式的图片");
        return false;
      }
      if (!isLt5M) {
        toast.warning("图片大小不能超过 5MB");
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        options.img = e.target.result as string;
      };
    };

    const getCrop = () => {
      cropper.value.getCropBlob((data) => {
        if (data) {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            let base64data = (reader.result as string).split(",")[1];

            const payload = {
              avatarBase64: base64data,
            };

            uploadApi(payload)
                .then((response) => {
              if (response.statusCode === 200) {
                toast.success('设置成功')
                isSetBtnLoading.value = false
                closeDialog()
              } else {
                toast.error(response.data)
                isSetBtnLoading.value = false
              }
            })
          };
        } else {
          toast.error("未知的错误，请重试")
          isSetBtnLoading.value = false
        }
      });
    };

    const uploadApi = (payload: { avatarBase64: string }) => {
      isSetBtnLoading.value = true
      return sendPostRequest("/web/setAvatar", payload, true);
    };

    const closeDialog = () => {
      closeDialogModal('avatarUpload')
      options.img = '';
      fileInput.value.value = ''
    };

    return {
      options,
      cropper,
      upload,
      getCrop,
      closeDialog,
      avatarDialog,
      fileInput,
      triggerFileUpload,
      isSetBtnLoading,
    };
  },
});
</script>


<style lang="scss" scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  border-radius: 4px;

  .avatar-crop {
    width: 300px;
    height: 300px;
    position: relative;

    .crop-box {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>

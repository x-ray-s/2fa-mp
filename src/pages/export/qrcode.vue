<script lang="ts" setup>
import wxcode from 'uniapp-qrcode'
import { useExportStore } from '@/stores/export'

const exportStore = useExportStore()

onMounted(() => {
  if (exportStore.raw) {
    wxcode.qrcode('qrcode', exportStore.raw, 640, 640)
  }
})

function handleClick() {
  uni.redirectTo({
    url: '/pages/index/index',
  })
}
</script>

<template>
  <div class="h-full px-4 py-6 sm:py-12">
    <div class="shrink-0">
      <h1 class="mb-4 text-center text-3xl">
        扫描此二维码
      </h1>
      <p class="my-5">
        在您的新设备上下载 Google Authenticator 应用或微信搜索 OTP动态码验证 小程序，然后从应用内扫描此二维码。
      </p>
    </div>
    <div class="flex justify-center">
      <canvas canvas-id="qrcode" class="code-item" />
    </div>
    <div class="mt-4 flex shrink-0 justify-end">
      <div
        class="m-0 rounded-sm border-none bg-blue-600 px-5 py-2 text-sm text-white "
        @click="handleClick"
      >
        完成
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-item {
  height: 640rpx;
  width: 640rpx;
}
</style>

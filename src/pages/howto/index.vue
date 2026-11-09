<script setup lang="ts">
import { ref } from 'vue'

const currentIndex = ref(0)

const slides = [
  {
    title: '为您加固安全屏障',
    description: '为您所有采用两步验证的账号获取验证码',
    icon: 'locked',
    gradient: 'linear-gradient(to right, #3b82f6, #2563eb)',
  },
  {
    title: '使用摄像头轻松完成设置',
    description: '若要设置账号，请前往 Google 或任何第三方服务的两步验证设置页面，然后扫描其中的二维码',
    icon: 'camera',
    gradient: 'linear-gradient(to right, #10b981, #059669)',
  },
  {
    title: '用于登录账号的唯一验证码',
    description: '使用两步验证时，您将需要输入您的密码和此应用提供的验证码',
    icon: 'auth',
    gradient: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
  },
  {
    title: '云同步',
    description: 'OTP 动态验证码小程序可将您的验证码保存到云端，您可随时同步和下载。',
    icon: 'cloud-upload',
    gradient: 'linear-gradient(to right, #f97316, #ea580c)',
  },
]

function handleSwiperChange(e: any) {
  currentIndex.value = e.detail.current
}

function handleNext() {
  if (currentIndex.value < slides.length - 1) {
    currentIndex.value++
  } else {
    handleSkip()
  }
}

function handleSkip() {
  uni.navigateBack()
}
</script>

<template>
  <view class="howto-container">
    <!-- Swiper 容器 -->
    <swiper
      class="howto-swiper"
      :current="currentIndex"
      :indicator-dots="true"
      :autoplay="false"
      :interval="3000"
      :duration="500"
      indicator-color="rgba(0, 0, 0, 0.3)"
      indicator-active-color="#3B82F6"
      @change="handleSwiperChange"
    >
      <swiper-item
        v-for="(slide, index) in slides"
        :key="index"
        class="howto-swiper-item"
      >
        <view class="howto-slide-content">
          <!-- 图标 -->
          <view
            class="howto-icon-container"
            :style="{ background: slide.gradient }"
          >
            <uni-icons :type="slide.icon" size="64" color="#fff" />
          </view>

          <!-- 标题 -->
          <text class="howto-title">
            {{ slide.title }}
          </text>

          <!-- 描述 -->
          <text class="howto-description">
            {{ slide.description }}
          </text>

          <!-- 步骤指示器 -->
          <view class="howto-step-indicator">
            <text class="howto-step-text">{{ index + 1 }} / {{ slides.length }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- 底部操作栏 -->
    <view class="howto-bottom-bar">
      <view class="howto-bottom-content">
        <!-- 跳过按钮 -->
        <view
          v-if="currentIndex < slides.length - 1"
          class="howto-skip-btn"
          @click="handleSkip"
        >
          <text class="howto-skip-text">跳过</text>
        </view>
        <view v-else class="howto-skip-btn-placeholder" />

        <!-- 下一步/完成按钮 -->
        <view
          class="howto-next-btn"
          @click="handleNext"
        >
          <text class="howto-next-text">{{ currentIndex < slides.length - 1 ? '下一步' : '完成' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.howto-container {
  width: 100vw;
  height: 100vh;
  background-color: #f9fafb;
  position: relative;
  overflow: hidden;
}

.howto-swiper {
  width: 100%;
  height: calc(100% - 80px); /* 为底部操作栏留出空间 */
}

.howto-swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.howto-slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 48px 32px;
  box-sizing: border-box;
}

.howto-icon-container {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.howto-title {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 24px;
  line-height: 1.4;
}

.howto-description {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.75;
  max-width: 400px;
  margin-bottom: 48px;
}

.howto-step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
}

.howto-step-text {
  font-size: 14px;
  color: #9ca3af;
}

.howto-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.howto-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
}

.howto-skip-btn {
  padding: 8px 24px;
  border-radius: 8px;
  background-color: transparent;
}

.howto-skip-btn:active {
  background-color: #f3f4f6;
}

.howto-skip-text {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
}

.howto-skip-btn-placeholder {
  width: 1px;
}

.howto-next-btn {
  padding: 8px 32px;
  border-radius: 8px;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}

.howto-next-btn:active {
  opacity: 0.9;
}

.howto-next-text {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}
</style>

<script setup lang="ts">
import packageJson from '../../../package.json'

const version = packageJson.version
const githubUrl = packageJson.homepage

function openGithub() {
  // #ifdef H5
  window.open(githubUrl, '_blank')
  // #endif
  // #ifdef MP-WEIXIN
  uni.setClipboardData({
    data: githubUrl,
    success: () => {
      uni.showToast({
        title: '地址已复制',
        icon: 'success',
      })
    },
  })
  // #endif
  // #ifndef H5 || MP-WEIXIN
  uni.setClipboardData({
    data: githubUrl,
    success: () => {
      uni.showToast({
        title: '地址已复制',
        icon: 'success',
      })
    },
  })
  // #endif
}
</script>

<template>
  <div class="h-full bg-gray-100 py-6 sm:py-12">
    <div class="relative h-full py-3 sm:mx-auto sm:max-w-xl">
      <div
        class="absolute inset-0 -skew-y-6 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
      <div class="relative h-full bg-white pb-6 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="mx-auto h-full max-w-md">
          <div class="flex h-full flex-col overflow-scroll">
            <!-- 头部 -->
            <div class="mb-6 text-center mt-6">
              <div class="mb-4 flex justify-center">
                <div class="flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                  <uni-icons type="locked" size="40" color="#fff" />
                </div>
              </div>
              <h1 class="mb-2 text-2xl font-bold text-gray-900">
                小程序 Authenticator
              </h1>
              <p class="text-sm text-gray-500">
                版本 {{ version }}
              </p>
            </div>

            <!-- 项目说明 -->
            <div class="mb-6 space-y-4">
              <div class="rounded-lg bg-gray-50 p-4">
                <h2 class="mb-2 text-lg font-semibold text-gray-900">
                  项目简介
                </h2>
                <p class="text-sm leading-6 text-gray-700">
                  一个功能完善的微信小程序双因素身份验证（2FA）应用，基于 TOTP（Time-based One-Time Password）算法，兼容 Google Authenticator。
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <h2 class="mb-2 text-lg font-semibold text-gray-900">
                  主要功能
                </h2>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li class="flex items-start">
                    <uni-icons type="checkmarkempty" size="16" color="#10B981" class="mr-2 mt-0.5 shrink-0" />
                    <span>TOTP 动态码生成，每30秒自动更新</span>
                  </li>
                  <li class="flex items-start">
                    <uni-icons type="checkmarkempty" size="16" color="#10B981" class="mr-2 mt-0.5 shrink-0" />
                    <span>支持多账号管理，二维码扫描和手动输入</span>
                  </li>
                  <li class="flex items-start">
                    <uni-icons type="checkmarkempty" size="16" color="#10B981" class="mr-2 mt-0.5 shrink-0" />
                    <span>导出为 Google Authenticator 格式，方便备份</span>
                  </li>
                  <li class="flex items-start">
                    <uni-icons type="checkmarkempty" size="16" color="#10B981" class="mr-2 mt-0.5 shrink-0" />
                    <span>所有数据存储在本地，保护隐私安全</span>
                  </li>
                  <li class="flex items-start">
                    <uni-icons type="checkmarkempty" size="16" color="#10B981" class="mr-2 mt-0.5 shrink-0" />
                    <span>代码开源可审查</span>
                  </li>
                </ul>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <h2 class="mb-2 text-lg font-semibold text-gray-900">
                  技术栈
                </h2>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">uni-app</span>
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">Vue 3</span>
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">TypeScript</span>
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">Tailwind CSS</span>
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">Pinia</span>
                </div>
              </div>
            </div>

            <!-- GitHub 链接 -->
            <div class="mt-auto px-5">
              <div
                class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-blue-500 bg-blue-50 p-4 transition-colors active:bg-blue-100"
                @click="openGithub"
              >
                <uni-icons type="link" size="20" color="#3B82F6" class="mr-2" />
                <span class="text-base font-medium text-blue-600">访问 GitHub 仓库</span>
                <uni-icons type="right" size="16" color="#3B82F6" class="ml-2" />
              </div>
              <p class="mt-2 text-center text-xs text-gray-500">
                {{ githubUrl }}
              </p>
            </div>

            <!-- 底部信息 -->
            <div class="mt-6 border-t border-gray-200 pt-4 text-center">
              <p class="text-xs text-gray-500">
                MIT License
              </p>
              <p class="mt-1 text-xs text-gray-400">
                © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保样式在小程序中正确显示 */
</style>

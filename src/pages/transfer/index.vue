<script setup lang="ts">
import { decode } from '@/utils/decode'
import { parseOtpUri } from '@/utils/totp'
import { storage } from '@/utils/storage'

const authCodes = ref<AuthCode[]>([])

onMounted(() => {
  const data = storage.get()
  if (data) {
    authCodes.value = data
  }
})

function importByData(data: string) {
  const arr = decode(data)
  if (arr && arr.length > 0) {
    return arr.map((item: any) => {
      return {
        name: item.name,
        secret: item.totpSecret,
        issuer: item.issuer,
      }
    })
  }
  return []
}

function handleExport() {
  if (authCodes.value.length === 0) {
    uni.showToast({
      title: '没有可导出的验证码',
      icon: 'none',
    })
    return
  }
  uni.navigateTo({
    url: '/pages/export/index',
  })
}

function handleImport() {
  uni.scanCode({
    success(res) {
      if (res.scanType === 'QR_CODE') {
        if (res.result.includes('otpauth://')) {
          // otpauth://totp/otplib-website:otplib-demo-user?secret=6BPYHH4FOYN2WUTJ&period=30&digits=6&algorithm=SHA1&issuer=otplib-website
          const data = parseOtpUri(res.result)
          if (data) {
            const newCodes = [{
              name: data.label,
              secret: data.secret,
              issuer: data.issuer,
            }]
            const mergedData = [...authCodes.value, ...newCodes]
            authCodes.value = mergedData
            storage.set(mergedData)
            uni.showToast({
              title: '导入成功',
              icon: 'success',
            })
          }
        } else {
          try {
            const data = importByData(res.result)
            if (data && data.length > 0) {
              const mergedData = [...authCodes.value, ...data]
              authCodes.value = mergedData
              storage.set(mergedData)
              uni.showToast({
                title: '导入成功',
                icon: 'success',
              })
            } else {
              uni.showToast({
                title: '扫描失败',
                icon: 'error',
              })
            }
          } catch (error) {
            uni.showToast({
              title: '扫描失败',
              icon: 'error',
            })
            console.log(error)
          }
        }
      }
    },
    fail() {
      uni.showToast({
        title: '扫描取消',
        icon: 'none',
      })
    },
  })
}
</script>

<template>
  <view class="transfer-container">
    <view class="transfer-header">
      <view class="transfer-icon-container">
        <uni-icons type="upload" size="48" color="#fff" />
      </view>
      <text class="transfer-title">转移验证码</text>
      <text class="transfer-description">
        您可将自己的验证码转移到任何 OTP 应用的设备中
      </text>
    </view>

    <view class="transfer-actions">
      <!-- 导出验证码 -->
      <view class="transfer-action-card" @click="handleExport">
        <view class="transfer-action-icon export-icon">
          <uni-icons type="download" size="32" color="#3B82F6" />
        </view>
        <view class="transfer-action-content">
          <text class="transfer-action-title">导出验证码</text>
          <text class="transfer-action-desc">创建二维码来导出您的验证码</text>
        </view>
        <view class="transfer-action-arrow">
          <uni-icons type="right" size="20" color="#9CA3AF" />
        </view>
      </view>

      <!-- 导入验证码 -->
      <view class="transfer-action-card" @click="handleImport">
        <view class="transfer-action-icon import-icon">
          <uni-icons type="camera" size="32" color="#10B981" />
        </view>
        <view class="transfer-action-content">
          <text class="transfer-action-title">导入验证码</text>
          <text class="transfer-action-desc">扫描二维码来导入新的验证码</text>
        </view>
        <view class="transfer-action-arrow">
          <uni-icons type="right" size="20" color="#9CA3AF" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.transfer-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 32px 24px;
  box-sizing: border-box;
}

.transfer-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
}

.transfer-icon-container {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
}

.transfer-title {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 12px;
  text-align: center;
}

.transfer-description {
  font-size: 16px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
  max-width: 320px;
}

.transfer-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.transfer-action-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.transfer-action-card:active {
  background-color: #f9fafb;
  transform: scale(0.98);
}

.transfer-action-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.export-icon {
  background-color: #eff6ff;
}

.import-icon {
  background-color: #ecfdf5;
}

.transfer-action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.transfer-action-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.transfer-action-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.transfer-action-arrow {
  margin-left: 12px;
  flex-shrink: 0;
}
</style>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const menuItems = [
  { id: 'transfer', label: '转移', icon: 'upload' },
  { id: 'howto', label: '运作方式', icon: 'help' },
  { id: 'settings', label: '设置', icon: 'gear' },
  { id: 'about', label: '关于', icon: 'info' },
]

function handleItemClick(id: string) {
  console.log('Menu item clicked:', id)
  // 这里可以添加具体的跳转或操作逻辑
  uni.showToast({
    title: `点击了${menuItems.find(item => item.id === id)?.label}`,
    icon: 'none',
  })
}

function handleBackdropClick() {
  emit('close')
}
</script>

<template>
  <!-- 背景遮罩 -->
  <div
    v-if="props.isOpen"
    class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
    :class="props.isOpen ? 'opacity-100' : 'opacity-0'"
    @click="handleBackdropClick"
  />

  <!-- Drawer 主体 -->
  <div
    class="fixed left-0 top-0 z-50 h-full w-80 bg-white shadow-xl transition-transform duration-300"
    :class="props.isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-full flex-col">
      <!-- 头部 -->
      <div class="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white">
        <div class="mb-2 flex items-center justify-between">
          <h2 class="text-xl font-semibold">
            小程序 Authenticator
          </h2>
          <div
            class="flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
            @click="emit('close')"
          >
            <uni-icons type="close" size="20" color="#fff" />
          </div>
        </div>
        <p class="text-sm text-blue-100">
          验证器管理
        </p>
      </div>

      <!-- 菜单列表 -->
      <div class="flex-1 overflow-y-auto">
        <div class="py-2">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="flex cursor-pointer items-center border-b border-gray-100 px-6 py-4 transition-colors hover:bg-gray-50"
            @click="handleItemClick(item.id)"
          >
            <div class="mr-4 flex size-10 items-center justify-center rounded-full bg-blue-50">
              <uni-icons :type="item.icon" size="20" color="#3B82F6" />
            </div>
            <span class="text-base text-gray-800">{{ item.label }}</span>
            <div class="ml-auto">
              <uni-icons type="right" size="16" color="#999" />
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="border-t border-gray-200 p-4 text-center">
        <p class="text-xs text-gray-500">
          Version 1.0.0
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保 drawer 在小程序中正确显示 */
.fixed {
  position: fixed;
}
</style>

<script setup lang="ts">
import type { AuthCode } from '@/pages/index/index.vue'

const props = defineProps<{
  isOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: AuthCode): void
}>()
const name = ref('')
const secret = ref('')

function savehandler() {
  emit('save', {
    name: name.value,
    secret: secret.value,
  })
  emit('close')
}
</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-[80vw] max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">
        输入账号详情
      </h3>
      <div class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2">
        <input
          v-model="name"
          type="text"
          placeholder="账号名"
          placeholder-class="placeholder"
        >
      </div>
      <div class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2">
        <input
          v-model="secret"
          type="text"
          placeholder="您的密钥"
          placeholder-class="placeholder"
        >
      </div>
      <p class="mb-4 text-sm text-gray-600">
        密钥类型：基于时间
      </p>
      <div class="flex justify-end space-x-8">
        <view
          class="text-sm  text-blue-600"
          @click="emit('close')"
        >
          取消
        </view>
        <view
          class="text-sm  text-blue-600"
          @click="savehandler"
        >
          添加
        </view>
      </div>
    </div>
  </div>
</template>

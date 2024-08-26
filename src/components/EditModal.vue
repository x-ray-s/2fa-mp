<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
  currentName: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', newName: string): void
}>()

const newName = ref('')

function handleSave() {
  emit('save', newName.value)
  emit('close')
}

watch(() => props.currentName, () => {
  newName.value = props.currentName
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-[80vw] max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">
        修改账号名称
      </h3>
      <input
        v-model="newName"
        type="text"
        class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        placeholder="输入新名称"
        placeholder-class="placeholder"
      >
      <div class="flex justify-end space-x-2">
        <button
          class="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
          @click="emit('close')"
        >
          取消
        </button>
        <button
          class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          @click="handleSave"
        >
          保存
        </button>
      </div>
    </div>
  </div>
</template>

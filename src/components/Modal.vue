<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  submitText?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-[80vw] max-w-md rounded-lg bg-white p-6 shadow-xl">
      <slot />
      <div class="flex justify-end space-x-8">
        <div
          class="text-sm  text-blue-600"
          @click="emit('close')"
        >
          取消
        </div>
        <div
          class="text-sm  text-blue-600"
          @click="() => {
            emit('confirm')
            emit('close')
          }"
        >
          {{ submitText || '确定' }}
        </div>
      </div>
    </div>
  </div>
</template>

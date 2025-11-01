<script setup lang="ts">
import Modal from './Modal.vue'

const props = defineProps<{
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <Modal :is-open="props.isOpen" :submit-text="confirmText || '??'" @close="() => emit('close')" @confirm="() => emit('confirm')">
    <div class="content">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">
        {{ title || '????' }}
      </h3>
      <div class="content-body">
        <p class="text-sm text-gray-700">
          {{ message || '??????????' }}
        </p>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.content > * {
  @apply text-sm my-2;
}

.content-body {
  @apply py-2;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'

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
  <Modal :is-open="props.isOpen" @close="() => emit('close')" @confirm="handleSave">
    <div>
      <h3 class="mb-4 text-lg font-semibold text-gray-900">
        修改账号名称
      </h3>
      <div class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2">
        <input
          v-model="newName"
          type="text"
          placeholder="输入新名称"
          placeholder-class="placeholder"
        >
      </div>
    </div>
  </Modal>
</template>

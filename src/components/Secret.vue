<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useSecretStore } from '@/stores/secret'

const secretStore = useSecretStore()

const password = ref<string>('')
const repeat = ref<string>('')

const diff = computed(() => {
  return password.value !== repeat.value
})

function handleSave() {
  secretStore.setSecret(password.value)
  secretStore.unlock()
}

</script>

<template>
  <Modal :is-open="secretStore.newModal" @close="secretStore.newModal = false" @confirm="handleSave">
    <div>
      <h3 class="mb-4 text-lg font-semibold text-gray-900">
        创建验证密码
      </h3>
      <p class="text-gray-600 text-sm">验证密码用于加密存储，请牢记密码，否则将无法解密存储</p>
      <div class="mt-4 w-full rounded-md border border-gray-300 px-3 py-2">
        <input
          v-model="password"
          type="text"
          placeholder="输入密码"
          placeholder-class="placeholder"
        >
        
      </div>
      <div class="my-4 w-full rounded-md border border-gray-300 px-3 py-2">
        <input
          v-model="repeat"
          type="text"
          placeholder="再次输入密码"
          placeholder-class="placeholder"
        >
      </div>
      <p v-if="diff" class="text-xs text-red-500 mt-2">两次密码不一致</p>
    </div>
  </Modal>
</template>

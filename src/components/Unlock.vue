<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useSecretStore } from '@/stores/secret'

const secretStore = useSecretStore()

const password = ref<string>('')

function handleSave() {
  const persistence = uni.getStorageSync("SECRET")
  if (persistence === password.value) {
    secretStore.unlock()
  } else {
    uni.showToast({
      title: '密码验证错误',
      icon: 'error',
    })
  }
  password.value = ''
}

</script>

<template>
  <Modal :is-open="secretStore.lockModal" @close="() => secretStore.lockModal = false" @confirm="handleSave">
    <div>
      <h3 class="mb-4 text-lg font-semibold text-gray-900">
        解锁
      </h3>
      <div class="mt-4 mb-2 w-full rounded-md border border-gray-300 px-3 py-2">
        <input
          v-model="password"
          type="text"
          placeholder="输入密码"
          placeholder-class="placeholder"
        >
        
      </div>

    </div>
  </Modal>
</template>

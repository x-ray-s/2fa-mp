<template>
  <div class="h-full bg-white px-3 py-6 sm:py-12">
    <div>
      <button class="mt-4 block w-full rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:bg-gray-200" @click="cleanModal = true">
        清空数据
      </button>
    </div>
    <Modal :is-open="cleanModal" @confirm="clean" @close="cleanModal = false">
      <div>确认清空所有数据？</div>
      <div class="mt-2 mb-4 text-sm text-gray-400">所有数据将清空，并无法恢复</div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import Modal from '@/components/Modal.vue'
  import { useSecretStore } from '@/stores/secret'
  
  const cleanModal = ref(false)
  
  const secretStore = useSecretStore()
  const clean = () => {
    secretStore.clean()
  }
</script>

<style>
</style>
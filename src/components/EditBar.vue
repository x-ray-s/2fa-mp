<script setup lang="ts">
const props = defineProps<{
  name?: string
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'esc'): void
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <uni-icons type="arrow-left" size="24" color="#666" @click="emit('esc')" />
      <p class="font-semibold">
        {{ props.name }}
      </p>
    </div>
    <div class="flex gap-4">
      <uni-icons type="compose" size="24" color="#666" @click="emit('edit')" />
      <uni-icons type="trash" size="24" color="#666" @click="emit('delete')" />
    </div>
  </div>
</template>

<style>

</style>

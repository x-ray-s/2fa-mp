<script lang="ts">
export enum Direction {
  UP,
  DOWN,
}
</script>

<script setup lang="ts">
const props = defineProps<{
  name?: string
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'esc'): void
  (e: 'move', direction: Direction): void
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex min-w-0 grow items-center gap-3">
      <uni-icons type="arrow-left" class="flex shrink-0" size="24" color="#666" @click="emit('esc')" />
      <p class="grow truncate font-semibold">
        {{ props.name }}
      </p>
    </div>
    <div class="flex shrink-0 gap-2">
      <uni-icons type="arrow-up" size="24" color="#666" @click="() => emit('move', Direction.UP)" />
      <uni-icons type="arrow-down" size="24" color="#666" @click="() => emit('move', Direction.DOWN)" />
      <uni-icons type="compose" size="24" color="#666" @click="emit('edit')" />
      <uni-icons type="trash" size="24" color="#666" @click="emit('delete')" />
    </div>
  </div>
</template>

<style>

</style>

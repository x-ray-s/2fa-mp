<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'

const instance = getCurrentInstance()

interface DragEvent {
  detail: {
    x: number
    y: number
    source: any
  }
}
const dragTargetHeight = ref(0)

const items = ref([
  { id: 1, content: '项目 1' },
  { id: 2, content: '项目 2' },
  { id: 3, content: '项目 3' },
  { id: 4, content: '项目 4' },
  { id: 5, content: '项目 5' },
  { id: 6, content: '项目 6' },
])
const draggedIndex = ref(0)
const draggedY = ref(0)
const dragable = ref(false)

function getDragTargetHeight() {
  if (!instance) { return }
  if (dragTargetHeight.value !== 0) { return }
  const query = uni.createSelectorQuery().in(instance.proxy)
  query.select(`#drag-item-0`).boundingClientRect((data: any) => {
    dragTargetHeight.value = data.height
  }).exec()
}

const itemPositions = computed(() => {
  const itemHeight = dragTargetHeight.value
  return items.value.map((_, index) => {
    if (draggedIndex.value === -1) {
      return index * itemHeight
    }

    if (index === draggedIndex.value) {
      return draggedY.value
    }

    const draggedPosition = Math.floor(draggedY.value / itemHeight)
    if (draggedPosition <= index && index < draggedIndex.value) {
      return (index + 1) * itemHeight
    }
    if (draggedPosition >= index && index > draggedIndex.value) {
      return (index - 1) * itemHeight
    }

    return index * itemHeight
  })
})
function dragSwitch() {
  dragable.value = true
}
function handleDragStart(index: number) {
  draggedIndex.value = index
  draggedY.value = index * dragTargetHeight.value
}
function dragHandler(event: DragEvent) {
  draggedY.value = event.detail.y
}
function dragHandlerEnd() {
  const newIndex = Math.round(draggedY.value / dragTargetHeight.value)
  const [removed] = items.value.splice(draggedIndex.value, 1)
  items.value.splice(newIndex, 0, removed)
  draggedIndex.value = -1
}
</script>

<template>
  <movable-area class="relative size-full">
    <movable-view v-if="dragable" id="drag-target" class="absolute z-10 w-full bg-blue-600 p-4 text-white" direction="vertical" @touchstart="() => handleDragStart(0)" @change="dragHandler" @touchend="dragHandlerEnd">
      1
    </movable-view>
    <div v-for="(item, index) in items" :id="`drag-item-${index}`" :key="item.id" class=" absolute w-full bg-blue-600 p-4  text-white transition-all duration-100" :style="{ transform: `translateY(${itemPositions[index]}px)` }" @longpress="dragSwitch">
      {{ item.content }}
    </div>
  </movable-area>
</template>

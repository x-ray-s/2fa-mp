<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-[80vw] max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h3 class="mb-4 line-clamp-2 text-lg font-semibold text-gray-900">
        要移除 在一处改账号之前，请执行以下操作：在一处改账号之前，请执行以下操作：在一处改账号之前，请执行以下操作：在一处改账号之前，请执行以下操作：
      </h3>
      <div class="content">
        <p>
          移除该账号会<span class="font-bold">让您无法</span>生成验证码，但<span class="font-bold">不会</span>关闭双重身份验证。您可能会因此无法登录自己的账号。
        </p>
        <p>
          在一处改账号之前，请执行以下操作：
        </p>
        <p>
          关闭该账号的双重身份验证功能，或者
        </p>
        <p>确保您可以通过其他方法生成验证码</p>
      </div>
      <div class="flex justify-end space-x-8">
        <view
          class="text-sm  text-blue-600"
          @click="emit('close')"
        >
          取消
        </view>
        <view
          class="text-sm  text-blue-600"
          @click="() => {
            emit('confirm')
            emit('close')
          }"
        >
          移除账号
        </view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content > * {
  @apply text-sm my-4;
}
</style>

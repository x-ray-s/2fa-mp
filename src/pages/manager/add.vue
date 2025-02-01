<script setup lang="ts">
  import { ref } from 'vue'
  import { storage, Password } from '@/utils/password'

  const tags = ref<string[]>([])
  const tag = ref('')
  const password = ref('')
  const name = ref('')
  const item = ref<null | Password>(null)

  onLoad((option) => {
    if (option?.id) {
      item.value = storage.pick(option.id)
      if (item.value) {
        name.value = item.value.name
        password.value = item.value.password
        tags.value = item.value.tags
      }
    }
  })

  const addTag = () => {
    if (tag.value) {
      tags.value.push(tag.value)
      tag.value = ''
    }
  }
  const secret = uni.getStorageSync("SECRET")

  const backAndReload = () => {
    setTimeout(() => {
      uni.$emit('manage:load')
      uni.switchTab({
        url: '/pages/manager/index'
      })
    }, 200)
  }

  const save = () => {
    if (password.value && name.value) {
      if (item.value) {
        storage.patch({
          id: item.value.id,
          password: password.value,
          name: name.value,
          tags: tags.value
        })
      } else {
        storage.add({
          password: password.value,
          name: name.value,
          tags: tags.value
        } as Exclude<Password, 'id'>, secret)
      }
      
      uni.showToast({
        icon: 'success',
        title: "保存成功"
      })
      backAndReload()
    }
  }

  const del = () => {
    if (item.value) {
      storage.remove(item.value.id)
      backAndReload()
    }
  }
</script>

<template>
  <view class="h-full bg-white px-4 py-6">
    <view class="flex flex-col gap-2 mb-2">
      <input type="text" placeholder="账号" v-model="name" class="input-border rounded-lg border border-gray-300 p-2" placeholder-class="placeholder">

      <input v-if="!item" type="text" placeholder="密码" v-model="password" class="input-border rounded-lg border border-gray-300 p-2" placeholder-class="placeholder">
    </view>

    <view class="flex items-center flex-wrap gap-2">

      <span class="rounded-full px-3 py-2 bg-gray-100 text-sm" v-for="(tag,index) in tags" :key="index">
        {{tag}}
      </span>
      <input type="text" placeholder="标签" v-model="tag"
        class="rounded-full px-3 py-2 text-sm w-12 border-gray-300 border input-border" placeholder-class="placeholder">

      <button class="w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center m-0" @click="addTag">
        <uni-icons type="plus" size="20" color="#666" />
      </button>
    </view>

    <view class="mt-4 flex justify-between gap-4">
      <button
        class="flex w-full flex-col items-center justify-center rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors duration-300 hover:bg-blue-100"
        @click="save">
        <span class="text-sm">保存</span>
      </button>
      <button v-if="item"
        class="flex flex-col items-center justify-center w-full rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:bg-gray-200"
        @click="del">
        <span class="text-sm">删除</span>
      </button>
    </view>
  </view>
</template>

<style>
</style>
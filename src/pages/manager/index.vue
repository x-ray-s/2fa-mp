<script lang="ts" setup>
  import { ref } from 'vue'
  import Secret from '@/components/Secret.vue'
  import Unlock from '@/components/Unlock.vue'
  import { useSecretStore } from '@/stores/secret'
  import {storage, Password} from '@/utils/password'

  const secretStore = useSecretStore()
  
  const search = ref('')
  const list = ref<Password[]>([])
  const display = ref(true)
  
  const load = () => {
    list.value = storage.get()
  }
  
  load()
  
  onShow(() => {
    secretStore.init()
  })

  uni.$on('manage:load', load)

  function toAdd() {
    if (!secretStore.secret) {
      secretStore.newModal = true
      return
    }
    uni.navigateTo({
      url: '/pages/manager/add',
    })
  }
  function toGenerate() {
    uni.navigateTo({
      url: '/pages/manager/generate',
    })
  }
  
  function toSetting() {
    uni.navigateTo({
      url: '/pages/manager/setting',
    })
  }

  function unlockHandler() {
    if (!secretStore.secret) {
      secretStore.newModal = true
    } else {
      secretStore.lockModal = true
    }
  }
  function edit (id: string) {
    if (secretStore.locked === false) {
      uni.navigateTo({
        url: '/pages/manager/add?id=' + id,
      })
    }
  }
  
  function showPwd (pwd: string) {
    if (!secretStore.secret || secretStore.locked) {
      return ''
    }
    return storage.uncrypted(pwd, secretStore.secret)
  }
  
  function copy (pwd: string) {
    if (secretStore.locked === false) {
      uni.setClipboardData({
        data: pwd,
        showToast: false,
      })
    }
  }
  
  const filterList = computed(() => {
    const keywords = search.value
    if (keywords) {
      return list.value.filter((item) => {
        return item.name.includes(keywords) || item.tags.join(',').includes(keywords)
      })
    }
    return list.value
  })
</script>

<template>
  <div class="h-full bg-white px-3 py-6 sm:py-12">
    <Secret />
    <Unlock  />
    <view class="flex items-center gap-2 ">
      <text class="text-xl">
        密码管理器
      </text> <uni-icons @click="display = !display" :type="display ? 'eye' : 'eye-slash'" size="24" color="#666" />
    </view>
    <view class="text-sm text-gray-400 mt-2 mb-4">
      数据仅保存在小程序内，更换设备或切换微信账号都会导致数据丢失
    </view>

    <view class="flex gap-2">
      <view v-if="secretStore.locked" class="flex size-12 items-center justify-center rounded-lg bg-gray-100 shadow-sm" @click="unlockHandler">
        <uni-icons  type="locked" size="24" color="#666" />
      </view>

      <view class="flex size-12 items-center justify-center rounded-lg bg-gray-100 shadow-sm" @click="toAdd">
        <uni-icons type="plus" size="24" color="#666" />
      </view>
     <view class="flex size-12 items-center justify-center rounded-lg bg-gray-100 shadow-sm" @click="toSetting">
        <uni-icons type="gear" size="24" color="#666" />
      </view>

<!--      <view class="flex size-12 items-center justify-center rounded-lg bg-gray-100 shadow-sm" @click="toAdd">
        <uni-icons type="help" size="24" color="#666" />
      </view> -->
    </view>
    <div class="my-4">
      <input v-model="search" type="text" placeholder="搜索密码"
        class="input-border rounded-lg border border-gray-300 p-2" placeholder-class="placeholder">
        
        <view v-for="item in filterList" :key="item.id">
          <view class="rounded-lg bg-gray-100 shadow-sm px-2 py-3 my-4" @click="copy(showPwd(item.password))">
            <view class="flex justify-between">
              <h2>{{item.name}}</h2>
              <view class="flex gap-2" @click.stop="edit(item.id)">
                <uni-icons v-show="!secretStore.locked" type="compose" size="24" color="#666"  />
              </view>
            </view>
            <view v-show="display" class="mt-2 break-all">{{showPwd(item.password)}}</view>
            <view class="flex gap-1 mt-2">
              <view v-for="(tag,index) in item.tags" :key="index"  class="rounded-full bg-blue-400 text-white px-2 py-1 text-sm">{{tag}}</view>
            </view>
          </view>
        </view>
    </div>
  </div>
</template>

<style scoped>

</style>
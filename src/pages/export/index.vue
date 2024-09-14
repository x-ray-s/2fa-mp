<script lang="ts" setup>
import { storage } from '@/utils/storage'
import { useExportStore } from '@/stores/export'
import { createExportData } from '@/utils/export'

type SelectedAuthCode = AuthCode & {
  selected: boolean
}
const defaultCount = 10
const selectedAuthCodes = ref<SelectedAuthCode[]>([])
const count = ref(defaultCount)

onMounted(() => {
  const data = storage.get()
  if (data) {
    selectedAuthCodes.value = data.map((i, index) => {
      return {
        ...i,
        selected: index < defaultCount,
      }
    })
    count.value = selectedAuthCodes.value.length
  }
})

function handleChange(e: any) {
  count.value = e.detail.value.length
  selectedAuthCodes.value = selectedAuthCodes.value.map((item, index) => {
    return {
      ...item,
      selected: e.detail.value.includes(`${item.secret}-${index}`),
    }
  })
}

const exportStore = useExportStore()
function handleQrcode() {
  if (count.value === 0 || count.value > defaultCount) {
    return
  }

  exportStore.setRaw(createExportData(selectedAuthCodes.value.filter(item => item.selected === true)))
  uni.navigateTo({
    url: '/pages/export/qrcode',
  })
}
</script>

<template>
  <div class="flex bg-white h-full flex-col px-4 py-6 sm:py-12">
    <div class="shrink-0">
      <h1 class="mb-4 text-center text-3xl">
        选择账号
      </h1>
      <p class="my-5">
        为了方便您导出账号，我们将创建一个存有下方所选账号资料的二维码。
      </p>
    </div>
    <div class="grow overflow-y-auto ">
      <checkbox-group @change="handleChange">
        <label v-for="(item, index) in selectedAuthCodes" :key="`${item.secret}-${index}`">
          <div class="flex items-center border-t border-gray-300 px-2 py-4">
            <div>
              <checkbox :value="`${item.secret}-${index}`" :checked="item.selected" />
            </div>
            <div class="ml-2">
              {{ item.name }}
            </div>
          </div>
        </label>
      </checkbox-group>
    </div>
    <div class="mt-4 flex shrink-0 items-center justify-between">
      <div class="text-sm text-gray-600">
        已选择<span
          :class="{
            'text-red-500': count > defaultCount,
          }"
        >{{ count }}</span>个账号，最多可选择{{ defaultCount }}个
      </div>
      <div
        class="m-0 rounded-sm border-none bg-blue-600 px-5 py-2 text-sm text-white " :class="{
          'bg-gray-300': count === 0 || count > defaultCount,
        }"
        @click="handleQrcode"
      >
        下一页
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
import { decode } from '@/utils/decode'
import EditBar from '@/components/EditBar.vue'
import EditModal from '@/components/EditModal.vue'
import DeleteOTPModal from '@/components/DeleteOTPModal.vue'
import { counter, generate } from '@/utils/2fa'
import { storage } from '@/utils/storage'
// import { backup } from '@/utils/export'
import AddModal from '@/components/AddModal.vue'
import { parseOtpUri } from '@/utils/totp'

const instance = getCurrentInstance()
export interface AuthCode {
  name: string
  secret: string
  issuer?: string
}

function importByData(data: string) {
  const arr = decode(data)
  if (arr && arr.length > 0) {
    return arr.map((item: any) => {
      // totpsecret -> secret
      return {
        name: item.name,
        secret: item.totpSecret,
        issuer: item.issuer,
      }
    })
  }
  return []
}

const authCodes = ref<AuthCode[]>([])
const progress = ref(0)

function circleProgressUpdate() {
  const count = counter()
  progress.value = ((count % 30) / 30 * 100)
  return setInterval(() => {
    if (progress.value >= 100) {
      const count = counter()
      progress.value = ((count % 30) / 30 * 100)
    }
    else {
      progress.value += 100 / 30 / 60
    }
  }, 1000 / 60)
}

let intervalId: number

onMounted(() => {
  const data = storage.get()
  if (data) {
    authCodes.value = data
  }
  intervalId = circleProgressUpdate()
})

const showOptions = ref(false)
const showAddModal = ref(false)
function importSecret() {
  showOptions.value = false
  showAddModal.value = true
}

onUnmounted(() => {
  clearInterval(intervalId)
})

const activeItem = ref<number | null>(null)
const feedbackCoordinate = ref({ x: 0, y: 0 })
const isLongTap = ref(false)

const isEdit = ref(false)
const isEditName = ref(false)
const isDeleteOTP = ref(false)

const editIndex = ref<number>(0)

function handleItemLongTap(index: number) {
  isLongTap.value = true
  isEdit.value = true
  editIndex.value = index
}

function handleItemLongTapEnd() {
  setTimeout(() => {
    isLongTap.value = false
  }, 500)
}

function renameHandler(newName: string) {
  authCodes.value[editIndex.value].name = newName
  storage.set(authCodes.value)
  isEditName.value = false
}
function deleteHandler() {
  authCodes.value.splice(editIndex.value, 1)
  storage.set(authCodes.value)
  isEdit.value = false
}

function addAuthCode(data: AuthCode[]) {
  const mergedData = [...authCodes.value, ...data]
  authCodes.value = mergedData
  storage.set(mergedData)
}

function scanQRCode() {
  showOptions.value = false

  uni.scanCode({
    success(res) {
      if (res.scanType === 'QR_CODE') {
        if (res.result.includes('otpauth://')) {
          // otpauth://totp/otplib-website:otplib-demo-user?secret=6BPYHH4FOYN2WUTJ&period=30&digits=6&algorithm=SHA1&issuer=otplib-website
          const data = parseOtpUri(res.result)
          if (data) {
            addAuthCode([{
              name: data.label,
              secret: data.secret,
              issuer: data.issuer,
            }])
          }
        }
        else {
          try {
            const data = importByData(res.result)
            addAuthCode(data)
            uni.showToast({
              title: '扫描成功',
              icon: 'success',
            })
          }
          catch (error) {
            uni.showToast({
              title: '扫描失败',
              icon: 'error',
            })
            console.log(error)
          }
        }
      }
    },
  })
}

function handleItemClick(index: number, event: MouseEvent) {
  const target = event.target as any

  if (!instance) { return }

  if (isLongTap.value) {
    return
  }

  if (isEdit.value) {
    editIndex.value = index
    return
  }
  const query = uni.createSelectorQuery().in(instance.proxy)
  query.select(`#item-${index}`).boundingClientRect((data: any) => {
    feedbackCoordinate.value = { x: target.x, y: target.y - data.top }
    activeItem.value = index

    uni.setClipboardData({
      data: generate(authCodes.value[index].secret).token,
      showToast: false,

    })
  }).exec()

  setTimeout(() => {
    activeItem.value = null
  }, 300)
}
</script>

<template>
  <div class="h-full bg-gray-100 py-6 sm:py-12">
    <div class="relative h-full py-3 sm:mx-auto sm:max-w-xl">
      <div
        class="absolute inset-0 -skew-y-6 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"
      />
      <div class="relative h-full bg-white  pb-6 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="mx-auto h-full max-w-md ">
          <div class="flex h-full flex-col">
            <div class="space-y-4 p-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
              <h2 v-show="!isEdit" class="text-xl  text-gray-900">
                小程序 <span class="text-gray-400">Authenticator</span>
              </h2>
              <EditBar v-show="isEdit" :name="authCodes?.[editIndex]?.name" @esc="isEdit = false" @edit="isEditName = true" @delete="isDeleteOTP = true" />
            </div>
            <div class="scroll-none grow overflow-y-auto overflow-x-hidden text-base leading-6 sm:text-lg sm:leading-7">
              <ul class="space-y-4">
                <li
                  v-for="(code, index) in authCodes" :id="`item-${index}`" :key="index" class="relative overflow-hidden p-4 pb-0"
                  :class="{ 'active ': activeItem === index }"
                  @click="(event) => handleItemClick(index, event)" @longtap="() => handleItemLongTap(index)" @touchend="handleItemLongTapEnd"
                >
                  <div class="w-full truncate font-semibold">
                    <span v-show="code.issuer">{{ code.issuer }} : </span>{{ code.name }}
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-3xl text-blue-600">
                      {{ generate(code.secret).token.replace(/(\d{3})(\d{2})/, '$1 $2') }}
                    </p>
                    <div class="relative size-6 shrink-0 rounded-full bg-blue-600">
                      <div class="progress-circle absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full" :style="{ '--progress': `${progress}%` }" />
                    </div>
                  </div>

                  <div
                    class="feedback" :style="{
                      left: `${feedbackCoordinate.x}px`,
                      top: `${feedbackCoordinate.y}px`,
                    }" :class="{ 'transition-all duration-300 ease-out': activeItem === index }"
                  />
                  <div class="mt-4 h-px w-full bg-gray-200" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 浮动按钮 -->
      <button class="fixed bottom-8 right-8 flex size-12 items-center justify-center rounded-full bg-gray-100 p-4  text-3xl text-blue-600 " @click="showOptions = true">
        +
      </button>

      <!-- 选项弹出框 -->
      <div v-if="showOptions" class="fixed inset-0 flex items-end justify-center bg-black/50">
        <div class="w-full rounded-t-3xl bg-white p-4 shadow-lg">
          <div class="mx-auto max-w-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              添加新的验证器
            </h3>
            <div class="grid w-full grid-cols-1 gap-4">
              <button class="flex w-full flex-col items-center justify-center rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors duration-300 hover:bg-blue-100" @click="importSecret">
                <span class="text-sm">输入秘钥</span>
              </button>
              <button class="flex w-full flex-col items-center justify-center rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors duration-300 hover:bg-blue-100" @click="scanQRCode">
                <span class="text-sm">扫描二维码</span>
              </button>
            </div>
            <button class="mt-4 block w-full rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:bg-gray-200" @click="showOptions = false">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddModal
      :is-open="showAddModal" @close="showAddModal = false" @save="data => {
        addAuthCode([data])
      }"
    />
    <EditModal :current-name="authCodes?.[editIndex]?.name" :is-open="isEditName" @close="isEditName = false" @save="renameHandler" />
    <DeleteOTPModal :is-open="isDeleteOTP" @close="isDeleteOTP = false" @confirm="deleteHandler" />
  </div>
</template>

<style scoped>
.progress-circle {
  background: conic-gradient(#fff var(--progress), transparent 0);
}

.scroll-none {
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}
.scroll-none::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}

button::after {
  display: none;
}

.feedback {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(185, 185, 185, 0.3);
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  transform-origin: 50% 50%;
}

.active .feedback {
  transform: scale(100);
  opacity: 1;
}
</style>

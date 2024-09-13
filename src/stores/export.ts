import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExportStore = defineStore('export', () => {
  const raw = ref('')
  function setRaw(data: string) {
    raw.value = data
  }

  return { raw, setRaw }
})

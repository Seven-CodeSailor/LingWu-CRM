// 这里是出库单的store仓库模块  负责人 => 暮秋
import { definePinia } from 'pinia'
import { ref } from 'vue'
export const useStorageDetailsStore = definePinia('StorageDetails', () => {
  const tableData = ref([])
  return {
    tableData
  }
})

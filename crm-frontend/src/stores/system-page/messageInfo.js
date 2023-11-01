import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMessageInfo = defineStore('messageInfo', () => {
  const messageInfo = ref([
    {
      id: '', //消息id
      msgTitle: '', //消息标题
      message: '', //消息内容
      msgType: '', //消息类型
      urlId: 0, //跳转链接
      urlType: '', //链接类型
      remindTime: '', // 提醒时间
      flag: '' // 消息状态，是否已读
    }
  ])

  // 设置消息内容
  const setMessageInfo = (data = []) => {
    messageInfo.value = data
  }

  // 标记为已读
  const markAsRead = (id) => {
    let item = messageInfo.value.find((curr) => {
      return curr.id == id
    })
    item.flag = 0
    console.log(item)
  }
  return {
    messageInfo,
    setMessageInfo,
    markAsRead
  }
})

export default useMessageInfo

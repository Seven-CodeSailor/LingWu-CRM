import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDashBoard = defineStore('dashBoard', () => {
  // 系统公告表格数据
  const announcement = ref([
    {
      id: '', //id
      title: '', //公告标题
      content: '', //发布内容
      createman: '', //发布人
      createTime: '', //发布时间
      state: '', //状态
      receiver: '' //接收人
    }
  ])
  // 设置announcement的数据
  const setAnnouncement = (data = []) => {
    announcement.value = data
  }

  // 通知对象下拉菜单（通知部门）
  const department = ref('')
  // 设置department的数据
  const setDepartment = (data = []) => {
    department.value = data
  }

  // 指定对象下拉菜单（通知部门）
  const person = ref('')
  // 设置person的数据
  const setPerson = (data = []) => {
    person.value = data
  }

  // 重置下拉菜单数据
  const reset = () => {
    department.value = ''
    person.value = ''
  }

  // 提醒消息
  const message = ref([
    {
      id: '', //消息id
      msgType: '', //消息类型
      content: '', //提醒内容
      msgTime: '', //提醒时间
      createTime: '', //创建时间
      state: '' //状态
    }
  ])

  const setMessage = (data = []) => {
    message.value = data
  }

  return {
    announcement,
    setAnnouncement,
    department,
    setDepartment,
    person,
    setPerson,
    reset,
    message,
    setMessage
  }
})

export default useDashBoard

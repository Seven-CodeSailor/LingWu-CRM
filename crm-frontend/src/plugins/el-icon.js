/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-25 21:31:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-25 21:32:14
 * @FilePath: \zero-one-crmsys\crm-frontend\src\plugins\el-icon.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
// 这里导入你要使用的图标
// 写成多行避免解决冲突麻烦
import {
  Bell,
  FullScreen,
  Menu,
  MoonNight,
  Refresh,
  Sunny
} from '@element-plus/icons-vue'
import { Setting } from '@element-plus/icons-vue'
import { User } from '@element-plus/icons-vue'
import { Tickets } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { Delete, Edit, CaretBottom, Back } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { Key } from '@element-plus/icons-vue'
import { House } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
export default (app) => {
  app.component('IconMenu', Menu)
  app.component('IconSetting', Setting)
  app.component('IconUser', User)
  app.component('IconTickets', Tickets)
  app.component('IconUpload', UploadFilled)
  app.component('IconQuestion', QuestionFilled)
  app.component('IconDelete', Delete)
  app.component('IconEdit', Edit)
  app.component('IconCaretBottom', CaretBottom)
  app.component('IconSearch', Search)
  app.component('IconInfoFilled', InfoFilled)
  app.component('IconBack', Back)
  app.component('IconKey', Key)
  app.component('IconHouse', House)
  app.component('IconRefresh', Refresh)
  app.component('IconFullScreen', FullScreen)
  app.component('IconMoonNight', MoonNight)
  app.component('IconSunny', Sunny)
  app.component('IconBell', Bell)
  app.component('IconArrowDown', ArrowDown)
}

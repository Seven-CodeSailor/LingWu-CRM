// 这里导入你要使用的图标
// 写成多行避免解决冲突麻烦
import { Menu } from '@element-plus/icons-vue'
import { Setting } from '@element-plus/icons-vue'
import { User } from '@element-plus/icons-vue'
import { Tickets } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { Delete, Edit, CaretBottom, Back } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
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
}

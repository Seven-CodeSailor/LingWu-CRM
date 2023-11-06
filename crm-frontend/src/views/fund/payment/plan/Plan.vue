<!--
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-10-28 14:38:07
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-05 21:11:48
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\fund\payment\plan\Plan.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <div>付款计划更新更新</div> -->
  <BaseDataList
    title="付款计划"
    msg="这里是操作提示"
    ref="baseDataListRef"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    :useDropdownMenu="true"
    :dropdownMenuActionsInfo="dropdownMenuActionsInfo"
  >
    <template #ico>
      <el-icon>
        <CreditCard />
      </el-icon>
    </template>
    <template #menu>
      <div class="meau">
        <!-- 这里是表格头部的控件 -->
        <div class="left">
          <el-button @click="handelAddFn">
            <el-icon type="success" circle>
              <el-icon> <Plus /> </el-icon
            ></el-icon>
            添加
          </el-button>
          <!-- 下拉选择框 -->
          <BulkOPe :excelData="getRows" :getOpt="() => [3, 4]">
            <template #excel>
              <div>
                下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect>
              </div>
            </template>
          </BulkOPe>
          <el-button type="danger" icon="IconDelete">批量删除</el-button>
        </div>
        <!-- 全部/已付/未付 -->
        <!-- <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handelMeauSelect"
        >
          <el-menu-item index="1"> 全部</el-menu-item>
          <el-menu-item index="2"> 已付</el-menu-item>
          <el-menu-item index="3"> 未付</el-menu-item>
        </el-menu> -->

        <div class="search">
          <div class="btnWrap">
            <el-button
              v-for="button in buttons"
              :key="button.text"
              :type="button.type"
              text
              @click="handelBtnSearch(button)"
              >{{ button.text }}</el-button
            >
          </div>
          <ChooseSelect :options="optionsSec" des="产生日期所有"></ChooseSelect>
          <ChooseSelect :options="optionsThi" des="创建日期所有"></ChooseSelect>
          <el-input
            placeholder="请输入关键字搜索"
            v-model="searchKey"
            style="width: 150px"
          ></el-input>
          <DropDown
            :inputValue1="tel"
            inputTitle1="供应商名称"
            :inputValue2="tel1"
            inputTitle2="搜索金额"
            :getDropDown="
              () => {
                return [0, 1, 3]
              }
            "
            @handleSearch="handleSearch"
          ></DropDown>
          <el-button type="primary" :icon="Search" @click="handelSearch"
            >搜索</el-button
          >
        </div>
      </div>
    </template>
  </BaseDataList>
  <el-dialog v-model="isDelete" title="温馨提示" width="30%">
    <span>你确认要删除吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDelete = false">取消</el-button>
        <el-button type="primary" @click="isDelete = false"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加业务=> 抽屉 -->
  <el-drawer
    size="45%"
    v-model="addDrawer"
    title="添加付款计划"
    direction="rtl"
    open-delay="100"
  >
    <div class="demo-drawer__content">
      <el-form
        ref="theAddForm"
        :model="addForm"
        label-width="120px"
        :rules="formRule"
      >
        <el-form-item label="供应商名称" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <ChooseSelect
            :options="supplierSelect"
            des="请选择供应商"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="采购订单" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <ChooseSelect
            :options="PurOrder"
            des="请选择供应商采购订单"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="总金额" :label-width="labelWidth">
          <el-input v-model="addForm.TotalAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="去零金额" :label-width="labelWidth">
          <el-input v-model="addForm.ZeroAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="已付金额" :label-width="labelWidth">
          <el-input v-model="addForm.amountPaid" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="已收发票金额" :label-width="labelWidth">
          <el-input v-model="addForm.invoiceAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="计划付款日期" :label-width="labelWidth">
          <el-date-picker
            v-model="addForm.PlanPaymentDate"
            type="date"
            placeholder="选择计划付款日期"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="期次" :label-width="labelWidth" prop="period">
          <el-input v-model="addForm.period" autocomplete="off" />
        </el-form-item>
        <el-form-item label="金额" :label-width="labelWidth" prop="amount">
          <el-input v-model="addForm.amount" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="drawerFooter">
        <el-button @click="addDrawer = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handelAddSubmit"
          >保存数据</el-button
        >
      </div>
    </div>
  </el-drawer>
  <!-- 付款业务 => 抽屉 -->
  <el-drawer
    size="45%"
    v-model="payDrawer"
    title="确认付款"
    direction="rtl"
    open-delay="100"
  >
    <div class="demo-drawer__content">
      <el-form
        ref="theAddForm"
        :model="addForm"
        label-width="120px"
        :rules="formRule"
      >
        <el-form-item label="供应商名称" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <ChooseSelect
            ref="PaySupplierSelect"
            :options="supplierSelect"
            des="请选择供应商"
            @update:cid="handelSupplierSelect"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="采购订单" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <ChooseSelect
            :options="PurOrder"
            des="请选择供应商采购订单"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="总金额" :label-width="labelWidth">
          <el-input v-model="payForm.TotalAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="去零金额" :label-width="labelWidth">
          <el-input v-model="payForm.ZeroAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="已付金额" :label-width="labelWidth">
          <el-input v-model="payForm.amountPaid" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="已收发票金额" :label-width="labelWidth">
          <el-input v-model="payForm.invoiceAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="付款日期" :label-width="labelWidth">
          <el-date-picker
            v-model="payForm.PlanPaymentDate"
            type="date"
            placeholder="选择计划付款日期"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="期次" :label-width="labelWidth">
          <el-input v-model="payForm.period" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="付款金额" :label-width="labelWidth">
          <el-input v-model="payForm.amount" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="付款账户" :label-width="labelWidth">
          <ChooseSelect
            :options="fundInjection.bankSelectList"
            des="选择付款账户"
          ></ChooseSelect>
        </el-form-item>
      </el-form>
      <div class="drawerFooter">
        <el-button @click="payDrawer = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handelPaySubmit"
          >保存数据</el-button
        >
      </div>
    </div>
  </el-drawer>
  <!-- 修改业务 => 抽屉 -->
  <el-drawer
    size="45%"
    v-model="editDrawer"
    title="确认修改"
    direction="rtl"
    open-delay="100"
  >
    <div class="demo-drawer__content">
      <el-form
        ref="theAddForm"
        :model="addForm"
        label-width="120px"
        :rules="formRule"
      >
        <el-form-item label="供应商名称" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <ChooseSelect
            ref="EditSupplierSelect"
            :options="supplierSelect"
            des="请选择供应商"
            @update:cid="handelSupplierSelect"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="采购订单" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <ChooseSelect
            :options="PurOrder"
            des="请选择供应商采购订单"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="总金额" :label-width="labelWidth">
          <el-input v-model="payForm.TotalAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="去零金额" :label-width="labelWidth">
          <el-input v-model="payForm.ZeroAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="已付金额" :label-width="labelWidth">
          <el-input v-model="payForm.amountPaid" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="已收发票金额" :label-width="labelWidth">
          <el-input v-model="payForm.invoiceAmount" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="付款日期" :label-width="labelWidth">
          <el-date-picker
            v-model="payForm.PlanPaymentDate"
            type="date"
            placeholder="选择计划付款日期"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="期次" :label-width="labelWidth" prop="period">
          <el-input v-model="payForm.period" autocomplete="off" />
        </el-form-item>
        <el-form-item label="金额" :label-width="labelWidth" prop="amount">
          <el-input v-model="payForm.amount" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="drawerFooter">
        <el-button @click="editDrawer = false">取消</el-button>
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="handelEditSubmit"
          >保存数据</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script setup></script>

<style lang="scss" scoped></style>

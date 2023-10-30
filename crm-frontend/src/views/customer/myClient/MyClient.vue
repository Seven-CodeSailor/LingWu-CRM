<template>
  <!-- <div>我的客户</div> -->
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">我的客户</div>
      </h3>
      <el-button
        class="button"
        @click="operatingInstructionDialogVisible = true"
      >
        <el-icon style="margin-right: 4px"> <icon-question /></el-icon
        >操作说明</el-button
      >
    </header>
    <!-- 操作搜索栏 -->
    <section class="menu">
      <div class="left">
        <el-button type="primary" icon="IconPlus" @click="addMyClinet"
          >添加</el-button
        >
        <el-popconfirm
          :title="`你确定要删除这些选择的客户吗?`"
          width="260px"
          @confirm="deleteByQuery"
        >
          <template #reference>
            <el-button
              type="danger"
              icon="IconDelete"
              style="margin-right: 10px"
              :disabled="selectIdArr.length ? false : true"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
        <BulkOPe :getOpt="() => [0, 1, 3, 4]" :exportFile="exportFile">
          <template #excel>
            <el-form>
              <el-form-item label="创建人">
                <ChooseSelect
                  :options="createUser"
                  des="选择创建人"
                  ref="op1"
                  @update:cid="value1 = op1.value.label"
                ></ChooseSelect>
              </el-form-item>
              <el-form-item label="归属人">
                <ChooseSelect
                  :options="belongUser"
                  des="选择归属人"
                  ref="op2"
                  @update:cid="value2 = op2.value.label"
                ></ChooseSelect>
              </el-form-item>
            </el-form>
          </template>
        </BulkOPe>
      </div>
      <div class="right" style="display: flex">
        <ChooseSelect
          style="margin-right: 10px"
          des="最近联系时间"
          :options="options"
        ></ChooseSelect>
        <ChooseSelect
          style="margin-right: 10px"
          :options="options"
          des="下次联系时间"
        ></ChooseSelect>
        <el-input
          v-model="name"
          placeholder="输入客户名称关键词"
          style="margin-right: 4px; width: 200px"
        />
        <DropDown
          :inputValue1="tel"
          inputTitle1="座机"
          :inputValue2="mobile"
          inputTitle2="手机号"
          :inputValue3="address"
          inputTitle3="通信地址"
          @handleSearch="handleSearch"
        ></DropDown>
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails"
          :disabled="name ? false : true"
          icon="IconSearch"
        >
          搜索</el-button
        >
      </div>
    </section>
    <!-- 表格部分 -->
    <el-table
      style="width: 100%; margin-bottom: 20px"
      table-layout="auto"
      :data="myclient.tableData"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="客户名称" prop="name" sortable></el-table-column>
      <el-table-column label="归属于" prop="belong"></el-table-column>
      <el-table-column
        label="上次联系"
        prop="lastContact"
        sortable
      ></el-table-column>
      <el-table-column label="联系内容" prop="content"></el-table-column>
      <el-table-column
        label="下次联系"
        prop="nextContact"
        sortable
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="addContact(row)"
                  >添加联系人</el-dropdown-item
                >
                <el-dropdown-item @click="addCommunicate(row)"
                  >添加沟通记录</el-dropdown-item
                >
                <el-dropdown-item divided @click="addService(row)"
                  >添加服务记录</el-dropdown-item
                >
                <el-dropdown-item @click="addOpportunity(row)"
                  >添加销售机会</el-dropdown-item
                >
                <el-dropdown-item divided @click="addContract(row)"
                  >添加合同</el-dropdown-item
                >
                <el-dropdown-item divided @click="detail(row)"
                  >详情</el-dropdown-item
                >
                <el-dropdown-item @click="modify(row)">修改</el-dropdown-item>
                <el-dropdown-item @click="Deletes(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="myclient.tableData.length"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 添加或修改客户信息 -->
  <el-drawer
    v-model="dialogVisible"
    :title="myclient.customerInfo.id === '' ? '添加客户信息' : '修改客户信息'"
    size="50%"
  >
    <el-form
      :model="myclient.customerInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="客户名称">
        <el-input
          v-model="myclient.customerInfo.name"
          placeholder="请输入客户名称"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户代表">
        <el-input
          v-model="myclient.customerInfo.represent"
          placeholder="请输入客户代表"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户来源">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户来源"
          :options="select.belong"
          @update:cid="customerGetBelong()"
          ref="belong"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户等级">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户等级"
          :options="select.level"
          @update:cid="customerGetLevel()"
          ref="level"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户行业">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户行业"
          :options="select.industy"
          @update:cid="customerGetIndusty()"
          ref="industry"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="联系手机">
        <el-input v-model="myclient.customerInfo.tel" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="myclient.customerInfo.mobile" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input
          v-model="myclient.customerInfo.address"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户介绍">
        <el-input
          v-model="myclient.customerInfo.intro"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户需求">
        <el-input v-model="myclient.customerInfo.demand" style="width: 500px" />
      </el-form-item>
      <el-form-item label="公海客户">
        <el-checkbox-group v-model="myclient.customerInfo.seaCustomer">
          <el-checkbox
            name="type"
            @click="
              myclient.customerInfo.seaCustomer =
                !myclient.customerInfo.seaCustomer
            "
        /></el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加联系人 -->
  <el-drawer v-model="dialogVisible1" title="添加联系人" size="50%">
    <el-form
      :model="myclient.contactInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="myclient.contactInfo.name"
          placeholder="请输入联系人姓名"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="myclient.contactInfo.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机">
        <el-input
          v-model="myclient.contactInfo.mobile"
          placeholder="请输入联系人手机"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          v-model="myclient.contactInfo.position"
          placeholder="请输入联系人职位"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="电话">
        <el-input
          v-model="myclient.contactInfo.tel"
          placeholder="请输入联系人电话"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="QQ">
        <el-input
          v-model="myclient.contactInfo.qq"
          placeholder="请输入联系人QQ"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="myclient.contactInfo.email"
          placeholder="请输入联系人邮箱"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="通信地址">
        <el-input
          v-model="myclient.contactInfo.address"
          placeholder="请输入联系人通信地址"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="contactGetName()"
          ref="customerName"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="saveContact"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加沟通记录 -->
  <el-drawer v-model="dialogVisible2" title="添加沟通记录" size="50%">
    <el-form
      :model="myclient.communicateInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="communicateGetName()"
          ref="customerName0"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="select.contacts"
          @update:cid="communicateGetContacts()"
          ref="customerContact"
          :disabled="myclient.communicateInfo.customerName ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户销售机会">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户销售机会"
          :options="select.opportnity"
          @update:cid="communicateGetOpportunity()"
          ref="customerOpportunity"
          :disabled="myclient.communicateInfo.customerName ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="当前阶段">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择当前阶段"
          :options="select.stage"
          @update:cid="communicateGetStage()"
          ref="customerStage"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="沟通方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择沟通方式"
          :options="select.stage"
          @update:cid="communicateGetWay()"
          ref="communicateWay"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="沟通日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.communicateInfo.data"
            type="date"
            placeholder="请选择沟通日期"
          />
        </el-col>
        <el-time-picker
          v-model="myclient.communicateInfo.time"
          placeholder="请选择沟通时间"
        />
      </el-form-item>
      <el-form-item label="联系内容">
        <el-input
          v-model="myclient.communicateInfo.content"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="下次沟通日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.communicateInfo.nextData"
            type="date"
            placeholder="请选择下次沟通日期"
          />
        </el-col>
        <el-time-picker
          v-model="myclient.communicateInfo.nextTime"
          placeholder="请选择下次沟通时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="saveCommunicate"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加服务记录 -->
  <el-drawer v-model="dialogVisible3" title="添加服务记录" size="50%">
    <el-form
      :model="myclient.serviceInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="服务类型">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务类型"
          :options="select.serviceType"
          @update:cid="serviceGettype()"
          ref="serviceType"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务方式"
          :options="select.serviceWay"
          @update:cid="serviceGetWay()"
          ref="serviceWay"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务时间">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.serviceInfo.data"
            type="date"
            placeholder="服务日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="花费时间(分钟)">
        <el-input-number v-model="myclient.serviceInfo.spendTime" min="0" />
      </el-form-item>
      <el-form-item label="服务内容">
        <el-input
          v-model="myclient.serviceInfo.content"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="serviceGetName()"
          ref="customerName1"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取消</el-button>
        <el-button type="primary" @click="saveService"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加销售机会 -->
  <el-drawer v-model="dialogVisible4" title="添加销售机会" size="50%">
    <el-form
      :model="myclient.opportunityInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="主题">
        <el-input
          v-model="myclient.opportunityInfo.theme"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="customerGetName()"
          ref="customerName2"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="select.contacts"
          @update:cid="customerGetContacts()"
          ref="customerContacts1"
          :disabled="myclient.opportunityInfo.customerName ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="当前阶段">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择当前阶段"
          :options="select.stage"
          @update:cid="customerGetStage()"
          ref="customerStage1"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="发现日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.opportunityInfo.data"
            type="date"
            placeholder="选择发现日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="预签订日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.opportunityInfo.preData"
            type="date"
            placeholder="选择预签订日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="金额(元)">
        <el-input
          v-model="myclient.opportunityInfo.price"
          placeholder="预定签单金额"
        />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="myclient.opportunityInfo.intro"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取消</el-button>
        <el-button type="primary" @click="saveOpportunity"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加合同 -->
  <el-drawer v-model="dialogVisible5" title="添加合同" size="50%">
    <el-form
      :model="myclient.contractInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="合同编号">
        <el-input
          v-model="myclient.contractInfo.id"
          style="width: 650px"
          disabled
        />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="myclient.contractInfo.title" style="width: 650px" />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="contractGetName()"
          ref="customerName3"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="select.contacts"
          @update:cid="contractGetContacts()"
          ref="customerContacts2"
          :disabled="myclient.contractInfo.name ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户销售机会">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户销售机会"
          :options="select.opportnity"
          @update:cid="contractGetOpportunity()"
          ref="customerOpportunity1"
          :disabled="myclient.contractInfo.name ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.contractInfo.data"
            type="date"
            placeholder="选择起始日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.contractInfo.endData"
            type="date"
            placeholder="选择结束日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="合同金额(元)">
        <el-input
          v-model="myclient.contractInfo.price"
          placeholder="预定签单金额"
        />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="myclient.contractInfo.intro"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="我方代表">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择我方代表"
          :options="select.represent"
          @update:cid="contractGetRepresent()"
          ref="myRepresent"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取消</el-button>
        <el-button type="primary" @click="saveContract"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 查看详情 -->
  <el-drawer v-model="dialogVisible6" title="客户详情" size="70%">
    <el-space wrap>
      <el-card class="box-card" style="width: 1000px">
        <template #header>
          <div class="card-header">
            <span>{{ detailInfo.name }}</span>
          </div>
        </template>
        <!-- 显示数据 -->
        <el-row :gutter="20">
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">客户代表：&nbsp;</span
            >{{ detailInfo.represent }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">客户来源：&nbsp;</span
            >{{ detailInfo.belong }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">客户等级：&nbsp;</span
            >{{ detailInfo.level }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">客户行业：&nbsp;</span
            >{{ detailInfo.industry }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">联系电话：&nbsp;</span
            >{{ detailInfo.tel }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">联系手机：&nbsp;</span
            >{{ detailInfo.mobile }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">联系地址：&nbsp;</span
            >{{ detailInfo.address }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">客户介绍：&nbsp;</span
            >{{ detailInfo.intro }}</el-col
          >
          <el-col :span="12" class="padding-bottom-5"
            ><span style="color: #666">客户需求：&nbsp;</span
            >{{ detailInfo.demand }}</el-col
          >
        </el-row>
      </el-card>
      <el-card class="box-card" style="width: 1000px">
        <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="跟踪记录" name="track">
            <Table :dataArr="trackData"></Table>
            <el-button type="primary" style="margin-top: 10px"
              >添加跟踪记录</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="联系人" name="contact"
            ><Table :dataArr="trackData"></Table
          ></el-tab-pane>
          <el-tab-pane label="销售机会" name="opportunity"
            ><Table :dataArr="trackData"></Table
          ></el-tab-pane>
          <el-tab-pane label="产品报价" name="price"
            ><Table :dataArr="trackData"></Table
          ></el-tab-pane>
          <el-tab-pane label="服务记录" name="service"
            ><Table :dataArr="trackData"></Table
          ></el-tab-pane>
          <el-tab-pane label="销售合同" name="contract"
            ><Table :dataArr="trackData"></Table
          ></el-tab-pane>
        </el-tabs>
      </el-card>
    </el-space>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible6 = false">取消</el-button>
        <el-button type="primary" @click="saveDetail"> 修改 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 删除确认 -->
  <el-dialog
    v-model="confirmDelete"
    title="删除"
    width="30%"
    :before-close="(deleteId = null)"
  >
    <span style="color: red; margin-left: 33%; font-size: 24px"
      >是否确认删除</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmDelete = false">取消</el-button>
        <el-button type="danger" @click="Confirms"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useMyClient from '@/stores/customer/myclient.js'
import useSelect from '@/stores/customer/select.js'
import {
  getCustomerConcats,
  getCustomerBelong,
  getCustomerLevel,
  getCustomerServiceType,
  getCustomerServiceWay,
  getCustomerIndusty,
  getCustomerOpportnity,
  getCustomerStage,
  getCustomerWay,
  getCustomerRepresent,
  getCustomer,
  deleteCustomer
} from '@/apis/customer/index.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import Table from '@/components/table/Table.vue'

// 初始化数据
const initCustomer = async (currentPage, pageSize) => {
  await getCustomer(currentPage, pageSize)
}
onMounted(() => {
  initCustomer(currentPage, pageSize)
})
// 我的客户store仓库
const myclient = useMyClient()
// 下拉列表仓库
const select = useSelect()
// 当前页数
let currentPage = ref(1)
// 每页数据
let pageSize = ref(5)
const handleSizeChange = (val) => {
  pageSize.value = val
  initCustomer(currentPage, pageSize)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initCustomer(currentPage, pageSize)
}

// 创建人
let op1 = ref()
let value1 = ref('')
// 归属人
let op2 = ref()
let value2 = ref('')
let createUser = ref([
  {
    value: 'Option1',
    label: 'test'
  },
  {
    value: 'Option2',
    label: '管理员'
  },
  {
    value: 'Option3',
    label: 'cw'
  }
])
let belongUser = ref([
  {
    value: 'Option1',
    label: 'test'
  },
  {
    value: 'Option2',
    label: '管理员'
  },
  {
    value: 'Option3',
    label: 'cw'
  }
])
const exportFile = () => {}

// 最近联系时间的选项
const options = ref([
  {
    value: 'Option1',
    label: '最近三天'
  },
  {
    value: 'Option2',
    label: '最近一周'
  },
  {
    value: 'Option3',
    label: '最近半月'
  },
  {
    value: 'Option4',
    label: '最近一月'
  },
  {
    value: 'Option5',
    label: '最近三月'
  },
  {
    value: 'Option6',
    label: '最近六月'
  },
  {
    value: 'Option7',
    label: '最近一年'
  }
])

/**
 * 搜索
 */
let tel = ref('')
let mobile = ref('')
let address = ref('')
// 下拉框搜索按钮回调
const handleSearch = () => {
  tel.value = ''
  mobile.value = ''
  address.value = ''
}

/**
 * 添加
 */
// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
const belong = ref()
const level = ref()
const industry = ref()
// 获取客户归属的值
const customerGetBelong = async () => {
  await getCustomerBelong()
  myclient.customerInfo.belong = belong.value.value.label
}
// 获取客户等级的值
const customerGetLevel = async () => {
  await getCustomerLevel()
  myclient.customerInfo.level = level.value.value.label
}
//获取客户行业的值
const customerGetIndusty = async () => {
  await getCustomerIndusty()
  myclient.customerInfo.industry = industry.value.value.label
}
const getSelect = async () => {
  await getCustomerBelong()
  await getCustomerLevel()
  await getCustomerIndusty()
}
// 点击添加按钮的回调
const addMyClinet = async () => {
  getSelect()
  dialogVisible.value = true
}
// 添加或修改客户按钮确定回调
const save = () => {
  dialogVisible.value = false
  if (myclient.customerInfo.id === '') {
    myclient.addNewCustomer()
  }
  myclient.customerReset()
  select.resetData()
  initCustomer()
}

/**
 * 批量删除
 */
// 存储批量删除的客户的id
let selectIdArr = ref([])
// table复选框勾选时触发的事件
const selectChange = (value) => {
  selectIdArr.value = value
}
// 批量删除按钮
const deleteByQuery = () => {
  console.log('删除')
  deleteCustomer(selectIdArr, () => {
    ElMessage.success('批量删除成功')
  })
  // 删除后重新请求数据
  // initCustomer()
}

/**
 * 添加联系人
 */
// 控制添加联系人抽屉的显示和隐藏
let dialogVisible1 = ref(false)
// 添加联系人按钮回调，打开抽屉
const addContact = async (row) => {
  await getCustomerName()
  // 根据传入id获取数据
  dialogVisible1.value = true
  myclient.contactInfo.id = row.id
}
const customerName = ref()
// 添加联系人保存数据按钮回调
const saveContact = () => {
  dialogVisible1.value = false
  myclient.contactReset()
  select.resetData()
  initCustomer()
}
// 获取客户名称下拉列表
const contactGetName = async () => {
  await getCustomerName()
  myclient.contactInfo.customerName = customerName.value.value.label
}

/**
 * 添加沟通记录
 */
// 控制添加沟通记录抽屉的显示和隐藏
let dialogVisible2 = ref(false)
const customerName0 = ref()
const customerContact = ref()
const customerOpportunity = ref()
const customerStage = ref()
const communicateWay = ref()
// 获取客户名称下拉列表
const communicateGetName = async () => {
  await getCustomerName()
  myclient.communicateInfo.customerName = customerName0.value.value.label
}
// 获取客户联系人下拉列表
const communicateGetContacts = async () => {
  await getCustomerConcats()
  myclient.communicateInfo.contact = customerContact.value.value.label
}
// 获取客户销售机会下拉列表
const communicateGetOpportunity = async () => {
  await getCustomerOpportnity()
  myclient.communicateInfo.opportnity = customerOpportunity.value.value.label
}
// 获取当前阶段下拉列表
const communicateGetStage = async () => {
  await getCustomerStage()
  myclient.communicateInfo.stage = customerStage.value.value.label
}
// 获取沟通方式下拉列表
const communicateGetWay = async () => {
  await getCustomerWay()
  myclient.communicateInfo.way = communicateWay.value.value.label
}
// 添加沟通记录按钮回调
const addCommunicate = async (row) => {
  await getCustomerName()
  await getCustomerConcats()
  await getCustomerOpportnity()
  await getCustomerStage()
  await getCustomerWay()
  dialogVisible2.value = true
  myclient.communicateInfo.id = row.id
}
// 保存数据，发送请求
const saveCommunicate = () => {
  dialogVisible2.value = false
  myclient.communicateReset()
  select.resetData()
  ElMessage.success('添加成功')
}

/**
 * 添加服务记录
 */
// 控制添加服务记录抽屉的显示和隐藏
let dialogVisible3 = ref(false)
const customerName1 = ref()
const serviceWay = ref()
const serviceType = ref()
// 获取客户名称下拉列表
const serviceGetName = async () => {
  await getCustomerName()
  myclient.serviceInfo.customerName = customerName1.value.value.label
}
// 获取服务类型下拉列表
const serviceGettype = async () => {
  await getCustomerServiceType()
  myclient.serviceInfo.type = serviceType.value.value.label
}
// 获取服务方式下拉列表
const serviceGetWay = async () => {
  await getCustomerServiceWay()
  myclient.serviceInfo.way = serviceWay.value.value.label
}
// 添加服务记录按钮回调
const addService = async (row) => {
  await getCustomerName()
  await getCustomerServiceType()
  await getCustomerServiceWay()
  dialogVisible3.value = true
  myclient.serviceInfo.id = row.id
}
// 保存数据，发送请求
const saveService = () => {
  dialogVisible3.value = false
  myclient.serviceReset()
  select.resetData()
  ElMessage.success('添加成功')
}

/**
 * 添加销售机会
 */
// 控制添加销售机会抽屉的显示和隐藏
let dialogVisible4 = ref(false)
const customerName2 = ref()
const customerContacts1 = ref()
const customerStage1 = ref()
// 获取客户名称下拉列表
const customerGetName = async () => {
  await getCustomerName()
  myclient.opportunityInfo.customerName = customerName2.value.value.label
}
// 获取客户联系人下拉列表
const customerGetContacts = async () => {
  await getCustomerConcats()
  myclient.opportunityInfo.contact = customerContacts1.value.value.label
}
// 获取当前阶段下拉列表
const customerGetStage = async () => {
  await getCustomerStage()
  myclient.opportunityInfo.stage = customerStage1.value.value.label
}
// 添加销售机会按钮回调
const addOpportunity = async (row) => {
  await getCustomerName()
  await getCustomerConcats()
  await getCustomerStage()
  dialogVisible4.value = true
  myclient.opportunityInfo.id = row.id
}
// 根据已保存的数据，发送请求
const saveOpportunity = () => {
  dialogVisible4.value = false
  myclient.opportunityReset()
  select.resetData()
  ElMessage.success('添加成功')
}

/**
 * 添加合同
 */
// 控制添加合同抽屉的显示和隐藏
let dialogVisible5 = ref(false)
const customerName3 = ref()
const customerContacts2 = ref()
const customerOpportunity1 = ref()
const myRepresent = ref()
// 获取客户名称下拉列表
const contractGetName = async () => {
  await getCustomerName()
  myclient.contractInfo.customerName = customerName3.value.value.label
}
// 获取客户联系人下拉列表
const contractGetContacts = async () => {
  await getCustomerConcats()
  myclient.contractInfo.contact = customerContacts2.value.value.label
}
// 获取客户销售机会下拉列表
const contractGetOpportunity = async () => {
  await getCustomerOpportnity()
  myclient.contractInfo.opportnity = customerOpportunity1.value.value.label
}
// 获取我方代表下拉列表
const contractGetRepresent = async () => {
  await getCustomerRepresent()
  myclient.contractInfo.represent = myRepresent.value.value.label
}
// 添加合同按钮回调
const addContract = async (row) => {
  await getCustomerName()
  await getCustomerConcats()
  await getCustomerOpportnity()
  await getCustomerRepresent()
  dialogVisible5.value = true
  myclient.contractInfo.id = row.id
}
// 根据已保存的数据，发送请求
const saveContract = () => {
  dialogVisible5.value = false
  myclient.contractReset()
  select.resetData()
  ElMessage.success('添加成功')
}

/**
 * 详情
 */
// 控制查看详情抽屉的显示和隐藏
let dialogVisible6 = ref(false)
let detailInfo = ref({
  id: 1,
  name: '成都零起飞科技',
  createTime: '2023-02-11 14:50:14', //创建时间
  represent: '01', //客户代表
  belong: '中国', //客户来源
  level: '重点客户', //客户等级
  industry: '互联网企业', //客户行业,
  tel: '112', //联系电话
  mobile: '145', //联系手机,
  address: '联系地址', //联系地址
  intro: '客户介绍', //客户介绍
  demand: '客户需求' //客户需求
})
// 详情标签页
const activeName = ref('track')
// 跟踪记录数据
let trackData = ref([
  {
    跟踪记录主题: '',
    最近联系时间: '',
    沟通内容: '',
    下次联系时间: '',
    沟通方式: '',
    当前阶段: ''
  }
])
// 详情按钮回调
const detail = (row) => {
  detailInfo.value.id = row.id
  dialogVisible6.value = true
}
// 根据已保存的数据，发送请求
const saveDetail = () => {
  dialogVisible6.value = false
}

/**
 * 修改
 */
// 修改按钮回调
const modify = (row) => {
  myclient.customerInfo.id = row.id
  dialogVisible.value = true
}

/**
 * 删除
 */
let confirmDelete = ref(false)
let deleteId = ref()
// 删除按钮回调
const Deletes = (row) => {
  deleteId.value = row.id
  confirmDelete.value = true
}
// 确定删除
const Confirms = () => {
  confirmDelete.value = false
  initCustomer(currentPage, pageSize)
  ElMessage.success('删除成功')
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
.padding-bottom-5 {
  padding-bottom: 5px;
}
</style>

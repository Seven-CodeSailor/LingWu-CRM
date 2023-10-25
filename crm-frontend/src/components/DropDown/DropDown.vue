<template>
  <div class="drop_down">
    <el-dropdown trigger="click">
      <el-button type="primary">
        <el-icon><icon-caret-bottom /></el-icon>
      </el-button>
      <template #dropdown>
        <el-form>
          <el-form-item>
            <div style="padding: 10px">
              <h4 style="font-weight: 700; margin-bottom: 2px; color: black">
                供应商名称
              </h4>
              <el-input v-model="input" placeholder="请输入供应商名称" />
            </div>
          </el-form-item>
          <el-form-item>
            <div
              style="
                padding: 10px;
                display: flex;
                justify-content: flex-end;
                width: 100%;
              "
            >
              <el-button type="primary">搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

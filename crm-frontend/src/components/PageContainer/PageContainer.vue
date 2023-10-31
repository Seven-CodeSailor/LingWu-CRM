<script setup>
defineProps({
    title: {
        required: true,
        type:String
    }
})
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
               <div class="leftPart">
                <slot name="icon"></slot>
                <span>{{ title }}</span>
               </div>
                <div class="extra">
                    <slot name="extra"></slot>
                </div>
            </div>
        </template>
        <slot name="button"></slot>
        <!-- 主体部分 -->
        <slot></slot>
    </el-card>
</template> 

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftPart {
        display: flex;
        align-items: center;
    }
  }
}
</style>
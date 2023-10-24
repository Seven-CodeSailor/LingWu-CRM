<script setup>
// 这个界面是库存管理路由出口页面
// 需要配置一下树形菜单,配置形势可以参考'@/views/sample/SampleView.vue'
// 哪位大佬有空可以搞一下
</script>
<template>
  <div class="view">
    <!-- <h3 class="meau">库存管理树形菜单</h3> -->
    <router-view></router-view>
  </div>
</template>
<style>
.view {
  display: flex;
}
/* .meau {
  font-weight: 800;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 4px;
  margin: 0 20px 0 0;
} */
</style>

<template>
    <ul :style="{ display: show ? 'block' : 'none' }">
        <li v-for="item in data" @click.stop="setShow(item)" :key="item">
            <p>{{ item.value }}</p>
            <!-- 递归组件的使用 -->
            <template v-if="item.childern">
                <TreeMenu 
                @setShow="setShow"
                :data="item.children" 
                :show="item.show" 
                />
            </template>
        </li>
    </ul>
    <!-- <h1>{{ data }}</h1> 测试是否将数据显示出来-->
</template>


<script setup>
// 父级props
let prop = definedProps({
    data: {
        type: Array,
        default:() => [],
    },
    show: {
        type: Boolean,
        default: true,
    },
})
let emit = defineEmits(['setShow'])

let setShow = (data) => {
    // 子传递父
    emit('setShow', data)
}

</script>


<style>
</style>
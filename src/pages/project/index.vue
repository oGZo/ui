<template>
    <div class="index">
        <ul>
            <li v-for="item in list" :key="item.filename" @click="toHtml(item)">{{item.filename}}</li>
        </ul>
    </div>
</template>

<script>
import page from './page';

const options = {
    components : {
    }
};
Object.assign(page, options);

export default page;
</script>
<style lang="less" scoped>
    @import './style.less';
</style>
<style lang="less">
    @import '../../base.less';
    .el-date-editor--daterange input{
        height: 40px;
        border-radius: 2px;
        border-color: #ddd;
        &::placeholder {
            color: @g-font-light-color;
        }
    }
</style>


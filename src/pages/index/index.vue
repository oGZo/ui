<template>
    <div class="index">
        <el-row :gutter="20">
            <el-col :span="6"
                v-for="item in list"
                :key="item.id"
                @click.native="toHtml(item)"
                class="item"
            >
                <div class="grid-content bg-purple">
                    <h3>{{item.name}}项目</h3>
                    <p><span>创建者</span>{{item.creator}}</p>
                    <p><span>创建时间</span>{{item.createTime}}</p>
                    <p><span>文件更改时间</span>{{item.updateTime}}</p>
                </div>
            </el-col>
            <el-col
                :span="6"
                @click.native="addProject"
                class="add-project"
            >
                <div class="grid-content bg-purple">
                    <div><i class="el-icon-plus"></i></div>
                    <p>添加新项目</p>
                </div>
            </el-col>
        </el-row>
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
    .index {
        padding: 20px;
    }
    .item {
        margin-bottom: 20px;
    }
    .grid-content{
        padding: 30px 20px;
        font-size: 20px;
        line-height: 30px;
        background-color: @g-white;
        color: #20A0FF;
        border-radius: 8px;
        min-height: 120px;

        cursor: pointer;
        &:hover {
            color: #58B7FF;
            background-color: #F9FAFC;
        }
    }
</style>


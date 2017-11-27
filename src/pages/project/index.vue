<template>
    <div class="index" v-loading.fullscreen.lock="loading">
        <h2>{{projectName}}项目</h2>
        <div class="condition">
            <el-radio-group v-model="type" class="kkl-radio-group">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="web">pc端-设计</el-radio-button>
                <el-radio-button label="wap">移动端-设计</el-radio-button>
                <el-radio-button label="ue-web">pc端-交互</el-radio-button>
                <el-radio-button label="ue-wap">移动端-交互</el-radio-button>
            </el-radio-group><el-input v-model="moduleName" icon="search" placeholder="通过模块名称筛选" style="width: 200px;"></el-input>
        </div>
        <el-upload
            v-if="isLogin && type !== 'all'"
            class="upload-demo"
            drag
            :action="action"
            :data="param"
            name="file"
            :drag="true"
            :before-upload="uploadBefore"
            :on-success="uploadComplete"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="list-area">
            <el-row :gutter="20" v-if="list.length">
                <el-col
                    :span="8"
                    v-for="(item, index) in list"
                    v-show="item.filename.indexOf(moduleName) > -1"
                    :key="item.filename"
                    class="item"
                    @click.native="toHtml(item)"
                >
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="m-iframe" ></div>
                        <div style="padding: 14px;">
                            <h3>{{item.filename}}

                                <div class="operation-area" v-if="isLogin">
                                    <i class="el-icon-edit" title="修改名称" @click.stop="updateFileName(item)"></i>
                                    <i class="el-icon-delete" title="删除" @click.stop="deleteFile(item, index)"></i>
                                </div>
                            </h3>
                            <div class="bottom clearfix">
                            <time class="time">{{ item.createdTime }}</time>
                                <el-button type="text" class="button" >去查看</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-else>
                <el-col :span="24">
                    <noList ></noList>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import noList from '@/components/no-list';
import page from './page';

const options = {
  components: {
      noList,
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
.add-file {
  text-align: center;
  p {
    margin-top: 20px;
    line-height: 30px;
    font-size: 16px;
    color: #20a0ff;
  }
}
.el-icon-plus {
  font-size: 50px;
  line-height: 60px;
  color: #20a0ff;
}
.kkl-radio-group .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
}
.condition .el-input__inner {
    border-radius: 0 4px 4px 0;
    margin-left: -1px;
}
</style>


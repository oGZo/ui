<template>
    <div class="index" v-loading.fullscreen.lock="loading">
        <h2>{{projectName}}项目</h2>
        <el-upload
            v-if="isLogin"
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
        <el-row :gutter="20">
            <el-col
                :span="8"
                v-for="(item, index) in list"
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
    </div>
</template>

<script>
import page from './page';

const options = {
  components: {}
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
    color: #20A0FF;
  }
}
.el-icon-plus {
  font-size: 50px;
  line-height: 60px;
    color: #20A0FF;

}
</style>


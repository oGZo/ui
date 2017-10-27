<template>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="pwd">
    <el-input v-model="form.pwd"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
</el-form>
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
.el-date-editor--daterange input {
  height: 40px;
  border-radius: 2px;
  border-color: #ddd;
  &::placeholder {
    color: @g-font-light-color;
  }
}
</style>


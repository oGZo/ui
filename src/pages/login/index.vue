<template>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="54px" class="kkl-login-form">
  <el-form-item label="账号" prop="name">
    <el-input v-model="form.name" @keydown.native.enter="enter"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="pwd">
    <el-input v-model="form.pwd" @keydown.native.enter="enter"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">登录</el-button>
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
</style>


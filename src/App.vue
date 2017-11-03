<template>
    <div id="app" class="layout" ref="app">
        <div class="user-info" v-if="isLogin">
            {{user.name}}，你好
            <span class="logout" @click="confirmLogin">退出</span>
        </div>
            <router-view></router-view>

    </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            user: {
                name: ''
            }
        };
    },
    computed: {
        isLogin() {
            let route = this.$route;
            return !!KKL.cookie.get('kkl_ui_token') && !!route;
        }
    },
    components: {
        // KDialog,
    },
    created() {
        if(this.isLogin){
            this.getUserInfo();
        }
    },
    methods: {
        async getUserInfo() {
            const user = await KKL.Ajax.get('user/getUserInfo');
            this.user.name = user.name;
        },
        async confirmLogin() {
            const res = await this.$confirm('确认要退出？', '温馨提示');
            if(res){
                this.logout();
            }
        },
        logout() {
            KKL.cookie.clear();
            this.$router.push({
                name: 'login'
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import (reference) './base.less';
.user-info {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    background-color: #f5f5f5;
}
.logout {
    cursor: pointer;
}
</style>



<template>
    <div id="app" class="layout" ref="app">
            <router-view></router-view>
        <!-- <k-dialog
            v-if="confirmDialog"
            @update:visible="confirmDialog = false"
            @sure="logout"
        >
            <p class="dialog-content">
                确定要退出吗？
            </p>
        </k-dialog> -->

    </div>
</template>

<script>




export default {
    name: 'app',
    data() {
        return {
            confirmDialog: false,
        };
    },
    components: {
        // KDialog,
    },
};
</script>
<style lang="less" scoped>
@import (reference) './base.less';

.layout {
    height: 100%;
    overflow: auto;
    // width: 1190px;
    // margin: 0 auto;
    background-color: #f5f5f5;
}
.header {
    padding: 9px;
    background-image: linear-gradient(-180deg, #F5F5F5 0%, #EDEDED 100%);
    box-shadow: 0 1px 0 0 #E7E7E7;
    color: @g-font-default-color;
    font-size: 12px;
    line-height: 17px;
}
.header_container {
    margin: 0 auto;
    width: 1190px;
}
.user {
    display: inline-block;
}
.logout {
    text-decoration: underline;
    cursor: pointer;
}
.nav {
    display: table;
    float: right;
    margin-right: 25px;
    cursor: pointer;
}
.nav__site {
    display: table-cell;
    padding-left: 30px;
    &:hover {
        color: @g-main-green;
    }
}
.main {
    position: relative;
    margin: 0 auto;
    width: 1190px;
    min-height: 540px;
    // height: 100%;
}
.menu {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    width: 190px;
    min-height: 100%;
    background-color: @g-white;
    box-shadow: inset -1px 0 0 0 #ededed;

}
.product {
    display: table;
    box-sizing: border-box;
    padding: 23px 30px;
    height: 80px;
    background-color: @g-main-green;
    color: @g-white;
    cursor: pointer;
    .product__logo, .interval, .product__name {
        display: table-cell;
        vertical-align: middle;
    }
    .interval {
        width: 10px;
        height: 33px;
    }
    .product__name {
        display: table-cell;
        box-sizing: border-box;
        margin-left: 10px;
        width: 90px;
        height: 33px;
        border-left: solid 2px @g-white;
        text-align: left;
        text-indent: 10px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        line-height: 33px;
    }
}
.menu__list__site {
    box-sizing: border-box;
    padding-top: 30px;
    height: 114px;
    text-align: center;

    .g-border-bottom;
    .iconfont {
        padding-bottom: 15px;
        color: #ccc;
        font-size: 34px;
    }
    p {
        padding-bottom: 21px;
        color: @g-font-default-color;
        font-size: 14px;
        line-height: 14px;
    }
    &:hover,&.current {
        background-color: rgba(110, 185, 43, 0.05);
        cursor: pointer;
        p {
            color: @g-main-green;
        }
        .iconfont {
            color: @g-main-green;
        }
    }
}
.content {
    margin-right: 25px;
    margin-left: 215px;
}
.not-found-area {
    margin-left: 25px;
}
// 退出弹窗文案样式
.dialog-content {
    margin-top: 20px;
    color: @g-font-dark-color;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
}
</style>



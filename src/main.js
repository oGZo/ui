// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import ElementUI from 'element-ui';
import './libs/jquery.min';

import './global.less';

// 通用工具
import KKL from './kkl';
import { isCompatibleBroswer } from './utils/browser';

import App from './App';
import router from './router';
import store from './store';

Vue.use(ElementUI);
sync(store, router);

Vue.config.productionTip = false;
window.KKL = KKL;

// 页面兼容性处理
if(!isCompatibleBroswer()){
    location.href = '/nonsupport.html';
}
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});

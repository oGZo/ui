import Vue from 'vue';
import Router from 'vue-router';

// console.log(PAGE_LIST);
const routes = PAGE_LIST.map(page => {
    let name = page.name;
    let component = () => System.import(`../pages/${name}/index.vue`);
    let children = [];
    // 针对二级子路由处理
    if (Array.isArray(page.children) && page.children.length) {
        page.children.forEach(child => {
            let comp = () => System.import(`../pages/${name}/children/${child.name}/index.vue`);
            children.push({
                name: child.name,
                path: child.name,
                component: comp
            });
        });
    }
    return {
        name,
        children,
        component,
        path: `/${name}`,
    };
});
routes.push({
    path: '/',
    name: 'index',
    redirect: '/index',
});
routes.push({
    path: '*',
    name: 'not-found',
    component: () => System.import('../not-found.vue'),
});
console.log(routes);
Vue.use(Router);
const router = new Router({
    routes,
    base: '/',
    mode: 'hash',
});
router.beforeEach((to,from,next) => {
    // if(to.name !== 'login' && !KKL.cookie.get('kkl_ui_token')){
    //     return next({
    //         name: 'login'
    //     });
    // }
    next();
});
export default router;
// export default new Router({
//     routes,
//     base: '/',
//     mode: 'hash',
// });

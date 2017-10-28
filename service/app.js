const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser') //解析原始request请求,然后，把解析后的参数，绑定到ctx.request.body中
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
    // const verify = util.promisify(jwt.verify) // 解密
const secret = require('./config/token');
const Router = require('koa-router'); //处理url映射
const router = new Router(); //实例化了Router(),也可以在上一句的时候直接const Router = require('koa-router')().效果一样
const getRouters = require('./router');
const routers = getRouters();
const serve = require('koa-static');
const path = require('path');
const multer = require('koa-multer');
const cors = require('koa-cors');
const upload = multer({ dest: './uploadFile' });

app.use(bodyParser()); //将bodyparser注册到app对象上

// console.log(routers);

const setRouter = () => {
    Object.keys(routers).forEach(v => {
        const [method, Path] = v.split('_');
        // console.log(method, Path, routers[v]);
        console.log(v);
        if (Path !== '/file/saveFile') {
            router[method](Path, routers[v]);
        }
    });
    return router;
};

console.log(router);

// app
//     .use(jwtKoa({ secret }).unless({
//         path: [/^\/user\/login/] //数组中的路径不需要通过jwt验证
//     }));

setRouter();

// 针对上传图片单独处理
router.post('/file/saveFile', upload.single('file'), routers['post_/file/saveFile']);

app
    .use(cors())
    .use(router.routes())
    .use(serve(path.join(__dirname, 'public')))
    .use(router.allowedMethods())
    .use(serve(path.join(__dirname, 'uploadFile')));
app.listen(4001, () => {
    console.log('app listening 4001...');
});

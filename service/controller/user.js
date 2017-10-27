const utils = require('../mysql/utils.js');
// const secret = require('../config/token');

const register = async (ctx) => {
    const { name, pwd } = ctx.req.body;
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let users = oldData.kkl_user;
    if(users.some(user => user.name === name)){
        ctx.body = {
        code: 2,
        message: '该用户已存在'
        };
        return;
    }
    const maxUserId = oldData.max_user_id + 1;
    const id = maxUserId;
    const userInfo = {
        id,
        pwd,
        name,
        status: 1
    };
    oldData.kkl_user.push(userInfo);
    oldData.max_user_id = maxUserId;
    await utils.write(oldData);
    const data = {
        userInfo,
        token: 1
    };
    ctx.body = {
        data,
        code: 1,
        message: '注册成功'
    };
};
const login = async (ctx, next) => {
    const { name, pwd } = ctx.request.body;
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let users = oldData.kkl_user;
    if(!users.some(user => user.name === name)){
        ctx.body = {
        code: 2,
        message: '该用户不存在'
        };
        return;
    }
    const maxUserId = oldData.max_user_id + 1;
    const id = maxUserId;
    const data = {
        userInfo: {
            id,
            pwd,
            name,
            status: 1
        },
        token: 1
    };
    ctx.body = {
        data,
        code: 1,
        message: '登录成功'
    };
};

module.exports = {
    post_register: register,
    post_login: login,
};

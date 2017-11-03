const utils = require('../mysql/utils.js');
const secret = require('../config/token');
const jwt = require('jsonwebtoken');
const util = require('util');

const verify = util.promisify(jwt.verify); // 解密

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
    const userInfo = users.filter(user => user.name === name)[0];
    const { id } = userInfo;
    if(pwd.trim() !== userInfo.pwd){
        ctx.body = {
            code: 2,
            message: '密码错误'
        };
        return;
    }
    let userToken = {
        id,
        name,
    };
    const token = jwt.sign(userToken, secret, {expiresIn: '2400h'});  // token签名 有效期为1小时
    const data = {
        token,
        userInfo: userToken
    };
    ctx.body = {
        data,
        code: 1,
        message: '登录成功'
    };
};
const getUserInfo = async(ctx) => {
    const token = ctx.header.authorization; // 获取jwt
    const { name } = await verify(token.split(' ')[1], secret); // // 解密，获取payload
    ctx.body = {
        data: {
            name
        },
        code: 1,
        message: '登录成功'
    };
};

module.exports = {
    post_login: login,
    post_register: register,
    get_getUserInfo: getUserInfo,
};

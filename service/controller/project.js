const utils = require('../mysql/utils.js');
// const secret = require('../config/token');

const createProject = async (ctx) => {
    const { name } = ctx.req.body;
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let projects = oldData.kkl_project;
    if(projects.some(project => project.name === name)){
        ctx.body = {
            code: 2,
            message: '该项目已存在'
        };
        return;
    }
    const maxId = oldData.max_project_id + 1;
    const id = maxId;
    const data = {
        projectInfo: {
            id,
            name,
            status: 1
        },
        token: 1
    };
    ctx.body = {
        data,
        code: 1,
        message: '创建成功'
    };
};
const getProjectList = async (ctx) => {
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let data = oldData.kkl_project;
    ctx.body = {
        data,
        code: 1,
        message: '登录成功'
    };
};

module.exports = {
    post_createProject: createProject,
    get_getProjectList: getProjectList,
};

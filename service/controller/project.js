const utils = require('../mysql/utils.js');
// const secret = require('../config/token');

const addProject = async(ctx) => {
    const { name } = ctx.request.body;
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let projects = oldData.kkl_project;
    if (projects.some(project => project.name === name)) {
        ctx.body = {
            code: 2,
            message: '该项目已存在'
        };
        return;
    }
    const maxId = oldData.max_project_id + 1;
    const id = maxId;
    const nowTime = Date.now();
    const creatorId = 1;
    const projectInfo = {
        id,
        name,
        creatorId,
        status: 1,
        createTime: nowTime,
        updateTime: nowTime,
    };
    const data = projectInfo;
    oldData.kkl_project.push(projectInfo);
    oldData.max_project_id = maxId;
    await utils.write(oldData);
    ctx.body = {
        data,
        code: 1,
        message: '创建成功'
    };
};
const updateProject = async(ctx) => {
    const { name, projectId } = ctx.request.body;
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let projects = oldData.kkl_project;
    let currentProject = null;
    projects.forEach(project => {
        if(project.id === +projectId){
            currentProject = project;
            project.name = name;
            project.updateTime = Date.now();
        }
    });
    if(!currentProject){
        ctx.body = {
            code: 3,
            message: '该项目不存在'
        };
        return;
    }
    oldData.kkl_project = projects;
    await utils.write(oldData);
    ctx.body = {
        data: currentProject,
        code: 1,
        message: '修改成功'
    };
};
const getProjectList = async(ctx) => {
    let oldData = await utils.query();
    oldData = JSON.parse(oldData);
    console.log(oldData);
    let data = oldData.kkl_project;
    let users = oldData.kkl_user;
    data = data.filter(project => project.status === 1);
    data.forEach(project => {
        let { creatorId } = project;
        let [user] = users.filter(u => u.id === creatorId);
        project.creator = '';
        if (user) {
            project.creator = user.name;
        }
    });
    ctx.body = {
        data,
        code: 1,
        message: '获取成功'
    };
};

module.exports = {
    post_addProject: addProject,
    post_updateProject: updateProject,
    get_getProjectList: getProjectList,
};

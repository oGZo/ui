// const md5 = require('md5');
/**
 * 保存完整文件
 * @param    {[string]} name [文件名]
 * @param    {[string]} path [保存的路径]
 */
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const utils = require('../mysql/utils');


async function uploadFile(Path, file) {
    const result = await new Promise((resolve, reject) => {
        console.log(Path);
        fs.writeFile(Path, file, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
    return result;
}
const execCli = async cmd => {
    await new Promise((resolve, reject) => {
        childProcess.exec(cmd, (err, data) => {
            // console.log(111);
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};
// 获取某一路径下的所有js文件路径以及名称
const getDirSubFileList = (Path, filename) => {
    let filesList = [];
    let FileList = [];
    let pathLength = Path.length + 1;
    // console.log(Path);
    const getFileList = pPath => {
        let files = fs.readdirSync(pPath);
        files.forEach(item => {
            let curPath = `${pPath}/${item}`;
            let stat = fs.statSync(curPath);
            if (stat.isDirectory()) {
                // 递归读取文件
                getFileList(curPath);
                return;
            }
            if (stat.isFile() && item.endsWith(filename)) {
                let obj = {}; // 定义一个对象存放文件的路径和名字
                obj.path = `${pPath}/${item}`; // 路径
                obj.filename = item; // 名字
                obj.createTime = stat.ctime;
                filesList.push(obj);
            }
        });
    };
    getFileList(Path);
    FileList = filesList.map(file => {
        let relativePath = file.path.slice(pathLength);
        let relPath = relativePath.slice(0, -11);
        let lastPIndex = relPath.lastIndexOf('/') + 1;
        let createTime = file.createTime;
        return {
            createTime,
            relativePath,
            absolutePath: file.path,
            filename: relPath.slice(lastPIndex)
        };
    });
    // console.log(jsFileList);
    return FileList;
};
const getHtml = async(ctx, next) => {
    let projectId = ctx.query.projectId;
    let Path = path.resolve(__dirname, `../uploadFile/${projectId}/`);
    let list = [];
    let allData = await utils.query();
    allData = JSON.parse(allData);
    let [project] = allData.kkl_project.filter(pro => pro.id === +projectId);
    if (!project) {
        ctx.body = {
            data: {},
            code: 2,
            message: '该项目不存在'
        };
        return;
    }
    try {
        list = getDirSubFileList(Path, 'index.html');
        list = list.filter(file => file.relativePath.endsWith('/index.html'));
    } catch (err) {
        console.log(err);
    }
    list.forEach(page => {
        page.relativePath = `${projectId}/${page.relativePath}`;
    });
    const data = {
        list,
        projectName: project.name
    };
    ctx.body = {
        data,
        code: 1,
        message: '获取成功'
    };
};
const saveFile = async(ctx, next) => {
    console.log(ctx.req);
    try {
        let {
            originalname
        } = ctx.req.file;
        const projectId = ctx.req.body.projectId;
        let name = originalname;
        let catchFilePath = ctx.req.file.path;
        let catchFile = fs.readFileSync(catchFilePath);
        let uploadFilePath = path.resolve(__dirname, '../uploadFile/');
        let fullName = `${Date.now()}_${name}`;
        try {
            if (!fs.statSync(uploadFilePath).isDirectory()) {
                fs.mkdirSync(uploadFilePath);
            }
        } catch (err) {
            fs.mkdirSync(uploadFilePath);
        }
        let toPath = `${uploadFilePath}/${projectId}`;
        let data = {
            name,
            fullName,
            path: `${toPath}/${fullName}`
        };
        try {
            if (!fs.statSync(toPath).isDirectory()) {
                fs.mkdirSync(toPath);
            }
        } catch (err) {
            fs.mkdirSync(toPath);
        }
        await uploadFile(data.path, catchFile);
        if (fullName.endsWith('.zip')) {
            let filePath = data.path;
            let toFilePath = toPath;
            console.log(filePath);
            console.log(toFilePath);

            await execCli(`unzip -o ${filePath}  -d ${toFilePath}`);
            await execCli(`rm ${filePath}`);
            await execCli(`rm ${catchFilePath}`);
            await execCli(`rm -rf ${toFilePath}/__MACOSX`);
            // console.log('suc');
        }
        ctx.body = {
            data,
            code: 1,
            message: '上传成功'
        };
    } catch (err) {
        throw err;
    }
};
module.exports = {
    post_saveFile: saveFile,
    get_getHtml: getHtml
};

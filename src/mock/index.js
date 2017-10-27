const getSubDirs = require('../../build/utils').getSubDirs;
const fs = require('fs');
const path = require('path');
// 获取某一路径下的所有js文件路径以及名称
const getDirSubJsFileList = (Path) => {
        let filesList = [];
        let jsFileList = [];
        let pathLength = Path.length + 1;
        // console.log(Path);
        const getFileList = (pPath) => {
            var files = fs.readdirSync(pPath);
            files.forEach(item => {
                let curPath = `${pPath}/${item}`;
                var stat = fs.statSync(curPath);
                if (stat.isDirectory()) {
                //递归读取文件
                    getFileList(curPath);
                    return;
                }
                if(stat.isFile() && item.endsWith('.js')){
                    var obj = {};//定义一个对象存放文件的路径和名字
                    obj.path = `${pPath}/${item}`;//路径
                    obj.filename = item//名字
                    filesList.push(obj);
                }

            })
        }
        getFileList(Path);
        jsFileList = filesList.map(file => {
            let relativePath = file.path.slice(pathLength);
            return {
                relativePath,
                absolutePath: file.path,
                filename: file.filename
            }
        });
        // console.log(jsFileList);
        return jsFileList;
    }
// 自动获取所有接口以及数据
const getInterfaceName = () => {
    // 接口文件所在目录
    const pathName = path.resolve(__dirname, './api');
    // 获取一级接口目录列表
    const interfaceDirs = getDirSubJsFileList(pathName);
    const interfaceNames = {};
    // console.log(interfaceDirs);
    interfaceDirs.forEach(file => {
        let filePath = file.absolutePath;
        let interfaceName = file.relativePath.slice(0, -3).split('/').join('.');
        interfaceNames[interfaceName] = {
            code: 1,
            success: true,
            message: '请求成功',
            data: require(filePath)
        };
    });
    console.log(interfaceNames);
    return interfaceNames;
};




// getInterfaceName();
module.exports = getInterfaceName;

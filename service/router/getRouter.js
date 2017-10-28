// 获取当前目录下的文件

const fs = require('fs');
const path = require('path');

const getFiles = basePath =>
    fs
    .readdirSync(basePath)
    .filter(item => fs.statSync(path.resolve(basePath, item)).isFile());

const getInterfaceName = () => {
    // 接口所在文件的绝对路径
    const pathName = path.resolve(__dirname, '../controller');
    // 获取所以的接口文件
    const interfaces = getFiles(pathName);
    // 拼装好之后的接口请求类型和路径
    const interfaceNames = {};
    // console.log(interfaces);
    interfaces.forEach(fileName => {
        const name = fileName.slice(0, fileName.length - 3);
        if (fileName.slice(-3) === '.js') {
            // console.log(name);
            let filePath = path.resolve(pathName, fileName);
            // 后期接口的方法文件列表
            let interfaceData = require(filePath);
            Object.keys(interfaceData).forEach(key => {
                const [type, method] = key.split('_');
                const typeAndMethod = `${type}_/${name}/${method}`;
                interfaceNames[typeAndMethod] = interfaceData[key];
            });
            // console.log(interfaceData);
        }
    });
    // console.log(interfaceNames);
    return interfaceNames;
};
// getInterfaceName();
module.exports = getInterfaceName;
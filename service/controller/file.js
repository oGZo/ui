// const md5 = require('md5');
/**
 * 保存完整文件
 * @param    {[string]} name [文件名]
 * @param    {[string]} path [保存的路径]
 */
const fs = require('fs');
const path = require('path');
const unzip = require('unzip');
async function uploadFile(Path, file) {
  return await new Promise((resolve, reject) => {
    console.log(Path);
    fs.writeFile(Path, file, function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}
const execCli = async cmd => {
  await new Promise((resolve, reject) => {
    require('child_process').exec(cmd, function(err, data) {
      console.log(111);
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
    var files = fs.readdirSync(pPath);
    files.forEach(item => {
      let curPath = `${pPath}/${item}`;
      var stat = fs.statSync(curPath);
      if (stat.isDirectory()) {
        //递归读取文件
        getFileList(curPath);
        return;
      }
      if (stat.isFile() && item.endsWith(filename)) {
        var obj = {}; //定义一个对象存放文件的路径和名字
        obj.path = `${pPath}/${item}`; //路径
        obj.filename = item; //名字
        filesList.push(obj);
      }
    });
  };
  getFileList(Path);
  FileList = filesList.map(file => {
    let relativePath = file.path.slice(pathLength);
    let relPath = relativePath.slice(0, -11);
    let lastPIndex = relPath.lastIndexOf('/') + 1;
    return {
      relativePath,
      absolutePath: file.path,
      filename: relPath.slice(lastPIndex)
    };
  });
  // console.log(jsFileList);
  return FileList;
};
const getHtml = async (ctx, next) => {
  let projectId = ctx.query.projectId;
  let Path = path.resolve(__dirname, `../uploadFile/${projectId}/`);
  let list = [];
  try{
      list = getDirSubFileList(Path, 'index.html');
  }catch(err){
    ctx.body = {
        data: list,
        code: 2,
        message: '该项目暂无信息'
      };
      return;
  }
  list.forEach(page => {
    page.relativePath = `${projectId}/${page.relativePath}`;
  });
  ctx.body = {
    data: list,
    code: 1,
    message: '上传成功'
  };
};
const saveFile = async (ctx, next) => {
  console.log(ctx.req);
  try {
    let { originalname } = ctx.req.file;
    const projectId = ctx.req.body.projectId;
    let name = originalname;
    let f1 = fs.readFileSync(ctx.req.file.path);
    let full_name = `${Date.now()}_${name}`;
    let toPath = path.resolve(__dirname, `../uploadFile/${projectId}/`);
    let data = {
      name,
      full_name,
      path: `${toPath}/${full_name}`
    };
    try {
      if (!fs.statSync(toPath).isDirectory()) {
        fs.mkdirSync(toPath);
      }
    } catch (err) {
      fs.mkdirSync(toPath);
    }
    await uploadFile(data.path, f1);
    if (full_name.endsWith('.zip')) {
      let filePath = data.path;
      let toFilePath = toPath;
      console.log(filePath);
      console.log(toFilePath);

      await execCli(`unzip -f ${filePath} -d ${toFilePath}`);
      await execCli(`rm ${filePath}`);
      console.log('suc');
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

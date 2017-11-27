const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const initDB = {
    kkl_user: [{
        id: 1,
        name: 'admin',
        pwd: '123456',
        status: 1,
        updateTime: 1509118595429,
        createTime: 1509118595429
    }],
    max_user_id: 1,
    max_project_id: 0,
    kkl_project: []
};
const isExist = async(Path) => {
    let flag = await new Promise((reslove) => {
        fs.access(Path, (err) => {
            if(err){
                return reslove(false);
            }
            return reslove(true);
        });
    });
    return flag;
};
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

const dbDir = path.resolve(__dirname, './db');
const db = `${dbDir}/db.json`;
const writeFile = async (data) => {
    const str = JSON.stringify(data);
    const result = await new Promise((resolve, reject) => {
        fs.writeFile(db, str, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
    return result;
};

// 初始化数据库，如果目录文件存在
const handleDB = async () => {
   const isExistFile =  await isExist(db);
   if(!isExistFile){
        await execCli(`mkdir -p ${dbDir}`);
        // 如果不存在则初始化话数据库
        // eslint-disable-next-line
        await writeFile(initDB);
   }
};

const query = async() => {
    await handleDB();
    const result = await new Promise((resolve, reject) => {
        fs.readFile(db, 'utf-8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
    return result;
};

const write = async(data) => {
    await handleDB();
    const result = await writeFile(data);
    return result;
};

// const init = async() => {
//     let data = await query();
//     console.log(data);
//     data = JSON.parse(data);

// };
// init();
module.exports = {
    query,
    write,
    isExist
};

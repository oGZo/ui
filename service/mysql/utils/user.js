const seq = require('../index');

// insert into s_user(user_type, account, pwd) values(2, 170001, '123456');
// insert into s_teacher(user_id, name, sex, birth, class, job_number, entry_date, operator) values(4, 'zgz', 1, '1997/9/9', 1, 170002, '2017/9/1', 1);

const addUser = async({ account, userType }) => {
    if (!account) {
        throw new Error('账号不能为空');
    }

    // 定义变量，查询用户是否在数据库中
    let insertUserSql = `insert into s_user(user_type,account,pwd) values(${userType},${account},'123456')`;
    const [userId] = await seq.query(insertUserSql);
    console.log(userId);
    return userId;
};
const queryStudent = async(userId) => {
    if (!userId) {
        throw new Error('user_id不能为空');
    }
    let info = {};
    // 定义变量，查询用户是否在数据库中
    let studentSql = `SELECT name,sex,birth,class,grade,student_number,enrol_date FROM s_student WHERE user_id = '${userId}' and status != -1`;
    const [studentDatas] = await seq.query(studentSql);
    if (studentDatas.length) {
        info = studentDatas[0];
    }
    console.log(info);
    return info;
};
const queryTeacher = async(userId) => {
    if (!userId) {
        throw new Error('user_id不能为空');
    }
    let info = {};
    // 定义变量，查询用户是否在数据库中
    let sql = `SELECT name,sex,birth,class,job_number,entry_date FROM s_teacher WHERE user_id = '${userId}' and status != -1`;
    const [datas] = await seq.query(sql);
    if (datas.length) {
        info = datas[0];
    }
    console.log(info);
    return info;
};


module.exports = {
    addUser,
    queryStudent,
    queryTeacher
};
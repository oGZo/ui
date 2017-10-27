const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = sequelize;
// (async() => {
//     // const [datas] = await sequelize.query("insert into s_user(user_type,account,pwd) values(2,170002,'123456')");
//     // console.log(datas);
//     let queryJobNumberSql = `select max(job_number) from s_teacher`;
//     let [maxJobNumber] = await sequelize.query(queryJobNumberSql);
//     console.log(maxJobNumber[0]['max(job_number)']);


// })();
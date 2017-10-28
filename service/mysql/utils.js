const fs = require('fs');
const path = require('path');

const db = path.resolve(__dirname, './db.json');

const query = async() => {
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

const init = async() => {
    let data = await query();
    console.log(data);
    data = JSON.parse(data);

};
// init();
module.exports = {
    query,
    write
};
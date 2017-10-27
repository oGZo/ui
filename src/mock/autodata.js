const faker = require('faker');
const _ = require('lodash');

const getAddress = _.times(10, () => {
    const data = {
        id: faker.random.uuid(),
        city: faker.address.city(),
        county: faker.address.county()
    };
    return data;
});

module.exports= {
    getAddress
};

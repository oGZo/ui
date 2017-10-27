export const SET_USER_INFO = 'SET_USER_INFO';

const state = {
    name: '吴亦凡',
    school: '江西省赣州市于都实验中学',
    schoolId: 1,
    provinceId: null,
    provinceName: '浙江',
    sex: '男',
};

const mutations = {
    [SET_USER_INFO](store, payload) {
        Object.assign(store, payload);
    },
};

export default {
    name: 'user',
    namespaced: true,
    state,
    mutations,
};

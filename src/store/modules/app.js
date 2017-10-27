export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

const state = {
    loading: false,
};

const mutations = {
    [SET_LOADING_STATUS](store, payload) {
        store.loading = payload;
    },
};

export default {
    name: 'app',
    namespaced: true,
    state,
    mutations,
};

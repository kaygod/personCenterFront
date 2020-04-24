import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_info: {},
    token: null,
  },
  getters: {
    getUserInfo(state) {
      return state.user_info;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {},
  mutations: {
    setUserInfo(state, user_info) {
      state.user_info = user_info;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  modules: {},
});

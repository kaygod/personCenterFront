import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_info: null,
  },
  getters: {
    getUserInfo(state) {
      return state.user_info;
    },
  },
  actions: {},
  mutations: {
    setUserInfo(state, user_info) {
      state.user_info = user_info;
    },
  },
  modules: {},
});

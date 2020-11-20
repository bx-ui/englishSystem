import { getStorage } from "@/utils/localStorage.js";
export default {
  namespaced: true,
  state: {
    isLogin: false,
    name: "",
    url: "",
    pass: "",
    typeLogin: 1, // 1 2
    callTime: ""
  },
  mutations: {
    changeLoginState(state, value) {
      console.log(value, "value");
      state.isLogin = value;
    },
    saveUserInfo(state, { name, url, pass }) {
      state.name = name;
      state.url = url;
      state.pass = pass;
    },
    changeType(state, type) {
      state.typeLogin = type;
    },
    mutCallTime(state, time) {
      state.callTime = time;
    }
  },
  actions: {
    login({ commit }, { phone, code }) {
      return new Promise((resolve, reject) => {
        const userList = getStorage("user");
        console.log(phone);
        const currentUser = userList.filter(user => user.name == phone);
        console.log(currentUser.length);
        if (currentUser.length != 1) {
          reject();
        } else {
          if (currentUser[0].pass === code) {
            commit("changeLoginState", true);
            commit("saveUserInfo", ...currentUser);
            resolve();
          } else {
            reject();
          }
        }
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("changeLoginState", false);
        resolve();
      });
    },
    loginChangeType({ commit }, state) {
      commit("changeType", state);
    },
    setCallTime({ commit }, time) {
      commit("mutCallTime", time);
    }
  }
};

import { jwtDecrypt } from "../../shared/jwtHelper";
import { tokenAlive } from "../../shared/jwtHelper";
import axios from "axios";

const state = () => ({
  authData: {
    token: "",
    refreshToken: "",
    tokenExp: "",
    userId: "",
    userName: "",
  },
  loginStatus:"",
});

const getters = {
  // code hidden for display purpose
  isTokenActive(state) {
    if (!state.authData.tokenExp) {
      return false;
    }
    return tokenAlive(state.authData.tokenExp);
  },
};

const actions = {
  async login({ commit }, payload) {
    const response = await axios
      .post("https://teletextbackend.azurewebsites.net/accounts/api/token/", payload)
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("saveTokenData", response.data);
      commit("setLoginStatu", "success");
    } else {
      commit("setLoginStatu", "failed");
    }
}
};

const mutations = {
  saveTokenData(state, data) {

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    const jwtDecodedValue = jwtDecrypt(data.access_token);
    const newTokenData = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      tokenExp: jwtDecodedValue.exp,
      userId: jwtDecodedValue.sub,
      userName: jwtDecodedValue.userName,
    };
    state.authData = newTokenData;
  },
  setLoginStatu(state, value){
     state.loginStatus = value;
  }
};

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}
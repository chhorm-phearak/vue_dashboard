import crud from "../../api/crud";
import { setToken } from "../../plugins/authentication";

// state (Property is an name of Attribute)
const state = {
  token: localStorage.getItem("token") || 0,
};

// getters (read Value from from state)
const getters = {
  getToken: (state) => state.token,
  // getToken: function (state) {
  //   return state.token;
  // },
};

// actions (do CRUD function)
const actions = {
  setToken(context, payload) {
    localStorage.setItem("token", payload); // save token
    context.commit("UPDATE_TOKEN", payload);
  },
  removeToken(context) {
    localStorage.removeItem("token");
    context.commit("UPDATE_TOKEN", 0);
  },
};

// mutations (set Value to state)
const mutations = {
  UPDATE_TOKEN(state, payload) {
    state.token = payload;
  },
};

export default {
<<<<<<< HEAD
  // namespace: true,
=======
>>>>>>> 33a15ef950be06cd74103d98da87796dfaa8654b
  namespaced: true,
  state, //Property
  getters, //Read value from state
  actions, //Do crud functions with from server
  mutations, //Set value to state
};

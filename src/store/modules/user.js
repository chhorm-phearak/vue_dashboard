import crud from "../../api/crud";
import { setToken } from "../../plugins/authentication";

// state (Property is an name of Attribute)
const state = {};

// getters (read Value from from state)
const getters = {};

// actions (do CRUD function)
const actions = {};

// mutations (set Value to state)
const mutations = {};

export default {
  namespaced: true,
  state, //Property
  getters, //Read value from state
  actions, //Do crud functions with from server
  mutations, //Set value to state
};

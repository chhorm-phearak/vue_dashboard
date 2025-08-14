import crud from "../../api/crud";

// state (Property is an name of Attribute)
const state = {
  model: {
    name: "guardian",
    title: "I am guardian",
  },
  // records: [],
  // record: null,
  records: null,
  record: null,
  name: "Default no name",
};

// getters (read Value from from state)
const getters = {
  setRecords(state, getters, rootState) {
    return state.records;
  },
  setRecord(state, getters, rootState) {
    return state.record;
  },
  getName(state, getters, rootState) {
    return state.name;
  },
};

// actions (do CRUD function)
const actions = {
  async list({ state, commit, rootState }, params) {
    return await crud.List(
      import.meta.env.VITE_API_SERVER + "/" +
        state.model.name + //guardian
        "/list?" +
        new URLSearchParams({
          search: params.search,
          perPage: params.perPage,
          page: params.page,
        }).toString()
    );
  },
  async read({ state, commit, rootState }, params) {
    return await crud.Read(
      import.meta.env.VITE_API_SERVER +
        "/" +
        state.model.name +
        "/" +
        params.id +
        "/read"
    );
  },
  async create({ state, commit, rootState }, params) {
    return await crud.Create(
      import.meta.env.VITE_API_SERVER + "/" + state.model.name + "/create",
      params
    );
  },
  async update({ state, commit, rootState }, params) {
    return await crud.Update(
      import.meta.env.VITE_API_SERVER + "/" + state.model.name + "/update",
      params
    );
  },
  async delete({ state, commit, rootState }, params) {
    return await crud.Delete(
      import.meta.env.VITE_API_SERVER +
        "/" +
        state.model.name +
        "/" +
        params.id +
        "/delete"
    );
  },
  async updateName({ state, commit, rootState }, params) {
    return await (state.name + " ++ Updated name by action");
  },
};

// mutations (set Value to state)
const mutations = {
  setRecords(state, records) {
    state.records = records + " + Updated records by commit";
  },
  setRecord(state, record) {
    state.record = record + " + Updated record by commit";
  },
  setName(state, name) {
    state.name = name + " + Updated name by commit";
  },
};

export default {
  namespaced: true,
  state, //Property
  getters, //Read value from state
  actions, //Do crud functions with from server
  mutations, //Set value to state
};

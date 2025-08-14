import crud from "../../api/crud";

// state (Property is an name of Attribute)
const state = {
  model: {
    name: "division", // ✅ changed from "staff"
    title: "I am admin",
  },
  records: null,
  record: null,
  name: "Default no name",
};

// getters (read Value from state)
const getters = {
  getRecords(state) {
    return state.records;
  },
  getRecord(state) {
    return state.record;
  },
  getName(state) {
    return state.name;
  },
};

// actions (do CRUD function)
const actions = {
  async list({ state, commit }, params) {
    return await crud.List(
      `http://127.0.0.1:8000/api/${state.model.name}/list?` +
        new URLSearchParams({
          search: params.search,
          perPage: params.perPage,
          page: params.page,
        }).toString()
    );
  },
  async read({ state }, params) {
    return await crud.Read(
      `${import.meta.env.VITE_API_SERVER}/${state.model.name}/${params.id}/read`
    );
  },
  async create({ state }, params) {
    return await crud.Create(
      `${import.meta.env.VITE_API_SERVER}/${state.model.name}/create`,
      params
    );
  },
  async update({ state }, params) {
    return await crud.Update(
      `${import.meta.env.VITE_API_SERVER}/${state.model.name}/update`,
      params
    );
  },
  async delete({ state }, params) {
    return await crud.Delete(
      `${import.meta.env.VITE_API_SERVER}/${state.model.name}/${params.id}/delete`
    );
  },
  async updateName({ state }, params) {
    return state.name + " ++ Updated name by action";
  },
};

// mutations (set Value to state)
const mutations = {
  setRecords(state, records) {
    state.records = records; // ✅ removed string concat
  },
  setRecord(state, record) {
    state.record = record;
  },
  setName(state, name) {
    state.name = name;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

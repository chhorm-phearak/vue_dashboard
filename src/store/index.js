// import { createStore } from "vuex";
import { createStore } from "vuex";

// call from user modules ot register
import user from "./modules/user";

export default createStore({
  state: {
    company: "TESING...",
  },
  modules: {
    user,
  },
});

// import { createStore } from "vuex";
import { createStore } from "vuex";

// call from user modules ot register
import user from "@/store/modules/user";
import staff from "@/store/modules/staff";

export default createStore({
  state: {
    company: "CHHROM PHEARAK",
  },
  modules: {
    user,
    staff,
  },
});

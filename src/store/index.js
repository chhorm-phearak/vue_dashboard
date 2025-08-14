// import { createStore } from "vuex";
import { createStore } from "vuex";

// call from user modules ot register
import user from "@/store/modules/user";
import staff from "@/store/modules/staff";
import division from "@/store/modules/division";

export default createStore({
  state: {
    company: "TESING...",
  },
  modules: {
    user,
    staff,
    division,
  },
});

// import { createStore } from "vuex";
import { createStore } from "vuex";

// call from user modules ot register
import user from "@/store/modules/user";
import staff from "@/store/modules/staff";
import guardian from "@/store/modules/guardian";
import student from "@/store/modules/student";
import receipt from "@/store/modules/receipt";
import invoice from "@/store/modules/invoice";

export default createStore({
  state: {
    company: "TESING...",
  },
  modules: {
    user,
    staff,
    guardian,
    student,
    receipt,
    invoice,
  },
});

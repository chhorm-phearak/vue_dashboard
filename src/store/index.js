// import { createStore } from "vuex";
import { createStore } from "vuex";

// call from user modules ot register
import user from "@/store/modules/user";
import staff from "@/store/modules/staff";
import guardian from "@/store/modules/guardian";
import student from "@/store/modules/student";
import receipt from "@/store/modules/receipt";
import invoice from "@/store/modules/invoice";
import division from "@/store/modules/division";
import position from "@/store/modules/position";
import permission from "@/store/modules/permission";
import application from "@/store/modules/application";
import role from "@/store/modules/role";
import userRole from "@/store/modules/userRole";
import bus from "@/store/modules/bus";
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
    division,
    position,
    permission,
    application,
    role,
    userRole,
    bus,
  },
});

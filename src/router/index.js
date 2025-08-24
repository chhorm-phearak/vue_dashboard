import { createRouter, createWebHistory } from "vue-router";
import setting from "@/components/pages/setting.vue";
import login from "@/components/pages/loginAccount.vue";
import dashboard from "@/components/pages/dashBoard.vue";
import staff from "@/components/pages/staff.vue";
import attendance from "@/components/pages/attendance.vue";
import user from "@/components/pages/user.vue";
import userRole from "@/components/pages/userRole.vue";
import bus from "@/components/pages/bus.vue";
import division from "@/components/pages/division.vue";
import permission from "@/components/pages/permission.vue";
import position from "@/components/pages/position.vue";
import event from "@/components/pages/event.vue";
import guardian from "@/components/pages/guardian.vue";
import health from "@/components/pages/health.vue";
import invoice from "@/components/pages/invoice.vue";
import receipt from "@/components/pages/receipt.vue";
import role from "@/components/pages/role.vue";
import schedule from "@/components/pages/schedule.vue";
import teacher from "@/components/pages/teacher.vue";
import student from "@/components/pages/student.vue";
import studentPerformanceReport from "@/components/pages/studentPerformanceReport.vue";
import studentAssignBus from "@/components/pages/studentAssignBus.vue";
import authorizedPerson from "@/components/pages/authorizedPerson.vue";
import authorizedPersonAssignStudent from "@/components/pages/authorizedPersonAssignStudent.vue";
import curriculumn from "../components/pages/curriculumn.vue";
import application from "@/components/pages/application.vue";
import viewuser from "@/components/pages/viewuser.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  // {
  //   path: "/",
  //   redirect: "/dashboard",
  // },
  {
    path: "/login",
    name: "Login",
    component: login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: dashboard,
  },
  {
    path: "/staff",
    name: "Staff",
    component: staff,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: attendance,
  },
  {
    path: "/user",
    name: "User",
    component: user,
  },

  // new continue
  {
    path: "/userRole",
    name: "UserRole",
    component: userRole,
  },
  {
    path: "/bus",
    name: "Bus",
    component: bus,
  },
  {
    path: "/division",
    name: "Division",
    component: division,
  },
  {
    path: "/permission",
    name: "Permission",
    component: permission,
  },
  {
    path: "/position",
    name: "Position",
    component: position,
  },
  {
    path: "/event",
    name: "Event",
    component: event,
  },
  {
    path: "/guardian",
    name: "Guardian",
    component: guardian,
  },
  {
    path: "/health",
    name: "Health",
    component: health,
  },
  {
    path: "/invoice",
    name: "Invoice",
    component: invoice,
  },
  {
    path: "/receipt",
    name: "Receipt",
    component: receipt,
  },
  {
    path: "/role",
    name: "Role",
    component: role,
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: schedule,
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: teacher,
  },
  {
    path: "/student",
    name: "Student",
    component: student,
  },
  {
    path: "/viewuser",
    name: "ViewUser",
    component: viewuser,
  },
  {
    path: "/studentPerformanceReport",
    name: "StudentPerformanceReport",
    component: studentPerformanceReport,
  },
  {
    path: "/studentAssignBus",
    name: "StudentAssignBus",
    component: studentAssignBus,
  },
  {
    path: "/authorizedPerson",
    name: "AuthorizedPerson",
    component: authorizedPerson,
  },
  {
    path: "/authorizedPersonAssignStudent",
    name: "AuthorizedPersonAssignStudent",
    component: authorizedPersonAssignStudent,
  },
  {
    path: "/application",
    name: "Application",
    component: application,
  },
  {
    path: "/curriculumn",
    name: "Curriculumn",
    component: curriculumn,
  },

  //setting last
  {
    path: "/setting",
    name: "Setting",
    component: setting,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

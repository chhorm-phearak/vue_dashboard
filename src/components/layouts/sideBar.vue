<template>
  <n-layout-sider
    v-if="!hideOnMobile || !isMobile"
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :collapsed="collapsed"
    :width="260"
    :native-scrollbar="false"
    style="border-right: 1px solid gray"
  >
    <div class="flex flex-col">
      <div class="flex items-center gap-4 px-7 pt-5">
        <img
          class="w-8 h-8"
          src="D:\internship\kindergarten_website\KB-Real\Front_Thida\Front\vue_dashboard\src\assets\logo\AdobeExpress-file.png"
          alt="LOGO-IMG"
        />
        <span class="text-xl"> Kindergarten Buddy </span>
      </div>
      <n-divider class="px-4" />
      <div class="mt-[-15px] px-1">
        <n-menu
          v-model:value="activeKey"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :router="true"
          @update:value="handleMenuRoute"
        />
      </div>
    </div>
  </n-layout-sider>
</template>
<script>
import {
  EventAvailableRound as AttendanceIcon,
  EventRepeatRound as EventIcon,
  HealthAndSafetyFilled as HealthIcon,
} from "@vicons/material";

import { Child, ChalkboardTeacher as TeacherIcon } from "@vicons/fa";
import {
  EventSchedule as ScheduleIcon,
  UserFavorite as GuardianIcon,
} from "@vicons/carbon";
import {
  PeopleSharp as PeopleIcon,
  Person as PersonIcon,
  Settings as SettingIcon,
  StorefrontSharp as StorefrontIcon,
  Newspaper as NewspaperIcon,
  Bus as BusIcon,
  School as SchoolIcon,
  Receipt as ReceiptIcon,
  BookOutline as CurriculumnIcon ,
  PeopleOutline as RoleIcon,
  KeyOutline as UserRoleIcon,
} from "@vicons/ionicons5";

import { useRouter, useRoute } from "vue-router";

import { NIcon } from "naive-ui";
import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default defineComponent({
  props: {
    isMobile: Boolean,
    hideOnMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeKey = ref(route.name);

    function handleMenuRoute(key) {
      router.push({ name: key });
    }

    // Keep activeKey updated when route changes
    watch(
      () => route.name,
      (newName) => {
        activeKey.value = newName;
      }
    );

    const isMobile = ref(false);
    const sidebarVisible = ref(false);
    const collapsed = ref(false);

    const handleResize = () => {
      const width = window.innerWidth;
      isMobile.value = width <= 1024;
      if (!isMobile.value) {
        sidebarVisible.value = false;
      }
    };

    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    const handleMenuClick = () => {
      if (isMobile.value) {
        sidebarVisible.value = false;
      }
    };

    const menuOptions = [
      {
        label: "Dashboard",
        key: "Dashboard",
        icon: renderIcon(StorefrontIcon),
      },

      {
        label: "Staff Management",
        key: "Attendance",
        icon: renderIcon(AttendanceIcon),
        children: [
          {
            label: "Staff",
            key: "Staff",
            icon: renderIcon(PeopleIcon),
          },
          {
            label: "Position",
            key: "Position",
            icon: renderIcon(SettingIcon),
          },
          {
        label: "Division",
        key: "Division",
        icon: renderIcon(SettingIcon),
      },
      {
        label: "Permission",
        key: "Permission",
        icon: renderIcon(SettingIcon),
      },
        ],
      },
      
      {
        label: "User",
        key: "User",
        icon: renderIcon(PersonIcon),
      },

      {
        label: "Bus",
        key: "Bus",
        icon: renderIcon(BusIcon),
      },
     
      {
        label: "Event",
        key: "Event",
        icon: renderIcon(EventIcon),
      },
      {
        label: "Guardian",
        key: "Guardian",
        icon: renderIcon(GuardianIcon),
      },
      {
        label: "Health",
        key: "Health",
        icon: renderIcon(HealthIcon),
      },
      {
        label: "Invoice",
        key: "Invoice",
        icon: renderIcon(NewspaperIcon),
      },
      {
        label: "Receipt",
        key: "Receipt",
        icon: renderIcon(ReceiptIcon),
      },
      // {
      //   label: "Role",
      //   key: "Role",
      //   icon: renderIcon(RoleIcon),
      // },
      {
        label: "Schedule",
        key: "Schedule",
        icon: renderIcon(ScheduleIcon),
      },
      {
        label: "Curriculumn",
        key: "Curriculumn",
        icon: renderIcon(CurriculumnIcon),
      },
      {
        label: "Teacher",
        key: "Teacher",
        icon: renderIcon(TeacherIcon),
      },
      {
        label: "Student",
        key: "Student",
        icon: renderIcon(SchoolIcon),
      },
      {
        label: "Student Performance Report",
        key: "StudentPerformanceReport",
        icon: renderIcon(SettingIcon),
      },
      // {
      //   label: "Student Assign Bus",
      //   key: "StudentAssignBus",
      //   icon: renderIcon(SettingIcon),
      // },
      {
        label: "Authorized Person",
        key: "AuthorizedPerson",
        icon: renderIcon(SettingIcon),
      },
      {
        label: "Authorized Person Assign Student",
        key: "AuthorizedPersonAssignStudent",
        icon: renderIcon(SettingIcon),
      },


      //setting last
      {
        label: "Setting",
        key: "Setting",
        icon: renderIcon(SettingIcon),
      },
       {
        label: "Application",
        key: "Application",
        icon: renderIcon(SettingIcon),
      },

    ];

    return {
      collapsed,
      isMobile,
      sidebarVisible,
      menuOptions,
      activeKey,
      handleMenuClick,
      handleMenuRoute,
    };
  },
});
</script>
<style>
.n-layout-sider .n-layout-toggle-button {
  display: none;
}
</style>

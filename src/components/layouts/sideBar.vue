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
          src="@/assets/logo/naivelogo-BdDVTUmz.svg"
          alt="LOGO-IMG"
        />
        <span class="text-xl"> Naive UI </span>
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

import { ChalkboardTeacher as TeacherIcon } from "@vicons/fa";
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
        label: "Staff",
        key: "Staff",
        icon: renderIcon(PeopleIcon),
      },
      {
        label: "Attendance",
        key: "Attendance",
        icon: renderIcon(AttendanceIcon),
      },
      {
        label: "User",
        key: "User",
        icon: renderIcon(PersonIcon),
      },

      //new continue
      {
        label: "User Assign Role",
        key: "UserAssignRole",
        icon: renderIcon(SettingIcon),
      },
      {
        label: "Bus",
        key: "Bus",
        icon: renderIcon(BusIcon),
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
      {
        label: "Position",
        key: "Position",
        icon: renderIcon(SettingIcon),
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
      {
        label: "Role",
        key: "Role",
        icon: renderIcon(SettingIcon),
      },
      {
        label: "Schedule",
        key: "Schedule",
        icon: renderIcon(ScheduleIcon),
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
      {
        label: "Student Assign Bus",
        key: "StudentAssignBus",
        icon: renderIcon(SettingIcon),
      },
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

      // Dropdown Menu
      // {
      //   label: "Dance Dance Dance",
      //   key: "Dance Dance Dance",
      //   icon: renderIcon(NewspaperIcon),
      //   children: [
      //     {
      //       type: "group",
      //       label: "People",
      //       key: "people",
      //       children: [
      //         {
      //           label: "Narrator",
      //           key: "narrator",
      //           icon: renderIcon(PersonIcon),
      //         },
      //         {
      //           label: "Sheep Man",
      //           key: "sheep-man",
      //           icon: renderIcon(PersonIcon),
      //         },
      //       ],
      //     },
      //   ],
      // },
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

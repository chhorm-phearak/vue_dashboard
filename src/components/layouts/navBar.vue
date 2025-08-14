<template>
  <n-layout-header
    bordered
    class="flex justify-between items-center top-0 sticky z-10 pr-4 pl-5 h-19 !border-b !border-gray-400"
  >
    <n-tooltip placement="bottom" trigger="hover" v-if="isMobile">
      <template #trigger>
        <n-button
          style="width: 35px; height: 35px"
          @click="$emit('open-sidebar')"
        >
          <n-icon size="24">
            <component :is="MenuIcon" />
          </n-icon>
        </n-button>
      </template>
      <span> MENU </span>
    </n-tooltip>

    <!-- Search Input -->
    <div class="md:mr-65">
      <div class="w-50 md:w-80">
        <n-input size="Medium" placeholder="Search">
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
      </div>
    </div>

    <!-- Dark/Light Mode -->
    <div class="flex gap-5">
      <n-button circle style="width: 35px; height: 35px">
        <template #icon>
          <n-icon size="22">
            <component :is="SunnyIcon" />
          </n-icon>
        </template>
      </n-button>
      <n-dropdown :options="options" @select="selectLogOut">
        <n-button
          circle
          shape="square"
          style="width: 35px; height: 35px; padding: 0"
        >
          <div>
            <img
              src="../../assets/images/i_visited_angkor.jpg"
              alt="USER-IMG"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
              "
            />
          </div>
        </n-button>
      </n-dropdown>
    </div>
  </n-layout-header>
</template>

<script>
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
  Moon as MoonIcon,
  Sunny as SunnyIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
} from "@vicons/ionicons5";

import { authLogout } from "./../../plugins/authentication";

import { useRouter, useRoute } from "vue-router";

import { NIcon, NButton } from "naive-ui";
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
  setup() {
    const router = useRouter();
    const route = useRoute();

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

    const options = [
      {
        label: "Profile",
        key: "profile",
        icon: renderIcon(UserIcon),
      },
      {
        label: "Edit Profile",
        key: "editProfile",
        icon: renderIcon(EditIcon),
      },
      {
        label: "Logout",
        key: "logout",
        icon: renderIcon(LogoutIcon),
      },
    ];

    function LogOut() {
      authLogout(); // clear token from storage
      router.push({ name: "Login" }); // redirect
    }

    const selectLogOut = (key) => {
      if (key === "logout") {
        LogOut();
      }
    };

    return {
      collapsed,
      isMobile,
      sidebarVisible,
      MoonIcon,
      SunnyIcon,
      SearchIcon,
      MenuIcon,
      options,
      selectLogOut,
    };
  },
});
</script>

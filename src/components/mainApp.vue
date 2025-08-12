<template>
  <n-space vertical>
    <n-layout has-sider class="h-screen">
      <!-- Layout -->
      <!--SideBar-->
      <SideBar :is-mobile="isMobile" :hide-on-mobile="true" />
      <!--End SideBar-->

      <n-layout>
        <!--Header  @toggle-dark-mode="toggleDarkMode"-->
        <NavBar :is-mobile="isMobile" @open-sidebar="sidebarVisible = true" />
        <!-- End Header -->

        <!-- Main Content -->
        <n-layout-content>
          <div class="p-4 flex-1">
            <!-- :style="{ backgroundColor: inverted ? '#1f1f1f' : '#fef3c7' }" -->
            <slot></slot>
          </div>
        </n-layout-content>

        <!-- End Main Content -->
      </n-layout>
      <!-- Drawer Sidebar -->
      <n-drawer
        v-model:show="sidebarVisible"
        placement="left"
        :width="260"
        :native-scrollbar="false"
      >
        <!--SideBar-->
        <SideBar :is-mobile="true" :hide-on-mobile="false" />
      </n-drawer>
      <!--End Drawer Sidebar -->
    </n-layout>
  </n-space>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import NavBar from "@/components/layouts/navBar.vue";
import SideBar from "@/components/layouts/sideBar.vue";

export default defineComponent({
  components: {
    NavBar,
    SideBar,
  },
  setup() {
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

    return {
      collapsed,
      isMobile,
      sidebarVisible,
    };
  },
});
</script>
<style>
.n-button {
  padding: 0;
}
/* .n-drawer {
  transition-duration: 2s !important;
  transition-timing-function: ease !important;
} */
</style>

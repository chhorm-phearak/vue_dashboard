<template>
  <n-layout-header
    bordered
    class="flex justify-between items-center px-6 h-20 sticky z-10 !border-b !border-gray-400"
  >
    <span class="font-bold text-xl text-[#4C524F] hover:text-[#18A058]">
      System Attendance
    </span>
    <!-- <n-tooltip
      placement="bottom"
      trigger="hover"
      class="bg-white border-1 border-gray-500 text-gray-600"
    >
      <template #trigger>
        <n-button
          style="width: 40px; height: 40px"
          circle
          @click="showModal = true"
        >
          <n-icon size="24" color="#414141">
            <component :is="PersonUser" />
          </n-icon>
        </n-button>
      </template>
      <span> LOGIN </span>
    </n-tooltip> -->
    <n-popover placement="bottom" trigger="hover">
      <template #trigger>
        <n-button
          style="width: 40px; height: 40px"
          circle
          @click="showModal = true"
        >
          <n-icon size="24" class="hover:text-[#18A058]">
            <component :is="PersonUser" />
          </n-icon>
        </n-button>
      </template>
      <span class="font-bold text-[#18A058]">LOGIN</span>
    </n-popover>
  </n-layout-header>
  <ModalLogin v-model:modelValue="showModal" @close="handleClose" />
</template>

<script>
import { PersonSharp as PersonUser } from "@vicons/ionicons5";
import { NIcon, NButton } from "naive-ui";
import { defineComponent, ref } from "vue";
import ModalLogin from "@/components/modals/modalLogin.vue";

export default defineComponent({
  components: {
    ModalLogin,
  },
  setup() {
    const showModal = ref(false);
    function handleClose() {
      showModal.value = false;
      console.log("Modal closed from parent");
    }

    return {
      PersonUser,
      handleClose,
      showModal,
    };
  },
});
</script>

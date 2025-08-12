<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">
          Permission
        </h5>
        <n-button style="padding: 10px 10px" @click="showModal = true">
          <div class="flex gap-2 items-center">
            <n-icon size="24">
              <component :is="AddNew" />
            </n-icon>
            <span class="text-[18px]">NEW</span>
          </div>
        </n-button>
      </div>
    </div>
    <ModalPermission v-model:modelValue="showModal" @close="handleClose" />
    <TablePermission />
  </MainApp>
</template>

<script setup>
import { ref } from "vue";
import { AddCircleSharp as AddNew } from "@vicons/ionicons5";
import MainApp from "@/components/mainApp.vue";
import ModalPermission from "@/components/modals/modalPermission.vue";
import TablePermission from "@/components/tables/tablePermission.vue";

const showModal = ref(false);

function handleClose() {
  showModal.value = false;
  console.log("Modal closed from parent");
}
</script>

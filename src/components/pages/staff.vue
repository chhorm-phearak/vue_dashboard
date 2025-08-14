<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Staff</h5>
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
    <ModalStaff v-model:modelValue="showModal" @close="handleClose" />
    <TableStaff :records="table.records" />
  </MainApp>
</template>

<script setup>
import { ref, reactive } from "vue";
import { AddCircleSharp as AddNew, Storefront } from "@vicons/ionicons5";
import MainApp from "@/components/mainApp.vue";
import ModalStaff from "@/components/modals/modalStaff.vue";
import TableStaff from "@/components/tables/tableStaff.vue";
import { useStore } from "vuex";

const showModal = ref(false);

function handleClose() {
  showModal.value = false;
  console.log("Modal closed from parent");
}

const store = useStore();

const table = reactive({
  page: 1,
  perPage: 10,
  search: "",
  records: [],
});

store
  .dispatch("staff/list", {
    page: 1,
    perPage: 10,
    search: "",
  })
  .then((response) => {
    if (response.status === 200) {
      table.records = response.data.data;
    } else {
      console.error("Failed to fetch staffs", response);
    }
  });
</script>

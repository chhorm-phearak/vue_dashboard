<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Guardian</h5>
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
    <ModalGuardian
      v-model:modelValue="showModal"
      @refresh="loadDataGuardians"
      @close="handleClose"
    />
    <EditGuardian
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataGuardians"
      @close="closeModalEdit"
    />
    <ViewGuardian
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <TableGuardian :records="table.records" @view="openView" @edit="openEdit" />
  </MainApp>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { AddCircleSharp as AddNew } from "@vicons/ionicons5";
import MainApp from "@/components/mainApp.vue";
import ModalGuardian from "@/components/modals/modalGuardian.vue";
import EditGuardian from "@/components/modalEdits/editGuardian.vue";
import ViewGuardian from "@/components/modalViews/viewGuardian.vue";
import TableGuardian from "@/components/tables/tableGuardian.vue";
import { useStore } from "vuex";
export default {
  components: {
    MainApp,
    TableGuardian,
    ModalGuardian,
    EditGuardian,
    ViewGuardian,
  },
  setup() {
    const showModal = ref(false); // for form create

    const modalEdit = ref(false); // for form edit/update
    const editData = ref(null);

    const modalView = ref(false); // for form view
    const modalViewData = ref({}); // store data for View Guardian

    function openView(row) {
      modalViewData.value = { ...row }; // send data to modal form view
      modalView.value = true;
    }

    function openEdit(row) {
      editData.value = { ...row }; // copy data form row to  modal form edit
      modalEdit.value = true;
    }

    function handleClose() {
      showModal.value = false;
      console.log("Modal Create closed from parent");
    }
    function closeModalEdit() {
      modalEdit.value = false;
      console.log("Modal Edit closed from parent");
    }
    function closeModalView() {
      modalView.value = false;
      console.log("Modal View closed from parent");
    }

    const store = useStore();
    const table = reactive({
      page: 1,
      perPage: 10,
      search: "",
      records: [],
    });

    function loadDataGuardians() {
      store
        .dispatch("guardian/list", {
          page: 1,
          perPage: 10,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch guardians", response);
          }
        });
    }

    // fetch on page load
    onMounted(() => {
      loadDataGuardians();
    });

    return {
      AddNew,
      showModal,
      modalEdit,
      editData,
      modalView,
      openEdit,
      openView,
      modalViewData,
      table,
      loadDataGuardians,
      handleClose,
      closeModalEdit,
      closeModalView,
    };
  },
};

// store
//   .dispatch("guardian/list", {
//     page: 1,
//     perPage: 10,
//     search: "",
//   })
//   .then((response) => {
//     if (response.status === 200) {
//       table.records = response.data.data;
//     } else {
//       console.error("Failed to fetch guardians", response);
//     }
//   });
</script>

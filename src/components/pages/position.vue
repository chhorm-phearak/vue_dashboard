<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Position</h5>
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
    <ModalPosition
      v-model:modelValue="showModal"
      @refresh="loadDataPositions"
      @close="handleClose"
    />
    <EditPosition
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataPositions"
      @close="closeModalEdit"
    />
    <ViewPosition
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeletePosition
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataGuardians"
      @close="closeModalDelete"
    />
    <TablePosition
      :records="table.records"
      @view="openView"
      @edit="openEdit"
      @delete="openDelete"
    />
  </MainApp>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { AddCircleSharp as AddNew } from "@vicons/ionicons5";
import MainApp from "@/components/mainApp.vue";
import ModalPosition from "@/components/modals/modalPosition.vue";
import EditPosition from "@/components/modalEdits/editPosition.vue";
import ViewPosition from "@/components/modalViews/viewPosition.vue";
import DeletePosition from "@/components/modalDelete/deletePosition.vue";
import TablePosition from "@/components/tables/tablePosition.vue";
import { useStore } from "vuex";
export default {
  components: {
    MainApp,
    TablePosition,
    ModalPosition,
    EditPosition,
    ViewPosition,
    DeletePosition,
  },
  setup() {
    const showModal = ref(false); // for form create

    const modalEdit = ref(false); // for form edit/update
    const editData = ref(null);

    const modalView = ref(false); // for form view
    const modalViewData = ref({}); // store data for View Guardian

    const modalDelete = ref(false); // for form delete

    function openView(row) {
      modalViewData.value = { ...row }; // send data to modal form view
      modalView.value = true;
    }

    function openEdit(row) {
      editData.value = { ...row }; // copy data form row to  modal form edit
      modalEdit.value = true;
    }

    const deleteData = ref({}); // selected delete guardian

    function openDelete(row) {
      deleteData.value = { ...row }; // must include id
      modalDelete.value = true;
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
    function closeModalDelete() {
      modalDelete.value = false;
      console.log("Modal Delete closed from parent");
    }

    const store = useStore();
    const table = reactive({
      page: 1,
      perPage: 10,
      search: "",
      records: [],
    });

    function loadDataPositions() {
      store
        .dispatch("position/list", {
          page: 1,
          perPage: 10,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch Positions", response);
          }
        });
    }

    // fetch on page load
    onMounted(() => {
      loadDataPositions();
    });

    return {
      AddNew,
      showModal,
      modalEdit,
      editData,
      modalView,
      modalDelete,
      deleteData,
      openEdit,
      openDelete,
      openView,
      modalViewData,
      table,
      loadDataPositions,
      handleClose,
      closeModalEdit,
      closeModalView,
      closeModalDelete,
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

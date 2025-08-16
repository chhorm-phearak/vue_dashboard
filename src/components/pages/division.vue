<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Division</h5>
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
    <ModalDivision
      v-model:modelValue="showModal"
      @refresh="loadDataDivisions"
      @close="handleClose"
    />
    <EditDivision
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataDivisions"
      @close="closeModalEdit"
    />
    <ViewDivision
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeleteDivision
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataDivisions"
      @close="closeModalDelete"
    />
    <TableDivision :records="table.records"
     @view="openView" 
     @edit="openEdit" 
     @delete="openDelete"/>
  </MainApp>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { AddCircleSharp as AddNew } from "@vicons/ionicons5";
import MainApp from "@/components/mainApp.vue";
import ModalDivision from "@/components/modals/modalDivision.vue";
import EditDivision from "@/components/modalEdits/editDivision.vue";
import ViewDivision from "@/components/modalViews/viewDivision.vue";
import TableDivision from "@/components/tables/tableDivision.vue";
import DeleteDivision from "@/components/modalDelete/deleteDivision.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainApp,
    TableDivision,
    ModalDivision,
    EditDivision,
    ViewDivision,
    DeleteDivision,
  },
  setup() {
    const showModal = ref(false); // for form create

    const modalEdit = ref(false); // for form edit/update
    const editData = ref(null);

    const modalView = ref(false); // for form view
    const modalViewData = ref({}); // store data for View Division

     const modalDelete = ref(false);

    function openView(row) {
      modalViewData.value = { ...row }; // send data to modal form view
      modalView.value = true;
    }

    function openEdit(row) {
      editData.value = { ...row }; // copy data form row to  modal form edit
      modalEdit.value = true;
    }

    const deleteData = ref({}); // selected delete

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

    function loadDataDivisions() {
      store
        .dispatch("division/list", {
          page: 1,
          perPage: 10,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch divisions", response);
          }
        });
    }

    // fetch on page load
    onMounted(() => {
      loadDataDivisions();
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
      openView,
      openDelete,
      modalViewData,
      table,
      loadDataDivisions,
      handleClose,
      closeModalEdit,
      closeModalView,
      closeModalDelete,
    };
  },
};
</script>

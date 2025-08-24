<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Applications</h5>
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

    <ModalApplication
      v-model:modelValue="showModal"
      @refresh="loadDataApplications"
      @close="handleClose"
    />
    <EditApplication
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataApplications"
      @close="closeModalEdit"
    />
    <ViewApplication
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeleteApplication
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataApplications"
      @close="closeModalDelete"
    />
    <TableApplication
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
import ModalApplication from "@/components/modals/modalApplication.vue";
import EditApplication from "@/components/modalEdits/editApplication.vue";
import ViewApplication from "@/components/modalViews/viewApplication.vue";
import DeleteApplication from "@/components/modalDelete/deleteApplication.vue";
import TableApplication from "@/components/tables/tableApplication.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainApp,
    TableApplication,
    ModalApplication,
    EditApplication,
    ViewApplication,
    DeleteApplication,
  },
  setup() {
    const showModal = ref(false);

    const modalEdit = ref(false);
    const editData = ref(null);

    const modalView = ref(false);
    const modalViewData = ref({});
    
    const modalDelete = ref(false);
    const deleteData = ref({});

    function openView(row) {
      modalViewData.value = { ...row };
      modalView.value = true;
    }

    function openEdit(row) {
      editData.value = { ...row };
      modalEdit.value = true;
    }

    function openDelete(row) {
      deleteData.value = { ...row };
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

    function loadDataApplications() {
      return store
        .dispatch("application/list", {
          page: table.page,
          perPage: table.perPage,
          search: table.search,
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch applications", response);
          }
        });
    }

    onMounted(() => {
      loadDataApplications();
    });

    return {
      AddNew,
      showModal,
      modalEdit,
      editData,
      modalView,
      modalViewData,
      modalDelete,
      deleteData,
      openEdit,
      openView,
      openDelete,
      handleClose,
      closeModalEdit,
      closeModalView,
      closeModalDelete,
      table,
      loadDataApplications,
    };
  },
};
</script>

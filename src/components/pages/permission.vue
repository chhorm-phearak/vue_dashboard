<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Permission</h5>
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

    <!-- Modals -->
    <ModalPermission
      v-model:modelValue="showModal"
      @refresh="loadDataPermissions"
      @close="handleClose"
    />
    <EditPermission
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataPermissions"
      @close="closeModalEdit"
    />
    <ViewPermission
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeletePermission
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataPermissions"
      @close="closeModalDelete"
    />

    <!-- Table -->
    <TablePermission
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
import ModalPermission from "@/components/modals/modalPermission.vue";
import EditPermission from "@/components/modalEdits/editPermission.vue";
import ViewPermission from "@/components/modalViews/viewPermission.vue";
import DeletePermission from "@/components/modalDelete/deletePermission.vue";
import TablePermission from "@/components/tables/tablePermission.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainApp,
    TablePermission,
    ModalPermission,
    EditPermission,
    ViewPermission,
    DeletePermission,
  },
  setup() {
    const showModal = ref(false); // Create modal
    const modalEdit = ref(false); // Edit modal
    const modalView = ref(false); // View modal
    const modalDelete = ref(false); // Delete modal

    const editData = ref(null);
    const modalViewData = ref({});
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

    function loadDataPermissions() {
      store
        .dispatch("permission/list", {
          page: table.page,
          perPage: table.perPage,
          search: table.search,
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch Permissions", response);
          }
        });
    }

    onMounted(() => {
      loadDataPermissions();
    });

    return {
      AddNew,
      showModal,
      modalEdit,
      modalView,
      modalDelete,
      editData,
      modalViewData,
      deleteData,
      openView,
      openEdit,
      openDelete,
      handleClose,
      closeModalEdit,
      closeModalView,
      closeModalDelete,
      table,
      loadDataPermissions,
    };
  },
};
</script>

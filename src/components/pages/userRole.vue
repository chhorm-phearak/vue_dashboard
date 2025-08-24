<template>
  <MainApp>
    <!-- Header -->
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">User Role</h5>
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
    <ModalUserRole
      v-model:modelValue="showModal"
      @refresh="loadDataUserRoles"
      @close="handleClose"
    />
    <EditUserRole
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataUserRoles"
      @close="closeModalEdit"
    />
    <ViewUserRole
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeleteUserRole
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataUserRoles"
      @close="closeModalDelete"
    />

    <!-- Table -->
    <TableUserRole
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
import ModalUserRole from "@/components/modals/modalUserRole.vue";
import EditUserRole from "@/components/modalEdits/editUserRole.vue";
import ViewUserRole from "@/components/modalViews/viewUserRole.vue";
import DeleteUserRole from "@/components/modalDelete/deleteUserRole.vue";
import TableUserRole from "@/components/tables/tableUserRole.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainApp,
    TableUserRole,
    ModalUserRole,
    EditUserRole,
    ViewUserRole,
    DeleteUserRole,
  },
  setup() {
    const store = useStore();

    // Modal states
    const showModal = ref(false);
    const modalEdit = ref(false);
    const modalView = ref(false);
    const modalDelete = ref(false);

    // Modal data
    const editData = ref(null);
    const modalViewData = ref({});
    const deleteData = ref({});

    // Table state
    const table = reactive({
      page: 1,
      perPage: 10,
      search: "",
      records: [],
    });

    // Modal handlers
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
    }

    function closeModalEdit() {
      modalEdit.value = false;
    }

    function closeModalView() {
      modalView.value = false;
    }

    function closeModalDelete() {
      modalDelete.value = false;
    }

    // Data loader
    function loadDataUserRoles() {
      store
        .dispatch("userRole/list", {
          page: table.page,
          perPage: table.perPage,
          search: table.search,
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch user roles", response);
          }
        });
    }

    onMounted(() => {
      loadDataUserRoles();
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
      loadDataUserRoles,
    };
  },
};
</script>

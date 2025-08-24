<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">User</h5>
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

    <ModalUser
      v-model:modelValue="showModal"
      @refresh="loadDataUsers"
      @close="handleClose"
    />
    <EditUser
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataUsers"
      @close="closeModalEdit"
    />
    <ViewUser
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeleteUser
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataUsers"
      @close="closeModalDelete"
    />
    <TableUser
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
import ModalUser from "@/components/modals/modalUser.vue";
import EditUser from "@/components/modalEdits/editUser.vue";
import ViewUser from "@/components/modalViews/viewUser.vue";
import TableUser from "@/components/tables/tableUser.vue";
import DeleteUser from "@/components/modalDelete/deleteUser.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainApp,
    TableUser,
    ModalUser,
    EditUser,
    ViewUser,
    DeleteUser,
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

    function loadDataUsers() {
      store
        .dispatch("user/list", {
          page: 1,
          perPage: 10,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch users", response);
          }
        });
    }

    onMounted(() => {
      loadDataUsers();
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
      loadDataUsers,
      handleClose,
      closeModalEdit,
      closeModalView,
      closeModalDelete,
    };
  },
};
</script>

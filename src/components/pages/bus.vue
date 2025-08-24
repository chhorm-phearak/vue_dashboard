<template>
  <MainApp>
    <div class="grid grid-cols-1 mb-4">
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Bus</h5>
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
    <ModalBus
      v-model:modelValue="showModal"
      @refresh="loadDataBuses"
      @close="handleClose"
    />
    <EditBus
      v-model:modelValue="modalEdit"
      :edit-data="editData"
      @refresh="loadDataBuses"
      @close="closeModalEdit"
    />
    <ViewBus
      v-model:modelValue="modalView"
      :edit-data="modalViewData"
      @close="closeModalView"
    />
    <DeleteBus
      v-model:modelValue="modalDelete"
      :edit-data="deleteData"
      @refresh="loadDataBuses"
      @close="closeModalDelete"
    />

    <!-- Table -->
    <TableBus
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
import ModalBus from "@/components/modals/modalBus.vue";
import EditBus from "@/components/modalEdits/editBus.vue";
import ViewBus from "@/components/modalViews/viewBus.vue";
import DeleteBus from "@/components/modalDelete/deleteBus.vue";
import TableBus from "@/components/tables/tableBus.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainApp,
    ModalBus,
    EditBus,
    ViewBus,
    DeleteBus,
    TableBus,
  },
  setup() {
    const showModal = ref(false);
    const modalEdit = ref(false);
    const modalView = ref(false);
    const modalDelete = ref(false);

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

    const store = useStore();
    const table = reactive({
      page: 1,
      perPage: 10,
      search: "",
      records: [],
    });

    function loadDataBuses() {
      store
        .dispatch("bus/list", {
          page: table.page,
          perPage: table.perPage,
          search: table.search,
        })
        .then((response) => {
          if (response.status === 200) {
            table.records = response.data.data;
          } else {
            console.error("Failed to fetch buses", response);
          }
        });
    }

    onMounted(() => {
      loadDataBuses();
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
      loadDataBuses,
    };
  },
};
</script>

<template>
  <div
    class="relative overflow-hidden h-[716px] shadow-md border border-gray-200 rounded-lg p-4 bg-white">
    <!-- Search -->
    <div class="flex justify-end">
      <div class="w-60 md:w-80 pb-4">
        <n-input
          v-model:value="search"
          size="Medium"
          placeholder="Search by division name or description"
          clearable>
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
      </div>
    </div>

    <!-- Data Table -->
    <n-data-table
      class="border border-gray-100 rounded-md"
      :bordered="false"
      :single-line="false"
      :single-column="false"
      :scroll-x="800"
      :max-height="540"
      :columns="columns"
      :data="pagedData"
      :pagination="false" />

    <!-- Edit Modal -->
    <n-modal
      v-model:show="showEdit"
      title="Edit Division"
      :closable="false"
      :mask-closable="false"
      :preset="'card'">
      <n-form
        ref="editFormRef"
        :model="editForm"
        :rules="rules"
        label-placement="left"
        label-width="100px"
        size="medium">
        <n-form-item label="Division Name" path="division_name">
          <n-input v-model:value="editForm.division_name" />
        </n-form-item>
        <n-form-item label="Division Description" path="division_description">
          <n-input v-model:value="editForm.division_description" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space justify="end">
          <n-button @click="showEdit = false" tertiary>Cancel</n-button>
          <n-button @click="submitEditForm" type="primary">Save</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script>
import { Search as SearchIcon } from "@vicons/ionicons5";
import {
  RemoveRedEyeFilled as View,
  EditCalendarOutlined as Edit,
  FreeCancellationTwotone as Delete,
} from "@vicons/material";
import {
  NButton,
  NPopover,
  useMessage,
  NInput,
  NDataTable,
  NPagination,
  NModal,
  NForm,
  NFormItem,
  NSpace,
} from "naive-ui";
import { defineComponent, h, ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    NInput,
    NDataTable,
    NPagination,
    NModal,
    NForm,
    NFormItem,
    NSpace,
    NButton,
    NPopover,
  },
  props: {
    records: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const message = useMessage();
    const page = ref(1);
    const pageSize = "10";
    const search = ref("");
    const router = useRouter();

    const data = reactive([
      {
        id: 1,
        division_name: "Administration",
        division_description: "Handles all administrative tasks",
      },
    ]);

    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      return props.records.filter(
        (u) =>
          u.division_name?.toLowerCase().includes(val) ||
          u.division_description?.toLowerCase().includes(val)
      );
    });

    const pageCount = computed(() =>
      Math.ceil(filteredData.value.length / pageSize)
    );

    const pagedData = computed(() =>
      filteredData.value.slice(
        (page.value - 1) * pageSize,
        page.value * pageSize
      )
    );

    const currentUser = reactive({
      id: null,
      division_name: "",
      division_description: "",
    });

    const showView = ref(false);
    const showEdit = ref(false);
    const showDelete = ref(false);

    const editForm = reactive({
      id: null,
      division_name: "",
      division_description: "",
    });

    const rules = {
      division_name: [
        { required: true, message: "Division Name is required", trigger: "blur" },
      ],
      division_description: [
        { required: true, message: "Description is required", trigger: "blur" },
      ],
    };

    const editFormRef = ref(null);

    function createColumns() {
      return [
        { title: "ID", key: "id", align: "center" },
        { title: "Division Name", key: "division_name", align: "center" },
        { title: "Description", key: "division_description", align: "center" },
        {
          title: "Actions",
          key: "actions",
          align: "center",
          width: 140,
          render(row) {
            const whenScreen = window.innerWidth <= 1024;
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: whenScreen ? "column" : "row",
                  gap: "5px",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                },
              },
              [
                h(
                  NPopover,
                  { trigger: "hover" },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          size: "small",
                          circle: true,
                          onClick: () => openView(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#3794F2FF",
                          },
                        },
                        {
                          default: () => h(View, { class: "icon" }),
                        }
                      ),
                    default: () => h("span", null, "VIEW"),
                  }
                ),
                h(
                  NPopover,
                  { trigger: "hover" },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          size: "small",
                          circle: true,
                          onClick: () => openEdit(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#F2378EFF",
                          },
                        },
                        {
                          default: () => h(Edit, { class: "icon" }),
                        }
                      ),
                    default: () => h("span", null, "EDIT"),
                  }
                ),
                h(
                  NPopover,
                  { trigger: "hover" },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          size: "small",
                          circle: true,
                          onClick: () => openDelete(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#F70202FF",
                          },
                        },
                        { default: () => h(Delete, { class: "icon" }) }
                      ),
                    default: () => h("span", null, "DELETE"),
                  }
                ),
              ]
            );
          },
        },
      ];
    }

    function openView(row) {
      router.push({
        name: "ViewUser",
        query: { user: JSON.stringify(row) },
      });
    }

    function openEdit(row) {
      Object.assign(editForm, row);
      showEdit.value = true;
    }

    function openDelete(row) {
      Object.assign(currentUser, row);
      showDelete.value = true;
    }

    function submitEditForm() {
      editFormRef.value.validate((errors) => {
        if (!errors) {
          const idx = data.findIndex((u) => u.id === editForm.id);
          if (idx !== -1) {
            Object.assign(data[idx], editForm);
            message.success("Division updated!");
            showEdit.value = false;
          }
        } else {
          message.error("Please fix errors!");
        }
      });
    }

    function confirmDelete() {
      const idx = data.findIndex((u) => u.id === currentUser.id);
      if (idx !== -1) {
        data.splice(idx, 1);
        message.success("Division deleted!");
        showDelete.value = false;
      }
    }

    return {
      SearchIcon,
      page,
      pageSize,
      pageCount,
      search,
      data,
      pagedData,
      columns: createColumns(),
      showView,
      currentUser,
      showEdit,
      editForm,
      rules,
      editFormRef,
      submitEditForm,
      showDelete,
      openView,
      openEdit,
      openDelete,
      confirmDelete,
    };
  },
});
</script>

<style>
.icon {
  width: 20px;
  height: 20px;
  color: whitesmoke;
}
</style>

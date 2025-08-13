<!-- <template>
  <div
    class="relative overflow-hidden h-[716px] shadow-md border border-gray-200 rounded-lg p-4 bg-white"
  >
    <div class="flex justify-end">
      <div class="w-60 md:w-80 pb-4">
        <n-input size="Medium" placeholder="Search">
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
      </div>
    </div>
    <n-data-table
      class="border border-gray-100 rounded-md"
      :bordered="false"
      :single-line="false"
      :single-column="false"
      :scroll-x="800"
      :max-height="540"
      :columns="columns"
      :data="data"
    />
    <div class="flex justify-end pt-4">
      <n-pagination v-model:page="page" :page-count="10" />
    </div>
  </div>
</template>
<script>
import { Search as SearchIcon } from "@vicons/ionicons5";
import {
  RemoveRedEyeFilled as View,
  EditCalendarOutlined as Edit,
  FreeCancellationTwotone as Delete,
} from "@vicons/material";
import { NButton, NPopover, useMessage } from "naive-ui";
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  setup() {
    const message = useMessage();

    function viewRow(row) {
      message.info(`View clicked for ID: ${row.id}`);
    }

    function editRow(row) {
      message.info(`Edit clicked for ID: ${row.id}`);
    }

    function deleteRow(row) {
      message.info(`Delete clicked for ID: ${row.id}`);
    }

    function createColumns() {
      return [
        {
          title: "ID",
          key: "id",
          align: "center",
        },
        {
          title: "First Name",
          key: "first_name",
          align: "center",
        },
        {
          title: "Last Name",
          key: "last_name",
          align: "center",
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },
        {
          title: "Age",
          key: "age",
          align: "center",
        },
        {
          title: "Email",
          key: "email",
          align: "center",
        },
        {
          title: "Mobile",
          key: "phone",
          align: "center",
        },
        {
          title: "Action",
          key: "actions",
          align: "center",
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
                          onClick: () => viewRow(row),
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
                          onClick: () => editRow(row),
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
                          onClick: () => deleteRow(row),
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

    function createData() {
      return [
        {
          key: 1,
          id: 1,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 2,
          id: 2,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 3,
          id: 3,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 4,
          id: 4,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 5,
          id: 5,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 6,
          id: 6,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 7,
          id: 7,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 8,
          id: 8,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 9,
          id: 9,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 10,
          id: 10,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
        {
          key: 11,
          id: 11,
          first_name: "Chhorm",
          last_name: "Phearak",
          gender: "Male",
          age: 24,
          email: "phnompenh@gmail.com",
          phone: "+855 12 348 034",
        },
      ];
    }

    return {
      SearchIcon,
      data: createData(),
      columns: createColumns(),
      viewRow,
      editRow,
      deleteRow,
      page: ref(2),
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
</style> -->

<template>
  <div
    class="relative overflow-hidden h-[716px] shadow-md border border-gray-200 rounded-lg p-4 bg-white"
  >
    <!-- Search -->
    <div class="flex justify-end">
      <div class="w-60 md:w-80 pb-4">
        <n-input
          v-model:value="search"
          size="Medium"
          placeholder="Search by first or last name"
          clearable
        >
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
      :pagination="false"
    />

    <!-- Pagination --
    <div class="flex justify-end pt-4">
      <n-pagination
        v-model:page="page"
        :page-count="pageCount"
        :page-size="pageSize"
      />
    </div>
    < Edit Modal -->
    <n-modal
      v-model:show="showEdit"
      title="Edit User"
      :closable="false"
      :mask-closable="false"
      :preset="'card'"
    >
      <n-form ref="editFormRef" :model="editForm" :rules="rules" label-placement="left" label-width="100px" size="medium">
        <n-form-item label="First Name" path="first_name">
          <n-input v-model:value="editForm.first_name" />
        </n-form-item>
        <n-form-item label="Last Name" path="last_name">
          <n-input v-model:value="editForm.last_name" />
        </n-form-item>
        <n-form-item label="Gender" path="gender">
          <n-select v-model:value="editForm.gender" :options="genderOptions" />
        </n-form-item>
        <n-form-item label="Age" path="age">
          <n-input-number v-model:value="editForm.age" :min="1" :max="120" />
        </n-form-item>
        <n-form-item label="Email" path="email">
          <n-input v-model:value="editForm.email" />
        </n-form-item>
        <n-form-item label="Phone" path="phone">
          <n-input v-model:value="editForm.phone" />
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
  NInputNumber,
  NSelect,
  NSpace,
} from "naive-ui";
import { defineComponent, h, ref, reactive, computed } from "vue";

export default defineComponent({
  components: {
    NInput,
    NDataTable,
    NPagination,
    NModal,
    NForm,
    NFormItem,
    NInputNumber,
    NSelect,
    NSpace,
    NButton,
    NPopover,
  },
  setup() {
    const message = useMessage();
    const page = ref(1);
    const pageSize = '10';
    const search = ref("");

   const data = reactive([
  {
    id: 1,
    first_name: "Chhorm",
    last_name: "Phearak",
    gender: "Male",
    age: 24,
    email: "phnompenh@gmail.com",
    phone: "+855 12 348 034",
  },
  {
    id: 2,
    first_name: "SreyPich",
    last_name: "Mao",
    gender: "Female",
    age: 28,
    email: "sophea@example.com",
    phone: "+855 98 765 432",
  },
  {     
    id: 3,
    first_name: "Mark",
    last_name: "Jonh",
    gender: "Male",
    age: 41,
    email: "jonh@example.com",
    phone: "+855 78 230 402",
  },
  { 
    id: 4,
    first_name: "Chhorm",
    last_name: "Phearak",
    gender: "Male",
    age: 24,
    email: "phnompenh@gmail.com",
    phone: "+855 12 348 034",
  }, 
  {
    id: 5,
    first_name: "SreyPich",
    last_name: "Mao",
    gender: "Female",
    age: 28,
    email: "sophea@example.com",
    phone: "+855 98 765 432",
  },
  {     
    id: 6,
    first_name: "Mark",
    last_name: "Jonh",
    gender: "Male",
    age: 41,
    email: "jonh@example.com",
    phone: "+855 78 230 402",
  },
  { 
    id: 7,
    first_name: "Chhorm",
    last_name: "Phearak",
    gender: "Male",
    age: 24,
    email: "phnompenh@gmail.com",
    phone: "+855 12 348 034",
  }, 
  {
    id: 8,
    first_name: "SreyPich",
    last_name: "Mao",
    gender: "Female",
    age: 28,
    email: "sophea@example.com",
    phone: "+855 98 765 432",
  },
  {     
    id: 9,
    first_name: "Mark",
    last_name: "Jonh",
    gender: "Male",
    age: 41,
    email: "jonh@example.com",
    phone: "+855 78 230 402",
  },
]);

    // Computed filtered + paged
    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      if (!val) return data;
      return data.filter(
        (u) =>
          u.first_name.toLowerCase().includes(val) ||
          u.last_name.toLowerCase().includes(val) ||
          u.email.toLowerCase().includes(val)
      );
    });

    const pageCount = computed(() =>
      Math.ceil(filteredData.value.length / pageSize)
    );

    const pagedData = computed(() =>
      filteredData.value.slice((page.value - 1) * pageSize, page.value * pageSize)
    );

    // Current user for modals
    const currentUser = reactive({
      id: null,
      first_name: "",
      last_name: "",
      gender: "",
      age: null,
      email: "",
      phone: "",
    });

    // Modal states
    const showView = ref(false);
    const showEdit = ref(false);
    const showDelete = ref(false);

    // Edit form reactive copy & rules
    const editForm = reactive({
      id: null,
      first_name: "",
      last_name: "",
      gender: "",
      age: null,
      email: "",
      phone: "",
    });
    const genderOptions = [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ];

    const rules = {
      first_name: [{ required: true, message: "First name is required", trigger: "blur" }],
      last_name: [{ required: true, message: "Last name is required", trigger: "blur" }],
      gender: [{ required: true, message: "Gender is required", trigger: "change" }],
      age: [{ required: true, type: "number", min: 1, message: "Age must be valid", trigger: "blur" }],
      email: [{ required: true, type: "email", message: "Valid email is required", trigger: "blur" }],
      phone: [{ required: true, message: "Phone is required", trigger: "blur" }],
    };

    const editFormRef = ref(null);

    // Table columns with action buttons
    function createColumns() {
      return [
        { title: "ID", key: "id", align: "center" },
        { title: "First Name", key: "first_name", align: "center" },
        { title: "Last Name", key: "last_name", align: "center" },
        { title: "Gender", key: "gender", align: "center" },
        { title: "Age", key: "age", align: "center" },
        { title: "Email", key: "email", align: "center" },
        { title: "Phone", key: "phone", align: "center" },
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

    // Open modals & copy data accordingly
    function openView(row) {
      Object.assign(currentUser, row);
      showView.value = true;
    }
    function openEdit(row) {
      Object.assign(editForm, row);
      showEdit.value = true;
    }
    function openDelete(row) {
      Object.assign(currentUser, row);
      showDelete.value = true;
    }

    // Save edited data
    function submitEditForm() {
      editFormRef.value.validate((errors) => {
        if (!errors) {
          // Update original data
          const idx = data.findIndex((u) => u.id === editForm.id);
          if (idx !== -1) {
            Object.assign(data[idx], editForm);
            message.success("User updated!");
            showEdit.value = false;
          }
        } else {
          message.error("Please fix errors!");
        }
      });
    }

    // Delete data
    function confirmDelete() {
      const idx = data.findIndex((u) => u.id === currentUser.id);
      if (idx !== -1) {
        data.splice(idx, 1);
        message.success("User deleted!");
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
      genderOptions,
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

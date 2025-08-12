<template>
  <!-- Data Table -->
  <!-- h-[716px] -->
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
  <!-- End Data Table -->
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
</style>

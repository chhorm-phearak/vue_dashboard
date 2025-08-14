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
          title: "Student ID",
          key: "student_id",
          align: "center",
        },
        {
          title: "Invoice Type",
          key: "invoice_type",
          align: "center",
        },
        {
          title: "Description",
          key: "description",
          align: "center",
        },
        {
          title: "Amount",
          key: "amount",
          align: "center",
        },
        {
          title: "Due Date",
          key: "due_date",
          align: "center",
        },
        {
          title: "Status",
          key: "status",
          align: "center",
        },
        {
          title: "Action",
          key: "actions",
          align: "center",
          width: "150",
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
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 1,
          id: 1,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 2,
          id: 2,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 3,
          id: 3,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 4,
          id: 4,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 5,
          id: 5,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 6,
          id: 6,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 7,
          id: 7,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 8,
          id: 8,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 9,
          id: 9,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
        },
        {
          key: 10,
          id: 10,
          student_id: "10",
          invoice_type: "Other",
          description: "Male",
          amount: "500",
          due_date: "8/14/2025",
          status: "Unpaid",
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

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
          title: "Receipt ID",
          key: "id",
          align: "center",
        },
        {
          title: "Invoice ID",
          key: "invoice_id",
          align: "center",
        },
        {
          title: "Student First Name",
          key: "student_first_name",
          align: "center",
        },
        {
          title: "Student Last Name",
          key: "student_last_name",
          align: "center",
        },
        {
          title: "Payment Date",
          key: "payment_date",
          align: "center",
        },
        {
          title: "Amount Paid",
          key: "amount_paid",
          align: "center",
        },
        {
          title: "Payment Method",
          key: "payment_method",
          align: "center",
        },
        {
          title: "Transaction ID",
          key: "transaction_id",
          align: "center",
        },
        {
          title: "Paid By",
          key: "paid_by",
          align: "center",
        },
        {
          title: "Issued By",
          key: "issued_by",
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
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 2,
          id: 2,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 3,
          id: 3,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 4,
          id: 4,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 5,
          id: 5,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 6,
          id: 6,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 7,
          id: 7,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 8,
          id: 8,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 9,
          id: 9,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
        },
        {
          key: 10,
          id: 10,
          invoice_id: "007",
          student_first_name: "Student",
          student_last_name: "Two",
          payment_date: "8/14/2025",
          amount_paid: "600",
          payment_method: "credit_card",
          transaction_id: "01010109",
          paid_by: "guardian",
          issued_by: "staff",
          status: "pending",
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

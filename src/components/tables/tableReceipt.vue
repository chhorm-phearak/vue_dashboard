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
      :data="pagedData"
      :pagination="false"
    />
    <!-- <div class="flex justify-end pt-4">
      <n-pagination v-model:page="page" :page-count="10" />
    </div> -->
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
import { defineComponent, h, ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    records: ref([]),
  },
  setup(props) {
    const router = useRouter();
    const message = useMessage();

    console.log(props.records);

    const page = ref(1);
    const pageSize = "10";
    const search = ref("");

    const data = reactive([]);

    // Computed filtered + paged
    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      return props.records.filter(
        (u) =>
          u.student_first_name.toLowerCase().includes(val) ||
          u.student_last_name.toLowerCase().includes(val) ||
          u.status.toLowerCase().includes(val)
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

    return {
      SearchIcon,
      page,
      pageSize,
      pageCount,
      search,
      data,
      pagedData,
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

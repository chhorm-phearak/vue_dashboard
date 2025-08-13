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
  RemoveRedEyeFilled as ViewIcon,
  EditCalendarOutlined as EditIcon,
  FreeCancellationTwotone as DeleteIcon,
} from "@vicons/material";
import { NButton, NPopover, useMessage } from "naive-ui";
import { defineComponent, h, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const message = useMessage();

    const search = ref("");
    const page = ref(1);
    const pageSize = 10;

    // Sample Health data -- replace or fetch from API
    const data = ref([
      {
        id: 1,
        student: "Student A",
        incident_type: "Fever",
        detail: "High temperature recorded at 38.5°C",
      },
      {
        id: 2,
        student: "Student B",
        incident_type: "Injury",
        detail: "Scratched knee during recess",
      },
      {
        id: 3,
        student: "Student A",
        incident_type: "Headache",
        detail: "Complained about headache in class",
      },
      {
        id: 4,
        student: "Student B",
        incident_type: "Allergy",
        detail: "Mild allergic reaction to food",
      },
      {
        id: 5,
        student: "Student A",
        incident_type: "Cold",
        detail: "Sneezing and runny nose",
      },
      // add more sample records here as needed
    ]);

    const filteredData = computed(() => {
      if (!search.value) return data.value;

      const lower = search.value.toLowerCase();
      return data.value.filter(
        (item) =>
          item.student.toLowerCase().includes(lower) ||
          item.incident_type.toLowerCase().includes(lower) ||
          item.detail.toLowerCase().includes(lower)
      );
    });

    const pageCount = computed(() =>
      Math.ceil(filteredData.value.length / pageSize)
    );

    function viewRow(row) {
      message.info(`View clicked for Incident ID: ${row.id}`);
    }

    function editRow(row) {
      message.info(`Edit clicked for Incident ID: ${row.id}`);
    }

    function deleteRow(row) {
      message.info(`Delete clicked for Incident ID: ${row.id}`);
    }

    function createColumns() {
      return [
        {
          title: "ID",
          key: "id",
          align: "center",
          width: 60,
        },
        {
          title: "Student",
          key: "student",
          align: "center",
        },
        {
          title: "Incident Type",
          key: "incident_type",
          align: "center",
        },
        {
          title: "Detail",
          key: "detail",
          align: "left",
        },
        {
          title: "Action",
          key: "actions",
          align: "center",
          width: 160,
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
                          default: () => h(ViewIcon, { class: "icon" }),
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
                          default: () => h(EditIcon, { class: "icon" }),
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
                        { default: () => h(DeleteIcon, { class: "icon" }) }
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
      data,
      columns: createColumns(),
      filteredData,
      viewRow,
      editRow,
      deleteRow,
      search,
      page,
      pageSize,
      pageCount,
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
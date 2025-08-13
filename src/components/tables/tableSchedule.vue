<template>
  <!-- Schedule Table -->
  <div
    class="relative overflow-hidden h-[716px] shadow-md border border-gray-200 rounded-lg p-4 bg-white"
  >
    <!-- Search -->
    <div class="flex justify-end">
      <div class="w-60 md:w-80 pb-4">
        <n-input v-model:value="searchQuery" placeholder="Search Schedule">
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
      :scroll-x="800"
      :max-height="540"
      :columns="columns"
      :data="filteredData"
    />

    <!-- Pagination -->
    <div class="flex justify-end pt-4">
      <n-pagination v-model:page="page" :page-count="totalPages" />
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
import { defineComponent, h, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const message = useMessage();
    const searchQuery = ref("");
    const page = ref(1);
    const itemsPerPage = 10;

    function viewRow(row) {
      message.info(`Viewing schedule: ${row.title}`);
    }

    function editRow(row) {
      message.info(`Editing schedule: ${row.title}`);
    }

    function deleteRow(row) {
      message.warning(`Deleting schedule: ${row.title}`);
    }

    function createColumns() {
      return [
        { title: "ID", key: "id", align: "center" },
        { title: "Title", key: "title", align: "center" },
        { title: "Date", key: "date", align: "center" },
        { title: "Time", key: "time", align: "center" },
        { title: "Location", key: "location", align: "center" },
        {
          title: "Actions",
          key: "actions",
          align: "center",
          render(row) {
            const isMobile = window.innerWidth <= 1024;
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "5px",
                  justifyContent: "center",
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
                            backgroundColor: "#3794F2",
                            color: "white",
                            border: "1px solid gray",
                          },
                        },
                        { default: () => h(View, { class: "icon" }) }
                      ),
                    default: () => "VIEW",
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
                            backgroundColor: "#F2378E",
                            color: "white",
                            border: "1px solid gray",
                          },
                        },
                        { default: () => h(Edit, { class: "icon" }) }
                      ),
                    default: () => "EDIT",
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
                            backgroundColor: "#F70202",
                            color: "white",
                            border: "1px solid gray",
                          },
                        },
                        { default: () => h(Delete, { class: "icon" }) }
                      ),
                    default: () => "DELETE",
                  }
                ),
              ]
            );
          },
        },
      ];
    }

    function createData() {
      return Array.from({ length: 25 }, (_, i) => ({
        key: i + 1,
        id: i + 1,
        title: `Meeting ${i + 1}`,
        date: "2025-08-13",
        time: "10:00 AM",
        location: "Conference Room",
      }));
    }

    const data = ref(createData());

    const filteredData = computed(() => {
      const start = (page.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return data.value
        .filter((row) =>
          row.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        .slice(start, end);
    });

    const totalPages = computed(() =>
      Math.ceil(
        data.value.filter((row) =>
          row.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        ).length / itemsPerPage
      )
    );

    return {
      SearchIcon,
      searchQuery,
      data,
      filteredData,
      columns: createColumns(),
      page,
      totalPages,
    };
  },
});
</script>

<style>
.icon {
  width: 20px;
  height: 20px;
}
</style>

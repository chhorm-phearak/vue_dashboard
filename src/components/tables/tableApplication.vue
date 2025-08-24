<template>
  <!-- Data Table -->
  <div
    class="relative overflow-hidden h-[716px] shadow-md border border-gray-200 rounded-lg p-4 bg-white"
  >
    <div class="flex justify-end">
      <div class="w-60 md:w-80 pb-4">
        <n-input v-model:value="search" size="medium" placeholder="Search by name">
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
      :scroll-x="800"
      :max-height="540"
      :columns="columns"
      :data="pagedData"
      :pagination="false"
    />
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
import { computed, defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    records: Array,
  },
  emits: ["edit", "view", "delete"],
  setup(props, { emit }) {
    const page = ref(1);
    const pageSize = 10;
    const search = ref("");
    const message = useMessage();

    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      return props.records.filter((u) => {
        const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
        return fullName.includes(val);
      });
    });

    const pagedData = computed(() =>
      filteredData.value.slice((page.value - 1) * pageSize, page.value * pageSize)
    );

    function viewApplication(row) {
      emit("view", row);
      message.info(`Viewing application ID: ${row.id}`);
    }

    function editApplication(row) {
      emit("edit", row);
      message.info(`Editing application ID: ${row.id}`);
    }

    function deleteApplication(row) {
      emit("delete", row);
      message.info(`Deleting application ID: ${row.id}`);
    }

    function createColumns() {
      return [
        {
          title: "ID",
          key: "id",
          align: "center",
        },
        {
          title: "Full Name",
          key: "full_name",
          align: "center",
          render(row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        {
          title: "Action",
          key: "actions",
          align: "center",
          width: 150,
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
                          onClick: () => viewApplication(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#3794F2FF",
                          },
                        },
                        { default: () => h(View, { class: "icon" }) }
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
                          onClick: () => editApplication(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#F2378EFF",
                          },
                        },
                        { default: () => h(Edit, { class: "icon" }) }
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
                          onClick: () => deleteApplication(row),
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
      search,
      page,
      pagedData,
      columns: createColumns(),
      viewApplication,
      editApplication,
      deleteApplication,
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

<template>
  <!-- Data Table -->
  <div
    class="relative overflow-hidden h-[716px] shadow-md border border-gray-200 rounded-lg p-4 bg-white"
  >
    <div class="flex justify-end">
      <div class="w-60 md:w-80 pb-4">
        <n-input v-model:value="search" size="Medium" placeholder="Search">
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
    records: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["edit", "view", "delete"],
  setup(props, { emit }) {
    const page = ref(1);
    const pageSize = 10;
    const search = ref("");
    const message = useMessage();

    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      return props.records.filter(
        (p) =>
          p.permission_name?.toLowerCase().includes(val) ||
          p.permission_description?.toLowerCase().includes(val)
      );
    });

    const pagedData = computed(() =>
      filteredData.value.slice(
        (page.value - 1) * pageSize,
        page.value * pageSize
      )
    );

    function viewPermission(row) {
      emit("view", row);
      message.info(`Viewing permission ID: ${row.id}`);
    }

    function editPermission(row) {
      emit("edit", row);
      message.info(`Editing permission ID: ${row.id}`);
    }

    function deletePermission(row) {
      emit("delete", row);
      message.info(`Deleting permission ID: ${row.id}`);
    }

    function createColumns() {
      return [
        // {
        //   title: "ID",
        //   key: "id",
        //   align: "center",
        // },
        {
          title: "Permission Name",
          key: "permission_name",
          align: "center",
        },
        {
          title: "Description",
          key: "permission_description",
          align: "center",
        },
        {
          title: "Divisions",
          key: "divisions",
          align: "center",
          render(row) {
            return row.divisions?.map((d) => d.division_name).join(", ") || "—";
          },
        },
        {
          title: "Positions",
          key: "positions",
          align: "center",
          render(row) {
            return row.positions?.map((p) => p.title).join(", ") || "—";
          },
        },
        {
          title: "Action",
          key: "actions",
          align: "center",
          width: "150",
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
                          onClick: () => viewPermission(row),
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
                          onClick: () => editPermission(row),
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
                          onClick: () => deletePermission(row),
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
      search,
      pagedData,
      columns: createColumns(),
      viewPermission,
      editPermission,
      deletePermission,
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

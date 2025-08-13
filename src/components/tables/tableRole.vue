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
import { RemoveRedEyeFilled as View, EditCalendarOutlined as Edit, FreeCancellationTwotone as Delete } from "@vicons/material";
import { NButton, NPopover, useMessage } from "naive-ui";
import { defineComponent, h, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const message = useMessage();

    const page = ref(1);
    const pageSize = 10;
    const searchQuery = ref("");

    function viewRow(row) {
      message.info(`View clicked for Role ID: ${row.id}`);
    }
    function editRow(row) {
      message.info(`Edit clicked for Role ID: ${row.id}`);
    }
    function deleteRow(row) {
      message.info(`Delete clicked for Role ID: ${row.id}`);
    }

    function createColumns() {
      return [
        { title: "ID", key: "id", align: "center" },
        { title: "Name", key: "name", align: "center" },
        { title: "Guard Name", key: "guard_name", align: "center" },
        { title: "Tag", key: "tag", align: "center" },
        { title: "Created At", key: "created_at", align: "center" },
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
                            backgroundColor: "#3794F2",
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
                          onClick: () => editRow(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#F2378E",
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
                          onClick: () => deleteRow(row),
                          style: {
                            width: "35px",
                            height: "35px",
                            border: "1px solid gray",
                            backgroundColor: "#F70202",
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
        { id: 1, name: "Admin", guard_name: "web", tag: "Super User", created_at: "2025-08-01" },
        { id: 2, name: "Editor", guard_name: "web", tag: "Content Manager", created_at: "2025-08-02" },
        { id: 3, name: "Viewer", guard_name: "web", tag: "Read Only", created_at: "2025-08-03" },
        { id: 4, name: "Moderator", guard_name: "web", tag: "Community Manager", created_at: "2025-08-04" },
        { id: 5, name: "Support", guard_name: "web", tag: "Customer Service", created_at: "2025-08-05" },
        { id: 6, name: "Developer", guard_name: "api", tag: "Tech Team", created_at: "2025-08-06" },
      ];
    }

    const data = createData();

    const filteredData = computed(() => {
      if (!searchQuery.value) return data;
      return data.filter(
        (role) =>
          role.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          role.guard_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          role.tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      SearchIcon,
      data,
      filteredData,
      columns: createColumns(),
      page,
      pageSize,
      searchQuery,
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
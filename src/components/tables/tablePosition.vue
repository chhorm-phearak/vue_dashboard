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
import { computed, defineComponent, h, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    records: ref([]),
  },

  emits: ["edit", "view", "delete"],

  setup(props, { emit }) {
    //console.log(props.records);

    const page = ref(1);
    const pageSize = "10";
    const search = ref("");

    const router = useRouter();
    const message = useMessage();

    const data = reactive([]);

    // Computed filtered + paged
    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      return props.records.filter(
        (u) =>
          u.title.toLowerCase().includes(val) ||
          u.description.toLowerCase().includes(val)
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

    function viewPosition(row) {
      emit("view", row);
      message.info(`You view on ID : ${row.id}`);
    }

    function editPosition(row) {
      emit("edit", row);
      message.info(`You selected on ID : ${row.id}`);
    }

    function deletePosition(row) {
      emit("delete", row);
      message.info(`You selected on ID : ${row.id}`);
    }

    function createColumns() {
      return [
        // {
        //   title: "ID",
        //   key: "id",
        //   align: "center",
        // },
        {
          title: "Title",
          key: "title",
          align: "center",
        },
        {
          title: "Under Division",
          key: "divisions.division_name",
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
                          onClick: () => viewPosition(row),
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
                          onClick: () => editPosition(row),
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
                          onClick: () => deletePosition(row),
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
      viewPosition,
      editPosition,
      deletePosition,
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

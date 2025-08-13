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

    // Sample Curriculum data — customize fields as needed
    const data = ref([
      {
        id: 1,
        course_code: "MATH101",
        course_name: "Calculus I",
        instructor: "Dr. Sok",
        day: "Monday",
        time: "08:00 - 10:00",
        room: "Room 101",
      },
      {
        id: 2,
        course_code: "ENG201",
        course_name: "English Literature",
        instructor: "Ms. Dara",
        day: "Wednesday",
        time: "10:00 - 12:00",
        room: "Room 202",
      },
      {
        id: 3,
        course_code: "CS301",
        course_name: "Data Structures",
        instructor: "Mr. Vannak",
        day: "Friday",
        time: "13:00 - 15:00",
        room: "Room 303",
      },
      // Add more curriculum rows here
    ]);

    // Filter for search
    const filteredData = computed(() => {
      if (!search.value) return data.value;

      const lower = search.value.toLowerCase();
      return data.value.filter(
        (item) =>
          item.course_code.toLowerCase().includes(lower) ||
          item.course_name.toLowerCase().includes(lower) ||
          item.instructor.toLowerCase().includes(lower) ||
          item.day.toLowerCase().includes(lower) ||
          item.room.toLowerCase().includes(lower)
      );
    });

    const pageCount = computed(() =>
      Math.ceil(filteredData.value.length / pageSize)
    );

    function viewRow(row) {
      message.info(`View clicked for Course: ${row.course_code}`);
    }
    function editRow(row) {
      message.info(`Edit clicked for Course: ${row.course_code}`);
    }
    function deleteRow(row) {
      message.info(`Delete clicked for Course: ${row.course_code}`);
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
          title: "Course Code",
          key: "course_code",
          align: "center",
          width: 120,
        },
        {
          title: "Course Name",
          key: "course_name",
          align: "center",
        },
        {
          title: "Instructor",
          key: "instructor",
          align: "center",
          width: 150,
        },
        {
          title: "Day",
          key: "day",
          align: "center",
          width: 100,
        },
        {
          title: "Time",
          key: "time",
          align: "center",
          width: 140,
        },
        {
          title: "Room",
          key: "room",
          align: "center",
          width: 100,
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
                  text:"center",
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
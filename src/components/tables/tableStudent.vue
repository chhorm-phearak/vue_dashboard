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
          title: "First Name",
          key: "first_name",
          align: "center",
        },
        {
          title: "Last Name",
          key: "last_name",
          align: "center",
        },
        {
          title: "Age",
          key: "age",
          align: "center",
        },
        {
          title: "Gender",
          key: "gender",
          align: "center",
        },

        {
          title: "Date of Birth",
          key: "date_of_birth",
          align: "center",
        },
        {
          title: "Admission Date",
          key: "admission_date",
          align: "center",
        },
        {
          title: "Class Name",
          key: "class_name",
          align: "center",
        },
        {
          title: "Bus Name",
          key: "bus_name",
          align: "center",
        },
        {
          title: "Special Note",
          key: "special_note",
          align: "center",
        },
        {
          title: "Photo",
          key: "photo_url",
          align: "center",
        },
        {
          title: "Guardian First Name",
          key: "guardian_first_name",
          align: "center",
        },
        {
          title: "Guardian Last Name",
          key: "guardian_last_name",
          align: "center",
        },
        {
          title: "Pickup Authorized Persons",
          key: "pickup_authorized_persons",
          align: "center",
          width: "150",
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
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 2,
          id: 2,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 3,
          id: 3,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 4,
          id: 4,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 5,
          id: 5,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 6,
          id: 6,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 7,
          id: 7,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 8,
          id: 8,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 9,
          id: 9,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
        },
        {
          key: 10,
          id: 10,
          first_name: "Student",
          last_name: "One",
          gender: "Male",
          age: 8,
          date_of_birth: "8/14/2025",
          admission_date: "8/14/2025",
          class_name: "A1",
          bus_name: "B1",
          special_note: "Note",
          photo_url: "URL-Photo",
          guardian_first_name: "Guardian",
          guardian_last_name: "Guardian",
          pickup_authorized_persons: "pickup",
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

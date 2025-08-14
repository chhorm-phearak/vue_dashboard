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
  setup(props) {
    console.log(props.records);

    const page = ref(1);
    const pageSize = "10";
    const search = ref("");

    const router = useRouter();
    const message = useMessage();

    const data = reactive([
      // {
      //   id: 1,
      //   first_name: "Guardian",
      //   last_name: "One",
      //   age: "26",
      //   guardian_gender: "Female",
      //   relationship_to_student: "Mother",
      //   occupation: "Work",
      //   email: "guardian@gmail.com",
      //   phone_number: "+855 101 010",
      //   address: "Phnom Penh",
      //   photo_url: "Guardian Photo",
      // },
    ]);

    // Computed filtered + paged
    const filteredData = computed(() => {
      const val = search.value.toLowerCase();
      return props.records.filter(
        (u) =>
          u.first_name.toLowerCase().includes(val) ||
          u.last_name.toLowerCase().includes(val) ||
          u.email.toLowerCase().includes(val)
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
          key: "guardian_gender",
          align: "center",
        },
        {
          title: "Relationship Student",
          key: "relationship_to_student",
          align: "center",
          width: "200",
        },
        {
          title: "Occupation",
          key: "occupation",
          align: "center",
        },
        {
          title: "Email",
          key: "email",
          align: "center",
        },
        {
          title: "Mobile Phone",
          key: "phone_number",
          align: "center",
        },
        {
          title: "Address",
          key: "address",
          align: "center",
        },
        {
          title: "Photo",
          key: "photo_url",
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

    // function createData() {
    //   return [
    //     {
    //       key: 1,
    //       id: 1,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 2,
    //       id: 2,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 3,
    //       id: 3,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 4,
    //       id: 4,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 5,
    //       id: 5,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 6,
    //       id: 6,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 7,
    //       id: 7,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 8,
    //       id: 8,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 9,
    //       id: 9,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //     {
    //       key: 10,
    //       id: 10,
    //       first_name: "Chhorm",
    //       last_name: "Phearak",
    //       age: 24,
    //       guardian_gender: "Male",
    //       relationship_to_student: "Brother",
    //       occupation: "Work",
    //       email: "phnompenh@gmail.com",
    //       phone_number: "+855 12 348 034",
    //       address: "Phnom Penh",
    //       photo_url: "URL-Photo-Guardian",
    //     },
    //   ];
    // }

    return {
      SearchIcon,
      page,
      pageSize,
      pageCount,
      search,
      data,
      pagedData,
      //data: createData(),
      columns: createColumns(),
      viewRow,
      editRow,
      deleteRow,
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

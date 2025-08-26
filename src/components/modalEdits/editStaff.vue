<template>
  <!-- Modal -->
  <n-modal
    title="Edit Staff"
    :closable="true"
    v-model:show="showModalEdit"
    class="!w-[390px] md:!w-[640px] lg:!w-[800px]"
    preset="card"
    :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }"
    :bordered="false"
    :segmented="segmented"
    @close="closeModalEdit"
  >
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
      <!-- Personal Info -->
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="first_name" label="First Name">
          <n-input v-model:value="model.first_name" />
        </n-form-item>
        <n-form-item path="last_name" label="Last Name">
          <n-input v-model:value="model.last_name" />
        </n-form-item>
        <n-form-item path="gender" label="Gender">
          <n-select v-model:value="model.gender" :options="genderOptions" placeholder="Select" />
        </n-form-item>
        <n-form-item path="age" label="Age">
          <n-input v-model:value="model.age" type="number" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="address" label="Address">
          <n-input v-model:value="model.address" />
        </n-form-item>
        <n-form-item path="hire_date" label="Hire Date">
          <n-date-picker v-model:value="model.hire_date" type="date" />
        </n-form-item>
        <n-form-item path="employment_status" label="Employment Status">
          <n-input v-model:value="model.employment_status" />
        </n-form-item>
      </div>

      <!-- Contact Info -->
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" />
        </n-form-item>
        <n-form-item path="phone_number" label="Phone Number">
          <n-input v-model:value="model.phone_number" />
        </n-form-item>
        <n-form-item path="position_id" label="Position">
          <n-select
            :key="model.position_id"
            v-model:value="model.position_id"
            placeholder="Select"
            :options="positionOptions"
          />
        </n-form-item>
        <n-form-item path="status" label="Status">
          <n-select v-model:value="model.status" :options="statusOptions" placeholder="Select" />
        </n-form-item>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdateStaff"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="UpdateIcon" />
            </n-icon>
            <span class="font-bold">Update</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!-- End Modal -->
</template>

<script>
import { CreateOutline as UpdateIcon } from "@vicons/ionicons5";
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
import { format } from "date-fns";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: null },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const store = useStore();

    const showModalEdit = ref(props.modelValue);
    const formRef = ref(null);
    const positions = ref([]);

    const modelRef = ref({
      id: null,
      first_name: null,
      last_name: null,
      gender: null,
      age: null,
      address: null,
      hire_date: null,
      employment_status: null,
      email: null,
      phone_number: null,
      position_id: null,
      status: "active",
    });

    const rules = {
      first_name: [{ required: true, trigger: ["blur", "input"], message: "Please input First Name" }],
      last_name: [{ required: true, trigger: ["blur", "input"], message: "Please input Last Name" }],
      gender: [{ required: true, trigger: ["change"], message: "Please select Gender" }],
      age: [
        {
          required: true,
          validator(_, value) {
            if (!value || isNaN(Number(value))) return Promise.reject("Please input a valid Age");
            return Promise.resolve();
          },
        },
      ],
      address: [{ required: true, trigger: ["blur", "input"], message: "Please input Address" }],
      hire_date: [{ required: true, trigger: ["change"], message: "Please select Hire Date" }],
      employment_status: [{ required: true, trigger: ["blur", "input"], message: "Please input Employment Status" }],
      email: [{ required: true, trigger: ["blur", "input"], message: "Please input Email" }],
      phone_number: [{ required: true, trigger: ["blur", "input"], message: "Please input Phone Number" }],
      position_id: [{ required: true, type: "number", trigger: ["change"], message: "Please select Position" }],
      status: [{ required: true, trigger: ["change"], message: "Please select Status" }],
    };

    const positionOptions = computed(() =>
      positions.value.map((p) => ({
        label: p.title,
        value: Number(p.id),
      }))
    );

    function loadDataPositions() {
      store
        .dispatch("position/list", { page: 1, perPage: 100, search: "" })
        .then((response) => {
          if (response.status === 200) {
            positions.value = response.data.data;
          } else {
            console.error("Failed to fetch positions", response);
          }
        });
    }

    function submitUpdateStaff(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("staff/update", modelRef.value)
            .then(() => {
              message.success("Staff updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating staff:", error);
              message.error("Failed to update staff");
            });
        } else {
          message.error("Invalid form");
        }
      });
    }

    function closeModalEdit() {
      emit("update:modelValue", false);
      emit("close");
    }

    watch(() => props.modelValue, (val) => {
      showModalEdit.value = val;
    });

    watch(showModalEdit, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => props.editData, (val) => {
      if (val) {
        modelRef.value = { ...val, id: val.id };
        if (typeof val.hire_date === "number") {
          modelRef.value.hire_date = format(new Date(val.hire_date), "yyyy-MM-dd");
        }
      }
    });

    onMounted(() => {
      loadDataPositions();
    });

    const statusOptions = [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Terminated", value: "terminated" },
    ];

    const genderOptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ];

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      submitUpdateStaff,
      UpdateIcon,
      genderOptions,
      positionOptions,
      statusOptions,
    };
  },
});
</script>

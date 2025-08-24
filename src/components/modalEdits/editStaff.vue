<template>
  <!--Modal -->
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
          <n-input v-model:value="model.age" :min="1" @keydown.enter.prevent />
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
            <n-select :key="model.position_id" v-model:value="model.position_id" placeholder="Select"
              :options="positionOptions" />
          </n-form-item>

        <n-form-item path="status" label="Status">
           <n-select v-model:value="model.status" :options="statusOptions" placeholder="Select" />
        </n-form-item>
        <n-form-item label="Photo" path="photo_url">
          <n-upload
            v-model:file-list="fileList"
            list-type="image-card"
            accept="image/*"
            :max="1"
          >
            <n-button>Upload Photo</n-button>
          </n-upload>
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
              <component :is="CreateApplication" />
            </n-icon>
            <span class="font-bold">Update</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!--End Modal -->
</template>
<script>
import { CreateOutline as CreateApplication } from "@vicons/ionicons5";
import { defineComponent, ref, watch, computed, onMounted } from "vue";
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
    const fileList = ref([]);
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
      photo_url: null,
    });

    const rules = {
      first_name: [{ required: true, trigger: ["blur", "input"], message: "Please input First Name" }],
      last_name: [{ required: true, trigger: ["blur", "input"], message: "Please input Last Name" }],
      gender: [{ required: true, trigger: ["change"], message: "Please select Gender" }],
       status: [{ required: true, trigger: ["change"], message: "Please select Status" }],
      age: [{ required: true, validator(_, value) {
    if (!value || isNaN(Number(value))) return Promise.reject("Please input a valid Age");
    return Promise.resolve();
  }, }],
      address: [{ required: true, trigger: ["blur", "input"], message: "Please input Address" }],
      hire_date: [{
        validator(_, value) {
          if (!value) return Promise.reject("Please select Hire Date");
          if (typeof value === "number") return Promise.resolve();
          const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
          return isValidFormat ? Promise.resolve() : Promise.reject("Invalid date format");
        },
        trigger: ["change"],
      }],
      employment_status: [{ required: true, trigger: ["blur", "input"], message: "Please input Employment Status" }],
      status: [{ required: true, trigger: ["blur", "input"], message: "Please input Status" }],
      email: [{ required: true, trigger: ["blur", "input"], message: "Please input Email" }],
      phone_number: [{ required: true, trigger: ["blur", "input"], message: "Please input Phone Number" }],
      position_id: [{ required: true, type: "number", trigger: ["change"], message: "Please select Position" }],
      photo_url: [{ required: false }],
    };
     const positionOptions = computed(() =>
      positions.value.map((p) => ({
        label: p.title,
        value: Number(p.id),
      }))
    );

     function loadDataPositions() {
      store
        .dispatch("position/list", {
          page: 1,
          perPage: 100,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            positions.value = response.data.data;
          } else {
            console.error("Failed to fetch position", response);
          }
        });
    }

    function submitUpdateStaff(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          if (!modelRef.value.id) {
            message.error("Missing staff ID");
            return;
          }

          let payload = modelRef.value;
          const file = fileList.value[0]?.file;

          if (file) {
            const formData = new FormData();
            for (const key in modelRef.value) {
              formData.append(key, modelRef.value[key]);
            }
            formData.append("photo_url", file);
            formData.append("id", modelRef.value.id);
            payload = formData;
          }

          store.dispatch("staff/update", payload)
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
          message.error("Please fix validation errors");
        }
      });
    }

    function closeModalEdit() {
      emit("update:modelValue", false);
      emit("close");
    }

    function handleRemove() {
      modelRef.value.photo_url = null;
      fileList.value = [];
    }

    watch(() => props.modelValue, (val) => {
      showModalEdit.value = val;
    });

    watch(showModalEdit, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => props.editData, (val) => {
      if (val) {
        modelRef.value = { ...val };
        modelRef.value.id = val.id;

        if (val.photo_url) {
          fileList.value = [{
            name: val.photo_url,
            status: "finished",
            url: `${import.meta.env.VITE_API_BASE}/uploads/staff_docs/${val.photo_url}`,
          }];
        } else {
          fileList.value = [];
        }
      }
    });

    watch(() => modelRef.value.hire_date, (val) => {
      if (typeof val === "number") {
        modelRef.value.hire_date = format(new Date(val), "yyyy-MM-dd");
      }
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
 onMounted(() => {
      loadDataPositions();
    });
    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      submitUpdateStaff,
      CreateApplication,
      genderOptions,
      positionOptions,
      statusOptions,
      fileList,
      handleRemove,
    };
  },
});
</script>

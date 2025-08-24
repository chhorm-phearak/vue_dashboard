<template>
  <!--Modal -->
  <n-modal title="Create Staff" :closable="true" v-model:show="showModal"
    class="!w-[390px] md:!w-[640px] lg:!w-[900px]" preset="card" :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }" :bordered="false" :segmented="segmented" @close="handleClose">
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
          <n-input v-model:value.number="model.age" :min="1" @keydown.enter.prevent />
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
        <!-- File Upload -->
        <n-form-item label="Photo" path="photo_url">
          <n-upload
            :custom-request="handleFileUpload"
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
        <n-button class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick">
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateStaff" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>
<script>
import { CreateOutline as CreateStaff } from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
import { format } from "date-fns";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    segmented: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const store = useStore();

    const showModal = ref(props.modelValue);
    const formRef = ref(null);
    const fileList = ref([]);
    const positions = ref([]);

    const modelRef = ref({
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

    function resetForm() {
      modelRef.value = {
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
      };
      formRef.value?.restoreValidation();
    }

    const rules = {
      first_name: [
        { required: true, trigger: ["blur", "input"], message: "Please input First Name" },
      ],
      last_name: [
        { required: true, trigger: ["blur", "input"], message: "Please input Last Name" },
      ],
      gender: [
        { required: true, trigger: ["change"], message: "Please select Gender" },
      ],
      age: [
        {
          required: true,
          validator(_, value) {
            if (!value || isNaN(Number(value))) return Promise.reject("Please input a valid Age");
            return Promise.resolve();
          },
          trigger: ["blur", "input"],
        },
      ],
      address: [
        { required: true, trigger: ["blur", "input"], message: "Please input Address" },
      ],
      hire_date: [
        {
          validator(_, value) {
            if (!value) return Promise.reject("Please select Hire Date");
            if (typeof value === "number") return Promise.resolve();
            const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
            return isValidFormat ? Promise.resolve() : Promise.reject("Invalid date format");
          },
          trigger: ["change"],
        },
      ],
      employment_status: [
        { required: true, trigger: ["blur", "input"], message: "Please input Employment Status" },
      ],
      email: [
        { required: true, trigger: ["blur", "input"], message: "Please input Email" },
      ],
      phone_number: [
        { required: true, trigger: ["blur", "input"], message: "Please input Phone Number" },
      ],
      position_id: [
        { required: true, type: "number", trigger: ["change"], message: "Please select Position" },
      ],
      status: [
        { required: true, trigger: ["change"], message: "Please select Status" },
      ],
      photo_url: [{ required: false }],
    };

    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          const formData = new FormData();
          for (const key in modelRef.value) {
            if (key === "photo_url" && fileList.value && fileList.value.length > 0) {
              formData.append(key, fileList.value[0].file);
            } else {
              formData.append(key, modelRef.value[key]);
            }
          }
          store
            .dispatch("staff/create", formData)
            .then(() => {
              message.success("Staff is created successfully");
              emit("refresh");
              resetForm();
              handleClose();
            })
            .catch((error) => {
              console.error("Error creating Staff:", error);
              message.error("Failed to create Staff");
            });
        } else {
          console.log(errors);
          message.error("Invalid");
        }
      });
    }

    function handleFileUpload({ file, onFinish, onError }) {
      const formData = new FormData();
      formData.append("photo_url", file.file);

      fetch(`${import.meta.env.VITE_API_BASE}/api/staff/upload-temp`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.filename) {
            modelRef.value.photo_url = data.filename;
            onFinish();
            message.success("Photo uploaded successfully");
          } else {
            onError();
            message.error("Upload failed");
          }
        })
        .catch((err) => {
          console.error("Upload error:", err);
          onError();
          message.error("Upload error");
        });
    }

    function handleClose() {
      emit("update:modelValue", false);
      emit("close");
      console.log("Close Modal User");
    }

    watch(() => props.modelValue, (val) => {
      showModal.value = val;
    });

    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => modelRef.value.hire_date, (val) => {
      if (typeof val === "number") {
        modelRef.value.hire_date = format(new Date(val), "yyyy-MM-dd");
      }
    });

    const genderOptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ];

    const statusOptions = [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Terminated", value: "terminated" },
    ];

    const positionOptions = ref([]);
    function loadDataPositions() {
      store.dispatch("position/list", {
        page: 1,
        perPage: 100,
        search: "",
      }).then((response) => {
        if (response.status === 200) {
          positionOptions.value = response.data.data.map((p) => ({
            label: p.title,
            value: Number(p.id),
          }));
        } else {
          console.error("Failed to fetch position", response);
        }
      });
    }

    loadDataPositions();

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      resetForm,
      handleValidateButtonClick,
      CreateStaff,
      genderOptions,
      statusOptions,
      positionOptions,
      fileList,
    };
  },
});
</script>

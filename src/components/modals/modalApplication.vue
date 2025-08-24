<template>
  <!--Modal -->
  <n-modal title="Create Application" :closable="true" v-model:show="showModal"
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
        <n-form-item path="date_of_birth" label="Date of Birth">
          <n-date-picker v-model:value="model.date_of_birth" type="date" />
        </n-form-item>
       <n-form-item path="age" label="Age">
          <n-input v-model:value="model.age" :min="1" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="place_of_birth" label="Place of Birth">
          <n-input v-model:value="model.place_of_birth" />
        </n-form-item>
        <n-form-item path="current_address" label="Current Address">
          <n-input v-model:value="model.current_address" />
        </n-form-item>
      </div>

      <!-- Guardian Info -->
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="guardian_first_name" label="Guardian First Name">
          <n-input v-model:value="model.guardian_first_name" />
        </n-form-item>
        <n-form-item path="guardian_last_name" label="Guardian Last Name">
          <n-input v-model:value="model.guardian_last_name" />
        </n-form-item>
        <n-form-item path="guardian_gender" label="Guardian Gender">
          <n-select v-model:value="model.guardian_gender" :options="genderOptions" />
        </n-form-item>
        <n-form-item path="guardian_job" label="Guardian Job">
          <n-input v-model:value="model.guardian_job" />
        </n-form-item>
        <n-form-item path="guardian_age" label="Guardian Age">
          <n-input v-model:value="model.guardian_age" :min="18" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="guardian_relationship_to_student" label="Relationship to Student">
          <n-input v-model:value="model.guardian_relationship_to_student" />
        </n-form-item>
        <n-form-item path="guardian_address" label="Guardian Address">
          <n-input v-model:value="model.guardian_address" />
        </n-form-item>
      </div>

      <!-- Parent Info -->
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="father_first_name" label="Father First Name">
          <n-input v-model:value="model.father_first_name" />
        </n-form-item>
        <n-form-item path="father_last_name" label="Father Last Name">
          <n-input v-model:value="model.father_last_name" />
        </n-form-item>
        <n-form-item path="father_job" label="Father Job">
          <n-input v-model:value="model.father_job" />
        </n-form-item>
       <n-form-item path="father_age" label="Father Age">
          <n-input v-model:value="model.father_age"  @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="mother_first_name" label="Mother First Name">
          <n-input v-model:value="model.mother_first_name" />
        </n-form-item>
        <n-form-item path="mother_last_name" label="Mother Last Name">
          <n-input v-model:value="model.mother_last_name" />
        </n-form-item>
        <n-form-item path="mother_job" label="Mother Job">
          <n-input v-model:value="model.mother_job" />
        </n-form-item>
        <n-form-item path="mother_age" label="Mother_Age">
          <n-input v-model:value="model.mother_age" @keydown.enter.prevent />
        </n-form-item>
      </div>

      <!-- Extra Info -->
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="health_note" label="Health Note">
          <n-input v-model:value="model.health_note" />
        </n-form-item>
        <n-form-item path="special_requests" label="Special Requests">
          <n-input v-model:value="model.special_requests" />
        </n-form-item>

        <n-form-item path="needs_bus">
          <input type="checkbox" v-model="model.needs_bus" />
          <label>Need Bus</label>
        </n-form-item>
        <n-form-item path="needs_bus">
          <input type="checkbox" v-model="model.needs_meal_plan" />
          <label>Need Meal Plan</label>
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
        <!-- NOTE: n-upload is now in manual mode, file is only sent with the form -->
       <n-form-item label="Document Photo" path="document_photo_url">
  <n-upload
    :custom-request="handleFileUpload"
    v-model:file-list="fileList"
    list-type="image-card"
    accept="image/*"
    :max="1"
  >
    <n-button>Upload Document</n-button>
  </n-upload>
</n-form-item>
</div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-3 pb-1">
        <n-button class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick">
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateApplication" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>
<script>
import { CreateOutline as CreateApplication } from "@vicons/ionicons5";
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

    const showModal = ref(props.modelValue);
    const formRef = ref(null);
    const store = useStore();
    // NOTE: fileList will hold the uploaded file(s) from n-upload
    const fileList = ref([]);

    const modelRef = ref({
      first_name: null,
      last_name: null,
      gender: null,
      date_of_birth: null,
      age: null,
      place_of_birth: null,
      current_address: null,
      email: null,
      phone_number: null,
      guardian_first_name: null,
      guardian_last_name: null,
      guardian_gender: null,
      guardian_job: null,
      guardian_age: null,
      guardian_relationship_to_student: null,
      guardian_address: null,
      father_first_name: null,
      father_last_name: null,
      father_job: null,
      father_age: null,
      mother_first_name: null,
      mother_last_name: null,
      mother_job: null,
      mother_age: null,
      health_note: null,
      special_requests: null,
      needs_bus: false,
      needs_meal_plan: false,
      document_photo_url: null,
    });

    function resetForm() {
      modelRef.value = {
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth: null,
        age: null,
        place_of_birth: null,
        current_address: null,
        email: null,
        phone_number: null,
        guardian_first_name: null,
        guardian_last_name: null,
        guardian_gender: null,
        guardian_job: null,
        guardian_age: null,
        guardian_relationship_to_student: null,
        guardian_address: null,
        father_first_name: null,
        father_last_name: null,
        father_job: null,
        father_age: null,
        mother_first_name: null,
        mother_last_name: null,
        mother_job: null,
        mother_age: null,
        health_note: null,
        special_requests: null,
        needs_bus: false,
        needs_meal_plan: false,
        document_photo_url: null,
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
      date_of_birth: [
  {
        validator(_, value) {
          if (!value) return Promise.reject("Please select Date of Birth");
      // Accept number (timestamp) or valid string
          if (typeof value === "number") return Promise.resolve();
          const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
          return isValidFormat ? Promise.resolve() : Promise.reject("Invalid date format");
        },
        trigger: ["change"],
  },
      ],
      place_of_birth: [
        { required: true, trigger: ["blur", "input"], message: "Please input Place of Birth" },
      ],
      current_address: [
        { required: true, trigger: ["blur", "input"], message: "Please input Current Address" },
      ],
      email: [
        { required: true, trigger: ["blur", "input"], message: "Please input Email" },
      ],
      phone_number: [
        { required: true, trigger: ["blur", "input"], message: "Please input Phone Number" },
      ],
      guardian_first_name: [
        { required: true, trigger: ["blur", "input"], message: "Please input Guardian's First Name" },
      ],
      guardian_last_name: [
        { required: true, trigger: ["blur", "input"], message: "Please input Guardian's Last Name" },
      ],
      guardian_gender: [
        { required: true, trigger: ["change"], message: "Please select Guardian's Gender" },
      ],
      guardian_job: [
        { required: true, trigger: ["blur", "input"], message: "Please input Guardian's Job" },
      ],
      guardian_age: [
        { required: true, trigger: ["blur", "input"], message: "Please input Guardian's Age" },
      ],
      guardian_relationship_to_student: [
        { required: true, trigger: ["blur", "input"], message: "Please input Relationship" },
      ],
      guardian_address: [
        { required: true, trigger: ["blur", "input"], message: "Please input Guardian's Address" },
      ],
      father_first_name: [{ required: false }],
      father_last_name: [{ required: false }],
      father_job: [{ required: false }],
      father_age: [{ required: false }],
      mother_first_name: [{ required: false }],
      mother_last_name: [{ required: false }],
      mother_job: [{ required: false }],
      mother_age: [{ required: false }],
      document_photo_url: [{ required: false }],
    };

    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
            // NOTE: Build FormData to send the actual file to backend
          const formData = new FormData();
            for (const key in modelRef.value) {
              // If the key is document_photo_url and you have a file object, append the file
              if (key === "document_photo_url" && fileList.value && fileList.value.length > 0) {
                formData.append(key, fileList.value[0].file); // fileList is your n-upload file list
              } else {
                formData.append(key, modelRef.value[key]);
              }
            }
            store
              .dispatch("application/create", formData)
            .then(() => {
              message.success("Application is created successfully");
              emit("refresh");
              resetForm();
              handleClose();
            })
            .catch((error) => {
              console.error("Error creating Application:", error);
              message.error("Failed to create Application");
            });
        } else {
          console.log(errors);
          message.error("Invalid");
        }
      });
    }

 function handleFileUpload({ file, onFinish, onError }) {
  const formData = new FormData();
  formData.append("document_photo_url", file.file);

  fetch(`${import.meta.env.VITE_API_BASE}/api/application/upload-temp`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.filename) {
        modelRef.value.document_photo_url = data.filename;
        onFinish(); // tells n-upload it's done
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

    watch(
      () => props.modelValue,
      (val) => {
      showModal.value = val;
      }
    );
    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => modelRef.value.date_of_birth, (val) => {
      if (typeof val === "number") {
        modelRef.value.date_of_birth = format(new Date(val), "yyyy-MM-dd");
      }
    });

    const genderOptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ];

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      resetForm,
      handleValidateButtonClick,
      CreateApplication,
      genderOptions,
    fileList, // <-- NOTE: Make sure n-upload uses this for v-model:file-list or :default-file-list
    };
  },
});
</script>

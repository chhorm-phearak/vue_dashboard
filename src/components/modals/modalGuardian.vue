<template>
  <!--Modal -->
  <n-modal
    title="Create Guardian"
    :closable="true"
    v-model:show="showModal"
    class="!w-[390px] md:!w-[640px] lg:!w-[900px]"
    preset="card"
    :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }"
    :bordered="false"
    :segmented="segmented"
    @close="handleClose"
  >
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
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
        <n-form-item path="occupation" label="Occupation">
          <n-input v-model:value="model.occupation" />
        </n-form-item>
      </div>

      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" />
        </n-form-item>
        <n-form-item path="phone_number" label="Phone Number">
          <n-input v-model:value="model.phone_number" />
        </n-form-item>
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

      <div class="flex justify-end pt-3 pb-1">
        <n-button class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick">
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateGuardian" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { CreateOutline as CreateGuardian } from "@vicons/ionicons5";
import { defineComponent, ref, watch, computed, onMounted } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";

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
    editData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const store = useStore();

    const showModal = ref(props.modelValue);
    const formRef = ref(null);
    const fileList = ref([]);

    // Use editData for editing/viewing, otherwise blank for create
    const model = ref({
      first_name: null,
      last_name: null,
      gender: null,
      age: null,
      address: null,
      occupation: null,
      email: null,
      phone_number: null,
      photo_url: null,
      ...props.editData,
    });

    function resetForm() {
      model.value = {
        first_name: null,
        last_name: null,
        gender: null,
        age: null,
        address: null,
        occupation: null,
        email: null,
        phone_number: null,
        photo_url: null,
      };
      fileList.value = [];
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
      occupation: [
        { required: true, trigger: ["blur", "input"], message: "Please input Occupation" },
      ],
      email: [
        { required: true, trigger: ["blur", "input"], message: "Please input Email" },
      ],
      phone_number: [
        { required: true, trigger: ["blur", "input"], message: "Please input Phone Number" },
      ],
      photo_url: [{ required: false }],
    };

    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          const formData = new FormData();
          for (const key in model.value) {
            if (key === "photo_url" && fileList.value && fileList.value.length > 0) {
              formData.append(key, fileList.value[0].file);
            } else {
              formData.append(key, model.value[key]);
            }
          }
          store
            .dispatch("guardian/create", formData)
            .then(() => {
              message.success("Guardian is created successfully");
              emit("refresh");
              resetForm();
              handleClose();
            })
            .catch((error) => {
              console.error("Error creating Guardian:", error);
              message.error("Failed to create Guardian");
            });
        } else {
          message.error("Invalid");
        }
      });
    }

    function handleFileUpload({ file, onFinish, onError }) {
      const formData = new FormData();
      formData.append("photo_url", file.file);

      fetch(`${import.meta.env.VITE_API_BASE}/api/guardian/upload-temp`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.filename) {
            model.value.photo_url = data.filename;
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
    }

    watch(() => props.modelValue, (val) => {
      showModal.value = val;
    });

    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => props.editData, (val) => {
      model.value = { ...(val ?? {}) };
    });

    const genderOptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ];

    return {
      showModal,
      handleClose,
      formRef,
      model,
      rules,
      resetForm,
      handleValidateButtonClick,
      CreateGuardian,
      genderOptions,
      fileList,
    };
  },
});
</script>
<template>
  <!--Modal -->
  <n-modal
    title="Edit Guardian"
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
        <n-form-item path="occupation" label="Occupation">
          <n-input v-model:value="model.occupation" />
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
          @click="submitUpdateGuardian"
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

    const modelRef = ref({
      id: null,
      first_name: null,
      last_name: null,
      gender: null,
      age: null,
      address: null,
      occupation: null,
      email: null,
      phone_number: null,
      photo_url: null,
    });

    const rules = {
      first_name: [{ required: true, trigger: ["blur", "input"], message: "Please input First Name" }],
      last_name: [{ required: true, trigger: ["blur", "input"], message: "Please input Last Name" }],
      gender: [{ required: true, trigger: ["change"], message: "Please select Gender" }],
      age: [{
        required: true,
        validator(_, value) {
          if (!value || isNaN(Number(value))) return Promise.reject("Please input a valid Age");
          return Promise.resolve();
        },
      }],
      address: [{ required: true, trigger: ["blur", "input"], message: "Please input Address" }],
      occupation: [{ required: true, trigger: ["blur", "input"], message: "Please input Occupation" }],
      email: [{ required: true, trigger: ["blur", "input"], message: "Please input Email" }],
      phone_number: [{ required: true, trigger: ["blur", "input"], message: "Please input Phone Number" }],
      photo_url: [{ required: false }],
    };

    function submitUpdateGuardian(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          if (!modelRef.value.id) {
            message.error("Missing guardian ID");
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

          store.dispatch("guardian/update", payload)
            .then(() => {
              message.success("Guardian updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating guardian:", error);
              message.error("Failed to update guardian");
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
            url: `${import.meta.env.VITE_API_BASE}/uploads/guardian_docs/${val.photo_url}`,
          }];
        } else {
          fileList.value = [];
        }
      }
    });

    const genderOptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ];

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      submitUpdateGuardian,
      CreateApplication,
      genderOptions,
      fileList,
      handleRemove,
    };
  },
});
</script>

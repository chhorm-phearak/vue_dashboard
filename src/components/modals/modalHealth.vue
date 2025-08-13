<template>
  <!--Modal -->
  <n-modal
    title="Create Health"
    :closable="true"
    v-model:show="showModal"
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
    @close="handleClose"
  >
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
      <!-- <div class="w-full text-start font-bold text-lg mb-8 mt-5">
        Create Staff
      </div> -->
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="student" label="Student">
          <n-select
            v-model:value="model.student"
            placeholder="Select"
            :options="studentOptions.selectStudent"
          />
        </n-form-item>
        <n-form-item path="incident_type" label="Incident Type">
          <n-input v-model:value="model.incident_type" @keydown.enter.prevent />
        </n-form-item>
        </div>
        <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="detail" label="Detail ">
          <n-input v-model:value="model.detail" type="textarea" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick"
        >
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
  <!--End Modal -->
</template>

<script>
import { CreateOutline as CreateStaff } from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
import { useMessage } from "naive-ui";

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
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const message = useMessage();

    const showModal = ref(props.modelValue);

    const formRef = ref(null);
    // FIX: Model fields match form fields
    const modelRef = ref({
      student: null,
      incident_type: "",
      detail: "",
    });

    // FIX: Add student options
    const studentOptions = {
      selectStudent: [
        { label: "Student A", value: "student_a" },
        { label: "Student B", value: "student_b" },
      ],
    };

    // FIX: Only validate fields in the form
    const rules = {
      student: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select Student",
        },
      ],
      incident_type: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Incident Type",
        },
      ],
      detail: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Detail",
        },
      ],
    };

    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          message.success("Valid");
        } else {
          console.log(errors);
          message.error("Invalid");
        }
      });
    }

    function handleClose() {
      emit("update:modelValue", false);
      emit("close");
      console.log("Close Modal User");
    }

    // Sync prop with internal ref
    watch(
      () => props.modelValue,
      (val) => {
        showModal.value = val;
      }
    );
    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      studentOptions,
      handleValidateButtonClick,
      CreateStaff,
    };
  },
});
</script>
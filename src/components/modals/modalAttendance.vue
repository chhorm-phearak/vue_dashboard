<template>
  <!--Modal -->
  <n-modal
    title="Create Attendance"
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
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="student_id" label="Student ID">
          <n-input v-model:value="model.first_name" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="status" label="Status">
          <n-select
            v-model:value="model.status"
            placeholder="Select"
            :options="statusOptions.selectStatus"
          />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item label="Date Time" path="date">
          <n-date-picker v-model:value="model.date" type="datetime" />
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
    const modelRef = ref({
      student_id: null,
      date: null,
      status: null,
    });

    const statusOptions = {
      selectStatus: ["present", "absent", "late", "excused"].map((v) => ({
        label: v,
        value: v,
      })),
    };

    const rules = {
      student_id: [
        {
          type: "number",
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Student ID",
        },
      ],
      date: {
        type: "number",
        required: true,
        trigger: ["blur", "change"],
        message: "Please input Date Time",
      },
      status: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select Status",
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
      statusOptions,
      handleValidateButtonClick,
      CreateStaff,
    };
  },
});
</script>
<style>
/* .n-input .n-input-wrapper {
  width: 750px;
} */
</style>

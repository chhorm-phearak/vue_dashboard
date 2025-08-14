<template>
  <!--Modal -->
  <n-modal
    title="Create Invoice"
    :closable="true"
    v-model:show="showModal"
    class="!w-[390px] md:!w-[440px] lg:!w-[600px]"
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
          <n-input v-model:value="model.student_id" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="invoice_type" label="Invoice Type">
          <n-select
            v-model:value="model.invoice_type"
            placeholder="Select"
            :options="invoiceType.selectType"
          />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item :span="12" label="Description" path="description">
          <n-input
            v-model:value="model.description"
            placeholder="Description"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="amount" label="Amount">
          <n-input v-model:value="model.amount" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="due_date" label="Due Date">
          <n-input v-model:value="model.due_date" @keydown.enter.prevent />
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
      invoice_type: null,
      description: null,
      amount: null,
      due_date: null,
      status: null,
    });

    const invoiceType = {
      selectType: ["tuition", "library", "transport", "other"].map((v) => ({
        label: v,
        value: v,
      })),
    };
    const statusOptions = {
      selectStatus: ["unpaid", "paid", "partial", "overdue"].map((v) => ({
        label: v,
        value: v,
      })),
    };

    const rules = {
      student_id: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Student ID",
        },
      ],
      invoice_type: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Invoice Type",
        },
      ],
      description: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Description",
        },
      ],
      amount: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Amount",
        },
      ],
      due_date: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Due Date",
        },
      ],
      status: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Status",
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
      invoiceType,
      statusOptions,
      handleValidateButtonClick,
      CreateStaff,
    };
  },
});
</script>

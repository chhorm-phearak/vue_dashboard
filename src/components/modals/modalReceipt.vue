<template>
  <!--Modal -->
  <n-modal
    title="Create Receipt"
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
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="student_first_name" label="First Name">
          <n-input
            v-model:value="model.student_first_name"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="student_last_name" label="Last Name">
          <n-input
            v-model:value="model.student_last_name"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="invoice_id" label="Invoice ID">
          <n-input v-model:value="model.invoice_id" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="payment_date" label="Payment Date">
          <n-input v-model:value="model.payment_date" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="amount_paid" label="Amount Paid">
          <n-input v-model:value="model.amount_paid" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="payment_method" label="Gender">
          <n-select
            v-model:value="model.payment_method"
            placeholder="Select"
            :options="paymentMethod.selectPayment"
          />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="transaction_id" label="Transaction ID">
          <n-input
            v-model:value="model.transaction_id"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="paid_by" label="Paid By">
          <n-input v-model:value="model.paid_by" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="issued_by" label="Issued By">
          <n-input v-model:value="model.issued_by" @keydown.enter.prevent />
        </n-form-item>
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
      invoice_id: null,
      student_first_name: null,
      student_last_name: null,
      payment_date: null,
      amount_paid: null,
      payment_method: null,
      transaction_id: null,
      paid_by: null,
      issued_by: null,
      status: null,
    });

    const paymentMethod = {
      selectPayment: [
        "credit_card",
        "debit_card",
        "cash",
        "bank_transfer",
        "other",
      ].map((v) => ({
        label: v,
        value: v,
      })),
    };
    const statusOptions = {
      selectStatus: ["pending", "paid", "cancelled"].map((v) => ({
        label: v,
        value: v,
      })),
    };

    const rules = {
      invoice_id: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Invoice ID",
        },
      ],
      student_first_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input First Name",
        },
      ],
      student_last_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Last Name",
        },
      ],
      payment_date: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Payment Date",
        },
      ],
      amount_paid: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Amount Paid",
        },
      ],
      payment_method: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Payment Method",
        },
      ],
      transaction_id: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Transaction ID",
        },
      ],
      paid_by: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Paid By",
        },
      ],
      issued_by: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Issued By",
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
      paymentMethod,
      statusOptions,
      handleValidateButtonClick,
      CreateStaff,
    };
  },
});
</script>

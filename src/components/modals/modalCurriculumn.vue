<template>
  <!--Modal -->
  <n-modal
    title="Create Schedule"
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
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-upload
    multiple
    directory-dnd
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :max="5"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <UploadIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        Click or drag a file to this area to upload
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        Strictly prohibit from uploading sensitive information. For example,
        your bank card PIN or your credit card expiry date.
      </n-p>
    </n-upload-dragger>
  </n-upload>
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
import { CreateOutline as CreateStaff,CloudUploadOutline as UploadIcon } from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
import { useMessage } from "naive-ui";

export default defineComponent({
  components: {
    UploadIcon
  },
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
      first_name: null,
      last_name: null,
      gender: null,
      age: null,
      email: null,
      phone: null,
    });

    const genderOptions = {
      selectGender: ["Male", "Female"].map((v) => ({
        label: v,
        value: v,
      })),
    };

    const rules = {
      first_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input First Name",
        },
      ],
      last_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Last Name",
        },
      ],
      age: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("Age is required");
            } else if (!/^\d*$/.test(value)) {
              return new Error("Age should be an integer");
            } else if (Number(value) < 18) {
              return new Error("Age should be above 18");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      gender: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select Gender",
        },
      ],
      email: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Email",
        },
      ],
      phone: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Phone Number",
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
      genderOptions,
      handleValidateButtonClick,
      CreateStaff,
      UploadIcon
    };
  },
});
</script>

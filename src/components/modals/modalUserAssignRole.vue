<template>
  <!--Modal -->
  <n-modal
    title="Create User Assign Role"
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
        <n-form-item path="user" label="User">
          <n-select
            v-model:value="model.user"
            placeholder="Select"
            :options="genderOptions.selectUser"
          />
        </n-form-item>
        <n-form-item path="role" label="Role">
          <n-select
            v-model:value="model.role"
            placeholder="Select"
            :options="genderOptions.selectRole"
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
    //  Updated model to match your template fields
    const modelRef = ref({
      user: null,
      role: null,
    });
    //  Updated options to match the template's select fields
    const genderOptions = {
      selectUser: ["User 1", "User 2", "User 3"].map((v) => ({
        label: v,
        value: v,
      })),
      selectRole: ["Admin", "Editor", "Viewer"].map((v) => ({
        label: v,
        value: v,
      })),
    };
    // Updated rules to validate the correct fields
    const rules = {
      user: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select a user",
        },
      ],
      role: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select a role",
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
    };
  },
});
</script>

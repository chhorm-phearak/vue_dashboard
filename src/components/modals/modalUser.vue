<template>
  <!--Modal -->
  <n-modal
    title="Create User"
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
        <n-form-item path="name" label="Name">
          <n-input v-model:value="model.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateUserIcon" />
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
import { PersonAddOutline as CreateUserIcon } from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
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
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const message = useMessage();
    const showModal = ref(props.modelValue);

    const formRef = ref(null);
    const modelRef = ref({
      name: null,
      email: null,
    });

    function resetForm() {
      modelRef.value = {
        name: null,
        email: null,
      };
      formRef.value?.restoreValidation();
    }

    const rules = {
      name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Name",
        },
      ],
      email: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Email",
        },
        {
          type: "email",
          message: "Invalid email format",
          trigger: ["blur", "input"],
        },
      ],
    };

    const store = useStore();
    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("user/create", modelRef.value)
            .then((res) => {
              message.success("User created successfully");
              emit("refresh");
              resetForm();
              handleClose();
            })
            .catch((error) => {
              console.error("Error creating user:", error);
              message.error("Failed to create user");
            });
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

    watch(() => props.modelValue, (val) => {
      showModal.value = val;
    });
    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      resetForm,
      handleValidateButtonClick,
      CreateUserIcon,
    };
  },
});
</script>

<template>
    <!--Modal -->
  <n-modal
    title="Create Division"
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
  <!-- Create Division -->
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="division_name" label="Division Name">
          <n-input v-model:value="model.division_name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="division_description" label="Description">
          <n-input v-model:value="model.division_description" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateDivision" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { CreateOutline as CreateDivision, Storefront } from "@vicons/ionicons5";
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
  emits: ["update:modelValue", "close", "created"],
  setup(props, { emit }) {
    const message = useMessage();
    const showModal = ref(props.modelValue);

    const formRef = ref(null);
    const modelRef = ref({
      division_name: "",
      division_description: "",
    });

    const rules = {
      division_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Division Name",
        },
      ],
      division_description: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Division Description",
        },
      ],
    };

    const store= useStore();
    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store.dispatch('division/create', modelRef.value)
            .then( res => {
              message.success("Division is created successfully");
              emit("created"); // ✅ trigger refresh
              handleClose();
            })
            .catch((error) => {
              console.error("Error creating Division:", error);
              message.error("Failed to create Division");
            });
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
      emit("created"); //to refresh the table after creation
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
      model:modelRef,
      rules,
      handleValidateButtonClick,
      CreateDivision,
    };
  },
});
</script>

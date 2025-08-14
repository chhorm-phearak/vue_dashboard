<template>
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
              <component :is="CreateIcon" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { CreateOutline as CreateIcon } from "@vicons/ionicons5";
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
    const store = useStore();
    const message = useMessage();
    const showModal = ref(props.modelValue);

    const formRef = ref(null);
    const model = ref({
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

    async function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          try {
            await store.dispatch("division/create", model.value);
            message.success("Division created successfully!");
            emit("created"); // trigger refresh in parent
            emit("update:modelValue", false);
            emit("close");
          } catch (err) {
            console.error(err);
            message.error("Failed to create division");
          }
        } else {
          message.error("Invalid input");
        }
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

    return {
      showModal,
      handleClose,
      formRef,
      model,
      rules,
      handleValidateButtonClick,
      CreateIcon,
    };
  },
});
</script>

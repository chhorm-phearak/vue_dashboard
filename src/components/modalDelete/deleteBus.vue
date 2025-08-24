<template>
  <!-- Delete Bus Modal -->
  <n-modal
    title="Delete Bus"
    :closable="false"
    v-model:show="showModalDelete"
    class="!w-[390px] md:!w-[440px] lg:!w-[500px]"
    preset="card"
    :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }"
    :bordered="false"
    :segmented="segmented"
  >
    <n-form ref="formRef" :model="model" class="flex flex-col">
      <div class="grid gap-4 mb-4 mt-1 md:grid-cols-1 w-full">
        <div class="flex flex-col gap-5 items-center">
          <n-icon size="80" class="text-green-500">
            <component :is="AlertCircleIcon" />
          </n-icon>
          <span class="text-xl text-center">
            Are you sure you want to delete this bus record?
          </span>
        </div>
      </div>

      <div class="flex gap-2 justify-center mb-3 mt-4">
        <n-button
          class="!p-[15px] !bg-blue-500 hover:!bg-yellow-400 !text-white !rounded-md"
          @click="closeModelDelete"
        >
          <div class="flex items-center">
            <span class="font-bold">Cancel</span>
          </div>
        </n-button>
        <n-button
          class="!p-[15px] !bg-red-500 hover:!bg-yellow-400 !text-white !rounded-md"
          @click="confirmDelete"
        >
          <div class="flex items-center">
            <span class="font-bold">Confirm</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import {
  AlertCircle as AlertCircleIcon,
} from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: () => ({}) },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const showModalDelete = ref(props.modelValue);
    const formRef = ref(null);
    const modelRef = ref({ ...props.editData });

    const message = useMessage();
    const store = useStore();

    watch(() => props.modelValue, (val) => {
      showModalDelete.value = val;
    });

    watch(showModalDelete, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => props.editData, (val) => {
      modelRef.value = { ...(val ?? {}) };
    });

    function closeModelDelete() {
      emit("update:modelValue", false);
      emit("close");
    }

    function confirmDelete(e) {
      e.preventDefault();
      store
        .dispatch("bus/delete", modelRef.value.id)
        .then(() => {
          message.success("Bus record deleted successfully");
          emit("refresh");
          closeModelDelete();
        })
        .catch((error) => {
          console.error("Error deleting bus record:", error);
          message.error("Failed to delete bus record");
        });
    }

    return {
      AlertCircleIcon,
      confirmDelete,
      showModalDelete,
      formRef,
      model: modelRef,
      closeModelDelete,
    };
  },
});
</script>

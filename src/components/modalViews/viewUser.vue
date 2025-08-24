<template>
  <!--Modal -->
  <n-modal
    :closable="false"
    v-model:show="showModalView"
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
          <span class="text-xl">User Information</span>
        </div>
        <div class="flex flex-col gap-2 px-4">
          <div class="flex justify-between">
            <span class="font-semibold">ID:</span>
            <span>{{ model.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Name:</span>
            <span>{{ model.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Email:</span>
            <span>{{ model.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Roles:</span>
            <span>
              <span v-if="model.roles.length">
                {{ model.roles.map(r => r.name).join(', ') }}
              </span>
              <span v-else class="italic text-gray-500">No roles assigned</span>
            </span>
          </div>
        </div>
      </div>

      <div class="flex gap-2 justify-center mb-3 mt-4">
        <n-button
          class="!p-[15px] !bg-blue-500 hover:!bg-yellow-400 !text-white !rounded-md"
          @click="closeModelView"
        >
          <div class="flex items-center">
            <span class="font-bold">Close</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!--End Modal -->
</template>

<script>
import {
  Alert as AlertIcon,
  AlertCircle as AlertCircleIcon,
} from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: () => ({}) },
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const showModalView = ref(props.modelValue);
    const formRef = ref(null);
    const modelRef = ref({ ...props.editData });

    watch(() => props.editData, (val) => {
      modelRef.value = { ...val };
    });

    watch(() => props.modelValue, (val) => {
      showModalView.value = val;
    });

    watch(showModalView, (val) => emit("update:modelValue", val));

    function closeModelView() {
      emit("update:modelValue", false);
      emit("close");
    }

    return {
      AlertIcon,
      AlertCircleIcon,
      showModalView,
      formRef,
      model: modelRef,
      closeModelView,
    };
  },
});
</script>

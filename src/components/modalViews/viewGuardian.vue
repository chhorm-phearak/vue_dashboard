<template>
  <n-modal
    title="View Guardian"
    :closable="false"
    v-model:show="showModalView"
    class="!w-[390px] md:!w-[640px] lg:!w-[900px]"
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
      <div class="grid gap-6 mb-4 md:grid-cols-2 w-full">
        <div class="flex gap-4">
          <label class="font-semibold">Full Name:</label>
          <div>{{ model.first_name }} {{ model.last_name }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Gender:</label>
          <div>{{ model.gender }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Age:</label>
          <div>{{ model.age }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Occupation:</label>
          <div>{{ model.occupation }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Email:</label>
          <div>{{ model.email }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Phone:</label>
          <div>{{ model.phone_number }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Address:</label>
          <div>{{ model.address }}</div>
        </div>

        <!-- Photo -->
        <div class="flex gap-4 items-start col-span-2">
          <label class="font-semibold">Photo:</label>
          <div v-if="model.photo_url">
            <img :src="`${baseUrl}/uploads/guardians_img/${model.photo_url}`" alt="Guardian Photo"
        class="max-w-[200px] rounded shadow border" />
          </div>
          <div v-else class="text-gray-500 italic">No photo uploaded</div>
        </div>
      </div>

      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="closeModalView"
        >
          <div class="flex gap-1 items-center">
            <n-icon size="22">
              <component :is="CloseIcon" />
            </n-icon>
            <span class="font-bold">Close</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { CloseCircle as CloseIcon } from "@vicons/ionicons5";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: () => ({}) },
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const showModalView = ref(props.modelValue);
    const model = ref({ ...props.editData });

    const baseUrl = import.meta.env.VITE_API_BASE;

    const photoUrl = computed(() =>
      model.value.photo_url
        ? `${baseUrl}/uploads/guardian_img/${model.value.photo_url}`
        : null
    );

    function closeModalView() {
      emit("update:modelValue", false);
      emit("close");
    }

    watch(() => props.modelValue, (val) => {
      showModalView.value = val;
    });

    watch(showModalView, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => props.editData, (val) => {
      model.value = { ...(val ?? {}) };
    });

    return {
      CloseIcon,
      showModalView,
      model,
      closeModalView,
      photoUrl,
      baseUrl,
    };
  },
});
</script>

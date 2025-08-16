<template>
  <!--Modal -->
  <n-modal title="View Information" :closable="false" v-model:show="showModalView"
    class="!w-[390px] md:!w-[640px] lg:!w-[800px]" preset="card" :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }" :bordered="false" :segmented="segmented">
    <n-form ref="formRef" :model="model" class="flex flex-col">
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <div class="grid gap-4 md:grid-cols-1 w-full">
          <div class="flex gap-3">
            <label class="font-semibold">Title:</label>
            <div>{{ model.title }}</div>
          </div>
          <div class="flex gap-3">
            <label class="font-semibold">Description:</label>
            <div>{{ model.position_Description }}</div>
          </div>
          <div class="flex gap-3">
            <label class="font-semibold">Division:</label>
            <div>
              {{
                divisionOptions.find(opt => opt.value === model.division_id)?.label || "Unknown"
              }}
            </div>
          </div>
        </div>
</div>

          <div class="flex justify-end pt-3 pb-1">
            <n-button class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
              @click="closeModalView">
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
  <!--End Modal -->
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { CloseCircle as CloseIcon } from "@vicons/ionicons5";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: () => ({}) }, // pass selected guardian
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const showModalView = ref(props.modelValue);
    const model = ref({ ...props.editData });

    // This watch for modal visibility
    watch(
      () => props.modelValue,
      (val) => (showModalView.value = val)
    );
    watch(showModalView, (val) => emit("update:modelValue", val));

    // This watch for New Data from parent
    watch(
      () => props.editData,
      (val) => {
        model.value = { ...(val ?? {}) };
      }
    );

    function closeModalView() {
      emit("update:modelValue", false);
      emit("close");
    }

  const divisionOptions = {
            selectDivision: divisions.map((d) => ({
                label: d.division_name,
                value: d.id,
            })),
        };

    return { CloseIcon, showModalView, model, closeModalView, divisionOptions };
  },
});
</script>

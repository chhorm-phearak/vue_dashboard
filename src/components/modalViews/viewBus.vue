<template>
  <n-modal
    title="View Bus Information"
    :closable="false"
    v-model:show="showModalView"
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
  >
    <n-form ref="formRef" :model="model" class="flex flex-col">
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <div class="grid gap-4 md:grid-cols-1 w-full">
          <div class="flex gap-3">
            <label class="font-semibold">Bus Number:</label>
            <div>{{ model.bus_number || '-' }}</div>
          </div>
          <div class="flex gap-3">
            <label class="font-semibold">Route Name:</label>
            <div>{{ model.route_name || '-' }}</div>
          </div>
          <div class="flex gap-3">
            <label class="font-semibold">License Plate:</label>
            <div>{{ model.license_plate || '-' }}</div>
          </div>
          <div class="flex gap-3">
            <label class="font-semibold">Driver:</label>
            <div>
              {{
                model.driver
        ? `${model.driver.last_name} ${model.driver.first_name}`
        : driverOptions.find(opt => opt.value === model.driver_id)?.label || "-"
              }}
            </div>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-1 w-full">
          <div class="flex gap-3">
            <label class="font-semibold">Created At:</label>
            <div>{{ formatDate(model.created_at) }}</div>
          </div>
          <div class="flex gap-3">
            <label class="font-semibold">Updated At:</label>
            <div>{{ formatDate(model.updated_at) }}</div>
          </div>
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
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { CloseCircle as CloseIcon } from "@vicons/ionicons5";
import { format } from "date-fns";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: () => ({}) },
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const store = useStore();
    const showModalView = ref(props.modelValue);
    const model = ref({ ...props.editData });

    const staffList = ref([]);

     const driverOptions = computed(() =>
  staffList.value.map((staff) => ({
    label: `${staff.last_name} ${staff.first_name}`,
    value: Number(staff.id),
  }))
);

function loadDataStaff() {
      store
        .dispatch("staff/list", {
          page: 1,
          perPage: 100,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            staffList.value = response.data.data;
          } else {
            console.error("Failed to fetch staff list", response);
          }
        });
    }

    const formatDate = (dateStr) => {
      return dateStr ? format(new Date(dateStr), "yyyy-MM-dd HH:mm") : "-";
    };

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
      model.value = {
        ...(val ?? {}),
        driver: val?.driver ?? null,
      };
    });

    onMounted(() => {
      loadDataStaff();
    });

    return {
      CloseIcon,
      showModalView,
      model,
      closeModalView,
      driverOptions,
      formatDate,
    };
  },
});
</script>

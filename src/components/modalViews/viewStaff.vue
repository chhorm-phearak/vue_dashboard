<template>
  <!-- Modal -->
  <n-modal
    title="View Staff"
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
          <label class="font-semibold">Address:</label>
          <div>{{ model.address }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Hire Date:</label>
          <div>{{ model.hire_date }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Employment Status:</label>
          <div>{{ model.employment_status }}</div>
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
          <label class="font-semibold">Position:</label>
          <div>
            {{
              positionOptions.find(opt => opt.value === model.position_id)?.label || "Unknown"
            }}
          </div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Status:</label>
          <div class="font-bold text-blue-600">{{ model.status }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Created At:</label>
          <div>{{ model.created_at }}</div>
        </div>
        <div class="flex gap-4">
          <label class="font-semibold">Updated At:</label>
          <div>{{ model.updated_at }}</div>
        </div>

        <!-- Photo -->
        <div class="flex gap-4 items-start col-span-2">
          <label class="font-semibold">Photo:</label>
          <div v-if="model.photo_url">
            <img
              :src="photoUrl"
              alt="Staff Photo"
              class="max-w-[200px] rounded shadow border"
            />
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
import { defineComponent, ref, watch, computed, onMounted } from "vue";
import { CloseCircle as CloseIcon } from "@vicons/ionicons5";
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
    const positions = ref([]);

    const baseUrl = import.meta.env.VITE_API_BASE;

    const photoUrl = computed(() =>
      model.value.photo_url
        ? `${baseUrl}/uploads/staff_docs/${model.value.photo_url}`
        : null
    );

    const positionOptions = computed(() =>
      positions.value.map((p) => ({
        label: p.title,
        value: p.id,
      }))
    );

    function loadDataPositions() {
      store
        .dispatch("position/list", {
          page: 1,
          perPage: 100,
          search: "",
        })
        .then((response) => {
          if (response.status === 200) {
            positions.value = response.data.data;
          } else {
            console.error("Failed to fetch positions", response);
          }
        });
    }

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

    onMounted(() => {
      loadDataPositions();
    });

    return {
      CloseIcon,
      showModalView,
      model,
      closeModalView,
      baseUrl,
      photoUrl,
      positionOptions,
    };
  },
});
</script>

<template>
  <n-modal
    title="Edit Bus"
    :closable="true"
    v-model:show="showModalEdit"
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
    @close="closeModalEdit"
  >
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="bus_number" label="Bus Number">
          <n-input v-model:value="model.bus_number" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="route_name" label="Route Name">
          <n-input v-model:value="model.route_name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="license_plate" label="License Plate">
          <n-input v-model:value="model.license_plate" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="driver_id" label="Driver">
          <n-select
            :key="model.driver_id"
            v-model:value="model.driver_id"
            placeholder="Select Driver"
            :options="driverOptions"
          />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdateBus"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="EditBusIcon" />
            </n-icon>
            <span class="font-bold">Update</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { CreateOutline as EditBusIcon } from "@vicons/ionicons5";
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    segmented: { type: Boolean, default: false },
    editData: { type: Object, default: null },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const store = useStore();

    const showModalEdit = ref(props.modelValue);
    const formRef = ref(null);
    const staffList = ref([]);

    const modelRef = ref({
      id: null,
      bus_number: null,
      route_name: null,
      license_plate: null,
      driver_id: null,
    });

    const rules = {
      bus_number: [
        { required: true, trigger: ["blur", "input"], message: "Please input Bus Number" },
      ],
      route_name: [{ required: false, trigger: ["blur", "input"] }],
      license_plate: [{ required: false, trigger: ["blur", "input"] }],
      driver_id: [
        {
          required: true,
          type: "number",
          trigger: ["blur", "change"],
          message: "Please select Driver",
        },
      ],
    };

    const driverOptions = computed(() =>
      staffList.value.map((staff) => ({
        label: `${staff.last_name} ${staff.first_name}`,
        value: Number(staff.id),
      }))
    );

    function loadStaffList() {
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

    function submitUpdateBus(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("bus/update", modelRef.value)
            .then(() => {
              message.success("Bus updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating bus:", error);
              message.error("Failed to update bus");
            });
        } else {
          console.log(errors);
          message.error("Invalid");
        }
      });
    }

    function closeModalEdit() {
      emit("update:modelValue", false);
      emit("close");
    }

    watch(() => props.modelValue, (val) => {
      showModalEdit.value = val;
    });

    watch(showModalEdit, (val) => {
      emit("update:modelValue", val);
    });

    watch(() => props.editData, (val) => {
      if (val) {
        modelRef.value = {
          id: val.id ?? null,
          bus_number: val.bus_number ?? null,
          route_name: val.route_name ?? null,
          license_plate: val.license_plate ?? null,
          driver_id: val.driver_id ?? null,
        };
      }
    });

    onMounted(() => {
      loadStaffList();
    });

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      submitUpdateBus,
      EditBusIcon,
      driverOptions,
    };
  },
});
</script>

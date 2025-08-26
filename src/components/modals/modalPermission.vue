<template>
  <!-- Modal -->
  <n-modal
    title="Create Permission"
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
      <!-- Scrollable content wrapper -->
      <div class="max-h-[60vh] overflow-y-auto pr-2">
        <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
          <n-form-item path="permission_name" label="Permission Name">
            <n-input v-model:value="model.permission_name" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="permission_description" label="Description">
            <n-input v-model:value="model.permission_description" @keydown.enter.prevent />
          </n-form-item>
        </div>

        <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
          <n-form-item path="division_ids" label="Divisions">
            <n-select
              v-model:value="model.division_ids"
              placeholder="Select divisions"
              :options="divisionOptions"
              multiple
              clearable
            />
          </n-form-item>

          <n-form-item path="position_ids" label="Positions">
            <n-select
              v-model:value="model.position_ids"
              placeholder="Select positions"
              :options="positionOptions"
              multiple
              clearable
            />
          </n-form-item>
        </div>
      </div>

      <!-- Button stays outside scroll -->
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreatePermission" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!-- End Modal -->
</template>

<script>
import { CreateOutline as CreatePermission } from "@vicons/ionicons5";
import { defineComponent, ref, onMounted, watch, computed } from "vue";
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
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const store = useStore();

    const showModal = ref(props.modelValue);
    const formRef = ref(null);
    const divisions = ref([]);
    const positions = ref([]);

    const modelRef = ref({
      permission_name: null,
      permission_description: null,
      division_ids: [],
      position_ids: [],
    });

    const rules = {
      permission_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Permission Name",
        },
      ],
      permission_description: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Description",
        },
      ],
      division_ids: [
        {
          required: false,
          type: "array",
          trigger: ["blur", "change"],
          message: "Please select at least one Division",
        },
      ],
      position_ids: [
        {
          required: false,
          type: "array",
          trigger: ["blur", "change"],
          message: "Please select at least one Position",
        },
      ],
    };

    const divisionOptions = computed(() =>
      divisions.value.map((d) => ({
        label: d.division_name,
        value: Number(d.id),
      }))
    );

    const positionOptions = computed(() =>
      positions.value.map((p) => ({
        label: p.title,
        value: Number(p.id),
      }))
    );

    function loadDataDivisions() {
      store
        .dispatch("division/list", { page: 1, perPage: 100, search: "" })
        .then((response) => {
          if (response.status === 200) {
            divisions.value = response.data.data;
          } else {
            console.error("Failed to fetch divisions", response);
          }
        });
    }

    function loadDataPositions() {
      store
        .dispatch("position/list", { page: 1, perPage: 100, search: "" })
        .then((response) => {
          if (response.status === 200) {
            positions.value = response.data.data;
          } else {
            console.error("Failed to fetch positions", response);
          }
        });
    }

    function resetForm() {
      modelRef.value = {
        permission_name: null,
        permission_description: null,
        division_ids: [],
        position_ids: [],
      };
      formRef.value?.restoreValidation();
    }

    function handleValidateButtonClick() {
      formRef.value?.validate((errors) => {
        if (!errors) {
          store.dispatch("permission/create", modelRef.value).then(() => {
            emit("refresh");
            emit("close");
          });
        } else {
          console.log("Validation errors:", JSON.stringify(errors, null, 2));
        }
      });
    }

    function handleClose() {
      emit("update:modelValue", false);
      emit("close");
    }

    watch(
      () => props.modelValue,
      (val) => {
        showModal.value = val;
      }
    );

    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    onMounted(() => {
      loadDataDivisions();
      loadDataPositions();
    });

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      divisionOptions,
      positionOptions,
      resetForm,
      handleValidateButtonClick,
      CreatePermission,
    };
  },
});
</script>

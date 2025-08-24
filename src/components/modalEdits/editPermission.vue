<template>
  <!-- Modal -->
  <n-modal
    title="Edit Permission"
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

      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdatePermission"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="UpdateIcon" />
            </n-icon>
            <span class="font-bold">Update</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { CreateOutline as UpdateIcon } from "@vicons/ionicons5";
import { defineComponent, ref, watch, onMounted, computed } from "vue";
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
    editData: {
      type: Object,
      default: null,
    },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const store = useStore();

    const showModalEdit = ref(props.modelValue);
    const formRef = ref(null);
    const divisions = ref([]);
    const positions = ref([]);

    const modelRef = ref({
      id: null,
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
          required: true,
          type: "array",
          trigger: ["blur", "change"],
          message: "Please select at least one Division",
        },
      ],
      position_ids: [
        {
          required: true,
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
        .dispatch("division/list", {
          page: 1,
          perPage: 100,
          search: "",
        })
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

    function submitUpdatePermission(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("permission/update", modelRef.value)
            .then(() => {
              message.success("Permission is updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating Permission:", error);
              message.error("Failed to update Permission");
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

    watch(
      () => props.modelValue,
      (val) => {
        showModalEdit.value = val;
      }
    );

    watch(showModalEdit, (val) => {
      emit("update:modelValue", val);
    });

    watch(
      () => props.editData,
      (val) => {
        if (val) {
          modelRef.value = {
            id: val.id,
            permission_name: val.permission_name ?? "",
            permission_description: val.permission_description ?? "",
            division_ids: val.divisions?.map((d) => Number(d.id)) ?? [],
            position_ids: val.positions?.map((p) => Number(p.id)) ?? [],
          };
        }
      }
    );

    onMounted(() => {
      loadDataDivisions();
      loadDataPositions();
    });

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      divisionOptions,
      positionOptions,
      submitUpdatePermission,
      UpdateIcon,
    };
  },
});
</script>

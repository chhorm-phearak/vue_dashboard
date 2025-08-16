<template>
  <!--Modal -->
  <n-modal title="Create Position" :closable="true" v-model:show="showModal"
    class="!w-[390px] md:!w-[640px] lg:!w-[800px]" preset="card" :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }" :bordered="false" :segmented="segmented" @close="handleClose">
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
      <!-- Scrollable content wrapper -->
      <div class="max-h-[60vh] overflow-y-auto pr-2">
        <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
          <n-form-item path="title" label="Title">
            <n-input v-model:value="model.title" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="position_description" label="Description">
            <n-input v-model:value="model.position_description" @keydown.enter.prevent />
          </n-form-item>
        </div>

        <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
          <n-form-item path="division_id" label="Division">
            <n-select :key="model.division_id" v-model:value="model.division_id" placeholder="Select"
              :options="divisionOptions" />
          </n-form-item>

        </div>
      </div>

      <!-- Button stays outside scroll -->
      <div class="flex justify-end pt-3 pb-1">
        <n-button class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick">
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreatePosition" />
            </n-icon>
            <span class="font-bold">Create</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!--End Modal -->
</template>

<script>
import { CreateOutline as CreatePosition } from "@vicons/ionicons5";
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

    const modelRef = ref({
      title: null,
      position_description: null,
      division_id: null,
    });

    const rules = {
      title: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Title of the Position",
        },
      ],
      position_description: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Description of the Position",
        },
      ],
      division_id: [
        {
          required: true,
          type: "number",
          trigger: ["blur", "change"],
          message: "Please select Division",
        },
      ],
    };

    const divisionOptions = computed(() =>
      divisions.value.map((d) => ({
        label: d.division_name,
        value: Number(d.id), // ✅ use d.id here
      }))
    );

    function loadDataDivisions() {
      store
        .dispatch("division/list", {
          page: 1,
          perPage: 10,
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

    function resetForm() {
      modelRef.value = {
        title: null,
        position_description: null,
        division_id: null,
      };
      formRef.value?.restoreValidation();
    }

    function handleValidateButtonClick() {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log("Creating position with model:", modelRef.value);

          store.dispatch("position/create", modelRef.value)
            .then(() => {
              emit("refresh");
              emit("close");
            });
        } else {
          // ✅ ADD THIS HERE
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
    });

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      divisionOptions,
      resetForm,
      handleValidateButtonClick,
      CreatePosition,
    };
  },
});
</script>

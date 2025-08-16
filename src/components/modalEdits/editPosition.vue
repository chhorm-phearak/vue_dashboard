<template>
  <!-- Modal -->
  <n-modal
    title="Edit Position"
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
        <n-form-item path="title" label="Title">
          <n-input v-model:value="model.title" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="position_description" label="Description">
          <n-input v-model:value="model.position_description" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="division_id" label="Division">
          <n-select
            v-model:value="model.division_id"
            placeholder="Select"
            :options="divisionOptions"
          />
        </n-form-item>
      </div>

      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdatePosition"
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
  <!-- End Modal -->
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
          trigger: ["blur", "change"],
          message: "Please select Division",
        },
      ],
    };

    const divisionOptions = computed(() =>
      divisions.value.map((d) => ({
        label: d.division_name,
        value: d.id,
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

    function submitUpdatePosition(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("position/update", modelRef.value)
            .then(() => {
              message.success("Position is updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating Position:", error);
              message.error("Failed to update Position");
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
            ...val,
            id: val.id,
            position_description: val.position_description ?? "",
          };
        }
      }
    );

    onMounted(() => {
      loadDataDivisions();
    });

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      divisionOptions,
      submitUpdatePosition,
      UpdateIcon,
    };
  },
});
</script>

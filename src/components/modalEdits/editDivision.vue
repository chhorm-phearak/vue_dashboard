<template>
  <!--Modal -->
  <n-modal
    title="Edit Division"
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
        <n-form-item path="division_name" label="Division Name">
          <n-input v-model:value="model.division_name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="division_description" label="Description">
          <n-input
            v-model:value="model.division_description"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdateDivision"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateDivision" />
            </n-icon>
            <span class="font-bold">Update</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!--End Modal -->
</template>

<script>
import { CreateOutline as CreateDivision } from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
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
    editData: { type: Object, default: null },
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();
    const showModalEdit = ref(props.modelValue);
    const formRef = ref(null);

    const modelRef = ref({
      division_name: null,
      division_description: null,
    });

    const rules = {
      division_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Division Name",
        },
      ],
      division_description: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Description",
        },
      ],
    };

    const store = useStore();
    function submitUpdateDivision(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("division/update", modelRef.value)
            .then((res) => {
              message.success("Division updated successfully");
              emit("refresh"); // tell parent to reload data
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating division:", error);
              message.error("Failed to update division");
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

    // Sync prop with internal ref
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
          };
        }
      }
    );

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      submitUpdateDivision,
      CreateDivision,
    };
  },
});
</script>

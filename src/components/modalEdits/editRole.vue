<template>
  <!--Modal -->
  <n-modal
    title="Edit Role"
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
        <n-form-item path="name" label="Role Name">
          <n-input v-model:value="model.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="guard_name" label="Guard Name">
          <n-input v-model:value="model.guard_name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="tag" label="Tag">
          <n-input v-model:value="model.tag" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdateRole"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateRoleIcon" />
            </n-icon>
            <span class="font-bold">Update</span>
          </div>
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script>
import { CreateOutline as CreateRoleIcon } from "@vicons/ionicons5";
import { defineComponent, ref, watch } from "vue";
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
    const showModalEdit = ref(props.modelValue);
    const formRef = ref(null);

    const modelRef = ref({
      name: null,
      guard_name: null,
      tag: null,
    });

    const rules = {
      name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Role Name",
        },
      ],
      guard_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Guard Name",
        },
      ],
      tag: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Tag",
        },
      ],
    };

    const store = useStore();
    function submitUpdateRole(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("role/update", modelRef.value)
            .then(() => {
              message.success("Role updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating role:", error);
              message.error("Failed to update role");
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
        modelRef.value = { ...val };
      }
    });

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      submitUpdateRole,
      CreateRoleIcon,
    };
  },
});
</script>

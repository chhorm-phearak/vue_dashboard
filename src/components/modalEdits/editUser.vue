<template>
  <!--Modal -->
  <n-modal
    title="Edit User"
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
        <n-form-item path="name" label="Name">
          <n-input v-model:value="model.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="roles" label="Roles">
          <n-input v-model:value="model.roles" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdateUser"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateUserIcon" />
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
import { CreateOutline as CreateUserIcon } from "@vicons/ionicons5";
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
      email: null,
      roles: null,
    });

    const rules = {
      name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Name",
        },
      ],
      email: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Email",
        },
      ],
      roles: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Roles",
        },
      ],
    };

    const store = useStore();
    function submitUpdateUser(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("user/update", modelRef.value)
            .then(() => {
              message.success("User updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating user:", error);
              message.error("Failed to update user");
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
      submitUpdateUser,
      CreateUserIcon,
    };
  },
});
</script>

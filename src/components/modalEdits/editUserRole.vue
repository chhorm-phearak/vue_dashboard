<template>
  <n-modal
    title="Assign Roles to User"
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
        <n-form-item path="user_id" label="User">
          <n-select
            v-model:value="model.user_id"
            placeholder="Select user"
            :options="userOptions"
            clearable
            @update:value="val => model.user_id = Number(val)"
          />
        </n-form-item>

        <n-form-item path="role_ids" label="Roles">
          <n-select
            v-model:value="model.role_ids"
            placeholder="Select roles"
            :options="roleOptions"
            multiple
            clearable
          />
        </n-form-item>
      </div>

      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="submitUpdateUserRole"
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
    const users = ref([]);
    const roles = ref([]);

    const modelRef = ref({
      user_id: null,
      role_ids: [],
    });

    const rules = {
      user_id: [
        { required: true, type:'number', trigger: ["blur", "change"], message: "Please select a user" },
      ],
      role_ids: [
        { required: true, type: "array", trigger: ["blur", "change"], message: "Please select at least one role" },
      ],
    };

    const userOptions = computed(() =>
      users.value.map((u) => ({
        label: u.name,
        value: Number(u.id),
      }))
    );

    const roleOptions = computed(() =>
      roles.value.map((r) => ({
        label: r.name,
        value: Number(r.id),
      }))
    );

    function loadDataUsers() {
      store.dispatch("user/list", { page: 1, perPage: 100, search: "" }).then((res) => {
        if (res.status === 200) users.value = res.data.data;
        else console.error("Failed to fetch users", res);
      });
    }

    function loadDataRoles() {
      store.dispatch("role/list", { page: 1, perPage: 100, search: "" }).then((res) => {
        if (res.status === 200) roles.value = res.data.data;
        else console.error("Failed to fetch roles", res);
      });
    }

    function submitUpdateUserRole(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("userRole/update", modelRef.value)
            .then(() => {
              message.success("User roles updated successfully");
              emit("refresh");
              closeModalEdit();
            })
            .catch((error) => {
              console.error("Error updating user roles:", error);
              message.error("Failed to update user roles");
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
          user_id: Number(val.id),
          role_ids: val.roles?.map((r) => Number(r.id)) ?? [],
        };
      }
    });

    onMounted(() => {
      loadDataUsers();
      loadDataRoles();
    });

    return {
      showModalEdit,
      closeModalEdit,
      formRef,
      model: modelRef,
      rules,
      userOptions,
      roleOptions,
      submitUpdateUserRole,
      UpdateIcon,
    };
  },
});
</script>

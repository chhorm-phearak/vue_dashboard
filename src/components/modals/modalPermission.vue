<template>
  <!--Modal -->
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
      <!-- <div class="w-full text-start font-bold text-lg mb-8 mt-5">
        Create Staff
      </div> -->
      <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="name" label="Name">
          <n-input v-model:value="model.name" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
         <n-form-item path="division" label="Division">
          <n-select v-model:value="model.division" placeholder="Select" :options="divisionOptions" />
        </n-form-item>
         <n-form-item path="position" label="Position">
          <n-select v-model:value="model.position" placeholder="Select" :options="positionOptions" />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateStaff" />
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
import { CreateOutline as CreateStaff } from "@vicons/ionicons5";
import { defineComponent, ref, watch, onMounted } from "vue";
import { useMessage } from "naive-ui";
import axios from "axios";

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
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const message = useMessage();

    const showModal = ref(props.modelValue);

    const formRef = ref(null);
    const modelRef = ref({
      name: null,
      division: null,
      position: null,
    });

    const divisionOptions = ref([]);
    const positionOptions = ref([]);
    
    onMounted(async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/division-index");
    console.log(res.data);

    if (res.data.status && Array.isArray(res.data.data)) {
      divisionOptions.value = res.data.data.map(div => ({
        label: div.division_name,
        value: div.id
      }));
    } else {
      divisionOptions.value = [];
    }
  } catch (err) {
    console.error("Failed to load divisions", err);
  }
});

onMounted(async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/position-index");
    console.log(res.data);

    if (res.data.status && Array.isArray(res.data.data)) {
      positionOptions.value = res.data.data.map(div => ({
        label: div.title,
        value: div.id
      }));
    } else {
      positionOptions.value = [];
    }
  } catch (err) {
    console.error("Failed to load postions", err);
  }
});

    const rules = {
      name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Permission Name",
        },
      ],
      division: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select Division",
        },
      ],
      position: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select Position",
        },
      ],
    };
    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          message.success("Valid");
        } else {
          console.log(errors);
          message.error("Invalid");
        }
      });
    }

    function handleClose() {
      emit("update:modelValue", false);
      emit("close");
      console.log("Close Modal User");
    }

    // Sync prop with internal ref
    watch(
      () => props.modelValue,
      (val) => {
        showModal.value = val;
      }
    );
    watch(showModal, (val) => {
      emit("update:modelValue", val);
    });

    return {
      showModal,
      handleClose,
      formRef,
      model: modelRef,
      rules,
      divisionOptions,
      positionOptions,
      handleValidateButtonClick,
      CreateStaff,
    };
  },
});
</script>

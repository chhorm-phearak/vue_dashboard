<template>
  <!--Modal -->
  <n-modal
    title="Create Guardian"
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
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="first_name" label="First Name">
          <n-input v-model:value="model.first_name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="last_name" label="Last Name">
          <n-input v-model:value="model.last_name" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="age" label="Age">
          <n-input v-model:value="model.age" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="guardian_gender" label="Gender">
          <n-select
            v-model:value="model.guardian_gender"
            placeholder="Select"
            :options="genderOptions.selectGender"
          />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item
          path="relationship_to_student"
          label="Relationship Student"
        >
          <n-input
            v-model:value="model.relationship_to_student"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="occupation" label="Occupation">
          <n-input v-model:value="model.occupation" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="phone_number" label="Mobile Phone">
          <n-input v-model:value="model.phone_number" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="grid gap-4 mb-2 md:grid-cols-2 w-full">
        <n-form-item path="address" label="Address">
          <n-input v-model:value="model.address" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="photo_url" label="Photo">
          <n-input v-model:value="model.photo_url" @keydown.enter.prevent />
        </n-form-item>
      </div>
      <div class="flex justify-end pt-3 pb-1">
        <n-button
          class="!p-[10px] !bg-blue-500 hover:!bg-[#18A058] !text-white !rounded-md"
          @click="handleValidateButtonClick"
        >
          <div class="flex gap-2 items-center">
            <n-icon size="22">
              <component :is="CreateGuardian" />
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
import { CreateOutline as CreateGuardian, Storefront } from "@vicons/ionicons5";
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
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(props, { emit }) {
    const message = useMessage();

    const showModal = ref(props.modelValue);

    const formRef = ref(null);
    const modelRef = ref({
      first_name: null,
      last_name: null,
      age: null,
      guardian_gender: null,
      relationship_to_student: null,
      occupation: null,
      email: null,
      phone_number: null,
      address: null,
      photo_url: null,
    });

    //reset field when close modal
    function resetForm() {
      modelRef.value = {
        first_name: null,
        last_name: null,
        age: null,
        guardian_gender: null,
        relationship_to_student: null,
        occupation: null,
        email: null,
        phone_number: null,
        address: null,
        photo_url: null,
      };
      formRef.value?.restoreValidation();
    }

    const genderOptions = {
      selectGender: ["male", "female"].map((v) => ({
        label: v,
        value: v,
      })),
    };

    const rules = {
      first_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input First Name",
        },
      ],
      last_name: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Last Name",
        },
      ],
      age: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("Age is required");
            } else if (!/^\d*$/.test(value)) {
              return new Error("Age should be an integer");
            } else if (Number(value) < 5) {
              return new Error("Age should be above 18");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      guardian_gender: [
        {
          required: true,
          trigger: ["blur", "change"],
          message: "Please select Gender",
        },
      ],
      email: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Email",
        },
      ],
      relationship_to_student: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Relationship with Student",
        },
      ],
      occupation: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Occupation",
        },
      ],
      phone_number: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Phone Number",
        },
      ],
      address: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Address",
        },
      ],
      photo_url: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Please input Photo",
        },
      ],
    };

    const store = useStore();
    function handleValidateButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store
            .dispatch("guardian/create", modelRef.value)
            .then((res) => {
              message.success("Guardian created successfully");
              emit("refresh"); // tell parent to reload data
              resetForm();
              handleClose();
              //emit("update:modelValue", false); // close modal
            })
            .catch((error) => {
              console.error("Error creating guardian:", error);
              message.error("Failed to create guardian");
            });
          //message.success("Valid");
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
      genderOptions,
      resetForm,
      handleValidateButtonClick,
      CreateGuardian,
    };
  },
});
</script>

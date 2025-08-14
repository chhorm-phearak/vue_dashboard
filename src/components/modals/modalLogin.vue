<template>
  <!--Modal -->
  <n-modal
    v-model:show="showModal"
    class="!w-[390px] p-4 !rounded-2xl border border-gray-400"
    preset="card"
    :style="{
      top: '0%',
      transform: 'translateY(0%)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      margin: '0 auto',
    }"
    :bordered="false"
    :segmented="segmented"
    :closable="false"
    @close="handleClose"
  >
    <n-form ref="formRef" :model="model" :rules="rules" class="flex flex-col">
      <div class="w-full text-center font-bold text-lg mb-10 mt-8">
        Login Your Account
      </div>
      <div class="grid gap-3 mb-2 md:grid-cols-1 w-full">
        <n-form-item path="email" label="Username">
          <n-input
            class="!rounded-md"
            v-model:value="model.email"
            size="large"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            class="!rounded-md"
            v-model:value="model.password"
            size="large"
            type="password"
            show-password-on="click"
            placeholder="Custom Password Toggle Icon"
            :maxlength="18"
            @keydown.enter.prevent
          >
            <!-- @input="handlePasswordInput" -->
            <template #password-visible-icon>
              <n-icon
                :size="20"
                :component="EyeOffIcon"
                class="hover:text-[#18A058]"
              />
            </template>
            <template #password-invisible-icon>
              <n-icon
                :size="20"
                :component="EyeIcon"
                class="hover:text-[#18A058]"
              />
            </template>
          </n-input>
        </n-form-item>
      </div>
      <div class="flex justify-center pt-3">
        <n-button
          size="large"
          class="!px-10 !border !border-gray-400 hover:!bg-[#18A058] !text-gray-800 hover:!text-white !rounded-md shadow-lg"
          type="submit"
          @click="submitLogin"
        >
          <!-- @click="handleValidateButtonClick" -->
          <span class="font-bold">LOGIN</span>
        </n-button>
      </div>
    </n-form>
  </n-modal>
  <!--End Modal -->
</template>

<script>
import {
  KeyOutline as KeyIcon,
  EyeSharp as EyeIcon,
  EyeOffSharp as EyeOffIcon,
} from "@vicons/ionicons5";
import axios from "axios";
import { defineComponent, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setToken } from "./../../plugins/authentication";

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
    const router = useRouter();
    const store = useStore();

    const showModal = ref(props.modelValue);
    const formRef = ref(null);

    const formLogin = reactive({
      email: "",
      password: "",
    });
    const error = ref("");

    const rules = {
      email: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Email is required",
        },
      ],
      password: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Password is required",
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

    // const submitLogin = () => {
    //   router.push("Dashboard"); //route name
    // };

    const submitLogin = async () => {
      await axios
        .post(import.meta.env.VITE_API_SERVER + "/api/login", formLogin)
        .then((res) => {
          if (res.data.success) {
            setToken(res.data.token); //token: [access_token: {}, type_token: {}]
            router.push({ name: "Dashboard" }); //route name
          } else {
            error.value = res.data.message;
          }
        });
    };

    return {
      showModal,
      handleClose,
      formRef,
      model: formLogin,
      rules,
      EyeIcon,
      EyeOffIcon,
      KeyIcon,
      //handleValidateButtonClick,
      submitLogin,
    };
  },
});
</script>

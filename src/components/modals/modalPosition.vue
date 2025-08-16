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
            <!-- <div class="w-full text-start font-bold text-lg mb-8 mt-5">
        Create Staff
      </div> -->
            <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
                <n-form-item path="title" label="Title">
                    <n-input v-model:value="model.title" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="position_description" label="Description">
                    <n-input v-model:value="model.description" @keydown.enter.prevent />
                </n-form-item>
            </div>
            <div class="grid gap-4 mb-2 md:grid-cols-1 w-full">
                <n-form-item path="division_id" label="Division">
                    <n-select v-model:value="model.division_id" placeholder="Select"
                        :options="divisionOptions.selectDivision" />
                </n-form-item>
            </div>

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
import { CreateOutline as CreatePosition, Storefront } from "@vicons/ionicons5";
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
    emits: ["update:modelValue", "close"],
    setup(props, { emit }) {
        const message = useMessage();

        const showModal = ref(props.modelValue);

        const formRef = ref(null);
        const modelRef = ref({
            title: null,
            position_description: null,
            division_id: null, // 🔗 Link to division
        });

        //reset field when close modal
        function resetForm() {
            modelRef.value = {
                title: null,
                position_description: null,
                division_id: null, // 🔗 Link to division
            };
            formRef.value?.restoreValidation();
        }

        const divisionOptions = {
            selectDivision: divisions.map((d) => ({
                label: d.division_name,
                value: d.id,
            })),
        };

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

        const store = useStore();
        function handleValidateButtonClick(e) {
            e.preventDefault();
            formRef.value?.validate((errors) => {
                if (!errors) {
                    store
                        .dispatch("position/create", modelRef.value)
                        .then((res) => {
                            message.success("Position is created successfully");
                            emit("refresh"); // tell parent to reload data
                            resetForm();
                            handleClose();
                            //emit("update:modelValue", false); // close modal
                        })
                        .catch((error) => {
                            console.error("Error creating position:", error);
                            message.error("Failed to create position");
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
            divisionOptions,
            resetForm,
            handleValidateButtonClick,
            CreatePosition,
        };
    },
});
</script>

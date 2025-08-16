<template>
  <n-modal v-model:show="modelValue">
    <n-form @submit.prevent="handleSubmit">
      <n-input v-model:value="form.title" />
      <n-input v-model:value="form.position_description" />
      <n-select
        v-model:value="form.division_id"
        :options="divisionOptions"
        label-field="division_name"
        value-field="id"
      />
      <n-button type="primary" @click="handleSubmit">Update</n-button>
    </n-form>
  </n-modal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { usePositionStore } from '@/stores/position'

const props = defineProps({ modelValue: Boolean, editData: Object, divisions: Array })
const emit = defineEmits(['refresh', 'close'])

const form = ref({
  title: '',
  position_description: '',
  division_id: null
})

watch(() => props.editData, (val) => {
  if (val) {
    form.value = {
      title: val.title,
      position_description: val.position_description,
      division_id: val.division_id
    }
  }
}, { immediate: true })

const divisionOptions = computed(() =>
  props.divisions.map(d => ({ label: d.division_name, value: d.id }))
)

const positionStore = usePositionStore()

const handleSubmit = async () => {
  await positionStore.update(props.editData.id, form.value)
  emit('refresh')
  emit('close')
}
</script>

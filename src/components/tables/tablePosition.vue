<template>
  <n-modal v-model:show="modelValue">
    <n-text>Title: {{ editData.title }}</n-text>
    <n-text>Description: {{ editData.position_description }}</n-text>
    <n-text>Division: {{ editData.divisions.division_name }}</n-text>
    <n-text>Created: {{ editData.created_at }}</n-text>
    <n-text>Updated: {{ editData.updated_at }}</n-text>
  </n-modal>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean, editData: Object })
const emit = defineEmits(['close'])
</script>

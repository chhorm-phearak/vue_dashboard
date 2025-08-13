<template>
  <MainApp>
    <div class="p-6">
      <n-card title="User Information" bordered>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div><b>First Name:</b> {{ user.first_name }}</div>
          <div><b>Last Name:</b> {{ user.last_name }}</div>
          <div><b>Email:</b> {{ user.email }}</div>
          <div><b>Phone:</b> {{ user.phone }}</div>
          <div><b>Age:</b> {{ user.age }}</div>
          <div><b>Gender:</b> {{ user.gender }}</div>
        </div>
      </n-card>
    </div>
  </MainApp>
</template>

<script setup>
import MainApp from "@/components/mainApp.vue";
import { reactive, onMounted } from "vue";
import { NCard } from "naive-ui";

import { useRoute } from "vue-router";

const route = useRoute();
const user = reactive({});

onMounted(() => {
  if (route.query.user) {
    Object.assign(user, JSON.parse(route.query.user));
  }
});
</script>

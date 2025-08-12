<template>
  <n-config-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import { NConfigProvider, NMessageProvider } from "naive-ui";
</script>

<!-- <template>
  <div>
    <loginAccount />
  </div>
</template>
<script setup>
import loginAccount from "./components/loginAccount.vue";
</script> -->

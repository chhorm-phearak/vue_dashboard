<template>
  <MainApp>
    <!-- Location Title -->
    <div class="grid grid-cols-1 mb-4">
      <!-- :style="{backgroundColor: inverted ? 'gray' : 'white'}" -->
      <div
        class="flex items-center justify-between py-5 px-5 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <!-- :style="{color: inverted ? 'white' : 'black'}" -->
        <h5 class="text-xl font-bold tracking-tight text-gray-900">Setting</h5>
        <n-button style="padding: 10px 8px 10px 8px">
          <div class="flex gap-2 items-center">
            <!-- :color="inverted ? 'white' : 'black'" -->
            <n-icon size="24">
              <component :is="AddNew" />
            </n-icon>
            <!-- :style="{color: inverted ? 'white' : 'black'}" -->
            <span class="text-[18px]">NEW</span>
          </div>
        </n-button>
      </div>
    </div>
    <!--End Location Title -->
  </MainApp>
</template>
<script setup>
import { AddCircleSharp as AddNew } from "@vicons/ionicons5";
import { NIcon, NButton } from "naive-ui";
import MainApp from "@/components/mainApp.vue";
</script>

<template>
  <MainApp>
    <Card />
    <div
      class="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4 hover:text-white w-full mt-4"
    >
      <n-card
        v-for="(chart, ind) in CHARTS"
        :key="ind"
        class="!rounded-xl !border !border-gray-200 hover:shadow-lg hover:!bg-[#18A058] hover:!text-white !w-full"
      >
        <div class="flex flex-col gap-5">
          <h1 class="text-xl">{{ chart.title }}</h1>
          <p>{{ chart.content }}</p>
        </div>
      </n-card>
    </div>
  </MainApp>
</template>
<script>
import { ref } from "vue";
import MainApp from "@/components/mainApp.vue";
import Card from "@/components/modals/cardDashboard.vue";

export default {
  components: {
    MainApp,
    Card,
  },
  setup() {
    const CHARTS = ref([
      {
        id: 1,
        title: "LINE - CHARTS",
        content: "Content Card - 1",
      },
      {
        id: 2,
        title: "",
        content: "Content Card - 2",
      },
    ]);
    return { CHARTS };
  },
};
</script>

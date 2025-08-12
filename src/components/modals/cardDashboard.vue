<template>
  <!-- Card -->
  <div
    class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 hover:text-white"
  >
    <n-card
      v-for="(card, ind) in CARD"
      :key="ind"
      class="!rounded-xl !border !border-gray-200 hover:shadow-lg hover:!bg-[#18A058] hover:!text-white"
    >
      <div class="flex flex-col gap-5">
        <h1 class="text-xl">{{ card.title }}</h1>
        <p>{{ card.content }}</p>
      </div>
    </n-card>
  </div>
  <!--End Card -->
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const CARD = ref([
      {
        id: 1,
        title: "Card - 1",
        content: "Content Card - 1",
      },
      {
        id: 2,
        title: "Card - 2",
        content: "Content Card - 2",
      },
      {
        id: 3,
        title: "Card - 3",
        content: "Content Card - 3",
      },
      {
        id: 4,
        title: "Card - 4",
        content: "Content Card - 4",
      },
    ]);
    return { CARD };
  },
});
</script>

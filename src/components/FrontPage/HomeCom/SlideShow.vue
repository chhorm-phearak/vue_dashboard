<template>
  <nav class="SlideShow">
  <div class="carousel-wrapper">
    <n-carousel
      autoplay
      :autoplay-time="4000"
      :loop="true"
      :show-indicators="true"
      arrow="always"
      v-model:current-index="currentIndex"
    >
      <div class="img-text" v-for="(slide, index) in slides" :key="index">
        <img class="carousel-img" :src="slide.img" />
        <div
          class="overlay-text"
          :class="{ 'animate-slide-in': currentIndex === index }"
        >
          <h1><b>{{ slide.title }}</b></h1>
          <p><b>{{ slide.subtitle }}</b></p>
        </div>
      </div>
    </n-carousel>
  </div>
</nav>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const slides = [
  {
    img: '/img/bg/pexels-anastasia-shuraeva-8466774.jpg',
    title: 'Welcome to Kindergarten Buddy',
    subtitle: 'At Kindergarten Buddy, we believe that early childhood education is about more than just academics — it’s about nurturing the whole child. Our approach combines play-based learning, creativity, and social development to help each child thrive emotionally, intellectually, and physically.',
  },
  {
    img: '/img/bg/pexels-cottonbro-3662628.jpg',
    title: 'Where Learning Begins with Love',
    subtitle:
      'Welcome to a place where curiosity is encouraged, friendships are formed, and every child is nurtured with patience and care. At our kindergarten, we believe that love and learning go hand in hand.',
  },
  {
    img: '/img/bg/pexels-goumbik-296302.jpg',
    title: 'Play. Learn. Grow.',
    subtitle:
      'Through play-based learning and hands-on activities, your child will explore, discover, and grow in confidence. We create joyful experiences that lay the foundation for a lifelong love of learning.',
  },
  {
    img: '/img/bg/pexels-pavel-danilyuk-8422249.jpg',
    title: 'A Safe Space to Shine.',
    subtitle:
      'From storytelling to science experiments, music to movement, we design our days to spark imagination and inspire young minds. We’re proud to offer a well-rounded curriculum that supports every area of development.',
  },
]
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 670px;
  object-fit: cover;
}

.overlay-text {
  position: absolute;
  font-family: 'Poppins', sans-serif;
  top: 50%;
  right: 5rem;
  transform: translateY(-50%);
  color: white;
  max-width: 500px;
  opacity: 0;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.7);
  transition: opacity 0.5s ease;
}

/* This class triggers the animation */
.animate-slide-in {
  opacity: 1;
  animation: slideIn 1.5s ease forwards;
}

.overlay-text h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
}

.overlay-text p {
  font-family: 'Poppins', sans-serif;
  text-align: justify;
  font-size: 1.2rem;
  margin: 0;
}

/* Animation from left to right */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-100%, -50%);
  }
  to {
    opacity: 1;
    transform: translate(0, -50%);
  }
}
</style>

<template>
  <div class="vertical-scroll-wrapper">
    <section
      v-for="(item, idx) in items"
      :key="idx"
      class="scroll-section"
      :class="{ reverse: idx % 2 === 1, visible: visibleItems[idx] }"
      ref="sections"
    >
      <img :src="item.img" alt="portrait" class="portrait" />
      <div class="text-content">
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
      </div>
    </section>
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import EnrollFooter from '../EnrollFooter.vue'

const items = [
  {
    img: '/img/bg/Adobe Express - file.png',
    title: 'Welcome to Kindergarten Buddy',
    desc: 'At Kindergarten, we believe that early childhood education is about more than just academics — it’s about nurturing the whole child. Our approach combines play-based learning, creativity, and social development to help each child thrive emotionally, intellectually, and physically.',
  },
  {
    img: '/img/bg/pexels-yankrukov-8613059.jpg',
    title: 'Experienced & Caring Teachers',
    desc: 'Our team of dedicated educators is passionate about guiding young learners through their first steps in education. With warmth, patience, and expertise, our teachers create a supportive environment where every child feels valued and encouraged.',
  },
  {
    img: '/img/bg/99d94e0b7eaa12ffb38d386abbbb8214.jpg',
    title: 'Safe & Stimulating Environment',
    desc: 'Safety is our top priority. Our classrooms and outdoor play areas are thoughtfully designed to be both secure and inspiring. Children have plenty of room to explore, imagine, and grow in a setting that encourages curiosity and confidence.',
  },
  {
    img: '/img/bg/dddb914499e42fe4560321c95fb594f3.jpg',
    title: 'Enriching Activities & Curriculum',
    desc: 'From arts and crafts to music, storytelling to science experiments, our curriculum is designed to engage every child’s natural curiosity. We focus on developing important skills like communication, problem-solving, and teamwork through fun and interactive experiences.',
  },
]

const visibleItems = ref(Array(items.length).fill(false))
const sections = ref([])

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = sections.value.indexOf(entry.target)
      if (index !== -1) visibleItems.value[index] = true
    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // trigger when ~30% visible vertically
  })
  sections.value.forEach(section => observer.observe(section))

  onBeforeUnmount(() => {
    sections.value.forEach(section => observer.unobserve(section))
  })
})
</script>

<style scoped>
.vertical-scroll-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 2rem 7rem; /* Less side padding */
  display: flex;
  flex-direction: column;
  gap: 4rem;
}


.scroll-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Reverse layout on even indices */
.scroll-section.reverse {
  flex-direction: row-reverse;
}

/* When visible, fade in and reset transform */
.scroll-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Image styles */
.portrait {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  transform: translateX(-50px);
  box-shadow:  0 10px 15px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

/* Reverse image slide direction on reversed sections */
.scroll-section.reverse .portrait {
  transform: translateX(50px);
}


/* When visible, image slides in from left or right */
.scroll-section.visible .portrait {
  transform: translateX(0);
  opacity: 1;
}

/* Text styles */
.text-content {
  font-family: 'Poppins', sans-serif;
  max-width: 550px;
  color: #222;
  transform: translateY(-30px);
  opacity: 0;
  transition: transform 0.6s ease 0.3s, opacity 0.6s ease 0.3s;
}

.scroll-section.visible .text-content {
  transform: translateY(0);
  opacity: 1;
}

.text-content h2 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-content p {
  margin: 0;
  text-align: justify;
  font-size: 1.1rem;
  line-height: 1.5;
}


</style>

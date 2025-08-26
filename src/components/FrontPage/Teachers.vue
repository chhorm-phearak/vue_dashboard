
<template>
  <Navbar />
  <!-- About Section -->
  <section class="about-section">
    <div class="about-bg">
      <img src="/img/bg/bcc4ca6dab222fba4ba42481e1239750.jpg" alt="About Us Main" class="main-img" />
      <div class="overlay-img" :style="{ bottom: bottomOffset + 'px' }">
        <img src="/img/bg/74d9cda2dbfba3ac31a6fed44a0c830b.jpg" alt="Overlay" class="small-img" />
      </div>
    </div>
  </section>
<section class="cer-section">
    <div class="cer-text">
      <div class="cer-image">
        <img src="/img/bg/94feaa42518d14e08e9c12a941684219-removebg-preview.png" alt="Teacher" />
      </div>
      <div class="cer-info">
        <h1 class="main-title-cer push-text">Our Teahers</h1>
        <div class="paragraphs-cer">
          <p class="push-text">
            At <b>kindergarten Buddy</b>, our teachers are the heart of everything we do. They are more than just educators - they're <i>guides</i>, <i>cheerleaders</i>, and <i>caring companions</i> on each child's learning journey.
            <br>Here’s what makes our teachers special:<br>
            <br><i class="pi pi-check"></i> <b>Experienced & Certified</b> in the early childhood education
             <br><i class="pi pi-check"></i> <b>Patient and nurturing</b> with a passion for young learners
             <br><i class="pi pi-check"></i> <b>Creative and playful</b> in their approach to teaching
             <br><i class="pi pi-check"></i> <b>Supportive and understanding</b> of each child’s unique needs
             <br><i class="pi pi-check"></i> <b>Always learning and growing</b> through training and collaboration
            <br>We are proud of the warm, welcoming classrooms our teachers create — and even prouder of the little moments of joy, discovery, and kindness they inspire every single day.
          </p>
        </div>
      </div>
    </div>
</section>
  <!-- Teachers Section -->
<div class="heading-container">
  <h2 class="custom-title">Meet Our Teachers</h2>
</div>

<section class="min-h-screen flex flex-col items-center justify-center py-20">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 max-w-screen-xl mx-auto mt-20">
      <div
        v-for="(teacher, index) in teachers"
        :key="index"
        class="teacher-card push-text flex flex-col items-center text-center opacity-0 transform translate-y-8 transition-all duration-700"
      >
        <img src="/img/bg/tea1.jpg" alt="Teacher" class="w-32 h-32 object-cover rounded-full shadow-md mb-4" />
        <h3 class="text-lg font-semibold text-gray-800">{{ teacher.name }}</h3>
        <p class="text-sm text-red-700">{{ teacher.subject }}</p>
        <p class="text-xs text-gray-600 mt-1 px-2">{{ teacher.bio }}</p>
      </div>
    </div>
     
  </section>
   <EnrollFooter />
   <Footer />
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../FrontPage/Navbar.vue'
import 'primeicons/primeicons.css'
import EnrollFooter from './EnrollFooter.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Navbar,
    EnrollFooter,
    Footer, 
  },
   theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    }
  },
  setup() {
    const bottomOffset = ref(-100)

    const teachers = ref([
      { name: 'Ms. Emily Carter', subject: 'Art & Crafts', bio: 'Creative and caring teacher.' },
      { name: 'Mr. James Kim', subject: 'Physical Education', bio: 'Active and energetic.' },
      { name: 'Ms. Sofia Alvarez', subject: 'Music', bio: 'Bringing joy through music.' },
      { name: 'Mr. Daniel Wu', subject: 'Science', bio: 'Making science fun!' },
      { name: 'Ms. Aisha Khan', subject: 'Language', bio: 'Loves storytelling and reading.' },
      { name: 'Ms. Grace Lin', subject: 'Math', bio: 'Building strong foundations.' },
      { name: 'Mr. Liam Parker', subject: 'Drama', bio: 'Encouraging imagination and play.' },
      { name: 'Ms. Noor Hassan', subject: 'Social Skills', bio: 'Kindness and communication.' },
      { name: 'Mr. Ethan Davis', subject: 'Nature Study', bio: 'Exploring the outdoors.' },
      { name: 'Ms. Chloe Smith', subject: 'Colors & Shapes', bio: 'Learning through fun.' },
    ])

    const handleScroll = () => {
      const scrollY = window.scrollY
      bottomOffset.value = Math.min(50, -100 + scrollY / 5)
    }

    const observePushText = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target
              const index = parseInt(el.dataset.index) || 0
              el.style.animationDelay = `${index * 0.3}s`
              el.classList.add('in-view')
              observer.unobserve(el) // Trigger once
            }
          })
        },
        { threshold: 0.1 }
      )

      const elements = document.querySelectorAll('.push-text')
      elements.forEach((el, i) => {
        el.dataset.index = i
        observer.observe(el)
      })
    }

    const observeTeacherCards = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              entry.target.classList.remove('opacity-0', 'translate-y-8')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      const cards = document.querySelectorAll('.teacher-card')
      cards.forEach((card) => observer.observe(card))
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      observePushText()
      observeTeacherCards()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      bottomOffset,
      teachers, // 👈 must return to make available in template
    }
  },
}
</script>

<style scoped>
.about-section {
  width: 100%;
  position: relative;
  margin-bottom: 4rem;
}

.about-bg {
  position: relative;
  width: 100%;
  height: 670px;
  /* margin: 0px 0px 200px 0px; */
  margin-bottom: 200px;
}

.main-img {
  position: absolute;
  width: 100%;
  height: 670px;
  object-fit: cover;
  padding: 0;
  margin: 0;
  z-index: 0;
}

.overlay-img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 270px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 3rem;
  opacity: 1;
  transition: bottom 0.3s ease;
}

.small-img {
  width: 900px;
  height: auto;
  border-radius: 1rem;
}
.heading-container {
 font-family: 'Poppins', sans-serif;
  max-width: 1300px;
  margin: 5rem auto 1rem;
  padding: 0 1rem;
  text-align: center;
  position: relative;
  /* Required for z-index to work */
  z-index: 10;   /* push down */
}
.cer-section {
 margin-top: 260px;
  background-color: #720e09;
  padding: 5rem 2rem;
  max-height: 640px;
}

.cer-text {
  display: flex;
  align-items: left;
  justify-content: flex-start;
  gap: 5rem;
  /* no gap */
  max-width: 1300px;
  margin: 0 auto;
  color: white;
  flex-wrap: wrap;
}

.custom-title {
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color:black;
}
.cer-image {
  flex: 0 0 auto;
  margin: -30px, 5px, 6px, 8px;
  padding: 25px;

}

.cer-image img {
  width: 300px;
  height: 400px;
  border-radius: 1rem;

  box-shadow: 0;
}

.cer-info {
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-title-cer {
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.paragraphs-cer {
  display: flex;
  font-size: 1.125rem;
  flex-direction: column;
  gap: 0.5rem;
  text-align: justify;
}


.push-text {
  opacity: 0;
  transform: translateX(-50px);
}

.push-text.in-view {
  animation: pushInLeft 0.4s ease-out forwards;
}

@keyframes pushInLeft {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

</style>

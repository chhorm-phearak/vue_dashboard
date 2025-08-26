<template>
  <Navbar />

  <section class="about-section">
    <!-- Full-width background image -->
    <div class="about-bg">
      <img src="/img/bg/bcc4ca6dab222fba4ba42481e1239750.jpg" alt="About Us Main" class="main-img" />

      <!-- Overlapping smaller image -->
      <div class="overlay-img" :style="{ bottom: bottomOffset + 'px' }">
        <img src="/img/bg/pexels-pavel-danilyuk-8422248.jpg" alt="Overlay" class="small-img" />
      </div>
    </div>
  </section>
  <section class="about-section">
    <div class="text-wrapper">

      <h2 class="main-title push-text">About Our Kindergarten</h2>
      <div class="paragraphs">
        <p class="push-text">
          <b>Kindergarten Buddy</b> was founded in 2010 by a group of passionate educators and parents who believed
          that early
          childhood education should be filled with joy, creativity, and care. What started as a small classroom with
          just 12 children has grown into a thriving community where over 100 little learners come every day to
          explore,
          play, and discover.
        </p>
        <p class="push-text">
          From the very beginning, our mission has been to create a nurturing environment where every child feels
          valued
          and inspired to learn. Over the years, we have expanded our facilities to include bright classrooms, a safe
          outdoor play area, and specialized activity zones for arts, music, and science.
        </p>
        <p class="push-text">Throughout our journey, we have stayed true to our core values of kindness, curiosity, and
          respect. We
          continue to evolve our curriculum and teaching methods to meet the needs of modern families, while keeping
          the
          warmth and personal touch that make us feel like a family.</p>
        <p class="push-text">We are proud of the countless friendships, smiles, and milestones that have been part of
          our story—and we
          look forward to many more years of growing together with our wonderful children and families.
        </p>
      </div>
    </div>

  </section>
  <section class="cer-section">
    <div class="cer-text">
      <div class="cer-image">
        <img src="/img/bg/7b5edf8994968b711e2b554c4c694b39.jpg" alt="Certificate" />
      </div>
      <div class="cer-info">
        <h1 class="main-title-cer push-text">Our Accreditations & Recognition</h1>
        <div class="paragraphs-cer">
          <p class="push-text">
            At <b>kindergarten Buddy</b>, we are committed to providing the highest standard of care and early
            education. Our center is fully licensed and recognized by the <b>National Early Learning Council (NELC)</b>
            and operates in accordance with the <b>Early Childhood Education Standards of Excellence (ECES)</b>.
            <br>We are proud to hold the following certifiications and recoginitions:
            <br><i class="pi pi-check"></i> <b>Certified Early Childhood Learning Center</b> by the <I>Ministry of
              Chold Development</I>
            <br><i class="pi pi-check"></i> Fully licensed under the <I>Safe Start School Readiness Program
              (SSRSP)</I>
            <br><i class="pi pi-check"></i> All staff certified in <I>Pediatric First Aid & Child Safety
              Training</I>
            <br><i class="pi pi-check"></i> Recipent of the <I>Golden Apple Award for Excellence in Preschool
              Education (2023)</I>
            <br><i class="pi pi-check"></i> Recognized for <I>Outstanding Parent and Community Engagement by the
              Early Years Education Forum</I>
            <br>These accreditations reflect our commitment to quality, safety, and the emotional and intellectual
            growth of every child we serve. We continuously work to exceed expectations and create a joyful, trusted
            space where children thrive.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class>
     <h2 class="main-conn-title push-text">Our Education System</h2>
    <div class="conn">
      <div class="child-image">
        <img src="/img/bg/c50ec9dfe31e33698d21edfe8c00a7f3-removebg-preview.png" alt="Child" />
      </div>
      <div class="cer-info push-text">
          <div class="con flex justify-between p-10 w-full ">
            <div>
              <div class="class-sub flex gap-5 items-center ">
                <i class="icon fa-solid fa-volleyball-ball"></i>
                <span class="label">Sport Lessons</span>
              </div><br>
              <div class="class-sub flex gap-5 items-center">
                <i class="icon fa-solid fa-drum"></i>
                <span class="label">Music Lessons</span>
              </div><br>
              <div class="class-sub flex gap-5 items-center">
                <i class="icon fas fa-solid fa-leaf"></i>
                <span class="label">Nature Lessons</span>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="class-sub flex gap-5 items-center ">
                <i class=" icon fa-solid fa-palette"></i>
                <span class="label">Drawing Lessons</span>
              </div><br>
              <div class="class-sub flex gap-5 items-center">
                <i class="icon fa-solid fa-landmark-dome"></i>
                <span class="label">History Lessons</span>
              </div><br>
              <div class="class-sub flex gap-5 items-center">
                <i class="icon fas fa-calculator"></i>
                <span class="label">Math Lessons</span>
              </div><br>
            </div>
          </div>
        </div>
      </div>
  </section>
  <section class="class-wrapper w-full bg-blue-700">

    <div class="grid grid-cols-2 ">
      <div>

      </div>

    </div>


  </section>
         ,
  <EnrollFooter/>
  <Footer />

</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../FrontPage/Navbar.vue'
import EnrollFooter from './EnrollFooter.vue'
import Footer from './Footer.vue'


import 'primeicons/primeicons.css'


export default {
  components: {
    Navbar,
    EnrollFooter,
    Footer,
  },
  setup() {
    const bottomOffset = ref(-100)

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
        el.dataset.index = i // Add index for delay
        observer.observe(el)
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      observePushText()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      bottomOffset,
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
  /* adjusted main img height */
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
  /* smaller than main image */
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

/* Text Content */
.text-wrapper {
  font-family: 'Poppins', sans-serif;
  max-width: 1300px;
  margin: 20rem auto 2rem;
  padding: 0 1rem;
  text-align: center;
  position: relative;
  /* Required for z-index to work */
  z-index: 10;

}

.main-title {
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color:black;
}

.paragraphs {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  text-align: left;
  justify-content: center;
  flex-wrap: wrap;
}

.paragraphs p {
  flex: 1 1 45%;
  font-size: 1.125rem;
  line-height: 1.8;
}

.cer-section {
  background-color: #720e09;
  padding: 4rem 2rem;
  max-height: 650px;
}

.child-section {
  background-color: #720e09;
  padding: 4rem 2rem;
  max-height: 650px;
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
  /* wrap for responsiveness */

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

  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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

/* subjects */
/* .class-wrapper {
  display: flex;
  max-width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  font-family: poppins, sans-serif;
  flex-wrap: nowrap;

  margin-top: 2rem;
} */

/* .child-image {
  position: absolute;
  margin-left: 100px;
  width: 300px;
  height: 400px;
  object-fit: cover;
  margin-top: 70px;
} */


/* .child-subs {

  flex: 0 0 calc(50% - 0.75rem);  
  width: 150px;            
  display: flex;
  align-items: center;
  gap: 20px;
  color: #720e09;
  font-family: 'Poppins', sans-serif;
} */


.class-sub .icon {
  color: #720e09;
  font-size: 3rem;
}

.class-sub .label {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
}
.conn {
  display: flex;
  align-items: left;
  /* justify-content: flex-start; */
  justify-content: between;
  padding: 10px;
  gap: 5rem;
  /* max-width: 1300px; */
  /* margin: 0 auto; */
  color: white;
  flex-wrap: wrap;


}
.paragraphs-connn {
  display: flex;
  font-size: 1.125rem;
  flex-direction: column;
  gap: 0.5rem;
  text-align: justify;
  background-color: brown;
}
.main-conn-title {
  font-family: poppins, sans-serif;
  text-align: left;
  margin-top: 50px;
  margin-left: 150px;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 50px;
  color:#000000;
}
</style>

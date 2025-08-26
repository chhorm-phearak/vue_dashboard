<template>
    <Navbar />

    <section class="about-section">
        <!-- Full-width background image -->
        <div class="about-bg">
            <img src="/img/bg/bcc4ca6dab222fba4ba42481e1239750.jpg" alt="About Us Main" class="main-img" />

            <!-- Overlapping smaller image -->
            <div class="overlay-img" :style="{ bottom: bottomOffset + 'px' }">
                <img src="/img/bg/47a621c2d34d49989bd8b3686b705a5c.jpg" alt="Overlay" class="small-img" />
            </div>
        </div>
    </section>
    <div class="text-wrapper">

        <h2 class="main-title push-text">Contact Us</h2>
    </div>
    <section class="cer-section">
        <div class="cer-text">
            <div class="cer-image">
                <img src="/img/bg/eca5bdf288baf3d4645f8a2f40a64ed0-removebg-preview.png" alt="Certificate" />
            </div>
            <div class="cer-info">
                <h1 class="main-title-cer">We'd love to hear from you!</h1>
                <div class="cer-info push-text">
                    <div class="con flex justify-between p-10 w-full ">
                        <div>
                            <div class="class-sub flex gap-5 items-center ">
                                <i class="icon fa-solid fa-phone"></i>
                                <span class="label">(+855) 12 864 943
                                    <br />(+855) 10 439 438
                                </span>
                            </div><br />
                            <div class="class-sub flex gap-5 items-center ">
                                <i class="icon fa-solid fa-envelope"></i>
                                <span class="label">kindergartenbuddy@gmail.com</span>
                            </div><br />
                            <div class="class-sub flex gap-5 items-center ">
                              <i class="icon fa-solid fa-location-dot"></i>
                                <span class="label">123 Rainbow Rd, Playtown</span>
                            </div><br />
                             <div class="class-sub flex gap-5 items-center ">
                              <i class="icon fa-brands fa-facebook"></i>
                                <i class="icon fa-brands fa-x-twitter"></i>
                                <i class="icon fa-brands fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


<div class="w-full flex justify-center map-location">
  <div class="w-full md:w-[10000px] h-[300px] rounded-lg overflow-hidden shadow-lg">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.768536219511!2d104.87052240000001!3d11.568443999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951a7262868f1%3A0xb49d99e613207b4!2sLSi%20Business%20School!5e0!3m2!1sen!2skh!4v1754279053122!5m2!1sen!2skh"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</div>


    <EnrollFooter />
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
    height: 200px;
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

.main-title {
    text-align: left;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: black;
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

.cer-section {
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
    color: rgb(255, 255, 255);
    flex-wrap: wrap;
    /* wrap for responsiveness */

}

.cer-image {
    flex: 0 0 auto;
    margin: -30px, 5px, 6px, 8px;
    padding: 25px;

}

.cer-image img {
    width: 550px;
    height: 400px;
    border-radius: 1rem;
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
    font-size: 2.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.class-sub .icon {
    color: #ffffff;
    font-size: 2rem;
}

.class-sub .label {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
}
.map-location{
    margin: 50px 0px 50px 0px;
}


</style>

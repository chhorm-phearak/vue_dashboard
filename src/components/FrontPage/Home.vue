<template>
    <div>
<Navbar />
<SlideShow />
<Hero />
<EnrollFooter />
<Footer />
   </div>
</template>
<script>
import Navbar from '../FrontPage/Navbar.vue';
import Hero from '../FrontPage/HomeCom/Hero.vue';
import SlideShow from '../FrontPage/HomeCom/SlideShow.vue';
import EnrollFooter from './EnrollFooter.vue';
import Footer from './Footer.vue';




export default{
    components:{
        Navbar,
        SlideShow,
        Hero,
        EnrollFooter,
        Footer,
        
    }
}
</script>
<style scoped>
    
</style>
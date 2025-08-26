<template>
  <nav class="Navbar">
    <div class="container">
      <div class="flex clickable" @click="goHome">
        <img src="/img/bg/Adobe Express - file.png" alt="Logo" class="logo"  />
        <span>Kindergarten Buddy</span>
      </div>
      <div>
        <ul class="flex space-x-4">
          <li>
            <b>
              <router-link to="/home" class="hover:text-blue-300" exact-active-class="active">
                Home
              </router-link>
            </b>
          </li>
          <li>
            <b>
              <router-link to="/aboutus" class="hover:text-blue-300" exact-active-class="active">
                About Us
              </router-link>
            </b>
          </li>
          <li>
            <b>
              <router-link to="/teachers" class="hover:text-blue-300" exact-active-class="active">
                Teachers
              </router-link>
            </b>
          </li>
          <li>
            <b>
              <router-link to="/contactus" class="hover:text-blue-300" exact-active-class="active">
                Contact Us
              </router-link>
            </b>
          </li>
          <li>
            <b>
          <!-- <li>
            <b><a href="#" class="hover:text-blue-300">Teachers</a></b>
          </li>
          <li>
            <b><a href="#" class="hover:text-blue-300">Classes</a></b>
          </li>
          <li>
            <b><a href="#" class="hover:text-blue-300">Contact Us</a></b>
          </li>
          <li>
            <b> -->
              <a href="#" class="hover:text-blue-300" @click.prevent="showModal = true">
                Login
              </a>
            </b>
          </li>
        </ul>
      </div>
    </div>
      <ModalLogin v-model:modelValue="showModal" @close="handleClose" />
    </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalLogin from '../modals/modalLogin.vue'

export default {
  components: {
    ModalLogin
  },
  setup() {
    const router = useRouter()
    const showModal = ref(false)
    const goHome = () => {
      router.push('/frontpage/home')
    }
    function handleClose() {
      showModal.value = false
    }
    return { goHome, showModal, handleClose }
  }
}
</script>

<style scoped>
.Navbar {
  font-family: 'Poppins', sans-serif;
  position: fixed;
  /* Stick to top */
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  color: rgb(0, 0, 0);
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  /* shadow under navbar */
  z-index: 1000;
}

/* If needed: add margin-top: 60px to your <main> or top content container */

.Navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.Navbar .container .flex {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.Navbar .container .flex img.logo {
  height: 110px;
  width: auto;
  margin-left: 10px;
}

.clickable {
  cursor: pointer;
}

.Navbar .container .flex span {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 20px;
  line-height: 1;
}

.Navbar .container ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.Navbar .container ul li a {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  transition:
    box-shadow 0.3s ease,
    color 0.3s ease;
}

.Navbar .container ul li a:hover {
  color: #890505;
}

.Navbar .container ul li a:active {
  color: #890505;
}

.Navbar .container ul li a:focus,
.Navbar .container ul li a:focus-visible,
.Navbar .container ul li a:focus-within {
  outline: none;
  box-shadow: 0 5px 10px #890505;
  border-radius: 4px;
}

/* Active link styling */
.active {
  box-shadow: 0 5px 10px #890505;
  color: #890505;
  font-weight: bold;
  border-radius: 4px;
}
</style>

 <template>
 <footer class="enroll-footer">
    <div class="overlay">
      <div class="content">
        <h2 class="heading">Join Our Kindergarten Today!</h2>
        <p class="paragraph">
          Give your child a bright start. Enroll now and be part of our nurturing community.
        </p>
  <button class="enroll-btn" @click="showModal = true">Enroll Now</button>

      </div>
    </div>
  </footer>
  <ModalApplication v-model:modelValue="showModal" @close="showModal = false" />
</template>

<script setup>
import { ref } from 'vue'
import ModalApplication from '../modals/modalApplication.vue'
const showModal = ref(false)
</script>
<style scoped>

.enroll-footer {
  background-image: url('/img/bg/bcc4ca6dab222fba4ba42481e1239750.jpg'); /* ✅ Replace with your actual image path */
  background-size: cover;
  background-position: center;
  height: 450px;
  position: relative;
  color: white;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(11, 22, 34, 0.75); /* dark overlay for readability */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.content {
  max-width: 700px;
  padding: 1rem;
}

/* Headline Style */
.heading {
  font-size: 3rem;        /* Larger than text-4xl */
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}

/* Paragraph Style */
.paragraph {
  font-size: 1.25rem;
  line-height: 1.75;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

/* Button Style */
.enroll-btn {
  background-color: #de0c10; /* Tailwind orange-400 */
  color: white;
  padding: 0.75rem 2rem;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.enroll-btn:hover {
  background-color: #890505; /* Tailwind orange-500 */
}
</style>

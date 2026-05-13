<template>
  <main class="auth-page">
    <section class="header">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <h1>ClubsAtlas</h1>
    </section>
    <div class="hero">
      <div class="formTitle">
        <h2>Welcome Back</h2>
        <p>Log in to see your clubs and upcoming events</p>
      </div>

      <div class="field">
        <v-icon name="PrLock" />
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Email Address" />
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Password" />
      </div>

      <BaseButton @click="handleLogin">Log In</BaseButton>

      <div class="formTitle">
        <p>
          Don't have an account?
          <RouterLink class="textLink" to="/signup">Sign up here!</RouterLink>
        </p>
      </div>
    </div>
    <section class="footer">
      <p>Terms - Privacy - Contact</p>
      <!-- <RouterLink to="/login">Terms</RouterLink>
      <p>-</p>
      <RouterLink to="/login">Privacy</RouterLink>
      <p>-</p>
      <RouterLink to="/login">Contact</RouterLink> -->
    </section>
  </main>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('') // ref() makes a value reactive
const password = ref('')
const router = useRouter()

function handleLogin() {
  // Replace with real auth logic (API call, etc.)
  console.log('Logging in:', email.value, password.value)
  router.push('/') // Programmatic navigation after login
}
</script>

<style scoped>
.hero {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex: 1;
}

.formTitle {
  text-align: left;
  color: var(--color-text);
}

.textLink {
  color: var(--color-brandText);
}
</style>

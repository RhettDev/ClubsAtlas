<template>
  <main class="auth-page">
    <section class="header">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <h1>ClubsAtlas</h1>
    </section>
    <div class="hero">
      <div class="form">
        <div class="formTitle">
          <h2>Welcome <span class="brandText">Back</span></h2>
          <p>Log in to see your clubs and upcoming events</p>
        </div>
        <hr>

        <div class="fieldContainer">
          <v-icon class="icon" name="PrLock" />
          <input v-model="email" type="email" class="formField" placeholder="Email Address" />
        </div>

        <div class="fieldContainer">
          <v-icon class="icon" name="PrLock" />
          <input v-model="password" type="password" class="formField" placeholder="Password" />
        </div>

        <div class="fieldContainer">
          <!-- <ToggleButton variant="primary" @click="onClick()"></ToggleButton> -->
          <p>Remember Me <a class="brandText">Forgot Password?</a></p>
        </div>

        <BaseButton @click="handleLogin">Log In</BaseButton>

        <hr>

        <div class="formTitle">
          <p>
            Don't have an account?
            <RouterLink variant="primary" class="brandText" to="/signup">Sign up here!</RouterLink>
          </p>
        </div>
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
// import ToggleButton from '@/components/ToggleButton.vue'
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

.form {
  display: inline-flex;
  flex-direction: column;
  width: max-content;
  height: auto;
  gap: 16px;
}

.formTitle {
  text-align: left;
  color: var(--color-text);
}

.brandText{
  color: var(--color-brandText);
}

.fieldContainer{
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>

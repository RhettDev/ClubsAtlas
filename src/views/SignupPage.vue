<template>
  <main class="auth-page">
    <section class="header">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <h1>ClubsAtlas</h1>
    </section>
    <div class="hero">
      <div class="formTitle">
        <h2>Welcome to ClubsAtlas</h2>
        <p>Create your account and discover the world of University clubs and events!</p>
      </div>

      <div class="field">
        <label>Name</label>
        <input v-model="name" type="text" placeholder="Full Name" />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Email Address" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Password" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Confirm Password" />
      </div>

      <BaseButton @click="handleSignup">Sign Up!</BaseButton>

      <div class="formTitle">
        <p>
          Already have an account?
          <RouterLink class="textLink" to="/signup">Log in here!</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

function handleSignup() {
  console.log('Signing up:', name.value, email.value)
  router.push('/')
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

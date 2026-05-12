<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Welcome Back</h2>

      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>

      <button @click="handleLogin" class="btn btn-primary">Log In</button>

      <p>
        Don't have an account?
        <RouterLink to="/signup">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
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

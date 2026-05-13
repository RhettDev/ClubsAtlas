<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Create an Account</h2>

      <div class="field">
        <label>Name</label>
        <input v-model="name" type="text" placeholder="Jane Doe" />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>

      <button @click="handleSignup" class="btn btn-primary">Sign Up</button>

      <p>Already have an account?
        <RouterLink to="/login">Log in</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name     = ref('')
const email    = ref('')
const password = ref('')
const router   = useRouter()

function handleSignup() {
  console.log('Signing up:', name.value, email.value)
  router.push('/')
}
</script>
<template>
  <main class="auth-page">
    <section class="header">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <h1>ClubsAtlas</h1>
    </section>
    <div class="hero">
      <div class="form">
        <div class="formTitle">
          <h2>Welcome to <span class="brandText">ClubsAtlas</span></h2>
          <p>Create your account and discover the world of University<br />clubs and events!</p>
        </div>

        <hr />

        <div class="fieldContainer">
          <v-icon name="pr-user" inverse scale="1.5"/>
          <input v-model="name" type="text" class="formField" placeholder="Full Name" />
        </div>
        <div class="fieldContainer">
          <v-icon name="pr-envelope" inverse scale="1.5"/>
          <input v-model="email" type="email" class="formField" placeholder="Email Address" />
        </div>
        <div class="fieldContainer">
          <v-icon name="pr-lock" inverse scale="1.5"/>
          <input v-model="password" type="password" class="formField" placeholder="Password" />
        </div>
        <div class="fieldContainer">
          <v-icon name="pr-lock" inverse scale="1.5"/>
          <input v-model="passwordConfirm" type="password" class="formField" placeholder="Confirm Password" />
        </div>
        <div class="fieldContainer">
          <v-icon name="pr-briefcase" inverse scale="1.5"/>
          <input v-model="degree" type="degree" class="formField" placeholder="Enter Degree" />
        </div>

        <div class="checkText">
          <ToggleButton></ToggleButton>
          <input type="checkbox" id="checkbox" v-model="checked" class="checkboxCustom" />
          <p>I agree to the <a class="brandText">Terms and Conditions</a></p>
        </div>

        <BaseButton @click="handleSignup">Sign Up!</BaseButton>

        <hr />

        <div class="formTitle formSubtitle">
          <p>Already have an account?</p>
          <RouterLink class="brandText" to="/signup">Log in here!</RouterLink>
        </div>
      </div>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const degree = ref('')
const router = useRouter()

function handleSignup() {
  console.log('Signing up:', name.value, email.value, degree.value)
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

.form {
  display: inline-flex;
  flex-direction: column;
  width: max-content;
  height: auto;
  gap: 16px;
}

.formTitle {
  text-align: left;
  color: var(--color-text-1);
}

.formSubtitle{
  display: flex;
  justify-content: space-between;
}

.brandText {
  color: var(--color-brandText);
}


.fieldContainer {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
}

.checkText {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>

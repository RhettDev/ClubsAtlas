<!-- HTML Structure -->
<template>
  <main class="auth-page">
    <HeaderBar></HeaderBar>
    <div class="hero">
      <!-- Step 1 holds email and password input fields -->
      <div v-if="currentStep === 1" key="login" class="form"> 
        <div class="formTitle">
          <h2>Welcome <span class="brandText">Back</span></h2>
          <p>Log in to see your clubs and upcoming events</p>
        </div>
        <hr class="fgHR" />

        <!-- Email Input -->
        <div class="fieldContainer">
          <v-icon name="pr-envelope" fill="var(--color-text-1)" scale="1.5" /> 
          <input
            v-model="email"
            type="email"
            class="formField"
            placeholder="Email Address"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="fieldContainer">
          <v-icon name="pr-lock" fill="var(--color-text-1)" scale="1.5" />
          <input
            v-model="password"
            type="password"
            class="formField"
            placeholder="Password"
            required
          />
        </div>

        <div class="formSubtitle">
          <div class="checkText">
            <!-- <ToggleButton variant="primary" @click="onClick()"></ToggleButton> -->
            <input type="checkbox" id="checkbox" v-model="checked" class="checkboxCustom" />
            <p>Remember Me</p>
          </div>
          <a class="brandText linkText" @click="panelSwap">Forgot Password?</a>
        </div>

        <BaseButton @click="handleLogin">Log In</BaseButton>

        <!-- If user account is not present or credentials are not valid, provide error -->
        <p v-if="errorMsg">{{ errorMsg }}</p>

        <hr class="fgHR" />

        <div class="formTitle formSubtitle">
          <p>Don't have an account?</p>
          <RouterLink class="brandText linkText" to="/signup">Sign up here!</RouterLink>
        </div>
      </div>

      <!-- Step 2 holds email input for Password Forget Process. Actual process not implemented just field -->
      <div v-else-if="currentStep === 2" key="forgot" class="form">
        <div class="formTitle">
          <h2><span class="brandText">Forgot</span> your password</h2>
          <p>Enter the email address your account is tied to for a password reset link</p>
        </div>
        <hr class="fgHR" />

        <div class="fieldContainer">
          <v-icon name="pr-envelope" fill="var(--color-text-1)" scale="1.5" />
          <input v-model="email" type="email" class="formField" placeholder="Email Address" />
        </div>
        <BaseButton @click="panelSwap">Reset Password</BaseButton>

        <hr class="fgHR" />
      </div>

      <!-- Step 3 Holds Password rest fields for forgotton password demo  -->
      <div v-else-if="currentStep === 3" key="reset" class="form">
        <div class="formTitle">
          <h2>Enter your new <span class="brandText">password</span></h2>
          <p>Enter account email to send reset password link</p>
        </div>
        <hr class="fgHR" />

        <div class="fieldContainer">
          <v-icon name="pr-lock" fill="var(--color-text-1)" scale="1.5" />
          <input v-model="password" type="password" class="formField" placeholder="Password" />
        </div>

        <div class="fieldContainer">
          <v-icon name="pr-lock" fill="var(--color-text-1)" scale="1.5" />
          <input
            v-model="password"
            type="passwordConfrim"
            class="formField"
            placeholder="Confirm Password"
          />
        </div>

        <BaseButton @click="panelSwap">Confirm Password Reset</BaseButton>

        <hr class="fgHR" />
      </div>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<script setup>
// Imports
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderBar from '@/components/HeaderGeneric.vue'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { demoSessionData } from '@/composables/sessionStore'

// Variables
const email = ref('') // ref() makes a value reactive
const password = ref('')
const router = useRouter()
const currentStep = ref(1)
const checked = ref(false)

const errorMsg = ref('')
const submitting = ref(false)
const { login, userType } = useAuth()
const { clearDemoSession } = demoSessionData()

// Functions

// Take user input for login and determine if it is a student user or clubs user
async function handleLogin() {
  errorMsg.value = ''
  submitting.value = true
  try {
    await login(email.value, password.value)
    if (userType.value === 'student') {
      clearDemoSession()
      router.push('/calendar')
    } else if (userType.value === 'club') {
      clearDemoSession()
      router.push('/admin')
    } else {
      console.error('Error fetching userType')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    submitting.value = false
  }
}

// Swap between steps
function panelSwap() {
  let newValue
  if (currentStep.value == 1) {
    newValue = 2
  } else if (currentStep.value == 2) {
    newValue = 3
  } else if (currentStep.value == 3) {
    newValue = 1
  }
  currentStep.value = newValue
}
</script>

<!-- CSS Classes -->
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
  max-width: 100%;
  height: auto;
  gap: 16px;
  padding: 0 32px;
  max-width: 400px;
}

.formTitle {
  text-align: left;
  color: var(--color-text-1);
}

.formSubtitle {
  display: flex;
  justify-content: space-between;
}

.brandText {
  color: var(--color-brandText);
}
.linkText {
  cursor: pointer;
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

<template>
  <main class="auth-page">
    <HeaderBar></HeaderBar>

    <div class="hero">
      <!-- Step Tracker -->
      <div class="stepTracker">
        <div
          v-for="n in totalSteps"
          :key="n"
          class="stepPip"
          :class="{
            'is-done': n < currentStep,
            'is-active': n === currentStep,
          }"
          @click="n < currentStep && goTo(n)"
        ></div>
      </div>

      <!-- Step Panels -->
      <div class="stepView">
        <Transition :name="transitionName" mode="out-in">
          <!-- Step One: Account Details -->
          <div v-if="currentStep === 1" key="step1" class="form">
            <div class="formTitle">
              <h2>Welcome to <span class="brandText">ClubsAtlas</span></h2>
              <p>Create your account and discover the world of University clubs and events!</p>
            </div>
            <hr class="fgHR" />
            <div class="fieldContainer">
              <v-icon name="pr-user" fill="var(--color-text-1)" scale="1.5" />
              <input v-model="name" type="text" class="formField" placeholder="Full Name" />
            </div>
            <div class="fieldContainer">
              <v-icon name="pr-envelope" fill="var(--color-text-1)" scale="1.5" />
              <input v-model="email" type="email" class="formField" placeholder="Email Address" />
            </div>
            <div class="fieldContainer">
              <v-icon name="pr-lock" fill="var(--color-text-1)" scale="1.5" />
              <input v-model="password" type="password" class="formField" placeholder="Password" />
            </div>
            <div class="fieldContainer">
              <v-icon name="pr-lock" fill="var(--color-text-1)" scale="1.5" />
              <input
                v-model="passwordConfirm"
                type="password"
                class="formField"
                placeholder="Confirm Password"
              />
            </div>
            <div class="fieldContainer">
              <v-icon name="pr-briefcase" fill="var(--color-text-1)" scale="1.5" />
              <input v-model="degree" type="degree" class="formField" placeholder="Enter Degree" />
            </div>
            <div class="checkText">
              <ToggleButton></ToggleButton>
              <input type="checkbox" id="checkbox" v-model="checked" class="checkboxCustom" />
              <p>I agree to the <a class="brandText">Terms and Conditions</a></p>
            </div>
            <div class="formTitle formSubtitle">
              <p>Already have an account?</p>
              <RouterLink class="brandText" to="/login"> Log in here!</RouterLink>
            </div>
            <hr class="fgHR" />
          </div>

          <!-- Step Two: Personal Interests -->
          <div v-else-if="currentStep === 2" key="step2" class="form">
            <div class="formTitle">
              <h2>Who are <span class="brandText">you?</span></h2>
              <p>Tell us some of your interests and hobbies</p>
            </div>
            <hr class="fgHR" />
            <div class="interestList">
              <button
                v-for="item in interests"
                :key="item.id"
                class="interestTag"
                :class="{ selected: form.interests.includes(item.id) }"
                @click="toggleInterest(item.id)"
              >
                <span class="tagIcon">{{ item.icon }}</span>
                <span class="tagLabel">{{ item.label }}</span>
              </button>
            </div>
            <hr class="fgHR" />
            <div class="formTitleWide">
              <h2>Apart of <span class="brandText">specific</span> a faith or nationality?</h2>
            </div>
            <div class="dropDownContainer">
              <DropDown :options="optionsFaith" :v-model="selectedFaith"> </DropDown>
              <DropDown :options="optionsNation" :v-model="selectedNation"> </DropDown>
            </div>
            <hr class="fgHR" />
          </div>

          <!-- Step Three: Club Style Choice -->
          <div v-else-if="currentStep === 3" key="step3" class="form">
            <div class="formTitle">
              <h2>
                What are <span class="brandText">you</span> looking for in a
                <span class="brandText">club?</span>
              </h2>
              <p>Create your account and discover the world of University clubs and events!</p>
            </div>
            <hr class="fgHR" />
            <div class="clubTypeList">
              <button
                v-for="item in clubType"
                :key="item.id"
                class="interestTag"
                :class="{ selected: form.clubType.includes(item.id) }"
                @click="toggleClubType(item.id)"
              >
                <span class="tagIcon">{{ item.icon }}</span>
                <span class="tagLabel">{{ item.label }}</span>
              </button>
            </div>
            <hr class="fgHR" />
          </div>

          <!-- Step Four: Club Selection -->
          <div v-else-if="currentStep === 4" key="step4" class="form">
            <div class="formTitle">
              <h2>
                These clubs are <span class="brandText">waiting for you</span>, take the change now!
              </h2>
              <p>Based on your answers these are suggested clubs for you!</p>
            </div>
            <hr class="fgHR" />
            <div class="clubTypeList">
              <button
                v-for="item in clubExamples"
                :key="item.id"
                class="clubTag"
                :class="{ selected: form.clubExamples.includes(item.id) }"
                @click="toggleClubType(item.id)"
              >
                <div class="clubName">
                  <span class="tagIcon">{{ item.icon }}</span>
                  <span class="tagLabel">{{ item.label }}</span>
                </div>
                <span>
                  <ToggleButton></ToggleButton>
                  <input type="checkbox" id="checkbox" v-model="checked" class="checkboxCustom" />
                </span>
              </button>
            </div>
            <hr class="fgHR" />
          </div>
        </Transition>
      </div>

      <!-- Footer nav -->
      <div class="stepNavBtns">
        <BaseButton variant="secondary" :disabled="currentStep === 1" @click="prev">
          Back
        </BaseButton>

        <BaseButton v-if="currentStep < totalSteps" variant="primary" @click="next">
          Continue
        </BaseButton>
        <RouterLink v-else to="/calendar">
          <BaseButton variant="primary" @click="handleSignup">Get Your Calendar!</BaseButton>
        </RouterLink>
      </div>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderBar from '@/components/HeaderGeneric.vue'
import DropDown from '@/components/InterestDropDown.vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const currentStep = ref(1)
const totalSteps = 4
// const transitionName = ref('slide-forward')
// const submitting = ref(false)
// const showPassword = ref(false)

const form = ref({
  interests: [],
  clubType: [],
  clubExamples: [],
  firstName: '',
  lastName: '',
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  degree: '',
})

// const errors = ref({})

// Data
const interests = [
  { id: 'music', icon: '⚙️', label: 'Music' },
  { id: 'games', icon: '📣', label: 'Games' },
  { id: 'activism', icon: '🧭', label: 'Activism' },
  { id: 'adventure', icon: '🧩', label: 'Adventure' },
  { id: 'sports', icon: '🧩', label: 'Sports' },
  { id: 'crafts', icon: '🎨', label: 'Crafts' },
  { id: 'digitalmedia', icon: '⚙️', label: 'Digital Media' }, // photography, movies,
  { id: 'popculture', icon: '💹', label: 'Pop Culture' },
  { id: 'fooddrink', icon: '💹', label: 'Food and Drink' },
  { id: 'robotics', icon: '💹', label: 'Robotics' },
]

const clubType = [
  { id: 'party', icon: '🎨', label: 'Party Vibes' },
  { id: 'chill', icon: '⚙️', label: 'Chill Socialising' },
  { id: 'project', icon: '📊', label: 'Project Work' },
  { id: 'study', icon: '📣', label: 'Social Study' },
]

const clubExamples = [
  { id: 'curtinEngineersClub', icon: '🎨', label: 'Curtin Engineers Club' },
  { id: 'curtinFreeFoodSociety', icon: '⚙️', label: 'Curtin Free Food Society' },
  { id: 'curtinEducationStudentsSociety', icon: '📊', label: 'Curtin Education Students Society' },
  {
    id: 'CurtinBusinessCommerceAssociation',
    icon: '📣',
    label: 'Curtin Business & Commerce Association',
  },
]

const selectedFaith = ref(null)
const selectedNation = ref(null)
const optionsFaith = ref(['Christianity', 'Muslim', 'Islam', 'Sikh', 'None'])
const optionsNation = ref([
  'African',
  'Chinese',
  'European',
  'Filipino',
  'First Nations',
  'Indonesian',
  'Japanese',
  'Malaysian',
  'Middle Eastern',
  'Singaporean',
  'South Asian',
  'Thai',
  'Vietnamese',
  'None',
])

function toggleInterest(id) {
  const idx = form.value.interests.indexOf(id)
  if (idx === -1) form.value.interests.push(id)
  else form.value.interests.splice(idx, 1)
}

function toggleClubType(id) {
  const idx = form.value.clubType.indexOf(id)
  if (idx === -1) form.value.clubType.push(id)
  else form.value.clubType.splice(idx, 1)
}

// function validate(step) {
//   const e = {}
//   if (step === 1) {
//     if (!form.value.name.trim()) e.name = 'Required.'
//     if (!form.value.email.includes('@')) e.email = 'Enter a valid email.'
//     if (form.value.password.length < 8) e.password = 'Password must be at least 8 characters.'
//     if (form.value.passwordConfirm != form.value.password) e.password = 'Passwords must match.'
//     if (!form.value.degree.trim()) e.degree = 'Required.'
//   }
//   if (step === 2) {
//     if (form.value.interests.length === 0)
//       e.interests = 'Please select at least one interest.'
//   }
//   if (step === 3) {
//     if (form.value.clubType.length === 0)
//       e.clubType = 'Please select at least one club type.'
//   }
//   errors.value = e
//   return Object.keys(e).length === 0
// }

function next() {
  console.log(currentStep.value)
  // if (!validate(currentStep.value)) return
  // transitionName.value = 'slide-forward'
  currentStep.value = currentStep.value + 1
  console.log('new' + currentStep.value)
}

function prev() {
  // transitionName.value = 'slide-back'
  currentStep.value--
}

function handleSignup() {
  console.log('Signing up:', form.value.name, form.value.email, form.value.degree)
  useRouter.push('/')
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
  max-width: 100%;
  height: auto;
  gap: 16px;
  padding: 0 32px;
}

.formTitle {
  max-width: 350px;
  text-align: left;
  color: var(--color-text-1);
}

.formTitleWide {
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

.routerText {
  color: var(--color-text-1);
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

.stepView {
  width: 100%;
  min-height: 300px;
  position: relative;
}

.stepPip {
  display: flex;
}

.stepNavBtns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
}

/* ── Interests grid ── */
.interestList {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  gap: 8px;
  justify-content: center;
}

.interestTag {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 16px;
  border: 2px solid var(--ca-brand-blue-1);
  background: var(--color-background-1);
  color: var(--color-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.interestTag:hover {
  border-color: var(--ca-brand-blue-2);
  background: var(--color-background-2);
}

.interestTag.selected {
  border-color: var(--ca-brand-blue-2);
  background: var(--color-background-2);
  color: var(--color-text-2);
}

.tagIcon {
  font-size: 1.4rem;
}
.tagLabel {
  font-size: 1rem;
  font-weight: 500;
}

.clubTypeList {
  display: flex;
  flex-direction: column;
  /* max-width: 500px; */
  gap: 8px;
  justify-content: center;
}

.clubTag {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 16px;
  border: 2px solid var(--ca-brand-blue-1);
  background: var(--color-background-1);
  color: var(--color-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clubName {
  display: flex;
  align-items: center;
}

/* ── Transitions ── */
/* .slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.38s;
  position: absolute;
  width: max-content;
}
.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-back-leave-to {
  opacity: 0;
  transform: translateX(50px);
} */

.dropDownContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  align-items: start;
}

.dropdown p {
  margin: 0;
}

@media screen and (max-width: 688px) {
  .dropDownContainer {
    flex-direction: column;
  }
}
</style>

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
        <Transition>
          <!-- Step One: Account Details -->
          <div v-if="currentStep === 1" key="step1" class="form">
            <div class="formTitle">
              <h2>Welcome to <span class="brandText">ClubsAtlas</span></h2>
              <p>Create your account and discover the world of University clubs and events!</p>
            </div>
            <hr class="fgHR" />
            <div class="fieldContainer">
              <v-icon name="pr-user" fill="var(--color-text-1)" scale="1.5" />
              <input v-model="fullName" type="text" class="formField" placeholder="Full Name" />
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
              <DropDown v-model="selectedDegree" :options="optionsDegree"> </DropDown>
            </div>
            <div class="checkText">
              <input type="checkbox" id="checkbox" v-model="termsChecked" class="checkboxCustom" />
              <p>I agree to the <a class="brandText">Terms and Conditions</a></p>
            </div>
            <div id="validateMessage" v-if="validiateErrors" class="validationError">
              <p>{{ validiateErrors.name }}</p>
              <p>{{ validiateErrors.email }}</p>
              <p>{{ validiateErrors.password }}</p>
              <p>{{ validiateErrors.passwordConfirm }}</p>
              <p>{{ validiateErrors.degree }}</p>
              <p>{{ validiateErrors.terms }}</p>
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
              <p>Select three of your interests and hobbies</p>
            </div>
            <hr class="fgHR" />
            <div class="interestList">
              <button
                v-for="item in interests"
                :key="item.id"
                class="interestTag"
                :disabled="
                  selectedInterests.length >= maxInterests && !selectedInterests.includes(item.id)
                "
                :class="{ selected: selectedInterests.includes(item.id) }"
                @click="toggleInterest(item.id)"
              >
                <v-icon :name="item.icon" fill="var(--color-text-1)" scale="1.5"></v-icon>
                <span class="tagLabel">{{ item.label }}</span>
              </button>
            </div>
            <div id="validateMessage" v-if="validiateErrors" class="validationError">
              {{ validiateErrors.interests }}
            </div>
            <hr class="fgHR" />
            <div class="formTitleWide">
              <h2>Apart of <span class="brandText">specific</span> a faith or nationality?</h2>
            </div>
            <div class="dropDownContainer">
              <DropDown v-model="selectedFaith" :options="optionsFaith"> </DropDown>
              <DropDown v-model="selectedNation" :options="optionsNation"> </DropDown>
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
                :class="{ selected: selectedClubType === item.id }"
                @click="toggleClubType(item.id)"
              >
                <v-icon :name="item.icon" fill="var(--color-text-1)" scale="1.5"></v-icon>
                <span class="tagLabel">{{ item.label }}</span>
              </button>
            <div id="validateMessage" v-if="validiateErrors" class="validationError">
              {{ validiateErrors.clubType }}
            </div>
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
                v-for="item in givenClubs"
                :key="item.id"
                class="clubTag"
                :disabled="loadingClubs"
                :class="{ selected: selectedClubs.includes(item.id) }"
                @click="toggleClubListing(item.id)"
              >
                <div class="clubName">
                  <div class="clubLogoName">
                    <img
                      class="clubLogo"
                      :src="item.logoURL"
                      :style="{ borderColor: item.hexCode }"
                    />
                    <span class="clubName">{{ item.name }}</span>
                  </div>
                </div>
              </button>
            </div>
            <p v-if="loadingClubs">Loading clubs...</p>
            <p v-else-if="givenClubs.length === 0">
              Error finding clubs for you, please try again.
            </p>
            <div id="validateMessage" v-if="validiateErrors" class="validationError">
              {{ validiateErrors.selectedClubs }}
            </div>
            <hr class="fgHR" />
          </div>
        </Transition>
      </div>

      <!-- Navigation -->
      <div class="buttonRow">
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
import DropDown from '@/components/DropDown.vue'
import { clubRecommendations } from '@/composables/clubRecommend.js'
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const currentStep = ref(1)
const totalSteps = 4
const maxInterests = 3
// const submitting = ref(false)
// const showPassword = ref(false)

const fullName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const selectedDegree = ref(null)
const selectedFaith = ref(null)
const selectedNation = ref(null)
const selectedClubType = ref(null)
const selectedInterests = ref([])
const selectedClubs = ref([])
const validiateErrors = ref(null)
const termsChecked = ref(false)

const userForm = {
  fullName: fullName,
  email: email,
  password: password,
  passwordConfirm: passwordConfirm,
}

const signupFilters = {
  degree: selectedDegree,
  faith: selectedFaith,
  nationality: selectedNation,
  type: selectedClubType,
  interests: selectedInterests,
}

const { finalClubs, loadingClubs, getClubsFilter, findClubs } = clubRecommendations(signupFilters)

const givenClubs = computed(() =>
  finalClubs.value.map((club) => ({
    id: club.id,
    logoURL: club.logoURL,
    name: club.name,
    hexCode: club.hexCode,
  })),
)

onMounted(async () => {
  await getClubsFilter()
})

// Data
const interests = [
  { id: 'Music', icon: 'ri-music-line', label: 'Music' },
  { id: 'Games', icon: 'ri-gamepad-line', label: 'Games' },
  { id: 'Activism', icon: 'ri-team-line', label: 'Activism' },
  { id: 'Adventure', icon: 'ri-globe-line', label: 'Adventure' },
  { id: 'Sport', icon: 'ri-basketball-line', label: 'Sports' },
  { id: 'Crafts', icon: 'ri-brush-line', label: 'Crafts' },
  { id: 'DigitalMedia', icon: 'ri-camera-line', label: 'Digital Media' }, // photography, movies,
  { id: 'PopCulture', icon: 'ri-game-line', label: 'Pop Culture' },
  { id: 'FoodDrink', icon: 'ri-cup-line', label: 'Food and Drink' },
  { id: 'Robotics', icon: 'ri-robot-line', label: 'Robotics' },
  { id: 'Workshops', icon: 'ri-account-pin-box-line', label: 'Workshops' },
]

const clubType = [
  { id: 'PartyVibes', icon: 'pr-sun', label: 'Party Vibes' },
  { id: 'ChillSocialising', icon: 'pr-palette', label: 'Chill Socialising' },
  { id: 'ProjectWork', icon: 'pr-qrcode', label: 'Project Work' },
  { id: 'SocialStudy', icon: 'pr-users', label: 'Social Study' },
]

const optionsDegree = ref([
  'Engineering',
  'Computing',
  'Health Medical Sciences',
  'Commerce and Law',
  'Management and Marketing',
  'Creative Arts',
  'Humanities',
  'Sciences',
  'Education',
  'Allied Health',
])
const optionsFaith = ref(['Not Interested', 'Christianity', 'Muslim', 'Hindu', 'Sikh'])
const optionsNation = ref([
  'Not Interested',
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
])

function toggleInterest(id) {
  const idx = selectedInterests.value.indexOf(id)
  if (idx === -1) {
    if (selectedInterests.value.length < maxInterests) selectedInterests.value.push(id)
  } else {
    selectedInterests.value.splice(idx, 1)
  }
}

function toggleClubType(id) {
  selectedClubType.value = id
}

function toggleClubListing(id) {
  const idx = selectedClubs.value.indexOf(id)
  if (idx === -1) selectedClubs.value.push(id)
  else selectedClubs.value.splice(idx, 1)
}

function validate(step) {
  const e = {}
  if (step === 1) {
    if (!userForm.fullName.value.trim()) e.name = 'Please enter your full name.'
    if (!userForm.email.value.includes('@')) e.email = 'Enter a valid email.'
    if (userForm.password.value.length < 8) e.password = 'Password must be at least 8 characters.'
    if (userForm.passwordConfirm.value != userForm.password.value) e.passwordConfirm = 'Passwords must match.'
    if (!signupFilters.degree.value) e.degree = 'Please select Degree from List'
    if (!termsChecked.value) e.terms = 'Please Read and Agree to Terms and Conditions'
  }
  if (step === 2) {
    if (signupFilters.interests.value.length != 3)
      e.interests = 'Please select 3 interests.'
  }
  if (step === 3) {
    if (!signupFilters.type.value)
      e.clubType = 'Please select 1 club type.'
  }
  if (step === 4) {
    if (selectedClubs.value.length === 0)
      e.selectedClubs = 'Please select at least one club.'
  }
  validiateErrors.value = e
  return Object.keys(e).length === 0
}

async function next() {
  if (currentStep.value === 2 && selectedInterests.value.length > maxInterests) return
  if (!validate(currentStep.value)) return
  if (currentStep.value === 3) await findClubs(signupFilters)
  currentStep.value = currentStep.value + 1
}

function prev() {
  currentStep.value--
}

function handleSignup() {
  console.log('Signing up:', fullName.value, email.value, selectedDegree.value)
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
  padding: 16px 32px;
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

.clubTag.selected {
  border-color: var(--ca-brand-blue-2);
  background: var(--color-background-2);
  color: var(--color-text-2);
}

.clubName {
  display: flex;
  align-items: center;
}

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

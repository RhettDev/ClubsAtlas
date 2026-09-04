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
              <p>Select up to four of your interests and hobbies</p>
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
                <span class="tagIcon">{{ item.icon }}</span>
                <span class="tagLabel">{{ item.label }}</span>
              </button>
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
                v-for="item in givenClubs"
                :key="item.id"
                class="clubTag"
                :disabled="loadingClubs"
                :class="{ selected: selectedClubs.includes(item.id) }"
                @click="toggleClubListing(item.id)"
              >
                <div class="clubName">
                  <span class="tagIcon">{{ item.icon }}</span>
                  <span class="tagLabel">{{ item.label }}</span>
                </div>
              </button>
            </div>
            <p v-if="loadingClubs">Loading clubs...</p>
            <p v-else-if="givenClubs.length === 0">
              Error finding clubs for you, please try again.
            </p>
            <hr class="fgHR" />
          </div>
        </Transition>
      </div>

      <!-- Navigation -->
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
import DropDown from '@/components/DropDown.vue'
import { clubRecommendations } from '@/composables/clubRecommend.js'
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const currentStep = ref(1)
const totalSteps = 4
const maxInterests = 4
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

const { filterClubs, finalClubs, getClubsFilter, loadingClubs } = clubRecommendations({
  degree: selectedDegree,
  faith: selectedFaith,
  nationality: selectedNation,
  type: selectedClubType,
  intA: computed(() => selectedInterests.value[0]),
  intB: computed(() => selectedInterests.value[1]),
  intC: computed(() => selectedInterests.value[2]),
  intD: computed(() => selectedInterests.value[3]),
})

const givenClubs = computed(() =>
  finalClubs.value.map((club) => ({
    id: club.clubID ?? club.clubid ?? club.id,
    logo: club.logoURL,
    label: club.name,
  })),
)

onMounted(async () => {
  await getClubsFilter()
})

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
  { id: 'workshops', icon: '💹', label: 'Workshops' },
]

const clubType = [
  { id: 'PartyVibes', icon: '🎨', label: 'Party Vibes' },
  { id: 'ChillSocialising', icon: '⚙️', label: 'Chill Socialising' },
  { id: 'ProjectWork', icon: '📊', label: 'Project Work' },
  { id: 'SocialStudy', icon: '📣', label: 'Social Study' },
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
const optionsFaith = ref(['Christianity', 'Muslim', 'Hindu', 'Islam', 'Sikh', 'None'])
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

async function next() {
  if (currentStep.value === 2 && selectedInterests.value.length > maxInterests) return
  // if (!validate(currentStep.value)) return
  if (currentStep.value === 3) await filterClubs()
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

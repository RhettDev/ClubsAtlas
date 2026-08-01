<template>
  <main id="adminMain">
    <HeaderStudent @click="onHeaderMenuClick"></HeaderStudent>
    <!-- Mobiel Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <h3 class="menuEntry">Today</h3>
      <h3 class="menuEntry active">Month View</h3>
      <h3 class="menuEntry">Week View</h3>
      <hr class="fgHR" />
      <h3>Clubs List</h3>
      <hr class="fgHR" />
      <RouterLink variant="primary" class="menuEntry active" to="/admin" @click="onHeaderMenuClick">
        Your Clubs
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
        Suggested Clubs
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-home">
        Weekly Showcase
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm"> Settings </RouterLink>
    </div>

    <!-- Desktop Navigation -->
    <div class="hero desktopView">
      <!-- Desktop View -->
      <section id="calendarBody" class="bCenter">
        <!-- <div v-if="loadingEvents" class="backendLoadingMsg">Loading Calendar...</div>
        <div v-else-if="errorMessage" class="backendLoadingMsg">
          Failed to load: {{ errorMessage }}
        </div>
        <div v-else>
          <div v-for="event in events" :key="event.id">
            {{ event.id }}
            {{ event.eventTitle }}
          </div>
        </div> -->
        <div class="dayGrid">
          <div v-for="day in dayAcronymsMS" :key="day" class="dayLabels">
            {{ day }}
          </div>
        </div>
        <div class="calendarGrid">
          <!-- Get left over days -->
          <div
            v-for="day in firstDayOffset"
            :key="day"
            class="calendarDay altMonthDay"
            :class="{
              isToday: isToday(day),
            }"
          >
            {{ day }}
          </div>
          <!-- Get days for Current Month -->
          <div
            v-for="day in daysInMonth"
            :key="day"
            class="calendarDay"
            :class="{
              isToday: isToday(day),
            }"
          >
            {{ day }}
          </div>
          <!-- Get Extra Days for the Next Month -->
          <div
            v-for="day in extraDays"
            :key="day"
            class="calendarDay altMonthDay"
            :class="{
              isToday: isToday(day),
            }"
          >
            {{ day }}
          </div>
        </div>
      </section>

      <section id="clubsSideBar" class="bRight">
        <div id="yourClubs">
          <h3 class="pageSubHeader">Your Clubs</h3>
          <hr class="bgHR" />
          <div>
            <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
            <div v-else-if="errorMessage" class="backendLoadingMsg">
              Failed to load: {{ errorMessage }}
            </div>
            <ul v-else>
              <li v-for="club in clubs" :key="club.id">
                {{ club.clubName }}
              </li>
            </ul>
          </div>
        </div>
        <div id="calendarMenu">
          <div class="menuEntry active">Your Clubs</div>
          <div class="menuEntry">Suggested Clubs</div>
          <div class="menuEntry">Club Search</div>
          <RouterLink class="menuEntry" to="calendar/showcase"> Weekly Showcase </RouterLink>
        </div>
      </section>
    </div>

    <!-- Mobile View -->
    <div class="hero mobileView">
      <section id="calendarContainer" class="bCenter">
        <div class="dayGrid">
          <div v-for="day in dayLetterMS" :key="day" class="dayLabels">
            {{ day }}
          </div>
        </div>
        <div class="calendarGrid">
          <!-- Get days for Current Month -->
          <div
            v-for="day in daysInMonth"
            :key="day"
            class="calendarDay"
            :class="{
              isToday: isToday(day),
            }"
          >
            {{ day }}
          </div>
        </div>
      </section>
    </div>

    <FooterBar></FooterBar>
  </main>
</template>

<script setup>
// import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderStudent from '@/components/HeaderStudent.vue'
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import { supabase } from '../../backend/supabase'
import { errorMessages } from 'vue/compiler-sfc'

const clubs = ref([])
const events = ref([])
const loadingEvents = ref(true)
const loadingClubs = ref(true)
const errorMessage = ref(null)

async function getClubsData() {
  try {
    loadingClubs.value = true
    const { data, error } = await supabase.from('clubs').select('*')

    if (error) throw error
    events.value = data
  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
  } finally {
    loadingClubs.value = false
  }
}

async function getEventData() {
  try {
    loadingEvents.value = true
    const { data, error } = await supabase.from('events').select('*')

    if (error) throw error
    events.value = data
  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
  } finally {
    loadingEvents.value = false
  }
}

onMounted(() => {
  getClubsData()
  getEventData()
})

const onHeaderMenuClick = (event) => {
  console.log(event)
  let navDD = document.getElementById('navDropDown')
  if (navDD.style.display === 'flex') {
    // Check if menu is open, then close it
    navDD.style.display = 'none'
    document.getElementById('navBackdrop').classList.remove('show')
  } else {
    // Open the menu
    navDD.style.display = 'flex'
    document.getElementById('navBackdrop').classList.add('show')
  }
}

// Calendar Functions
const currentDate = ref(new Date())
const selectedDate = ref(null)
const dayAcronymsMS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // Monday Start
const dayAcronymsSS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Sunday Start
const dayLetterMS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Monday Start
const dayLetterSS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Sunday Start

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})
const firstDayOffset = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay() - 1
})
const extraDays = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 2, 1).getDay() - 1
})

// Highlight the current system date
const isToday = (day) => {
  const today = new Date()
  return (
    today.getDate() === day &&
    today.getMonth() === currentMonth.value &&
    today.getFullYear() === currentYear.value
  )
}
</script>

<style scoped>
.calendarWapper {
  max-width: 100%;
}

.menuEntry {
  display: flex;
  padding: 4px 0;
  gap: 10px;
  color: var(--color-text-2);
  font-size: 1.3rem;
  text-align: right;
  justify-content: space-between;
}

.menuEntry a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.menuEntry:hover {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.mobileView {
  display: none;
}

.dropDownMenu {
  display: none;
  position: fixed;
  background-color: var(--color-background-2);
  border-radius: 16px;
  padding: 10px 20px;
  z-index: 90;
  top: 8%;
  left: 1%;
  flex-direction: column;
  gap: 16px;
  font-size: large;
  overflow: auto;
}

.dropDownMenu a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

@media screen and (max-width: 688px) {
  .desktopView {
    display: none;
  }
  .mobileView {
    display: block;
  }
  .hero {
    flex-direction: column;
  }
}

.backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.backdrop.show {
  display: block;
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

.calendarGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;
}

.dayLabels {
  text-align: center;
  color: var(--color-text-1);
  font-size: 0.9rem;
  max-height: max-content;
  padding: 4px 0;
}

.calendarDay {
  cursor: pointer;
  transition: var(--color-background-2) 0.2s;
  font-size: 0.95rem;
  text-align: center;
  border: 1px solid var(--color-background-2);
  padding: 4px;
  color: var(--color-text-1);
  font-size: small;
}

.calendarDay:hover {
  background-color: var(--color-background-2);
}

.calendaDay.empty {
  cursor: default;
}

.altMonthDay {
  opacity: 0.5;
}

.dayGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.isToday {
  border: 2px solid var(--color-brandText);
  border-radius: 8px;
}
</style>

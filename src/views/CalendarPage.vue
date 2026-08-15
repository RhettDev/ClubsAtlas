<template>
  <main id="adminMain" class="body calendarMain">
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
        <div class="dayGrid">
          <!-- Day Headers -->
          <div v-for="day in dayAcronymsMS" :key="day" class="dayLabels">
            {{ day }}
          </div>
        </div>
        <div class="calendarGrid">
          <div
            v-for="day in days"
            :key="day.date"
            class="calendarDay"
            :class="{
              isToday: isToday(day),
              altMonthDay: !day.isCurrentMonth,
            }"
          >
            {{ day.date.getDate() }}
          </div>
        </div>
      </section>

      <section id="clubsSideBar" class="bRight">
        <div id="yourClubs">
          <h3 class="pageSubHeader">Your Clubs</h3>
          <hr class="bgHR" />
          <div id="clubsData" class="clubsContainer">
            <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
            <div v-else-if="errorMessage" class="backendLoadingMsg">
              Failed to load: {{ errorMessage }}
            </div>
            <ul v-else class="loadedClubs">
              <li v-for="club in usersClubs" :key="club.id">
                <div id="clubDetails" class="clubEntry">
                  <!-- <img src="club.logoURL" /> -->
                  {{ club.name }}
                  <v-icon name="pr-chevron-down" inverse scale="1.5" />
                </div>
                <!-- <div class="tagDetails">
                  <li v-for="tag in clubTags" :key="tag.id" class="tagListing">
                    {{ tag.tagName }}
                  </li>
                </div> -->
              </li>
            </ul>
          </div>
        </div>
        <div id="calendarMenu" class="calendarMenuContainer">
          <hr class="bgHR" />
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
            v-for="day in days"
            :key="day.date"
            class="calendarDay"
            :class="{
              isToday: isToday(day),
              altMonthDay: !day.isCurrentMonth,
            }"
          >
            {{ day.date.getDate() }}
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
import { calendar } from '@/composables/calender'
import { ref, onMounted } from 'vue'
import { supabase } from '../../backend/supabase'
import { errorMessages } from 'vue/compiler-sfc'

const usersClubs = ref([])
// const studentUser = ref([])
const loadingClubs = ref(true)
const errorMessage = ref(null)
const studentUserID = ref(1)
const { currentYear, currentMonth, days } = calendar()

async function getUsersClubs() {
  try {
    loadingClubs.value = true
    
    let studentid = studentUserID.value
    let { data, error } = await supabase.rpc('getfollowingclubsdata', { studentid })

    if (error) throw error

    usersClubs.value = data
  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}
onMounted(() => {
  getUsersClubs()
})

const onHeaderMenuClick = () => {
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

// const onClubEntryClick = () => {
//   let clubDD = document.getElementById('tagListing')
//   if (clubDD.style.display === 'flex') {
//     // Check if tags are open, then close it
//     clubDD.style.display = 'none'
//     document.getElementById('navBackdrop').classList.remove('show')
//   } else {
//     // Open the tags
//     clubDD.style.display = 'flex'
//     document.getElementById('navBackdrop').classList.add('show')
//   }
// }

// Calendar Functions

// const currentDate = ref(new Date())
const dayAcronymsMS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // Monday Start
// const dayAcronymsSS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Sunday Start
const dayLetterMS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Monday Start
// const dayLetterSS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Sunday Start

// Highlight the current system date
const isToday = (day) => {
  const today = new Date()
  return (
    today.getDate() === day.date.getDate() &&
    today.getMonth() === currentMonth.value &&
    today.getFullYear() === currentYear.value
  )
}
</script>

<style scoped>
.calendarWapper {
  max-width: 100%;
}

#clubsSideBar {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

#yourClubs {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

#clubsData {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.loadedClubs {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  padding-right: 4px;
}

.calendarMenuContainer {
  flex-shrink: 0;
  margin-top: auto;
  padding-top: 12px;
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
    display: flex;
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
  opacity: 0.4;
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

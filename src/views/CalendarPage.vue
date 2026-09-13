<template>
  <main id="adminMain" class="body calendarMain">
    <HeaderStudent @click="onHeaderMenuClick"></HeaderStudent>
    <!-- Mobile Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <div id="yourClubs" v-if="currentClubsMenu === 1" key="yourClubs" class="dropDownClubsMenu">
        <h3 class="menuEntry">Today</h3>
        <a class="menuEntry active">Month View</a>
        <h3 class="menuEntry">Week View</h3>
        <hr class="bgHR" />
        <h3 class="menuEntry">Your Clubs</h3>
        <div id="clubsData" class="clubsContainer">
          <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
          <div v-else-if="errorMessage" class="backendLoadingMsg">
            Failed to load: {{ errorMessage }}
          </div>
          <ul v-else class="loadedClubs">
            <ClubListEntry
              v-for="club in usersClubs"
              :key="club.id"
              :club="club"
              :isOpen="openClubId === club.id"
              @toggle="toggleDropdown(club.id)"
            />
          </ul>
        </div>
      </div>
      <div id="suggestedClubs" v-if="currentClubsMenu === 2" key="suggestedClubs" class="dropDownClubsMenu">
        <h3 class="menuEntry">Suggested Clubs</h3>
        <hr class="bgHR" />
        <div id="suggestedClubsData" class="clubsContainer">
          <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
          <div v-else-if="errorMessage" class="backendLoadingMsg">
            Failed to load: {{ errorMessage }}
          </div>
          <ul v-else class="loadedClubs">
            <ClubListEntry
              v-for="club in suggestedClubs"
              :key="club.id"
              :club="club"
              :isOpen="openClubId === club.id"
              :visibleOptions="{
                clubDisplay: false,
                toggleGM: false,
                viewProfile: true,
                addClub: true,
                deleteClub: false
              }"
              @toggle="toggleDropdown(club.id)"
            />
          </ul>
        </div>
      </div>
      <div id="clubSearch" v-if="currentClubsMenu === 3" key="clubSearch" class="dropDownClubsMenu">
        <h3 class="menuEntry">Club Search</h3>
        <hr class="bgHR" />
        <div class="searchContainer">
          <input class="formField" v-model="clubSearch" type="text" placeholder="Search...">
          <v-icon name="pr-filter" fill="var(--color-text-1)" scale="1.5" />
        </div>
        <div id="clubSearch" class="clubsContainer">
          <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
          <div v-else-if="errorMessage" class="backendLoadingMsg">
            Failed to load: {{ errorMessage }}
          </div>
          <ul v-else class="loadedClubs">
            <ClubListEntry
              v-for="club in searchedClubs"
              :key="club.id"
              :club="club"
              :isOpen="openClubId === club.id"
              :visibleOptions="{
                clubDisplay: false,
                toggleGM: false,
                viewProfile: true,
                addClub: true,
                deleteClub: false
              }"
              @toggle="toggleDropdown(club.id)"
            />
          </ul>
          <div v-if="searchedClubs.length == 0" class="backendLoadingMsg">No clubs match your search...</div>
        </div>
      </div>
      
      <hr class="bgHR" />
      <a class="menuEntry" :class="{active: currentClubsMenu == 1}" @click="currentClubsMenu = 1">Your Clubs</a>
      <a class="menuEntry" :class="{active: currentClubsMenu == 2}" @click="currentClubsMenu = 2">Suggested Clubs</a>
      <a class="menuEntry" :class="{active: currentClubsMenu == 3}" @click="currentClubsMenu = 3">Club Search</a>
      <hr class="bgHR" />
      <RouterLink variant="primary" class="menuEntry" to="/settings"> Settings </RouterLink>
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

      <section id="currentClubsMenu" class="bRight">
        <div id="yourClubs" v-if="currentClubsMenu === 1" key="yourClubs" >
          <h2 class="pageSubHeader">Your Clubs</h2>
          <hr class="bgHR" />
          <div id="clubsData" class="clubsContainer">
            <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
            <div v-else-if="errorMessage" class="backendLoadingMsg">
              Failed to load: {{ errorMessage }}
            </div>
            <ul v-else class="loadedClubs">
              <ClubListEntry
                v-for="club in usersClubs"
                :key="club.id"
                :club="club"
                :isOpen="openClubId === club.id"
                @toggle="toggleDropdown(club.id)"
              />
            </ul>
          </div>
        </div>
        <div id="suggestedClubs" v-else-if="currentClubsMenu === 2" key="suggestedClubs" >
          <h2 class="pageSubHeader">Suggested Clubs</h2>
          <hr class="bgHR" />
          <div id="suggestedClubsData" class="clubsContainer">
            <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
            <div v-else-if="errorMessage" class="backendLoadingMsg">
              Failed to load: {{ errorMessage }}
            </div>
            <ul v-else class="loadedClubs">
              <ClubListEntry
                v-for="club in suggestedClubs"
                :key="club.id"
                :club="club"
                :isOpen="openClubId === club.id"
                :visibleOptions="{
                  clubDisplay: false,
                  toggleGM: false,
                  viewProfile: true,
                  addClub: true,
                  deleteClub: false
                }"
                @toggle="toggleDropdown(club.id)"
              />
            </ul>
          </div>
        </div>
        <div id="clubSearch" v-else-if="currentClubsMenu === 3" key="clubSearch" >
          <h2 class="pageSubHeader">Club Search</h2>
          <hr class="bgHR" />
          <div class="searchContainer">
            <input class="formField" v-model="clubSearch" type="text" placeholder="Search...">
            <v-icon name="pr-filter" fill="var(--color-text-1)" scale="1.5" />
          </div>
          <div id="suggestedClubsData" class="clubsContainer">
            <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
            <div v-else-if="errorMessage" class="backendLoadingMsg">
              Failed to load: {{ errorMessage }}
            </div>
            <ul v-else class="loadedClubs">
              <ClubListEntry
                v-for="club in searchedClubs"
                :key="club.id"
                :club="club"
                :isOpen="openClubId === club.id"
                :visibleOptions="{
                  clubDisplay: false,
                  toggleGM: false,
                  viewProfile: true,
                  addClub: true,
                  deleteClub: false
                }"
                @toggle="toggleDropdown(club.id)"
              />
            </ul>
            <div v-if="searchedClubs.length == 0" class="backendLoadingMsg">No clubs match your search...</div>
          </div>
        </div>
        <div id="calendarMenu" class="calendarMenuContainer">
          <hr class="bgHR" />
          <a class="menuEntry" :class="{active: currentClubsMenu == 1}" @click="currentClubsMenu = 1">Your Clubs</a>
          <a class="menuEntry" :class="{active: currentClubsMenu == 2}" @click="currentClubsMenu = 2">Suggested Clubs</a>
          <a class="menuEntry" :class="{active: currentClubsMenu == 3}" @click="currentClubsMenu = 3">Club Search</a>
          <!-- <RouterLink class="menuEntry" to="showcase"> Weekly Showcase </RouterLink> -->
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
import ClubListEntry from '@/components/ClubListEntry.vue'
import { calendar } from '@/composables/calender'
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../../backend/supabase'
import { useAuth } from '@/composables/useAuth'
import { errorMessages } from 'vue/compiler-sfc'

const usersClubs = ref([])
// const studentUser = ref([])
const loadingClubs = ref(true)
const errorMessage = ref(null)
const { profile } = useAuth()
const studentUserID = ref(profile.value.id)
const clubsID = ref(1)
const loadingCTags = ref(true)
const currentClubsMenu = ref(1)
const openClubId = ref(null)
const suggestedClubs = ref([])
const allClubs = ref([])
const clubSearch = ref('')

const { days } = calendar()

// Side Bar Allocation
// Your Clubs: 1 (Default)
// Suggested Clubs: 2
// Club Search: 3

function toggleDropdown(id) {
  openClubId.value = openClubId.value === id ? null : id
}

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

async function getSuggestedClubs() {
  try {
    loadingClubs.value = true

    let { data, error } = await supabase.rpc('getfourclubsdata')

    if (error) throw error

    suggestedClubs.value = data

  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}

async function getAllClubs() {
  try {
    loadingClubs.value = true

    let { data, error } = await supabase.rpc('getallclubsdata')

    if (error) throw error

    allClubs.value = data

  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}


async function getClubTags(clubsID) {
  try {
    loadingCTags.value = true
    let clubid = clubsID.value

    let { data, error } = await supabase.rpc('getclubstags', { clubid })

    if (error) throw error
    else console.log("temp Tag Log", data)
  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingCTags.value = false
  }
}

onMounted(() => {
  getUsersClubs()
  getSuggestedClubs()
  getAllClubs()
  getClubTags(clubsID)
})


const searchedClubs = computed(() => {
  return allClubs.value.filter(club => {
    return club.name.toLowerCase().includes(clubSearch.value.toLowerCase())
  })
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
    today.getMonth() === day.date.getMonth() &&
    today.getFullYear() === day.date.getFullYear()
  )
}
</script>

<style scoped>
.calendarWapper {
  max-width: 100%;
}

#currentClubsMenu {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

#yourClubs,
#suggestedClubs,
#clubSearch {
  display: flex;
  flex-direction: column;
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

.calendarMenuContainer a.active{
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
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

.menuEntry:active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.menuEntry:hover:not([disabled]) {
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
  width: 90%;
  height: calc(100vh - 10% - 20px);
  overflow-y: auto;
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

.clubDropDown {
  display: none;
}

.searchContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 8px 0px;
}

.dropDownClubsMenu {
  gap: 8px;
  margin-top: 4px;

}
</style>

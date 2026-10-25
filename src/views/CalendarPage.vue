<!-- 
  File Name: CalendarPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/calendar
  Purpose: This file holds HTML, CSS and Javascript for rendering the students calendar..
-->

<!-- HTML -->
<template>
  <main id="Calendar" class="body calendarMain">
    <HeaderStudent @click="onHeaderMenuClick"></HeaderStudent>

    <!-- Mobile Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <!-- Menu split into three panels rather than three different pages. -->
      <!-- First Panel (Defualt): list of clubs the student follows -->
      <div id="yourClubs" v-if="currentClubsMenu === 1" key="yourClubs" class="dropDownClubsMenu">
        <h3 class="menuEntry pointer" @click="handleMobileToday">Today</h3>
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
            <!-- Equal comparison to ensure the correct club is opening, wont open if not  -->
          </ul>
        </div>
      </div>
      <!-- Second Panel: four random clubs for the user to look at -->
      <div
        id="suggestedClubs"
        v-if="currentClubsMenu === 2"
        key="suggestedClubs"
        class="dropDownClubsMenu"
      >
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
                deleteClub: false,
              }"
              @toggle="toggleDropdown(club.id)"
            />
          </ul>
        </div>
      </div>
      <!-- Third Panel: Search bar for all clubs -->
      <div id="clubSearch" v-if="currentClubsMenu === 3" key="clubSearch" class="dropDownClubsMenu">
        <h3 class="menuEntry">Club Search</h3>
        <hr class="bgHR" />
        <div class="searchContainer">
          <input class="formField" v-model="clubSearch" type="text" placeholder="Search..." />
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
                deleteClub: false,
              }"
              @toggle="toggleDropdown(club.id)"
            />
          </ul>
          <div v-if="searchedClubs.length == 0" class="backendLoadingMsg">
            No clubs match your search...
          </div>
        </div>
      </div>

      <!-- Navigation list -->
      <hr class="bgHR" />
      <a class="menuEntry pointer" :class="{ active: currentClubsMenu == 1 }" @click="currentClubsMenu = 1"
        >Your Clubs</a
      >
      <a class="menuEntry pointer" :class="{ active: currentClubsMenu == 2 }" @click="currentClubsMenu = 2"
        >Suggested Clubs</a
      >
      <a class="menuEntry pointer" :class="{ active: currentClubsMenu == 3 }" @click="currentClubsMenu = 3"
        >Club Search</a
      >
      <hr class="bgHR" />
      <RouterLink variant="primary" class="menuEntry" to="/settings"> Settings </RouterLink>
    </div>

    <!-- Mobile View -->
    <div class="mobileView hero">
      <section id="mobileCalendarBody" class="bCenter">
        <div class="dayGrid">
          <!-- Mobile uses dayLetterMS to only have the first letter of each day, monday to sunday, as the column label -->
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
            <div
              v-for="event in eventsForDate(day.date)"
              :key="event.id || `${event.date}-${event.title}`"
              class="eventCard mobileCard"
              :style="{backgroundColor: event.clubHex}"
              @click="openEventCard(event.id)"
            > <!-- Mobile only has club acroynym and colour for event card, reduce size whilst keeping club recognisable-->
              {{ event.acronym }}
              <EventCardPop
                :model-value="openEventId === event.id"
                @update:model-value="closeEventCard"
                :clubName="event.clubName"
                :eventID="event.id"
                :eventTitle="event.eventTitle"
                :eventDate="event.eventDate"
                :eventLocation="event.eventLocation"
                :eventStart="event.startsAt"
                :eventEnd="event.endsAt"
                :eventDescription="event.eventDescription"
                :eventImage="event.imageURL"
                :eventLink="event.ticketLink"
                :eventTags="eventTags"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Desktop View and Navigation -->
    <div class="desktopView hero">
      <!-- Desktop View -->
      <section id="desktopCalendarBody" class="bCenter">
        <div class="dayGrid">
          <!-- Day Headers -->
          <!-- Desktop uses three letter abbreviateions of each day, monday to sunday, as the column label -->
          <div v-for="day in dayAbbrMS" :key="day" class="dayLabels">
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
            <div
              v-for="event in eventsForDate(day.date)"
              :key="event.id || `${event.date}-${event.title}`"
              class="eventCard"
              :style="{backgroundColor: event.clubHex}"
              @click="openEventCard(event.id)"
            >
              <!-- Event Card with time, club acronym, event title and colour -->
              {{ convertTo12Hour(event.startsAt) }}
              {{ event.acronym }}
              <p>&nbsp;-&nbsp;</p> <!-- $nbsp sets whitespace between acronym and event title-->
              {{ event.eventTitle }}
              <EventCardPop
                :model-value="openEventId === event.id"
                @update:model-value="closeEventCard"
                :clubName="event.clubName"
                :eventTitle="event.eventTitle"
                :eventDate="event.eventDate"
                :eventLocation="event.eventLocation"
                :eventStart="event.startsAt"
                :eventEnd="event.endsAt"
                :eventDescription="event.eventDescription"
                :eventImage="event.imageURL"
                :eventLink="event.ticketLink"
                :eventTags="eventTags"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Desktop Side Panel and Navigation -->
      <section id="currentClubsMenu" class="bRight">
        <!-- First Side Panel: List of Following Clubs -->
        <div id="yourClubs" v-if="currentClubsMenu === 1" key="yourClubs">
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
              <!-- No visibility options for dropdown options as default are tuned for following clubs -->
            </ul>
          </div>
        </div>
        <!-- Second Side Panel: Four Suggested Clubs -->
        <div id="suggestedClubs" v-else-if="currentClubsMenu === 2" key="suggestedClubs">
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
                  deleteClub: false,
                }"
                @toggle="toggleDropdown(club.id)"
              />
              <!-- Visibility options for dropdown options are set for non following clubs -->
            </ul>
          </div>
        </div>
        <!-- Third Side Panel: Search Bar for Clubs -->
        <div id="clubSearch" v-else-if="currentClubsMenu === 3" key="clubSearch">
          <h2 class="pageSubHeader">Club Search</h2>
          <hr class="bgHR" />
          <div class="searchContainer">
            <input class="formField" v-model="clubSearch" type="text" placeholder="Search..." />
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
                  deleteClub: false,
                }"
                @toggle="toggleDropdown(club.id)"
              />
            </ul>
            <div v-if="searchedClubs.length == 0" class="backendLoadingMsg">
              No clubs match your search...
            </div>
          </div>
        </div>
        <!-- Side Panel Navigation -->
        <div id="calendarMenu" class="calendarMenuContainer">
          <hr class="bgHR" />
          <a
            class="menuEntry pointer"
            :class="{ active: currentClubsMenu == 1 }"
            @click="currentClubsMenu = 1"
            >Your Clubs</a
          >
          <a
            class="menuEntry pointer"
            :class="{ active: currentClubsMenu == 2 }"
            @click="currentClubsMenu = 2"
            >Suggested Clubs</a
          >
          <a
            class="menuEntry pointer"
            :class="{ active: currentClubsMenu == 3 }"
            @click="currentClubsMenu = 3"
            >Club Search</a
          >
        </div>
      </section>
    </div>

    <FooterBar></FooterBar>
  </main>
</template>

<!-- JAVASCRIPT -->
<script setup>
import FooterBar from '@/components/FooterBar.vue'
import HeaderStudent from '@/components/HeaderStudent.vue'
import ClubListEntry from '@/components/ClubListEntry.vue'
import EventCardPop from '@/components/EventCardPop.vue'
import { calendar } from '@/composables/calender'
import { convertTo12Hour } from '@/composables/miscFunctions'
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '../../backend/supabase'
import { useAuth } from '@/composables/useAuth'
import { demoSessionData } from '@/composables/sessionStore'

const loadingClubs = ref(true)
const loadingEvents = ref(true)
const loadingTags = ref(true)

const errorMessage = ref(null)
const studentUserID = ref(null)
const openClubId = ref(null)
const openEventId = ref(null)

const clubsID = ref(1)
const currentClubsMenu = ref(1)
// Side Bar Allocation
// Your Clubs: 1 (Default)
// Suggested Clubs: 2
// Club Search: 3

const usersClubs = ref([])
const suggestedClubs = ref([])
const allClubs = ref([])
const events = ref([])
const authClubIDs = ref([])
const eventTags = ref([])

const clubSearch = ref('')

const { isDemoSession, demoUserClubs } = demoSessionData()
const { isLoggedIn, loading: authLoading, profile } = useAuth()
const { days, goToToday } = calendar()

// Set the method of using the calendar, create a distinction between a authenticated user and a demo user
const calendarMode = computed(() => {
  if (authLoading.value) return 'loading'
  if (isLoggedIn.value) return 'authenticated'
  if (isDemoSession.value) return 'demo'
  return 'none'
})

// Based on the method decided, run the corresponding startup functions
function dataSelection(mode){
  if(mode.value == 'loading'){
    console.log("loading")
  }
  else if(mode.value == 'authenticated'){
    studentUserID.value = profile.value.id
    getUsersClubs()
    getFollowingClubsEvent()
  }
  else if(mode.value == 'demo'){
    getDemoClubs()
    getDemoClubEvents()
  }
}

// Update the calendar whenever a change is made to the list of clubs, whether that is adding or removing a club
watch(
  demoUserClubs,
  async () => {
    if (calendarMode.value !== 'demo') return
    await Promise.all([getDemoClubs(), getDemoClubEvents()])
  },
  { deep: true }, // Watch nested changes in demoUserClubs, 
)

// Set the club dropdown based on it's ID
function toggleDropdown(id) {
  openClubId.value = openClubId.value === id ? null : id
}

// Supabase Functions retrieving data

// AUTH: Get all club data for clubs a student user is following, requires user ID
async function getUsersClubs() {
  try {
    loadingClubs.value = true

    let studentid = studentUserID.value
    let { data, error } = await supabase.rpc('getfollowingclubsdata', { studentid })

    if (error) throw error

    usersClubs.value = data
    captureIDs()
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}

// Map the club IDs from an Auth users Following Clubs list in the database to the local list of clubs
function captureIDs() {
  authClubIDs.value = usersClubs.value.map((club) => club.id)
}

// AUTH: Get the event data for every club a user is following
async function getFollowingClubsEvent() {
  try {
    loadingEvents.value = true

    let studentid = studentUserID.value // Supabase functions only take lowercase variables, so studentUserID.value is redeclared
    let { data, error } = await supabase.rpc('getfollowingclubsevents', { studentid })

    if (error) throw error

    events.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingEvents.value = false
  }
}

// DEMO: Get club data for a list of demo-selected club IDs.
async function getDemoClubs() {
  try {
    loadingClubs.value = true

    // Duplicate demoUserClubs, ensuring it has data
    // ?? [] sets the duplicate array to null if demoUserClubs is null
    let recommendedids = [...(demoUserClubs.value ?? [])]
    if (recommendedids.length === 0) {
      usersClubs.value = []
      return
    }

    let { data, error } = await supabase.rpc('getfilteredclubs', { recommendedids })

    if (error) throw error

    usersClubs.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}

// DEMO: Get events for a list of demo-selected club IDs.
async function getDemoClubEvents() {
  try {
    loadingEvents.value = true

    // Duplicate demoUserClubs, ensuring it has data, using the clubs to get all of their events
    // ?? [] sets the duplicate array to null if demoUserClubs is null
    let recommendedids = [...(demoUserClubs.value ?? [])]
    if (recommendedids.length === 0) {
      events.value = []
      return
    }

    let { data, error } = await supabase.rpc('getclubeventsfromids', { recommendedids })

    if (error) throw error

    events.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingEvents.value = false
  }
}

// BOTH: Get all club data of four random clubs
async function getSuggestedClubs() {
  try {
    loadingClubs.value = true

    let { data, error } = await supabase.rpc('getfourclubsdata')

    if (error) throw error

    suggestedClubs.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}

// BOTH: Get all club data for every club in the database
async function getAllClubs() {
  try {
    loadingClubs.value = true

    let { data, error } = await supabase.rpc('getallclubsdata')

    if (error) throw error

    allClubs.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingClubs.value = false
  }
}

// BOTH: Get the tags for a specific club
async function getClubTags(clubsID) {
  try {
    loadingTags.value = true
    let clubid = clubsID.value

    let { data, error } = await supabase.rpc('getclubstags', { clubid })

    if (error) throw error
    else console.log(data)
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingTags.value = false
  }
}
// BOTH: Get the tags for a specific event
async function getEventTags(eventid) {
  try {
    loadingTags.value = true

    let { data, error } = await supabase.rpc('geteventstags', { eventid })

    if (error) throw error

    eventTags.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingTags.value = false
  }
}

// Function that run as soon as they are loaded into the DOM
onMounted(() => {
  getSuggestedClubs()
  getClubTags(clubsID)
  getAllClubs()
  dataSelection(calendarMode)
})

// Array of clubs that is activley filtered based clubSearch
// Const ensures list if updated as the user types, rather than a function to run once they click search
const searchedClubs = computed(() => {
  return allClubs.value.filter((club) => {
    return club.name.toLowerCase().includes(clubSearch.value.toLowerCase())
  })
})

// Switch the status of the mobile menu when clicked.
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

// Format a date to match with event date data format
function dateKey(date) {
  const parsedDate = new Date(date)

  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
// Match event dates for a specific date, to ensure the event card is loaded.
function eventsForDate(date) {
  const calendarDate = dateKey(date)
  return events.value.filter((event) => dateKey(event.eventDate) === calendarDate)
}

// Alternate versions of day structure was planned to be a user option
const dayAbbrMS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // Monday Start
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

// Handle Event card popup
function openEventCard(eventID) {
  getEventTags(eventID)
  openEventId.value = eventID
}
function closeEventCard() {
  openEventId.value = null
}

// Handle the Today Shortcut when in the mobile menu
function handleMobileToday(){
  goToToday()
  onHeaderMenuClick()
}
</script>

<!-- CSS -->
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
}

#clubsData,
#suggestedClubsData {
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

.calendarMenuContainer a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.clubTypeList {
  display: flex;
  flex-direction: column;
  /* max-width: 500px; */
  gap: 8px;
  justify-content: center;
}

.calendarGrid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
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
  display: grid;
  cursor: pointer;
  transition: var(--color-background-2) 0.2s;
  text-align: center;
  border: 1px solid var(--color-background-2);
  padding: 2px;
  color: var(--color-text-1);
  font-size: small;
  gap: 4px;
  align-items: start;
  align-content: start;
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
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.isToday {
  border: 2px solid var(--color-brandText);
  border-radius: 8px;
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

.eventCard {
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  background-color: var(--ca-brand-blue-1);
  border-radius: 4px;
  border-right: 0px;
  text-overflow: clip;
  white-space: nowrap;
  width: 100%;
  padding: 4px 8px;
  color: var(--ca-text-dark-1);
}
.eventCard p {
  color: var(--ca-text-dark-1);
}
.mobileCard{
  justify-content: center;
}

.dropDownMenu{
  top: 6%;
  height: calc(100vh - 20%);
}
</style>

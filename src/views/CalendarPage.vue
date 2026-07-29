<template>
  <main id="adminMain">
    <HeaderStudent @click="onHeaderMenuClick"></HeaderStudent>
    <!-- Mobiel Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <RouterLink variant="primary" class="menuEntry active" to="/admin" @click="onHeaderMenuClick">
        <v-icon name="pr-bars" inverse scale="1.2" />
        Dashboard
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
        <v-icon name="pr-upload" inverse scale="1.2" />
        Upload New Event
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-home">
        <v-icon name="pr-home" inverse scale="1.2" />
        Update Club Profile
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
        <v-icon name="pr-users" inverse scale="1.2" />
        General Meetings
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
        <v-icon name="pr-cog" inverse scale="1.2" />
        Settings
      </RouterLink>
    </div>

    <!-- Desktop Navigation -->
    <div class="hero desktopView">
      <!-- Desktop View -->
      <section id="calendarBody" class="bCenter">
        <div v-if="loadingEvents" class="backendLoadingMsg">Loading Calendar...</div>
        <div v-else-if="errorMessage" class="backendLoadingMsg">
          Failed to load: {{ errorMessage }}
        </div>
        <div v-else>
          <div v-for="event in events" :key="event.id">
            {{ event.id }}
            {{ event.eventTitle }}
          </div>
        </div>
      </section>

      <section id="clubsSideBar" class="bRight">
        <div id="yourClubs">
          <h2>Your Clubs</h2>
          <hr class="bgHR" />
          <div>
            <div v-if="loadingClubs" class="backendLoadingMsg">Loading Clubs...</div>
            <div v-else-if="errorMessage" class="backendLoadingMsg">
              Failed to load: {{ errorMessage }}
            </div>
            <div v-else-if="nulltest"></div>
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
      <section id="analyitcsBar" class="bLeft">
        <h2>analytics panel</h2>
      </section>

      <section id="eventsList" class="bCenter">
        <h1>main body</h1>
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
import { supabase } from '../../backend/supabase'
import { errorMessages } from 'vue/compiler-sfc'

const clubs = ref([])
const events = ref([])
const loadingEvents = ref(true)
const loadingClubs = ref(true)
const errorMessage = ref(null)
const nulltest = ref(1)

async function getClubsData() {
  try {
    loadingClubs.value = true
    const { data, error } = await supabase.from('clubs').select('*')

    if (error) throw error
    events.value = data
    if ((events.value = null)) nulltest.value = null
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

// Data
// const clubExamples = [
//   { id: 'curtinEngineersClub', icon: '🎨', label: 'Curtin Engineers Club' },
//   { id: 'curtinFreeFoodSociety', icon: '⚙️', label: 'Curtin Free Food Society' },
//   { id: 'curtinEducationStudentsSociety', icon: '📊', label: 'Curtin Education Students Society' },
//   {
//     id: 'CurtinBusinessCommerceAssociation',
//     icon: '📣',
//     label: 'Curtin Business & Commerce Association',
//   },
// ]

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
</script>

<style scoped>
.hero {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  /* align-items: start; */
  flex: 1;
}

.body {
  display: flex;
  width: 100%;
}

.bRight a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.bRight {
  display: flex;
  flex-direction: column;
  flex: 0.6;
  box-shadow: 2px 0px var(--color-background-2);
  padding: 16px;
  gap: 4px;
}

.bCenter {
  flex: 2;
  box-shadow: 2px 0px var(--color-background-2);
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
</style>

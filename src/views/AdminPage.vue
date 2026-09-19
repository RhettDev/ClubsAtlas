<template>
  <main id="adminMain">
    <HeaderClubs
      v-if="clubDetails"
      @click="onHeaderMenuClick"
      :club="clubDetails"
    ></HeaderClubs>
    <!-- Mobiel Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <RouterLink variant="primary" class="menuEntry active" to="/admin" @click="onHeaderMenuClick">
        <v-icon name="pr-bars" fill="var(--color-text-1)" scale="1.2"/>
        Dashboard
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/new-event" >
        <v-icon name="pr-upload" fill="var(--color-text-1)" scale="1.2"/>
        Upload New Event
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-home">
        <v-icon name="pr-home" fill="var(--color-text-1)" scale="1.2"/>
        Update Club Profile
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
        <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.2"/>
        General Meetings
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
        <v-icon name="pr-cog" fill="var(--color-text-1)" scale="1.2"/>
        Settings
      </RouterLink>
    </div>

    <!-- Desktop Navigation -->
    <div class="hero desktopView">
      <section id="sideBar" class="bLeft ">
        <RouterLink variant="primary" class="menuEntry active" to="/admin">
          <v-icon name="pr-bars" fill="var(--color-text-1)" scale="1.5"/>
          Dashboard
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
          <v-icon name="pr-upload" fill="var(--color-text-1)" scale="1.5"/>
          Upload New Event
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/update-home">
          <v-icon name="pr-home" fill="var(--color-text-1)" scale="1.5"/>
          Update Club Profile
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
          <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.5"/>
          General Meetings
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
          <v-icon name="pr-cog" fill="var(--color-text-1)" scale="1.5"/>
          Settings
        </RouterLink>
      </section>

      <!-- Desktop View -->
      <section id="eventsList" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Events</h1>
          <hr class="fgHR">
        </div>
        <div 
          v-for="event in sortedClubEvents"
          :key="event.id"
        >
          <div id="adminEventCard" class="adminEventContainer">
            <div id="eventName" class="contentRow spaced vertCentered">
              <h2 style="font-weight: normal">{{ event.eventTitle }}</h2>
              <BaseButton>View Details</BaseButton>
            </div>
            <div id="eventContent" class="eventDetails">
              <div id="dateTimeRow" class="contentRow">
                <div>{{ convertToFullDate(event.eventDate) }} {{ convertTo12Hour(event.startsAt) }} - {{ convertTo12Hour(event.endsAt) }}</div>
              </div>
              <div id="location" v-if="hasValue(event.eventLocation)">
                <p>{{ event.eventLocation }}</p>
              </div>
            </div>
            <p id="description" class="eventDescriptionContainer">{{ shortenDescription(event.eventDescription) }}</p>
            <div id="publishedNote" class="textHR">
              <p class="brandText">Published</p>
              <hr class="fgHR">
            </div>
          </div>
        </div>
      </section>

      <section id="analyitcsBar" class="bRightAdmin">
        <p>analytics panel</p>
      </section>
    </div>

    <!-- Mobile View -->
    <div class="hero mobileView">
      <section id="analyitcsBar" class="bLeft">
        <p>analytics panel</p>
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
import HeaderClubs from '@/components/HeaderClubs.vue'
import { computed, onMounted, ref } from 'vue'
import { supabase } from '../../backend/supabase'
import { useAuth } from '@/composables/useAuth'
import { errorMessages } from 'vue/compiler-sfc'
import BaseButton from '@/components/BaseButton.vue'
import { useClubData } from '@/composables/useClubData'
import { convertTo12Hour, convertToFullDate, hasValue, shortenDescription } from '@/composables/miscFunctions'
const { profile } = useAuth()
const loadingEvents = ref(true)

const clubTempID = ref(profile.value.clubID)
const clubEvents = ref([])
const { clubDetails } = useClubData()

const sortedClubEvents = computed(() =>
  [...clubEvents.value].sort(
    (firstEvent, secondEvent) =>
      new Date(secondEvent.eventDate) - new Date(firstEvent.eventDate),
  ),
)

console.log(clubTempID)

async function getClubEvents(){
  try {
    loadingEvents.value = true

    let clubid = clubTempID.value
    let { data, error } = await supabase.rpc('getspecificclubsevents', { clubid })

    if (error) throw error

    clubEvents.value = data
  } catch (error) {
    errorMessages.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingEvents.value = false
  }
}

// events.id,
// events."clubID",
// events."eventTitle",
// events."eventDescription",
// events."eventLocation",
// events."eventDate",
// events."startsAt",
// events."endsAt",
// events."imageURL",
// events."isGeneralMeeting",
// events."ticketLink"

onMounted(() => {
  getClubEvents()
})

const onHeaderMenuClick = () =>{
  let navDD = document.getElementById("navDropDown");
    if (navDD.style.display === "flex"){ // Check if menu is open, then close it 
        navDD.style.display = "none";
        document.getElementById('navBackdrop').classList.remove('show');
    }
    else { // Open the menu 
        navDD.style.display = "flex";
        document.getElementById('navBackdrop').classList.add('show');
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

.body{
  display: flex;
  width: 100%;
}

.bLeft{
  display: flex;
  flex-direction: column;
  flex: 0.7;
  box-shadow: 2px 0px var(--color-background-2);
  padding: 16px;
  gap: 4px;
}

.bLeft a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.bRight {
  flex: 1;
}

.bCenter {
  flex: 2;
  box-shadow: 2px 0px var(--color-background-2);
}

.menuEntry{
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

.mobileView{
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
  .desktopView { display: none; }
  .mobileView { display: block; }
  .hero {flex-direction: column;}
}

.adminEventContainer{
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: var(--color-background-2);
  padding: 20px;
  color: var(--color-text-1);
  gap: 16px;
  text-align: left;
}

.eventDetails {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--color-text-2)
}

#location p{
  color: var(--color-text-2)
}

</style>
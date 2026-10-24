<!-- 
  File Name: AdminPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/admin
  Purpose: This file holds all HTML, CSS and Javascript for the clubs admin dashboard, 
  listing all past events and providing navigation to the four other admin pages

-->
<!-- HTML -->
<template>
  <main id="adminMain">
    <!-- v--if to ensure club details have loaded before header is rendered. Holds Mobile Admin navigation -->
    <HeaderClubs v-if="clubDetails" @click="onHeaderMenuClick" :club="clubDetails" />

    <!-- Desktop Navigation -->
    <div class="hero ">
      <section id="sideBar" class="bLeft desktopView">
        <AdminNavigation />
      </section>

      <!-- Body: list of past events -->
      <section id="eventsList" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Past Events</h1>
          <hr class="fgHR">
        </div>
        <div 
          v-for="event in sortedClubEvents"
          :key="event.id"
        >
          <div id="adminEventCard" class="adminEventContainer">
            <div id="eventName" class="contentRow spaced vertCentered">
              <h2 style="font-weight: normal">{{ event.eventTitle }}</h2> <!-- Single style class given as it is the only use case of a unbolded heading 2-->
              <BaseButton @click="openEventCard(event.id)" >View Details</BaseButton>
            </div>
            <!-- model-value checks the correct event is selected, indicating open status in the component -->
            <EventCardPop
                :model-value="openEventId === event.id" 
                @update:model-value="closeEventCard"
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
            <div id="eventContent" class="eventDetails">
              <div id="dateTimeRow" class="contentRow">
                <div>{{ convertToFullDate(event.eventDate) }} {{ convertTo12Hour(event.startsAt) }} - {{ convertTo12Hour(event.endsAt) }}</div> <!--Normalisation fucntions-->
              </div>
              <div id="location" v-if="hasValue(event.eventLocation)"> <!-- Some events will only have their location in the description-->
                <p>{{ event.eventLocation }}</p>
              </div>
            </div>
            <p id="description" class="eventDescriptionContainer desktopView">{{ shortenDescription(event.eventDescription) }}</p> <!-- Shorter description to save space -->
            <div id="publishedNote" class="textHR"> 
              <p class="brandText">Published</p> <!-- NOTE: every event is published as the ability to save and keep events unpublished is a missing feature-->
              <hr class="fgHR">
            </div>
          </div>
        </div>
      </section>

      <section id="analyitcsBar" class="bRightAdmin desktopView">
        <!-- Previously planned analytics side bar holding member attendence, Kept to center events -->
      </section>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<!-- JAVASCRIPT -->
<script setup>
// Imports
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import BaseButton from '@/components/BaseButton.vue'
import EventCardPop from '@/components/EventCardPop.vue'
import { computed, onMounted, ref } from 'vue'
import { supabase } from '../../backend/supabase'
import { useAuth } from '@/composables/useAuth'
import { useClubData } from '@/composables/useClubData'
import { convertTo12Hour, convertToFullDate, hasValue, shortenDescription } from '@/composables/miscFunctions'
import AdminNavigation from '@/components/AdminNavigation.vue'

// Variable Declarations
const { profile } = useAuth()
const loadingEvents = ref(true)
const clubTempID = ref(profile.value.clubID)
const clubEvents = ref([])
const { clubDetails } = useClubData()
const loadingTags = ref(true)
const eventTags = ref([])
const openEventId = ref(null)

// Events were not uploaded in date order, 
const sortedClubEvents = computed(() =>
  [...clubEvents.value].sort( // [...variable] used to create a copy, for array maniuplation
    (firstEvent, secondEvent) =>
      new Date(secondEvent.eventDate) - new Date(firstEvent.eventDate), // Second event is the latest event, sorting for most recent event
  ),
)

// Supabase function call getting all the events for a specific club, being the authenticated one
async function getClubEvents(){
  try {
    loadingEvents.value = true

    let clubid = clubTempID.value // Supabase functions only take lowercase variables, so clubTempID.value is redeclared
    let { data, error } = await supabase.rpc('getspecificclubsevents', { clubid })

    if (error) throw error

    clubEvents.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingEvents.value = false
  }
}

// Supabase function call getting the tags for a specific event
async function getEventTags(eventid) {
  try {
    loadingTags.value = true

    let { data, error } = await supabase.rpc('geteventstags', { eventid })

    if (error) throw error

    eventTags.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingTags.value = false
  }
}

// Function to open the event card from specific button
function openEventCard(eventID) {
  getEventTags(eventID)
  openEventId.value = eventID
}

// Function to close any event card
function closeEventCard() {
  openEventId.value = null
}

// Once view is loaded into DOM, function will run only once
onMounted(() => {
  getClubEvents()
})

</script>

<!-- CSS -->
<style scoped>
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

/* Colour change from default <p> only for the one location*/
#location p{
  color: var(--color-text-2)
}

</style>
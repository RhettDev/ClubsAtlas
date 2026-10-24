<!-- 
  File Name: EventUploadPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/admin/new-event
  Purpose: This file holds all HTML, CSS and Javascript for the Event upload process,
  This is there the data scraping, if fixed, is located.
-->

<!-- HTML -->
<template>
  <main id="adminMain">
    <!-- v--if to ensure club details have loaded before header is rendered. Holds Mobile Admin navigation-->
    <HeaderClubs v-if="clubDetails" @click="onHeaderMenuClick" :club="clubDetails" />

    <!-- Desktop Navigation -->
    <div class="hero ">
      <section id="sideBar" class="bLeft desktopView">
        <AdminNavigation />
      </section>

      <!-- Body: List of Event form inputs -->
      <section id="Content" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">New Event</h1>
          <hr class="fgHR">
        </div>
        <!-- Link input for a public TidyHQ event link -->
        <div class="fieldButtonContainer" id="TidyHQLinkInput">
          <FormField
            v-model="eventLink"
            label="Create Event from TidyHQ?"
            placeholder="TidyHQ Public Event Link"
            width="halfWidth">
          </FormField>
          <BaseButton @click="handleEventScrape">Submit</BaseButton>
        </div>
        <p v-if="error" role="alert">{{ error }}</p>
        <hr class="fgHR">
        <div id="inputFields" class="fieldsContainer">
          <!-- Event Title -->
          <!-- Half widths were chosen to not overload the page, only need no much space. -->
          <FormField
            v-model="form.title"
            label="Title"
            placeholder="Title of Event"
            width="halfWidth">
          </FormField>
          <!-- Event Start Date and Time -->
          <div id="eventStart" class="dateTimeContainer">
            <!-- Quarter widths were chosen to allow two field in one row and mimic half width -->
            <FormField
              v-model="form.date"
              label="Start Time"
              placeholder="Date"
              width="quartWidth">
            </FormField>
            <!-- Uses label from above -->
            <FormField
              v-model="form.startTime"
              label=""
              placeholder="Time"
              width="quartWidth">
            </FormField>
          </div>
          <!-- Event End Date and Time -->
          <div id="eventEnd" class="dateTimeContainer">
            <FormField
              v-model="form.date"
              label="End Time"
              placeholder="Date"
              width="quartWidth">
            </FormField>
            <!-- Uses label from above -->
            <FormField
              v-model="form.endTime"
              label=""
              placeholder="Time"
              width="quartWidth">
            </FormField>
          </div>
          <FormField
            v-model="form.location"
            label="Location"
            placeholder="Where will the event be held?"
            width="halfWidth">
          </FormField>
          <!-- Event Description -->  
          <!-- Does not use FormField as it does not allow adjustable height. textarea lets users set the custom size increasing accessibility -->
          <div class="fieldContainer">
            <label class="fieldLabel">
              Club Description
            </label>
            <textarea 
              class="formField"
              id="descriptionField"
              v-model="form.description" 
              rows="4" 
              placeholder="Description of the club, its events and who the club is aimed towards!">
            </textarea>
          </div>
          
          <!-- Event Banner Preview -->
          <div id="bannerField" class="bannerLabelContainer" v-if="form.imagePath">
            <label class="fieldLabel">Current Club Banner</label>
            <label class="fieldSubLabel">Image will be cropped</label>
            <img :src="form.imagePath">
          </div>
          <!-- Event Banner Browse -->
          <!-- Fake browser buttons for the sake of simultaion and showcasing what the page would include -->
          <div id="bannerField" class="buttonLabelContainer">
            <label class="fieldLabel">Upload Club Banner</label>
            <BaseButton>Browse Device</BaseButton>
            <label class="fieldSubLabel">Recommended Size 1980x500px</label>
          </div>
          <!-- Event External Link -->
          <FormField
            v-model="form.link"
            label="External Link"
            placeholder="Link to ticket page or social media post"
            width="halfWidth">
          </FormField>
          <!-- Preview -->
          <div id="previewEventContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Preview Public Event</label>
            <BaseButton @click="openEventCard">Preview</BaseButton>
          </div>
          <EventCardPop
            :model-value="openEventCheck"
            @update:model-value="closeEventCard"
            :eventTitle="form.title"
            :eventDate="form.date"
            :eventLocation="form.location"
            :eventStart="form.startTime"
            :eventEnd="form.endTime"
            :eventDescription="form.description"
            :eventImage="form.imagePath"
            :eventLink="form.link"
          />

        </div>
        <hr class="fgHR">
        <div id="saveCancelButtons" class="buttonRow">
          <!-- Demo does not save any content, but does performs discard confirmation for simulation -->
          <RouterLink to="/admin">
            <BaseButton>Publish</BaseButton>
          </RouterLink>
          <RouterLink to="/admin">
            <BaseButton>Save</BaseButton>
          </RouterLink>
          <BaseButton variant="secondary" @click="askLeavePage">Cancel</BaseButton>
          <ConfirmationPop
            v-model="showConfirm"
            :title="dialogConfig.title"
            :message="dialogConfig.message"
            :confirmBtn="dialogConfig.confirmBtn"
            :cancelBtn="dialogConfig.cancelBtn"
            :danger="dialogConfig.danger"
            @confirm="handleConfirmed"
          />
        </div>
      </section>

      <section class="bRightAdmin desktopView">
        <!-- Empty -->
      </section>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<!-- JAVASCRIPT -->
<script setup>
// import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
import AdminNavigation from '@/components/AdminNavigation.vue'
import ConfirmationPop from '@/components/ConfirmationPop.vue'
import EventCardPop from '@/components/EventCardPop.vue'
import { useClubData } from '@/composables/useClubData'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const eventLink = ref('')
const error = ref(null)
const form = reactive({
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  description: '',
  link: '',
})
const openEventCheck = ref(false)
const dialogConfig = ref({ title: '', message: '', danger: false })
const showConfirm = ref(false)
const router = useRouter()
const { clubDetails } = useClubData()

// Function to handle link handing and scrape script running
async function handleEventScrape() {
  error.value = null
  if (!eventLink.value) {
    error.value = 'Enter a Public TidyHQ event link first'
    return
  }
  // Ensures data is loaded before used
  if (!clubDetails.value) {
    error.value = 'Club details are not available yet'
    return
  }

  const params = new URLSearchParams({
    url: eventLink.value,
    club_id: clubDetails.value.id,
  })

  try {
    const res = await fetch(`http://localhost:8000/scrape?${params}`)
    if (!res.ok) {
      const body = await res.text()
      // error.value = 'Could not read that link'
      console.error('Scrape response:', res.status, body)
      error.value = `Scrape failed (${res.status}): ${body}`
      return
    }
    Object.assign(form, await res.json())
    document.getElementById("descriptionField").value = form.description // Assigned seperately due to errors with not being including in form
  } catch(err) {
    console.error('Scrape request error:', err)
    error.value = err instanceof Error ? err.message : String(err)
    // error.value = 'Could not read that link'
  }
  
}

// Handle Event Preview pop up
function openEventCard() {
  openEventCheck.value = true
}
function closeEventCard() {
  openEventCheck.value = false
}

// Handle Confirmation pop up
function askLeavePage() {
  const isFormEmpty = Object.values(form).every(value => value === '')
  if(isFormEmpty){
    router.push('/admin')
  }
  else{
    dialogConfig.value = {
      title: 'Discard Your Changes?',
      message: 'Leaving this page will discard any changes you have made.',
      confirmBtn: 'Discard Changes',
      cancelBtn: 'Stay on Page',
      danger: true,
    }
    showConfirm.value = true
  }
}
function handleConfirmed() {
  router.push('/admin')
}

</script>

<!-- CSS -->
<style scoped>
.fieldContainer{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.bannerLabelContainer{
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  aspect-ratio: 2376 / 1080;
  overflow: hidden;
}

</style>
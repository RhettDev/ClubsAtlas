<!-- 
  File Name: GeneralMeetingPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/admin/new-event
  Purpose: This file holds all HTML, CSS and Javascript for outlining the clubs general meeting,
  no data in or out of this page is implemented due to lack of time.
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

      <!-- Body: List of General Meeting input fields -->
      <section id="eventsList" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">General Meeting Details</h1>
          <hr class="fgHR">
        </div>
        <!-- Check for if the meetings are visible to students -->
        <div class="checkText">
          <input type="checkbox" id="checkbox" v-model="checked" class="checkboxCustom" />
          <p>Make General Meetings Viewable</p>
        </div>
        <hr class="fgHR">
        <div id="inputFields" class="fieldsContainer">
          <!-- Meeting Location -->
          <!-- Half widths were chosen to not overload the page, only need no much space. -->
          <FormField
            v-model="location"
            label="Location"
            placeholder="Where will the meeting be held?"
            width="halfWidth">
          </FormField>
          <!-- Meeting Start Date -->
          <div id="eventDate" class="dateTimeContainer">
            <FormField
              v-model="startDate"
              label="Starting Date"
              placeholder="Date"
              width="quartWidth">
            </FormField>
          </div>
          <!-- Meeting Frequency -->
          <!-- Radio Buttons used for simplicity -->
          <div id="frequencyContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Frequency?</label>
            <div class="checkText">
              <input type="checkbox" id="checkboxW" v-model="frequencyCheck" class="checkboxCustom" />
              <p>Weekly</p>
            </div>
            <div class="checkText">
              <input type="checkbox" id="checkboxF" v-model="frequencyCheck" class="checkboxCustom" />
              <p>Fortnightly</p>
            </div>
            <div class="checkText">
              <input type="checkbox" id="checkboxM" v-model="frequencyCheck" class="checkboxCustom" />
              <p>Monthly</p>
            </div>
          </div>
          <!-- Meeting Time -->
          <!-- Quarter widths were chosen to allow two field in one row and mimic half width -->
          <div id="eventStartEnd" class="dateTimeContainer">
            <FormField
              v-model="startTime"
              label="Meeting Time"
              placeholder="Start"
              width="quartWidth">
            </FormField>
            <!-- Uses label from above -->
            <FormField
              v-model="endTime"
              label=""
              placeholder="End"
              width="quartWidth">
            </FormField>
          </div>
          <!-- Meeting Description -->
          <!-- This description uses FormField as any entered description is expected to be short -->
          <FormField
            v-model="description"
            label="Meeting Description"
            placeholder="Description of the meeting and details members will need. Include times, links and location!"
            width="fullWidth">
          </FormField>
          <!-- Meeting Link -->
          <FormField
            v-model="link"
            label="Associated Link"
            placeholder="Link to social media post or meeting minutes"
            width="halfWidth">
          </FormField>
          <!-- Preview -->
          <div id="previewEventContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Preview Meeting Event</label>
            <BaseButton @click="openEventCard">Preview</BaseButton>
          </div>
          <EventCardPop
            :model-value="openCheck"
            @update:model-value="closeEventCard"
            :eventTitle="clubDetails.title + `General Meeting`"
            :eventDate="``"
            :eventStart="startTime"
            :eventEnd="endTime"
            :eventDescription="description"
            :eventLink="link"
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
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import EventCardPop from '@/components/EventCardPop.vue'
import AdminNavigation from '@/components/AdminNavigation.vue'
import ConfirmationPop from '@/components/ConfirmationPop.vue'
import { useClubData } from '@/composables/useClubData'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { clubDetails } = useClubData()
const openCheck = ref(false)
const startDate = ref(null)
const startTime = ref(null)
const endTime = ref(null)
const location = ref(null)
const description = ref(null)
const link = ref(null)
const dialogConfig = ref({ title: '', message: '', danger: false })
const showConfirm = ref(false)
const router = useRouter()

// Handle Meeting Preview 
function openEventCard() {
  // getEventTags(eventID)
  openCheck.value = true
  console.log("test")
}
function closeEventCard() {
  openCheck.value = false
}

// Handle Confirmation pop up
function askLeavePage() {
  dialogConfig.value = {
    title: 'Discard Your Changes?',
    message: 'Leaving this page will discard any changes you have made.',
    confirmBtn: 'Discard Changes',
    cancelBtn: 'Stay on Page',
    danger: true,
  }
  showConfirm.value = true
}
function handleConfirmed() {
  router.push('/admin')
}
</script>
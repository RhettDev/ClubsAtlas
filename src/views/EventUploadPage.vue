<template>
  <main id="adminMain">
    <HeaderClubs v-if="clubDetails" @click="onHeaderMenuClick" :club="clubDetails" />
    <!-- Mobiel Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <RouterLink variant="primary" class="menuEntry" to="/admin">
        <v-icon name="pr-bars" fill="var(--color-text-1)" scale="1.2"/>
        Dashboard
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry active" to="/admin/new-event" @click="onHeaderMenuClick">
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

    <div class="hero ">
      <section id="sideBar" class="bLeft desktopView">
        <RouterLink variant="primary" class="menuEntry" to="/admin">
          <v-icon name="pr-bars" fill="var(--color-text-1)" scale="1.5"/>
          Dashboard
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry active" to="/admin/new-event">
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

      <section id="Content" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">New Event</h1>
          <hr class="fgHR">
        </div>
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
          <FormField
            v-model="form.title"
            label="Title"
            placeholder="Title of Event"
            width="halfWidth">
          </FormField>
          <!-- Event Start Date and Time -->
          <div id="eventStart" class="dateTimeContainer">
            <FormField
              v-model="form.date"
              label="Start Time"
              placeholder="Date"
              width="quartWidth">
            </FormField>
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
            <FormField
              v-model="form.endTime"
              label=""
              placeholder="Time"
              width="quartWidth">
            </FormField>
          </div>
          <!--  -->
          <FormField
            v-model="form.location"
            label="Location"
            placeholder="Where will the event be held?"
            width="halfWidth">
          </FormField>
          <!-- Event Description -->    
          <div class="fieldContainer">
            <label class="fieldLabel">
              Club Description
            </label>
            <textarea 
              class="formField"
              id="descriptionField"
              v-model="description" 
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
            :model-value="openCheck"
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
          <RouterLink to="/admin">
            <BaseButton>Publish</BaseButton>
          </RouterLink>
          <RouterLink to="/admin">
            <BaseButton>Save</BaseButton>
          </RouterLink>
          <RouterLink to="/admin">
            <BaseButton variant="secondary">Cancel</BaseButton>
          </RouterLink>
        </div>
      </section>

      <section id="analyitcsBar" class="bRightAdmin">
        <!-- Empty -->
      </section>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>


<script setup>
// import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useClubData } from '@/composables/useClubData'
import { reactive, ref } from 'vue'
import EventCardPop from '@/components/EventCardPop.vue'

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
const openCheck = ref(false)

const { clubDetails } = useClubData()
const onHeaderMenuClick = (event) =>{
  console.log(event)
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

async function handleEventScrape() {
  error.value = null
  if (!eventLink.value) {
    error.value = 'Enter a Public TidyHQ event link first'
    return
  }
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
    document.getElementById("descriptionField").value = form.description
  } catch(err) {
    console.error('Scrape request error:', err)
    error.value = err instanceof Error ? err.message : String(err)
    // error.value = 'Could not read that link'
  }
  
}

function openEventCard() {
  // getEventTags(eventID)
  openCheck.value = true
}

function closeEventCard() {
  openCheck.value = false
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
  min-width: 190px;
}

.bLeft a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
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
.bannerLabelContainer img{
  width: 100%;
}

</style>
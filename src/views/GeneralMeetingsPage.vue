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
      <RouterLink variant="primary" class="menuEntry" to="/admin/new-event" >
        <v-icon name="pr-upload" fill="var(--color-text-1)" scale="1.2"/>
        Upload New Event
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-home">
        <v-icon name="pr-home" fill="var(--color-text-1)" scale="1.2"/>
        Update Club Profile
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry active" to="/admin/update-gm" @click="onHeaderMenuClick">
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
        <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
          <v-icon name="pr-upload" fill="var(--color-text-1)" scale="1.5"/>
          Upload New Event
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/update-home">
          <v-icon name="pr-home" fill="var(--color-text-1)" scale="1.5"/>
          Update Club Profile
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry active" to="/admin/update-gm">
          <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.5"/>
          General Meetings
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
          <v-icon name="pr-cog" fill="var(--color-text-1)" scale="1.5"/>
          Settings
        </RouterLink>
      </section>

      <section id="eventsList" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">General Meeting Details</h1>
          <hr class="fgHR">
        </div>
        <div class="checkText">
          <input type="checkbox" id="checkbox" v-model="checked" class="checkboxCustom" />
          <p>Make General Meetings Viewable</p>
        </div>
        <hr class="fgHR">
        <div id="inputFields" class="fieldsContainer">
          <FormField
            v-model="eventLocation"
            label="Location"
            placeholder="Where will the meeting be held?"
            width="halfWidth">
          </FormField>
          <div id="eventDate" class="dateTimeContainer">
            <FormField
              v-model="eventDate"
              label="Starting Date"
              placeholder="Date"
              width="quartWidth">
            </FormField>
          </div>
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
          <div id="eventStartEnd" class="dateTimeContainer">
            <FormField
              v-model="eventStartTime"
              label="Meeting Time"
              placeholder="Start"
              width="quartWidth">
            </FormField>
            <FormField
              v-model="eventEndTime"
              label=""
              placeholder="End"
              width="quartWidth">
            </FormField>
          </div>
          <FormField
            v-model="paragraph"
            label="Meeting Description"
            placeholder="Description of the meeting and details members will need. Include times, links and location!"
            width="fullWidth">
          </FormField>
          <FormField
            v-model="link"
            label="Associated Link"
            placeholder="Link to social media post or meeting minutes"
            width="halfWidth">
          </FormField>
          <!-- Preview -->
          <div id="previewEventContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Preview Meeting Event</label>
            <BaseButton>Preview</BaseButton>
          </div>
        </div>
        <hr class="fgHR">
        <div id="saveCancelButtons" class="buttonRow">
          <BaseButton>Publish</BaseButton>
          <BaseButton>Save</BaseButton>
          <BaseButton variant="secondary">Cancel</BaseButton>
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
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import { useClubData } from '@/composables/useClubData'


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


</style>
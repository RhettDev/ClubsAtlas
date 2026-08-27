<template>
  <main id="adminMain">
    <HeaderClubs @click="onHeaderMenuClick"></HeaderClubs>
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

    <div class="hero desktopView">
      <section id="sideBar" class="bLeft">
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
            variant="halfWidth">
          </FormField>
          <BaseButton>Submit</BaseButton>
        </div>
        <hr class="fgHR">
        <div id="inputFields" class="fieldsContainer">
          <FormField
            v-model="eventTitle"
            label="Title"
            placeholder="Title of Event"
            variant="halfWidth">
          </FormField>
          <div id="eventStart" class="dateTimeContainer">
            <FormField
              v-model="eventDate"
              label="Start Time"
              placeholder="Date"
              variant="quartWidth">
            </FormField>
            <FormField
              v-model="eventStartTime"
              label=""
              placeholder="Time"
              variant="quartWidth">
            </FormField>
          </div>
          <div id="eventEnd" class="dateTimeContainer">
            <FormField
              v-model="eventDate"
              label="End Time"
              placeholder="Date"
              variant="quartWidth">
            </FormField>
            <FormField
              v-model="eventStartTime"
              label=""
              placeholder="Time"
              variant="quartWidth">
            </FormField>
          </div>
          <FormField
            v-model="paragraph"
            label="Event Description"
            placeholder="Description of the event and details guests will need. Include times, links and location!"
            variant="fullWidth">
          </FormField>
          <!-- image upload -->
          <FormField
            v-model="link"
            label="External Link"
            placeholder="Link to ticket page or social media post"
            variant="halfWidth">
          </FormField>
          <!-- Tags -->
          <div id="previewEventContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Preview Event</label>
            <BaseButton>Public Event</BaseButton>
          </div>

        </div>
        <hr class="fgHR">
        <div id="saveCancelButtons" class="buttonContainer">
          <BaseButton>Publish</BaseButton>
          <BaseButton>Save</BaseButton>
          <BaseButton variant="secondary">Cancel</BaseButton>
        </div>
      </section>

      <section id="analyitcsBar" class="bRight">
        <!-- Empty -->
      </section>
    </div>
    
    <div class="hero mobileView">
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
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
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
  min-width: 190px;
}

.bLeft a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.bRight {
  flex: 0.7;
  box-shadow: -2px 0px var(--color-background-2);
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

.backdrop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;
}
.backdrop.show { display: block; }


</style>
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
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
        <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.2"/>
        General Meetings
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry active" to="/admin/settings" @click="onHeaderMenuClick">
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
        <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
          <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.5"/>
          General Meetings
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry active" to="/admin/settings">
          <v-icon name="pr-cog" fill="var(--color-text-1)" scale="1.5"/>
          Settings
        </RouterLink>
      </section>

      <section id="settings" class="bCenterAdmin">
        <!-- Account Settings -->
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Account Settings</h1>
          <hr class="fgHR" />
        </div>
        <div class="fieldButtonContainer" id="changeEmail">
          <FormField
            v-model="changeEmail"
            label="Account Email"
            placeholder="club@domain.com"
            variant="halfWidth"
          >
          </FormField>
        </div>
        <div class="buttonLabelContainer" id="resetPassword">
          <p class="fieldLabel">Send Password Reset Email</p>
          <BaseButton>Reset Password</BaseButton>
        </div>
        <div class="buttonLabelContainer" id="signOut">
          <p class="fieldLabel">Sign Out of Your Account</p>
          <RouterLink to="/">
            <BaseButton @click="signOut">Sign Out</BaseButton>
          </RouterLink>
        </div>

        <!-- Preferences -->
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Prefernces</h1>
          <hr class="fgHR" />
        </div>
        <div id="themeContainer" class="buttonLabelContainer">
          <label class="fieldLabel">App Theme</label>
          <form>
            <label class="fieldLabel">
              <input type="radio" name="theme" value="light" class="checkboxCustom" v-model="selectedTheme" @change="setLightMode"> Light Mode
            </label>
            <label class="fieldLabel">
              <input type="radio" name="theme" value="dark" class="checkboxCustom" v-model="selectedTheme" @change="setDarkMode"> Dark Mode
            </label>
          </form>
        </div>
        <div class="buttonContainer" id="timeFormat">
          <p class="fieldLabel">Preferred Time Format</p>
          <DropDown v-model="timeFormat" :options="timeOptions"></DropDown>
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
import DropDown from '@/components/DropDown.vue'
import { useClubData } from '@/composables/useClubData'
import { supabase } from '../../backend/supabase'
import { setDarkMode, setLightMode } from '@/composables/miscFunctions'
import { ref } from 'vue'

const { clubDetails } = useClubData()
const selectedTheme = ref(document.documentElement.dataset.theme || 'dark')

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
const timeOptions = ['AM/PM', '24-Hour']

async function signOut(){
  const { error } = await supabase.auth.signOut({ scope: 'local' })
  console.error(error)
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
  flex: 0.7;
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
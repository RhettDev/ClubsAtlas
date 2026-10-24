<!-- 
  File Name: HeaderClubs.vue
  Author: Rhett Bauchop - 20722517
  Purpose: Header for club pages, being personalised for logged in club
  Use Cases: AdminPage, EventUpload, ClubProfile, GeneralMeeting, AdminSettings
-->

<!-- HTML -->
<template>
  <section class="header clubHeader">
    <div class="clubLogoName">
      <div class="mobileText menuButton">
        <v-icon
          class="menuButton"
          name="pr-bars"
          fill="var(--color-text-1)"
          scale="1.6"
          @click="onHeaderMenuClick"
        />
      </div>
      <img
        class="clubLogo"
        :src="`/images/clubLogos/${club.logoURL}`"
        :style="{ borderColor: club.hexCode }"
        alt="clubLogo"
      />
      <!-- Length of club name based on platform -->
      <h2 class="desktopText">{{ club.name }}</h2>
      <h2 class="mobileText">{{ club.acronym }}</h2>
    </div>
    <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
  </section>
  <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu mobileView">
      <!-- Navigation links for Mobile -->
      <AdminNavigation></AdminNavigation> 
    </div>
</template>

<!-- JAVASCRIPT -->
<script setup>
import AdminNavigation from './AdminNavigation.vue';

defineProps({
  club: { type: Object, required: true },
})

// Manage visibility of the mobile menu
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

<!-- CSS -->
<style scope>
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 1px var(--color-shadow);
  background-color: var(--color-background-1);
  position: sticky; /* Ensures header stays at the top of the page */
  top: 0;
  z-index: 100; /* Ensures header is at the front of the render */
  color: var(--color-text-1);
}
.header.clubHeader {
  justify-content: space-between;
  padding: 16px 8px;
}

.clubDetails {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.menuButton {
  cursor: pointer;
}

.desktopText {
  display: none;
}

@media screen and (min-width: 688px) {
  .desktopText {
    display: block;
  }
  .mobileText {
    display: none;
  }
}
</style>

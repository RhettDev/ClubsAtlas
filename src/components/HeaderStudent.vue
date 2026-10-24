<!-- 
  File Name: HeaderStudent.vue
  Author: Rhett Bauchop - 20722517
  Purpose: Header for students, containing calendar controls and link to user settings page
  Use Cases: Calendar
-->

<!-- HTML -->
<template>
  <section class="header studentHeader">
    <div id="left" class="headerLeft">
      <div class="mobileView">
        <!-- Menu icon with emit, Calendar uses to open drop down -->
        <v-icon id="barsMenu" class="pointer" name="pr-bars" fill="var(--color-text-1)" scale="1.6" @click="$emit('click', $event)"/>
      </div>

      <div class="desktopView">
        <BaseButton @click="goToToday">Today</BaseButton>
      </div>
      <!-- ShiftPeriod calls calendar -->
      <v-icon class="chevControl" name="pr-chevron-left" fill="var(--color-text-1)" scale="1.5" @click="shiftPeriod(-1)"/>
      <v-icon class="chevControl" name="pr-chevron-right" fill="var(--color-text-1)" scale="1.5" @click="shiftPeriod(1)"/>
      <span class="displayLabel">{{ displayLabel }}</span>

    </div>

    <div id="right" class="headerRight">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <RouterLink to="/settings" class="desktopView">
        <v-icon name="pr-user" fill="var(--color-text-1)" scale="2" />
      </RouterLink>
    </div>
  </section>
</template>

<!-- JAVASCRIPT -->
<script setup>
import BaseButton from './BaseButton.vue'
import { calendar } from '@/composables/calender'
const { displayLabel, goToToday, shiftPeriod } = calendar()

defineEmits(['click'])
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
  position: sticky; /* Ensures header stays at the top of the page, but since page cannot scroll not an issue */
  top: 0;
  z-index: 100; /* Ensures header is at the front of the render */
  color: var(--color-text-1);
}
.header.studentHeader {
  justify-content: space-between;
  padding: 10px 8px;
}

.headerLeft,
.headerRight {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.clubLogo {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.clubLogoText {
  font-weight: 200;
  color: var(--color-text-1);
}

.displayLabel{
  color: var(--color-text-1);
  /* padding: 16px; */
  font-size: larger;
}

.chevControl:hover{
  background-color: var(--color-background-2);
  border-radius: 16px;
  cursor: pointer;
}
.chevControl:active{
  transform: scale(0.9);
}
</style>

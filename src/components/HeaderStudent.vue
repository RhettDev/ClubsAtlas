<template>
  <section class="header studentHeader">
    <div id="left" class="headerLeft">
      <v-btn class="mobileView menuButton" icon @click="$emit('click', $event)">
        <v-icon class="mobileView" name="pr-bars" fill="var(--color-text-1)" scale="1.6" />
      </v-btn>

      <BaseButton @click="goToToday">Today</BaseButton>
      <v-icon class="chevControl" name="pr-chevron-left" fill="var(--color-text-1)" scale="1.5" @click="shiftPeriod(-1)"/>
      <v-icon class="chevControl" name="pr-chevron-right" fill="var(--color-text-1)" scale="1.5" @click="shiftPeriod(1)"/>
      <span class="displayLabel">{{ displayLabel }}</span>

    </div>

    <div id="right" class="headerRight">
      <div id="formatContainerTEMP" class="desktopView">
        <BaseButton>Month</BaseButton>
        <BaseButton>Week</BaseButton>
      </div>
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <RouterLink to="/settings">
        <v-icon class="mobileView" name="pr-user" fill="var(--color-text-1)" scale="2" />
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import { calendar } from '@/composables/calender'
const { displayLabel, goToToday, shiftPeriod } = calendar()


defineEmits(['click'])
</script>

<style scope>
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 1px var(--color-shadow);
  background-color: var(--color-background-1);
  position: sticky;
  top: 0;
  z-index: 100;
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

.menuButton {
  cursor: pointer;
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

.desktopView {
  display: none;
}

@media screen and (min-width: 688px) {
  .desktopView {
    display: block;
  }
  .mobileView {
    display: none;
  }
}

</style>

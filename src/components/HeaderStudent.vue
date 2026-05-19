<template>
  <section class="header studentHeader">
    <div id="left" class="headerLeft">
      <v-btn class="mobileView menuButton" icon @click="$emit('click', $event)">
        <v-icon class="mobileView" name="pr-bars" inverse scale="1.6" />
      </v-btn>
      <CalendarControls>
        <template #month>April</template>
        <template #year>2026</template>
      </CalendarControls>
    </div>

    <div id="right" class="headerRight">
      <div id="formatContainerTEMP" class="desktopView">
        <BaseButton>Month</BaseButton>
        <BaseButton>Week</BaseButton>
      </div>
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <RouterLink to="/userSettings">
        <v-icon class="mobileView" name="pr-user" inverse scale="2" />
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import CalendarControls from './CalendarControls.vue'

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

.month,
.year {
  color: var(--color-text-1);
  padding: 16px;
}
</style>

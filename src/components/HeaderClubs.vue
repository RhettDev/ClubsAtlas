<template>
  <section class="header clubHeader">
    <div class="clubLogo">
      <v-btn class="mobileText menuButton" icon @click="$emit('click', $event)">
        <v-icon class="mobileText" name="pr-bars" fill="var(--color-text-1)" scale="1.5" />
      </v-btn>
      <img class="logo" src="../assets/logos/clubCECLogo.svg" alt="Curtin Engineers Club Logo" />
      <h2 class="desktopText">Curtin Engineers Club (CEC)</h2>
      <h2 class="mobileText">CEC</h2>
      <!-- <slot name="clubName" class="clubLogoText"></slot> -->
    </div>
    <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
  </section>
</template>

<script setup>
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
  /* padding: 16px 0; */
}
.header.clubHeader {
  justify-content: space-between;
  padding: 16px 8px;
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

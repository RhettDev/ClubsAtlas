<template>
  <section class="header clubHeader">
    <div class="clubLogoName">
      <div class="mobileText menuButton">
        <v-icon class="menuButton" name="pr-bars" fill="var(--color-text-1)" scale="1.6" @click="$emit('click')"/>
      </div>
      <img class="clubLogo" :src="club.logoURL" :style="{borderColor: club.hexCode}" alt="clubLogo" />
      <h2 class="desktopText">{{club.name}}</h2>
      <h2 class="mobileText">{{club.acronym}}</h2>
      <!-- <slot name="clubName" class="clubLogoText"></slot> -->
    </div>
    <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
  </section>
</template>

<script setup>

defineEmits(['click'])

const props = defineProps({
  club: { type: Object, required: true },
})
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

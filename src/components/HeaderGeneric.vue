<template>
  <section class="header">
    <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
    <h1>ClubsAtlas</h1>
  </section>
</template>

<script setup></script>

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
  padding: 16px 0;
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
</style>

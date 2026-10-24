<!-- 
  File Name: LandingPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/
  Purpose: Landing page of the website, with HTML, CSS and Javascript. 
  Introduces platform and directs to either sign up or login
-->

<!-- HTML -->
<template>
  <main id="landing">
    <!-- Generic Header compaired to a student or clubs version -->
    <HeaderBar></HeaderBar>
    <!-- Hero Section: Generic Landing page with login/signup buttons-->
    <section class="centerHero">
      <div class="subhero">
        <h1 class="title">Make the most of <span class="brandText">every</span> year</h1>
        <p>
          University is more than lectures and labs. The ClubsAtlas helps you discover the clubs that match what
          <br />you're into, stay on top of the events worth showing up for, and build a social life
          <br />you'll actually remember.
        </p>
      </div>

      <div class="buttonRow">
        <!-- RouterLink navigates without a full page reload -->
        <RouterLink to="/signup">
          <BaseButton variant="primary">Get started for free</BaseButton>
        </RouterLink>
        <RouterLink to="/login">
          <BaseButton variant="secondary">Login</BaseButton>
        </RouterLink>
      </div>
    </section>

    <FooterBar></FooterBar>
  </main>
</template>

<!-- JAVASCRIPT -->
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderBar from '@/components/HeaderGeneric.vue'
</script>

<!-- CSS -->
<style scoped>
.subhero {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(10px, 1fr));
  gap: 32px;
  color: var(--color-text-1);
  margin: 32px;
}
</style>
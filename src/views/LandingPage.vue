<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <main id="landing">
    <section class="header">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <h1>ClubsAtlas</h1>
    </section>
    <!-- Hero Section -->
    <section class="hero">
      <div class="subhero">
        <p class="subtitle">MAP THE EVENTSCAPE OF UNI</p>
        <h1>Make the most of every year</h1>
        <p>
          University is more than lectures. ClubsAtlas helps you discover the clubs that match what
          you're into, stay on top of the events worth showing up for, and build a social life
          you'll actually remember.
        </p>
      </div>

      <div class="cta-buttons">
        <!-- RouterLink navigates without a full page reload -->
        <RouterLink to="/signup">
          <BaseButton variant="primary">Get started for free</BaseButton>
        </RouterLink>
        <RouterLink to="/login">
          <BaseButton variant="secondary">Login</BaseButton>
        </RouterLink>
      </div>
    </section>

    <section class="footer">
      <p>Terms - Privacy - Contact</p>
      <!-- <RouterLink to="/login">Terms</RouterLink>
      <p>-</p>
      <RouterLink to="/login">Privacy</RouterLink>
      <p>-</p>
      <RouterLink to="/login">Contact</RouterLink> -->
    </section>
  </main>
</template>

<style scoped>
.hero {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex: 1;
}

.subhero {
  display: inline-flex;
  flex-direction: column;
  width: 40%;
  gap: 16px;
  color: var(--color-text);
}

.subtitle {
  font-size: medium;
  color: var(--color-brandText);
}
</style>

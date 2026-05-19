<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderBar from '@/components/HeaderGeneric.vue'
</script>

<template>
  <main id="landing">
    <HeaderBar></HeaderBar>
    <!-- Hero Section -->
    <section class="hero">
      <div class="subhero">
        <p class="subtitle">MAP THE EVENTSCAPE OF UNI</p>
        <h1 class="title">Make the most of <span class="brandText">every</span> year</h1>
        <p>
          University is more than lectures. ClubsAtlas helps you discover the clubs that match what
          <br />you're into, stay on top of the events worth showing up for, and build a social life
          <br />you'll actually remember.
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
        <RouterLink to="/admin">
          <BaseButton variant="secondary">AdminView</BaseButton>
        </RouterLink>
      </div>
    </section>

    <FooterBar></FooterBar>
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
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(10px, 1fr));
  gap: 1rem;
  color: var(--color-text-1);
}

.subtitle {
  font-size: medium;
  color: var(--color-brandText);
}

.brandText {
  color: var(--color-brandText);
}
</style>

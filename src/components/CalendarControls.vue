<template>
  <section class="controlContainer">
    <div class="desktopView"><BaseButton>Today</BaseButton></div>
    <div class="dateContainer">
      <slot name="month" class="month">Month</slot>
      <div class="desktopView"><slot name="year" class="year">Year</slot></div>
    </div>
    <div class="prevNextContainer">
      <v-icon name="pr-chevron-left" inverse scale="1.5" />
      <v-icon name="pr-chevron-right" inverse scale="1.5" />
    </div>
  </section>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineEmits(['click'])
</script>

<style scope>
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

.controlContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.dateContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: larger;
}

.prevNextContainer {
  display: flex;
  flex-direction: row;
}

.month,
.year {
  color: var(--color-text-1);
  padding: 16px;
}
</style>

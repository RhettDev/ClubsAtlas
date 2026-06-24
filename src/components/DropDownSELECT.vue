<template>
  <select v-model="selectedItem" class="dropdown">
    <option disabled value="" class="dropTitle"><slot name="title">Dropdown</slot></option>
    <option v-for="option in options" :key="option.id" :value="option.value" class="dropTitle">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const selectedItem = ref('')
const options = ref([
  { id: 1, text: 'Option A', value: 'a', selected: 'f' },
  { id: 2, text: 'Option B', value: 'b', selected: 'f' },
  { id: 3, text: 'Option C', value: 'c', selected: 'f' },
  { id: 4, text: 'Option D', value: 'd', selected: 'f' },
  { id: 5, text: 'Option E', value: 'e', selected: 'f' },
  { id: 6, text: 'Option F', value: 'f', selected: 'f' },
  { id: 7, text: 'Option G', value: 'g', selected: 'f' },
])
</script>

<style scope>
.dropdown {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 6px;
  padding: 10px 14px;
  font-size: large;
  border-radius: 16px;
  border: 2px solid var(--ca-brand-blue-1);
  background: var(--color-background-1);
  color: var(--color-text-1);
  justify-content: space-between;
}

.dropdown p {
  margin: 0;
}

.dropTitle {
  font-family: AtkinsonHyperLegible;
  src: url(../fonts/AtkinsonHyperlegible/AtkinsonHyperlegible-Regular.ttf);
}
</style>

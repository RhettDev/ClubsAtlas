<template>
  <div class="dropdown" ref="dropDownRef">
    <div class="dropdownSelected" @click="isOpen = true">
      {{ mappedSelected }}
    </div>
    <div class="dropdownOptions" v-if="isOpen">
      <div
        class="option"
        v-for="option in props.options"
        :key="option"
        @click="toggleOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  value: {
    default: null,
  },
})

const emit = defineEmits(['update:value'])

const isOpen = ref(false)
const dropDownRef = ref(null)
const selectedOption = ref(null)

const outsideClick = (element) => {
  if (!dropDownRef.value.contains(element.target)) {
    isOpen.value = false
  }
}

const mappedSelected = computed(() => {
  return selectedOption.value?.name || selectedOption.value || 'Select Below'
})

const toggleOption = (option) => {
  selectedOption.value = option
  emit('update:value', option)
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', outsideClick)
})
onUnmounted(() => {
  document.removeEventListener('click', outsideClick)
})
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

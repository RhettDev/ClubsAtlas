<template>
  <div class="dropdown" ref="dropDownRef" @click="isOpen = true">
    <div class="dropdownSelected" >
      <div id="selectedOption">
        {{ mappedSelected }}
      </div>
      <div id="chevron" v-if="isOpen"><v-icon name="pr-chevron-up" fill="var(--color-text-1)" scale="1.5" /></div>
      <div id="chevron" v-else-if="isOpen === false"><v-icon name="pr-chevron-down" fill="var(--color-text-1)" scale="1.5" /></div>
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
  return selectedOption.value?.name || selectedOption.value || 'None Selected'
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
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 6px;
  padding: 10px 14px;
  font-size: large;
  border-radius: 16px;
  border: 2px solid var(--ca-brand-blue-1);
  background: var(--color-background-1);
  color: var(--color-text-1);
  position: relative;
}

.dropdownSelected{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.dropdownOptions {
  text-align: start;
  width: 100%;
  position: absolute;
  top: 100%;   
  left: 0;
  z-index: 100;
  border-radius: 16px;
  border: 2px solid var(--ca-brand-blue-1);
  background: var(--color-background-1);
  padding: 10px 14px;
}

.option{
  display: flex;
  width: 100%;
  gap: 8px;
  padding: 4px 0;
  /* position: absolute; */
}

.option:hover{
  background-color: var(--color-background-2);
  border-radius: 8px;
}

.dropdown p {
  display: flex;
  margin: 0;
}

.dropTitle {
  font-family: AtkinsonHyperLegible;
  src: url(../fonts/AtkinsonHyperlegible/AtkinsonHyperlegible-Regular.ttf);
}
</style>

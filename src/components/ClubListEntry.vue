<template>
  <li >
    <div class="clubRow" @click="emit('toggle')" :class="{open: isOpen}">
      <span class="clubName">{{ club.name }}</span>
      <v-icon name="pr-chevron-down" fill="var(--color-text-1)" scale="1.5" class="chevron" :class="{open: isOpen}"/>
    </div>

    <div v-if="isOpen" class="dropdownMenu">
      <div class="dropdownOption">
        <p>Toggle Club Display</p>
        <input type="checkbox" id="clubDisplay" v-model="checkedOptions" class="checkboxCustom" />
      </div>
      <div class="dropdownOption">
        <p>Toggle General Meeting</p>
        <input type="checkbox" id="generalMeeting" v-model="checkedOptions" class="checkboxCustom" />
      </div>
      <div class="dropdownOption">
        <p>View Club Profile</p>
        <v-icon name="pr-info-circle" fill="var(--color-text-1)" scale="1.3"/>
      </div>
      <div class="dropdownOption">
        <p>Remove Club From Calendar</p>
        <v-icon name="pr-trash" fill="var(--color-text-1)" scale="1.3"/>
      </div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  club: { type: Object, required: true },
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle', 'selectOption'])

</script>

<style scoped>

.clubRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  cursor: pointer;
  text-align: left;
  color: var(--color-text-1);
}
.clubRow.open{
  border-bottom: 2px solid var(--color-brandText);
}
.clubRow:hover {
  border-bottom: 1px solid var(--color-brandText);

}

.chevron {
  transition: transform 0.15s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.dropdownMenu {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0 0.5rem;
}

.dropdownOption {
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.dropdownOption:hover {
  background: var(--color-brandText-2);
  border-radius: 16px;
}

.checkboxCustom {
  margin: 0 8px;
}
</style>
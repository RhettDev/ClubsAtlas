<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div id="container" class="container">
        <div v-if="eventImage" class="eventImageContainer">
          <img :src="eventImage" alt="Event image" />
        </div>
        <div id="eventDetails" class="eventDetails">
          <div id="topRow" class="contentRow spaced">
            <div id="titleClubName" class="contentRow">
              <h2>{{ eventTitle }} - {{ clubName }}</h2>
            </div>
            <v-icon name="pr-times" fill="var(--color-text-1)" scale="1.5" @click="close"></v-icon>
          </div>
          <div id="dateTimeRow" class="contentRow">
            <div>{{ convertToFullDate(eventDate) }} {{ convertTo12Hour(eventStart) }} - {{ convertTo12Hour(eventEnd) }}</div>
          </div>
          <div id="location" v-if="hasValue(eventLocation)">
            <p>{{ eventLocation }}</p>
          </div>
          <div id="tags" class="contentRow"></div>
        </div>
        <p id="description" class="descriptionContainer">{{ formatDescription(eventDescription) }}</p>
        <div id="bottomRow" class="contentRow spaced">
          <a :href="eventLink" target="_blank" rel="noopener noreferrer">
            <BaseButton variant="primary">Event Link</BaseButton>
          </a>
          <v-icon name="pr-map" fill="var(--color-text-1)" scale="1.5"></v-icon>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import { convertTo12Hour, convertToFullDate } from '@/composables/miscFunctions'

defineProps({
  modelValue: { type: Boolean, default: false },
  clubName: { type: String, default: 'Error! Missing Club Name Data.' },
  eventTitle: { type: String, default: 'Error! Missing Event Title Data' },
  eventDate: { type: String, default: 'Error! Missing Event Data' },
  eventLocation: { type: String, default: '' },
  eventStart: { type: String, default: 'Error! Missing Event Data' },
  eventEnd: { type: String, default: 'Error! Missing Event Data' },
  eventDescription: { type: String, default: 'Error! Missing Event Data' },
  eventImage: { type: String, default: '' },
  eventLink: { type: String, default: 'Error! Missing Event Data' },
  danger: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function close() {
  emit('update:modelValue', false)
}

function hasValue(value) {
  return value != null && String(value).trim().toLowerCase() !== 'null'
}

function formatDescription(value) {
  return String(value ?? '').replace(/\\n/g, '\n')
}

// function handleAddToFollowing() {
//   emit('confirm')
//   emit('update:modelValue', false)
// }
</script>

<style scope>
.container {
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  background-color: var(--color-background-2);
  width: 40%;
  padding: 20px;
  color: var(--color-text-1);
  gap: 20px;
  max-height: 90vh;
  overflow: hidden;
}

.contentRow {
  display: flex;
  flex-direction: row;
}

.spaced {
  justify-content: space-between;
}

.eventDetails {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.descriptionContainer{
  min-height: 0;
  max-height: 30vh;
  overflow-y: auto;
  white-space: pre-line;
}

.eventImageContainer {
  width: 100%;
  aspect-ratio: 2376 / 1080;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 32px;
}

.eventImageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.mobileCotent {
  flex-direction: column;
  align-items: start;
}
</style>

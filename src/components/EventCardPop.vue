<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div id="container" class="popUpContainer eventWidth mobileContainer">
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
            <div>
              {{ convertToFullDate(eventDate) }} {{ convertTo12Hour(eventStart) }} -
              {{ convertTo12Hour(eventEnd) }}
            </div>
          </div>
          <div id="location" v-if="hasValue(eventLocation)">
            <p>{{ eventLocation }}</p>
          </div>
          <div id="tags" class="contentRow"></div>
        </div>
        <p id="description" class="descriptionContainer">
          {{ formatDescription(eventDescription) }}
        </p>
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
import {
  convertTo12Hour,
  convertToFullDate,
  hasValue,
  formatDescription,
} from '@/composables/miscFunctions'

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
</script>

<style scope>
.eventWidth {
  width: 40%;
}

.eventDetails {
  display: flex;
  flex-direction: column;
  gap: 6px;
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

@media screen and (max-width: 688px) {
  .mobileContainer {
    width: 90%;
  }
}
</style>

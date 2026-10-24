<!-- 
  File Name: EventCardPop.vue
  Author: Rhett Bauchop - 20722517
  Purpose: General component for a DropDown menu, opening upwards to avoid dealing with collision with bottom of the screen
  Use Cases: CalendarPage, AdminPage, EventUploadPage, 
-->

<!-- HTML -->
<template>
  <Teleport to="body"> <!-- Teleport used to jump element to center front-->
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div id="container" class="popUpContainer eventWidth mobileContainer">
        <!-- Event Image -->
        <div v-if="eventImage" class="eventImageContainer"> <!-- V-IF for images due to load times -->
          <img :src="`/images/eventImages/${eventImage}`" alt="Event image" />
        </div>
        <div id="eventDetails" class="eventDetails">
          <div id="topRow" class="contentRow spaced">
            <div v-if="!clubName" id="title" class="contentRow"> <!-- Event Title for Mobile -->
              <h2>{{ eventTitle }}</h2>
            </div>
            <div v-else id="titleClubName" class="contentRow"> <!-- Event Title and Club Name for Desktop -->
              <h2>{{ eventTitle }} - {{ clubName }}</h2>
            </div>
            <v-icon class="pointer" name="pr-times" fill="var(--color-text-1)" scale="1.5" @click="close"></v-icon>
          </div>
          <div id="dateTimeRow" class="contentRow"> <!-- Event Date and Time-->
            <div>
              {{ convertToFullDate(eventDate) }} {{ convertTo12Hour(eventStart) }} -
              {{ convertTo12Hour(eventEnd) }}
            </div>
          </div>
          <div id="location" v-if="hasValue(eventLocation)"> <!-- Event Location, optional but encouraged field-->
            <p>{{ eventLocation }}</p>
          </div>
          <div id="tags" class="contentRow"></div>
        </div>
        <p id="description" class="descriptionContainer"> <!-- Event Description -->
          {{ formatDescription(eventDescription) }}
        </p>
        <div id="tagsContainer" class="tagContainer"> <!-- Event Tags -->
          <div v-for="tag in eventTags" :key="tag" :class="tag.tagSlug" id="tagItem" class="tag">
            {{ tag.tagName }}
          </div>
        </div>
        <div id="bottomRow" class="contentRow spaced">
          <a :href="eventLink" target="_blank" rel="noopener noreferrer">
            <BaseButton variant="primary">Event Link</BaseButton>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<!-- JAVASCRIPT -->
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
  clubName: { type: String, default: null },
  eventID: { type: Number, default: 0 },
  eventTitle: { type: String, default: 'Error! Missing Event Title Data' },
  eventDate: { type: String, default: 'Error! Missing Event Data' },
  eventLocation: { type: String, default: '' },
  eventStart: { type: String, default: 'Error! Missing Event Data' },
  eventEnd: { type: String, default: 'Error! Missing Event Data' },
  eventDescription: { type: String, default: 'Error! Missing Event Data' },
  eventImage: { type: String, default: '' },
  eventLink: { type: String, default: 'Error! Missing Event Data' },
  eventTags: { type: Array, default: () => [] },
  danger: { type: Boolean, default: false },
})

// Allow parent caller to perform actions
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
function close() {
  emit('update:modelValue', false)
}

</script>

<!-- CSS -->
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

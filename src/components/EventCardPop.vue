<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div id="container" class="container">
        <img />
        <div id="topRow" class="contentRow">
          <div id="titleClubName">
            <h3>{{ eventTitle }}</h3>
            <p>&nbsp;-&nbsp;</p>
            <h3>{{ clubName }}</h3>
          </div>
          <v-icon name="pr-times" fill="var(--color-text-1)" scale="1.5" @click="close"></v-icon>
        </div>
        <div id="dateTimeRow">
          <div>{{ eventDate }}</div>
          <div>{{ eventStart }}</div>
          <p>&nbsp;-&nbsp;</p>
          <div>{{ eventEnd }}</div>
        </div>
        <h3 id="location">{{ eventLocation }}</h3>
        <div id="bottomHalf">
          <p id="description">{{ eventDescription }}</p>
          <div id="bottomRow">
            <RouterLink to="eventLink">
              <BaseButton variant="primary">Event Link</BaseButton>
            </RouterLink>
            <v-icon name="pr-map" fill="var(--color-text-1)" scale="1.5"></v-icon>
          </div>
        </div>
        <div id="bottomRow" class="contentRow">
          <div id="tags"></div>
          <div id="attachToProfile"></div>
        </div>
        <div id="showcaseEvent"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  clubName: { type: String, default: 'Error! Missing Club Name Data.' },
  eventTitle: { type: String, default: 'Error! Missing Event Title Data' },
  eventDate: { type: String, default: 'Error! Missing Event Data' },
  eventLocation: { type: String, default: 'Error! Missing Event Data' },
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
}

.contentRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.mobileCotent {
  flex-direction: column;
  align-items: start;
}
</style>

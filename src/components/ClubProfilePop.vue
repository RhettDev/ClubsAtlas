<template>
  <div id="popContainer" class="container">
    <img src="eventImage" />
    <div id="topRow" class="contentRow">
      <div id="titleClubName">
        <h3>{{ eventTitle }}</h3>
        <p>&nbsp;-&nbsp;</p>
        <h3>{{ clubName }}</h3>
      </div>
      <v-icon name="pr-times" fill="var(--color-text-1)" scale="1.5"></v-icon>
    </div>
    <p id="description"></p>
    <div id="bottomRow" class="contentRow">
      <div id="tags"></div>
    </div>
    <div id="showcaseEvent"></div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  clubName: { type: String, default: 'Error! Missing Club Name Data.' },
  addToFollowing: { type: String, default: 'Add to Calendar.' },
  removeFromFollowing: { type: String, default: 'Remove from Calendar.' },
  danger: { type: Boolean, default: false },
})

// const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

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

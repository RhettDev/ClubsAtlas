<!-- 
  File Name: confirmationPop.vue
  Author: Rhett Bauchop - 20722517
  Purpose: General component for a connfirmation message, with two options
  Use Cases: ClubListEntry, ClubProfilePage
-->

<!-- HTML -->
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="handleCancel">
      <div class="dialogContainer">
        <h2 class="dialogTitle">{{ title }}</h2>
        <p class="dialogMessage">{{ message }}</p>
        <div class="dialogButtonContainer">
          <BaseButton @click="handleCancel" variant="secondary">{{ cancelBtn }}</BaseButton>
          <BaseButton @click="handleConfirm" variant="primary" :class="{ danger }">
            {{ confirmBtn }}
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<!-- JAVASCRIPT -->
<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Wait!' },
  message: { type: String, default: 'Are you sure you want to continue with this action?' },
  confirmBtn: { type: String, default: 'Confrim.' },
  cancelBtn: { type: String, default: 'Cancel.' },
  danger: { type: Boolean, default: false },
})

// Send button processing to caller
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<!-- CSS -->
<style scope>

.dialogContainer {
  background: var(--color-background-2);
  border-radius: 8px;
  flex-direction: column;
  padding: 16px 32px;
  max-width: 30%;
  display: flex;
  align-items: center;
  text-align: center;
}

.dialogTitle {
  color: var(--color-text-1);
}

.dialogMessage {
  color: var(--color-text-1);
}

.dialogButtonContainer {
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  gap: 8px;
}

@media screen and (max-width: 688px) {
  .dialogButtonContainer {
    flex-direction: column;
  }
  .dialogContainer{
    max-width: 80%;
  }
}
</style>

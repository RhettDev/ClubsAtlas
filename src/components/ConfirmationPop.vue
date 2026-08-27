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

<style scope>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialogContainer {
  background: var(--color-background-2);
  border-radius: 8px;
  flex-direction: column;
  padding: 8px 16px;
  max-width: 40%;
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
}
</style>

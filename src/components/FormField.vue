<!-- 
  File Name: FormField.vue
  Author: Rhett Bauchop - 20722517
  Purpose: General component for a DropDown menu, opening upwards to avoid dealing with collision with bottom of the screen
  Use Cases: EventUploadPage, ClubProfilePage, GeneralMeetingPage, UserSettings, AdminSettings 
-->

<!-- HTML -->
<template>
  <div 
    :class="[
      'fieldContainer', 
      `fieldContainer--${width}`,
      `fieldContainer--${height}`
      ]">
    <label v-if="showLabel" class="fieldLabel"> <!-- Show optional label-->
      {{ label }}
    </label>
    <!-- Input Field with full control for parent -->
    <input 
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      class="formField"
      @input="$emit('update:modelValue', $event.target.value)"/>
  </div>
</template>

<!-- JAVASCRIPT -->
<script setup>
defineProps({
  width: {
    type: String,
    default: 'halfWidth',
    validator: (v) => ['halfWidth', 'fullWidth', 'mobile'].includes(v),
  },
  // Planned height prop, designed for Description type inputs where more text is required than one line.
  // Currently using <textarea> for description
  height: {
    type: String,
    default: 'halfWidth',
    validator: (v) => ['singleLine', 'descHeight'].includes(v),
  },
  label: { type: String, default: ''},
  showLabel: { type: Boolean, default: true }, 
  placeholder: { type: String, default: 'Enter Field Data' },
  disabled: { type: Boolean, default: false },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
})

defineEmits(['update:modelValue'])

</script>

<!-- CSS -->
<style scoped>
.fieldContainer{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.fieldContainer--fullWidth{
  width: 100%;
  min-width: 500px;
}

.fieldContainer--halfWidth{
  width: 50%;
  min-width: 250px;
}

.fieldContainer--quartWidth{
  width: 40%;
  min-width: 60px;
}

.fieldContainer--mobile{
  flex-direction: column;
}

.formField:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fieldContainer--singleLine{
  height: 1lh;
}
.fieldContainer--descHeight{
  height: 4lh;
}

</style>

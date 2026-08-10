<template>
  <div 
    :class="[
      'fieldContainer', 
      `fieldContainer--${variant}`
      ]">
    <label v-if="showLabel" class="fieldLabel" :for="fieldID">
      {{ label }}
    </label>
    <input 
      :id="fieldID"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      class="formField"
      @input="$emit('update:modelValue', $event.target.value)"/>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['halfWidth', 'fullWidth', 'mobile'].includes(v),
  },
  label: { type: String, default: ''},
  showLabel: { type: Boolean, default: true }, 
  placeholder: { type: String, default: 'Enter Field Data' },
  disabled: { type: Boolean, default: false },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' }
})

defineEmits(['update:modelValue'])

</script>

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
  width: 40%;
  min-width: 250px;
}

.fieldContainer--quartWidth{
  width: 30%;
  min-width: 60px;
}

.fieldContainer--mobile{
  flex-direction: column;
}

.fieldLabel{
  color: var(--color-text-2);
  text-align: left;
  margin-bottom: 4px;
}

.formField:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>

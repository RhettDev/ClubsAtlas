<template>
  <button
      :class="[
      'tgl',
      'tgl--${variant}',
      'tgl--${size}',
      ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
      >
      <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})

defineEmits(['click'])
</script>

<style scoped>
.tgl {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: 32px;
  border: 2px;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s,
    transform 0.1s;
}

.tgl:active:not(:disabled){
  transform: scale(0.97)
}
.tgl:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.tgl--primary {
  border-color: var(--ca-brand-grey-1);
  background-color: var(--ca--grey-3);
}
.tgl--secondary {
  border-color: var(--ca-brand-grey-1);
  background-color: var(--ca--grey-3);
}
.tgl--ghost {
  background: transparent;
  color: var(--ca-brand-grey-1);
}

.tgl--primary :active:not(:disabled) {
  border-color: var(--ca-brand-grey-1);
  background-color: var(--ca--brand-blue-2);
  border: 3px;
}
.tgl--secondary :active:not(:disabled) {
  border-color: var(--ca-brand-grey-1);
  background-color: var(--ca--brand-blue-2);
  border: 3px;
}
.tgl--ghost:hover:not(:disabled) {
  background: var(--ca-brand-grey-3);
}


/* Sizes */
.tgl--sm {
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
}
.tgl--md {
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
}
.tgl--lg {
  padding: 0.85rem 2rem;
  font-size: 1.1rem;
}

</style>
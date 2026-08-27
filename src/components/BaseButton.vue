<template>
  <button
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--loading': loading, 'btn--block': block },
    ]"
    :disabled="disabled || loading"
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
    validator: (v) => ['primary', 'secondary', 'danger', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 24px;
  padding: 8px;
  text-decoration: none;
  font-weight: 300;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s,
    transform 0.1s;
  margin: 8px;
}

.btn:active:not(:disabled) {
  transform: scale(0.97);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--block {
  width: 100%;
}

/* Variants */
.btn--primary {
  background-color: var(--ca-bg-blue-1);
  color: var(--ca-text-dark-1);
}
.btn--secondary {
  background-color: var(--ca-brand-grey-1);
  color: var(--ca-text-dark-1);
}
.btn--danger {
  background: #ef4444;
  color: white;
}
.btn--ghost {
  background: transparent;
  color: #6366f1;
}

.btn--primary:hover:not(:disabled) {
  background-color: var(--ca-bg-blue-2);
  color: var(--ca-bg-dark-1);
  font-weight: 500;
}
.btn--secondary:hover:not(:disabled) {
  background-color: var(--ca-brand-grey-3);
  color: var(--ca-bg-dark-1);
  font-weight: 500;
}
.btn--danger:hover:not(:disabled) {
  background: #dc2626;
}
.btn--ghost:hover:not(:disabled) {
  background: #eef2ff;
}

/* Sizes */
.btn--sm {
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
}
.btn--md {
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
}
.btn--lg {
  padding: 0.85rem 2rem;
  font-size: 1.1rem;
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

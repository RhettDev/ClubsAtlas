<template>
    <button
    :class="['toggleButton', `toggleButton--${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
    ></button>
</template>

<script setup>
defineProps({
    variant: { 
        type: String,
        default: 'single',
        variant: (v) => ['single', 'multiple'].includes(v),
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

defineEmits(['click'])
</script>

<style scoped>
.toggleButton{
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    border: 2px solid var(--ca-brand-grey-1);
    background-color: var(--ca-brand-grey-2);
}

.toggleButton--single{
    border-radius: 32px;
}
.toggleButton--single:active:not(:disabled){
    color: var(--color-brandText);
}

.toggleButton--multiple{
    border-radius: 8px;
}
.toggleButton--multiple:active:not(:disabled){
    color: var(--color-brandText);
}

.toggleButton:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
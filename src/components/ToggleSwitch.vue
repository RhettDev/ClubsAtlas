<template>
    <button
        class="switchBody"
        :class="{ 'isOn' : modelValue}"
        :disabled="disabled"
        @click="toggleState">
        <slot class="pill"/>
    </button>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['update:modelValue'])

function toggleState() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
.switchBody{
    height: 24px;
    width: 48px;
    cursor: pointer;
    border-radius: 32px;
    position: relative;
    background-color: var(--ca-brand-grey-2);
    border: none;
}

.switchBody.isOn {
    background: var(--color-brandText);
}

.pill{
    height: 18px;
    width: 18px;
    position: absolute;
    top: 4px;
    left: 4px;
    transition: transform 0.2s ease;
    background: var(--ca-brand-grey-1);
    border-radius: 50%;
}

.switchBody.isOn .pill {
    transform: translateX(
        calc(48px - 18px - 2 * 4px)
    );
}


.switchBody:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
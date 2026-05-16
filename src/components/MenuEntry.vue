<template>
    <div :class="[
        'entry', 
        'entry--${variant}', 
        'entry--${icon}']" 
        @click="$emit('click', $event)"
    >
    <div>
        <img class="logo" src="../assets/logos/" alt="entryIcon">
        <slot />
    </div>
    </div>
</template>

<script setup>
defineProps({
    variant: {
        type: String,
        default: 'wIcon',
        validator: (v) => ['wIcon', 'noIcon'].included(v),
    },
    icon: {
        type: String,
        default: 'none',
        validator: (v) => ['none', 
                           'dashboard', 
                           'uploadEvent', 
                           'updateClub', 
                           'generalMeeting', 
                           'settings', 
                           'yourClubs', 
                           'suggestedClubs',
                           'clubSearch', 
                           'wkShowcase'].includes(v),
    }
})

defineEmits(['click'])
</script>

<style scope>
    .entry{
        display: inline-flex;
        padding: 4px 0;
        align-items: center;
        gap: 10px;
        color: var(--color-text-2);
    }

</style>


        
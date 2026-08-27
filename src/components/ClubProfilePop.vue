<template>
    <div id="container" class="container">
        <img>
        <div id="topRow" class="contentRow">
            <div id="clubNameLogo">
                <img id="clubLogo">
                <h3>ClubName</h3>
            </div>
            <div id="socialsBar">
                <v-icon></v-icon>
                <v-icon></v-icon>
                <v-icon></v-icon>
                <v-icon></v-icon>
            </div>
        </div>
        <p id="description"></p>
        <div id="bottomRow" class="contentRow">
            <div id="tags">

            </div>
            <div id="attachToProfile">

            </div>
        </div>
        <div id="showcaseEvent">

        </div>

    </div>
</template>

<script setup>

</script>

<style scope>
.container{
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
<template>
  <main id="adminMain">
    <section class="header">
      <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
      <h1>ClubsAtlas</h1>
    </section>

    <div class="hero">
      <section id="sideBar" class="bLeft">
        <RouterLink variant="primary" class="menuEntry" to="/admin">
          <v-icon name="pr-bars" inverse scale="1.5"/>
          Dashboard
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
          <v-icon name="pr-upload" inverse scale="1.5"/>
          Upload New Event
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry active" to="/admin/update-home">
          <v-icon name="pr-home" inverse scale="1.5"/>
          Update Club Profile
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
          <v-icon name="pr-users" inverse scale="1.5"/>
          General Meetings
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
          <v-icon name="pr-cog" inverse scale="1.5"/>
          Settings
        </RouterLink>
      </section>

      <section id="eventsList" class="bCenter">
        <h1>main body</h1>
      </section>

      <section id="analyitcsBar" class="bRight">
        <!-- Empty -->
      </section>
    </div>

    <FooterBar></FooterBar>
  </main>
</template>


<script setup>
// import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'

</script>

<style scoped>
.hero {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  /* align-items: start; */
  flex: 1;
}

.body{
  display: flex;
  width: 100%;
}

.bLeft{
  display: flex;
  flex-direction: column;
  flex: 0.7;
  box-shadow: 2px 0px var(--color-background-2);
  padding: 16px;
  gap: 4px;
}

.bLeft a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.bRight {
  flex: 0.7;
}

.bCenter {
  flex: 2;
  box-shadow: 2px 0px var(--color-background-2);
}

.menuEntry{
  display: flex;
  padding: 4px 0;
  gap: 10px;
  color: var(--color-text-2);
  font-size: 1.3rem;
  text-align: right;
  justify-content: space-between;
}

.menuEntry a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.menuEntry:hover {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

</style>
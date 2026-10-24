<!-- 
  File Name: HeaderGeneric.vue
  Author: Rhett Bauchop - 20722517
  Purpose: Basic Header bar with just the app logo and no functionality
  Use Cases: SignupPage, 
-->

<!-- HTML -->
 <template>
  <section class="header">
    <img class="logo" src="../assets/logos/clubsAtlasLogo.svg" alt="ClubsAtlas Logo" />
    <h1>ClubsAtlas</h1>
  </section>
</template>

<!-- CSS -->
<style scope>
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 1px var(--color-shadow);
  background-color: var(--color-background-1);
  position: sticky; /* Ensures header stays at the top of the page, but since page cannot scroll not an issue */
  top: 0;
  z-index: 100; /* Ensures header is at the front of the render */
  color: var(--color-text-1);
  padding: 16px 0;
}

.clubLogo {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.clubLogoText {
  font-weight: 200;
  color: var(--color-text-1);
}
</style>

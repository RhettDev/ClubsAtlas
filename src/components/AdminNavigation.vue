<!-- 
  File Name: AdminNavigation.vue
  Author: Rhett Bauchop - 20722517
  Purpose: This component is used to render the five navigation links between admin pages,
  Use Cases: HeaderClubs, AdminPage, AdminSettingsPage, ClubProfilePage, EventUploadPage, GeneralMeetingsPage

-->
<!-- HTML -->
 <template>
  <section>
    <RouterLink
    v-for="link in links"
    :key="link.to"
    :to="link.to"
    class="menuEntry"
    :class="{'active': route.path === link.to}"
    >
    <!-- True comparison result activates active class, highlighting link as the current page -->
    <v-icon :name="link.icon" :class="{'activeIcon': route.path === link.to}" fill="var(--color-text-1)" scale="1.5"/>
    {{ link.label }}
    </RouterLink>
  </section>
</template>

<!-- JAVASCRIPT -->
<script setup>
import { RouterLink, useRoute} from 'vue-router';
const route = useRoute()
const links = [
  { label: 'Dashboard', to: '/admin', icon: 'pr-bars' },
  { label: 'Upload New Event', to: '/admin/new-event', icon: 'pr-upload' },
  { label: 'Update Club Profile', to: '/admin/update-home', icon: 'pr-home' },
  { label: 'General Meetings', to: '/admin/update-gm', icon: 'pr-users' },
  { label: 'Settings', to: '/admin/settings', icon: 'pr-cog' },
]
</script>

<!-- CSS -->
<style scoped>
.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

.activeIcon {
  fill: var(--color-brandText);
}
</style>
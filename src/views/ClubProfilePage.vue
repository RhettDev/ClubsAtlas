<template>
  <main id="adminMain">
    <HeaderClubs v-if="clubDetails" @click="onHeaderMenuClick" :club="clubDetails" />
    <!-- Mobiel Naviation -->
    <div class="backdrop" id="navBackdrop" @click="onHeaderMenuClick"></div>
    <div id="navDropDown" class="dropDownMenu">
      <RouterLink variant="primary" class="menuEntry" to="/admin">
        <v-icon name="pr-bars" fill="var(--color-text-1)" scale="1.2" />
        Dashboard
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
        <v-icon name="pr-upload" fill="var(--color-text-1)" scale="1.2" />
        Upload New Event
      </RouterLink>
      <RouterLink
        variant="primary"
        class="menuEntry active"
        to="/admin/update-home"
        @click="onHeaderMenuClick"
      >
        <v-icon name="pr-home" fill="var(--color-text-1)" scale="1.2" />
        Update Club Profile
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
        <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.2" />
        General Meetings
      </RouterLink>
      <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
        <v-icon name="pr-cog" fill="var(--color-text-1)" scale="1.2" />
        Settings
      </RouterLink>
    </div>

    <div class="hero">
      <section id="sideBar" class="bLeft desktopView">
        <RouterLink variant="primary" class="menuEntry" to="/admin">
          <v-icon name="pr-bars" fill="var(--color-text-1)" scale="1.5" />
          Dashboard
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/new-event">
          <v-icon name="pr-upload" fill="var(--color-text-1)" scale="1.5" />
          Upload New Event
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry active" to="/admin/update-home">
          <v-icon name="pr-home" fill="var(--color-text-1)" scale="1.5" />
          Update Club Profile
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/update-gm">
          <v-icon name="pr-users" fill="var(--color-text-1)" scale="1.5" />
          General Meetings
        </RouterLink>
        <RouterLink variant="primary" class="menuEntry" to="/admin/settings">
          <v-icon name="pr-cog" fill="var(--color-text-1)" scale="1.5" />
          Settings
        </RouterLink>
      </section>

      <section id="eventsList" class="bCenterAdmin">
        <div id="PageTitle" class="pageHeader">
          <h1 class="title">Update Club Profile</h1>
          <hr class="fgHR" />
        </div>
        <div id="inputFields" class="fieldsContainer">
          <!-- Club Banner Preview -->
          <div id="bannerField" class="bannerLabelContainer">
            <label class="fieldLabel">Current Club Banner</label>
            <img :src="`/images/clubBanners/${clubDetails.bannerURL}`" />
          </div>
          <!-- Club Banner Browse -->
          <div id="bannerField" class="buttonLabelContainer">
            <label class="fieldLabel">Upload Club Banner</label>
            <BaseButton>Browse Device</BaseButton>
            <label class="fieldSubLabel">Recommended Size 1980x500px</label>
          </div>
          <!-- Club Logo Preview-->
          <div id="bannerField" class="logoLabelContainer">
            <label class="fieldLabel">Upload Club Logo</label>
            <img :src="`/images/clubLogos/${clubDetails.logoURL}`" />
          </div>
          <!-- Club Logo Browse -->
          <div id="bannerField" class="buttonLabelContainer">
            <label class="fieldLabel">Current Club Banner</label>
            <BaseButton>Browse Device</BaseButton>
            <label class="fieldSubLabel">Recommended Size 200x200px</label>
          </div>

          <!-- Club Acronym -->
          <FormField
            v-model="clubAcronym"
            label="Club Acroynum"
            placeholder="Desired acronym for public view"
            width="halfWidth"
            :model-value="clubDetails.acronym"
          >
          </FormField>
          <!-- Club Colour -->
          <FormField
            v-model="clubColour"
            label="Club Colour"
            placeholder="Hex code for the clubs signature colour"
            width="halfWidth"
            :model-value="clubDetails.hexCode"
          >
          </FormField>
          <!-- Club Description -->
          <div class="fieldContainer">
            <label class="fieldLabel"> Club Description </label>
            <textarea
              class="formField"
              id="descriptionField"
              v-model="description"
              rows="4"
              placeholder="Description of the club, its events and who the club is aimed towards!"
            >
            </textarea>
          </div>
          <!-- Club Contact Email -->
          <FormField
            v-model="clubEmail"
            label="ContactEmail"
            placeholder="club@domain.com"
            width="halfWidth"
            :model-value="clubSocials.email"
          >
          </FormField>
          <!-- Socials Row 1 -->
          <div class="twoColContainer">
            <!-- Facebook (FB) -->
            <FormField
              v-model="clubFB"
              label="Facebook"
              placeholder="Link to Club Facebook"
              width="halfWidth"
              :model-value="clubSocials.facebook"
            >
            </FormField>
            <!-- Instagram (IG) -->
            <FormField
              v-model="clubIG"
              label="Instagram"
              placeholder="Link to Club Instagram"
              width="halfWidth"
              :model-value="clubSocials.instagram"
            >
            </FormField>
          </div>
          <!-- Socials Row 2 -->
          <div class="twoColContainer">
            <!-- LinkedIn (LI) -->
            <FormField
              v-model="clubLi"
              label="LinkedIn"
              placeholder="Link to Club LinkedIn"
              width="halfWidth"
              :model-value="clubSocials.linkedin"
            >
            </FormField>
            <!-- LinkTree (LT) -->
            <FormField
              v-model="clubLT"
              label="LinkTree"
              placeholder="Link to Club LinkTree"
              width="halfWidth"
              :model-value="clubSocials.linktree"
            >
            </FormField>
          </div>
          <!-- Socials Row 3 -->
          <div class="twoColContainer">
            <!-- Website (Web) -->
            <FormField
              v-model="clubWeb"
              label="Website"
              placeholder="Link to Club Website"
              width="halfWidth"
              :model-value="clubSocials.website"
            >
            </FormField>
            <!-- Discord (DC) -->
            <FormField
              v-model="clubDC"
              label="Discord"
              placeholder="Link to Club Discord"
              width="halfWidth"
              :model-value="clubSocials.discord"
            >
            </FormField>
          </div>
          <!-- Tags -->
          <div id="previewEventContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Preview Club Profile</label>
            <BaseButton>Public View</BaseButton>
          </div>
        </div>
        <hr class="fgHR" />
        <div id="saveCancelButtons" class="buttonRow">
          <RouterLink to="/admin">
            <BaseButton>Save</BaseButton>
          </RouterLink>
          <RouterLink to="/admin">
            <BaseButton variant="secondary">Cancel</BaseButton>
          </RouterLink>
        </div>
      </section>

      <section id="analyitcsBar" class="bRightAdmin">
        <!-- Empty -->
      </section>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<script setup>
// import BaseButton from '@/components/BaseButton.vue'
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useClubData } from '@/composables/useClubData'

const { clubDetails, clubSocials } = useClubData()
// const load

console.log(clubSocials.value)

const onHeaderMenuClick = (event) => {
  console.log(event)
  let navDD = document.getElementById('navDropDown')
  if (navDD.style.display === 'flex') {
    // Check if menu is open, then close it
    navDD.style.display = 'none'
    document.getElementById('navBackdrop').classList.remove('show')
  } else {
    // Open the menu
    navDD.style.display = 'flex'
    document.getElementById('navBackdrop').classList.add('show')
  }
}
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

.body {
  display: flex;
  width: 100%;
}

.bLeft {
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

.menuEntry {
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

.mobileView {
  display: none;
}

.dropDownMenu {
  display: none;
  position: fixed;
  background-color: var(--color-background-2);
  border-radius: 16px;
  padding: 10px 20px;
  z-index: 90;
  top: 8%;
  left: 1%;
  flex-direction: column;
  gap: 16px;
  font-size: large;
  overflow: auto;
}

.dropDownMenu a.active {
  color: var(--color-brandText);
  border-bottom: 2px solid var(--color-brandText);
}

@media screen and (max-width: 688px) {
  .desktopView {
    display: none;
  }
  .mobileView {
    display: block;
  }
  .hero {
    flex-direction: column;
  }
  .twoColContainer {
    flex-direction: column;
    align-items: start;
  }
}

.backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.backdrop.show {
  display: block;
}

.fieldContainer {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>

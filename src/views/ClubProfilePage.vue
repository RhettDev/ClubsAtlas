<!-- 
  File Name: AdminSettingsPage.vue
  Author: Rhett Bauchop - 20722517
  Page URL:  clubsatlas.app/admin/settings
  Purpose: This file holds all HTML, CSS and Javascript for the clubs admin settings page,
           listing proposed settings and website theme changer.
-->

<!-- HTML -->
<template>
  <main id="adminMain">
    <HeaderClubs v-if="clubDetails" @click="onHeaderMenuClick" :club="clubDetails" />

    <div class="hero">
      <section id="sideBar" class="bLeft desktopView">
        <AdminNavigation />
      </section>

      <!-- Body List of Club profile detils -->
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
          <!-- Fake browser buttons for the sake of simultaion and showcasing what the page would include -->
          <div id="bannerField" class="buttonLabelContainer">
            <label class="fieldLabel">Upload Club Banner</label>
            <BaseButton>Browse Device</BaseButton>
            <label class="fieldSubLabel">Recommended Size 1980x500px</label>
          </div>
          <!-- Club Logo Preview-->
          <div id="bannerField" class="logoLabelContainer">
            <label class="fieldLabel">Upload Club Logo</label>
            <img :src="`/images/clubLogos/${clubDetails.logoURL}`" /> <!-- src includes path the public images folder, logo value is just the image name stored in Supabase-->
          </div>
          <!-- Club Logo Browse -->
          <div id="bannerField" class="buttonLabelContainer">
            <label class="fieldLabel">Current Club Banner</label>
            <BaseButton>Browse Device</BaseButton>
            <label class="fieldSubLabel">Recommended Size 200x200px</label>
          </div>

          <!-- Club Name not included as it would be to easy to accidently change it. Changin the club name should be considered a big deal -->

          <!-- Club Acronym -->
          <FormField
            v-model="clubAcronym"
            label="Club Acroynum"
            placeholder="Desired acronym for public view"
            width="halfWidth"
            :model-value="clubDetails.acronym"
          >
          <!-- Half widths were chosen to not overload the page, only need no much space. -->
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
          <!-- Does not use FormField as it does not allow adjustable height. textarea lets users set the custom size increasing accessibility -->
          <div class="fieldContainer">
            <label class="fieldLabel"> Club Description </label>
            <textarea
              class="formField"
              id="descriptionField"
              v-model="clubDetails.description"
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
          <!-- Social link stored in rows to reduce page height, unless in mobile-->
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

          <!-- Peeview -->
          <div id="previewEventContainer" class="buttonLabelContainer">
            <label class="fieldLabel">Preview Club Profile</label>
            <BaseButton @click="openProfileCard">Public View</BaseButton>
          </div>
          <ClubProfilePop
            :model-value="openProfileCheck"
            @update:model-value="closeProfileCard"
            :clubID="clubDetails.id"
            :clubName="clubDetails.name"
            :clubLogo="clubDetails.logoURL"
            :clubBanner="clubDetails.bannerURL"
            :clubDescription="clubDetails.description"
            :clubHexCode="clubDetails.hexCode"
          />
        </div>
        <hr class="fgHR" />
        <div id="saveCancelButtons" class="buttonRow">
          <!-- Demo does not save any content, but does performs discard confirmation for simulation -->
          <RouterLink to="/admin">
            <BaseButton>Save</BaseButton>
          </RouterLink>
          <BaseButton variant="secondary" @click="askLeavePage">Cancel</BaseButton>
          <ConfirmationPop
            v-model="showConfirm"
            :title="dialogConfig.title"
            :message="dialogConfig.message"
            :confirmBtn="dialogConfig.confirmBtn"
            :cancelBtn="dialogConfig.cancelBtn"
            :danger="dialogConfig.danger"
            @confirm="handleConfirmed"
          />
        </div>
      </section>

      <section class="bRightAdmin desktopView">
        <!-- Empty: placeholder for whitespace, keeping body centered -->
      </section>
    </div>
    <FooterBar></FooterBar>
  </main>
</template>

<!-- JAVASCRIPT -->
<script setup>
import FooterBar from '@/components/FooterBar.vue'
import HeaderClubs from '@/components/HeaderClubs.vue'
import FormField from '@/components/FormField.vue'
import BaseButton from '@/components/BaseButton.vue'
import ClubProfilePop from '@/components/ClubProfilePop.vue'
import AdminNavigation from '@/components/AdminNavigation.vue'
import ConfirmationPop from '@/components/ConfirmationPop.vue'
import { useClubData } from '@/composables/useClubData'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { clubDetails, clubSocials } = useClubData()
const router = useRouter()
const openProfileCheck = ref(false)
const dialogConfig = ref({ title: '', message: '', danger: false })
const showConfirm = ref(false)

// Confirmation Handling
function askLeavePage() {
  dialogConfig.value = {
    title: 'Discard Your Changes?',
    message: 'Leaving this page will discard any changes you have made.',
    confirmBtn: 'Discard Changes',
    cancelBtn: 'Stay on Page',
    danger: true,
  }
  showConfirm.value = true
}
function handleConfirmed() {
  router.push('/admin')
}

// Club Profile Preview Handling
function openProfileCard() {
  // getEventTags(eventID)
  openProfileCheck.value = true
}
function closeProfileCard() {
  openProfileCheck.value = false
}
</script>

<!-- CSS -->
<style scoped>
.fieldContainer {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>

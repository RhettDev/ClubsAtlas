<!-- 
  File Name: clubProfilePop.vue
  Author: Rhett Bauchop - 20722517
  Purpose: Club Listing with dropdown menu
  Use Cases: ClubListEntry, ClubProfilePage
-->

<!-- HTML -->
<template>
  <Teleport to="body"> <!-- Teleport used to jump element to center front-->
    <div v-if="modelValue" class="overlay" @click.self="close"> <!-- Model value is boolean based on matching ID's on call-->
      <div id="popContainer" class="popUpContainer clubWidth mobileContainer">
        <!-- V-IF for images due to load times -->
        <!-- Club Banner -->
        <div v-if="clubBanner" class="bannerContainer">
          <img :src="`/images/clubBanners/${clubBanner}`" alt="Club Banner" />
        </div>
        <div id="topRow" class="contentRow spaced vertCentered">
          <div id="titleClubName" class="contentRow vertCentered">
            <!-- Club Logo and Name with colour border -->
            <div v-if="clubLogo" class="clubLogoName">
              <img
                class="clubLogo"
                :src="`/images/clubLogos/${clubLogo}`"
                :style="{ borderColor: clubHexCode }"
              />
            </div>
            <h2>{{ clubName }}</h2>
          </div>
          <!-- Close -->
          <v-icon
            class="pointer"
            name="pr-times"
            fill="var(--color-text-1)"
            scale="1.5"
            @click="close"
          ></v-icon>
        </div>

        <!-- Description -->
        <p id="description" class="descriptionContainer">
          {{ formatDescription(clubDescription) }}
        </p>
        <!-- Club Tags: only set for select clubs -->
        <div id="tagsContainer" class="tagContainer">
          <div v-for="tag in clubTags" :key="tag" :class="tag.tagSlug" id="tagItem" class="tag">
            {{ tag.tagName }}
          </div>
        </div>
        <div id="bottomRow" class="contentRow spaced">
          <!-- Add or Remove Button for the club -->
          <div v-if="followingStatus == true">
            <div id="addToClub" class="contentRow vertCentered pointer" @click="askAddClub(clubID)">
              <p>Add Club to Profile</p>
              <v-icon name="pr-plus" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </div>
          </div>
          <div v-else-if="followingStatus == false">
            <div id="removeClub" class="contentRow vertCentered pointer" @click="askRemoveClub(clubID)">
              <p>Remove Club from Profile</p>
              <v-icon name="pr-trash" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </div>
          </div>
          <p v-if="loadingSocials">Loading social links...</p>
          <div v-else id="linksContainer" class="logoContainer">
            <!-- Links are conditional as different clubs use different links -->
            <!-- Only select clubs have had their social links provided -->
            <!-- TidyHQ -->
            <a
              v-if="clubsSocials.tidyhq"
              :href="clubsSocials.tidyhq"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="..\assets\logos\tidyHQLogo.png" class="colourInvert" />
            </a>
            <!-- Facebook -->
            <a
              v-if="clubsSocials.facebook"
              :href="clubsSocials.facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-facebook" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
            <!-- Instagram -->
            <a
              v-if="clubsSocials.instagram"
              :href="clubsSocials.instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-instagram" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
            <!-- Linkedin -->
            <a
              v-if="clubsSocials.linkedin"
              :href="clubsSocials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-linkedin" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
            <!-- LinkTree -->
            <a
              v-if="clubsSocials.linktree"
              :href="clubsSocials.linktree"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-link" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
            <!-- Website -->
            <a
              v-if="clubsSocials.website"
              :href="clubsSocials.website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-globe" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
            <!-- Discord -->
            <a
              v-if="clubsSocials.discord"
              :href="clubsSocials.discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-discord" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
            <!-- Email -->
            <a
              v-if="clubsSocials.email"
              :href="clubsSocials.email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon name="pr-envelope" fill="var(--color-text-1)" scale="1.5"></v-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<!-- JAVASCRIPT -->
<script setup>
import { onMounted, ref } from 'vue'
import { formatDescription } from '@/composables/miscFunctions'
import { supabase } from '../../backend/supabase'
import { demoSessionData } from '@/composables/sessionStore';
import { useAuth } from '@/composables/useAuth';

const loadingSocials = ref(true)
const loadingTags = ref(true)
const errorMessage = ref(null)
const clubTags = ref([])
const clubsSocials = ref([])
const { isDemoSession, addFollowClub, dropFollowingClub } = demoSessionData()
const { profile } = useAuth()
const calendarMode = isDemoSession.value


const props = defineProps({
  modelValue: { type: Boolean, default: false },
  clubID: { type: Number, default: 0 },
  clubName: { type: String, default: 'Error! Missing Club Name Data.' },
  clubLogo: { type: String, default: 'Error! Missing Club Name Data.' },
  clubBanner: { type: String, default: 'Error! Missing Club Name Data.' },
  clubDescription: { type: String, default: 'Error! Missing Club Name Data.' },
  clubHexCode: { type: String, default: '#000000.' },
  followingStatus: { type: Boolean, default: false},
  addToFollowing: { type: String, default: 'Add to Calendar.' },
  removeFromFollowing: { type: String, default: 'Remove from Calendar.' },
  danger: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

// Supabase function to get all tags for the selected club
async function getClubTags() {
  try {
    loadingTags.value = true

    let clubid = props.clubID
    let { data, error } = await supabase.rpc('getclubstags', { clubid })

    if (error) throw error

    clubTags.value = data
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingTags.value = false
  }
}

// Supabase function to get all the social media links
async function getClubSocials() {
  try {
    loadingSocials.value = true

    let clubid = props.clubID
    let { data, error } = await supabase.rpc('getclubsocials', { clubid })

    if (error) throw error

    clubsSocials.value = data?.[0] ?? {}
  } catch (error) {
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingSocials.value = false
  }
}

// Dictate which functions are used to add a club to following list based on if the user is authenticated or a demo user
function askAddClub(clubID) {
  if (calendarMode == true) {
    addFollowClub(clubID)
  } else if (calendarMode == false) {
    addClub(clubID)
  }
}

// Dictate which functions are used to remove a club from following list based on if the user is authenticated or a demo user
function askRemoveClub(clubID) {
  if (calendarMode == true) {
    dropFollowingClub(clubID)
  } else if (calendarMode == false) {
    console.log("Removing club ",clubID, " from calendar")
  }
}

// AUTH: Add clubID to the followingClubs array in student user row
async function addClub(clubid) {
  let studentid = profile.value.id
  try {
    const res = await supabase.rpc('addfollowingclub', { clubid, studentid })

    if (!res.ok) throw new Error('Failed to add Club to Calendar')
  } catch (error) {
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  }
}

// Get clubs data as soon as file is loaded into DOM
onMounted(() => {
  getClubSocials()
  getClubTags()
})

</script>

<!-- CSS -->
<style scope>
.clubWidth {
  width: 60%;
}

.bannerContainer {
  width: 100%;
  aspect-ratio: 1920 / 500;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 32px;
}

.bannerContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.logoContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.logoContainer img {
  height: 32px;
}

.mobileCotent {
  flex-direction: column;
  align-items: start;
}

@media screen and (max-width: 688px) {
  .mobileContainer {
    width: 90%;
  }
}
</style>

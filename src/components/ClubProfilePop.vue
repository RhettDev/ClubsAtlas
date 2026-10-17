<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div id="popContainer" class="popUpContainer clubWidth mobileContainer">
        <div v-if="clubBanner" class="bannerContainer">
          <img :src="`/images/clubBanners/${clubBanner}`" alt="Club Banner" />
        </div>
        <!-- <div id="clubDetails" class="clubDetails"></div> -->
        <div id="topRow" class="contentRow spaced vertCentered">
          <div id="titleClubName" class="contentRow vertCentered">
            <div v-if="clubLogo" class="clubLogoName">
              <img
                class="clubLogo"
                :src="`/images/clubLogos/${clubLogo}`"
                :style="{ borderColor: clubHexCode }"
              />
            </div>
            <h2>{{ clubName }}</h2>
          </div>
          <v-icon
            class="pointer"
            name="pr-times"
            fill="var(--color-text-1)"
            scale="1.5"
            @click="close"
          ></v-icon>
        </div>

        <p id="description" class="descriptionContainer">
          {{ formatDescription(clubDescription) }}
        </p>
        <div id="tagsContainer" class="tagContainer">
          <div v-for="tag in clubTags" :key="tag" :class="tag.tagSlug" id="tagItem" class="tag">
            {{ tag.tagName }}
          </div>
        </div>
        <div id="bottomRow" class="contentRow spaced">
          <div id="addToClub" class="contentRow vertCentered" @click="addClub(clubID)">
            <p>Add Club to Profile</p>
            <v-icon name="pr-plus" fill="var(--color-text-1)" scale="1.5"></v-icon>
          </div>
          <p v-if="loadingSocials">Loading social links...</p>
          <div v-else id="linksContainer" class="logoContainer">
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

<script setup>
import { onMounted, ref } from 'vue'
import { formatDescription } from '@/composables/miscFunctions'
import { supabase } from '../../backend/supabase'

const loadingSocials = ref(true)
const loadingTags = ref(true)
const errorMessage = ref(null)
const clubTags = ref([])
const clubsSocials = ref([])
// const clubid = ref(null)

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  clubID: { type: Number, default: 0 },
  clubName: { type: String, default: 'Error! Missing Club Name Data.' },
  clubLogo: { type: String, default: 'Error! Missing Club Name Data.' },
  clubBanner: { type: String, default: 'Error! Missing Club Name Data.' },
  clubDescription: { type: String, default: 'Error! Missing Club Name Data.' },
  clubHexCode: { type: String, default: '#000000.' },
  addToFollowing: { type: String, default: 'Add to Calendar.' },
  removeFromFollowing: { type: String, default: 'Remove from Calendar.' },
  danger: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

function addClub(clubID) {
  console.log('Adding Club ', clubID, 'to your profile')
}

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

onMounted(() => {
  getClubSocials()
  getClubTags()
})
</script>

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

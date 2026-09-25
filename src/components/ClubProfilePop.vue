<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <div id="popContainer" class="popUpContainer clubWidth mobileContainer">
        <div v-if="clubBanner" class="bannerContainer">
          <img :src="clubBanner" alt="Club Banner" />
        </div>
        <!-- <div id="clubDetails" class="clubDetails"></div> -->
        <div id="topRow" class="contentRow spaced vertCentered">
          <div id="titleClubName" class="contentRow vertCentered">
            <div v-if="clubLogo" class="clubLogoName">
              <img :src="clubLogo" alt="Club Logo" />
            </div>
            <h2>{{ clubName }}</h2>
          </div>
          <v-icon name="pr-times" fill="var(--color-text-1)" scale="1.5" @click="close"></v-icon>
        </div>

        <p id="description" class="descriptionContainer">
          {{ formatDescription(clubDescription) }}
        </p>
        <div id="tagsContainer" class="tagContainer">
          <div class="tag scieng">SciEng</div>
          <div class="tag party">Party</div>
          <div class="tag networ">Networking</div>
        </div>
        <div id="bottomRow" class="contentRow spaced">
          <div id="addToClub" class="contentRow vertCentered" @click="addClub(clubID)">
            <p>Add Club to Profile</p>
            <v-icon name="pr-plus" fill="var(--color-text-1)" scale="1.5"></v-icon>
          </div>
          <div id="dbLinks" v-for="link in socialLinks" :key="link.platform">
            <a href="link">test</a>
          </div>
          <div id="linksContainer" class="logoContainer">
            <!-- v-for all links associated with the club -->
            <img src="..\assets\logos\tidyHQLogo.png" class="colourInvert" />
            <!-- TidyHQ -->
            <v-icon name="pr-facebook" fill="var(--color-text-1)" scale="1.5"></v-icon>
            <!-- IG -->
            <v-icon name="pr-instagram" fill="var(--color-text-1)" scale="1.5"></v-icon>
            <!-- FB -->
            <v-icon name="pr-linkedin" fill="var(--color-text-1)" scale="1.5"></v-icon>
            <!-- LinkedIn -->
            <v-icon name="pr-globe" fill="var(--color-text-1)" scale="1.5"></v-icon>
            <!-- Website -->
            <v-icon name="pr-github" fill="var(--color-text-1)" scale="1.5"></v-icon>
            <!-- GitHub -->
            <v-icon name="pr-discord" fill="var(--color-text-1)" scale="1.5"></v-icon>
            <!-- Discord -->
          </div>
        </div>
        <!-- <div id="showcaseEvent"></div> -->
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { formatDescription } from '@/composables/miscFunctions'
import { supabase } from '../../backend/supabase'

const loadingSocials = ref(true)
const socialLinks = ref([])
// const clubid = ref(null)

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  clubID: { type: Number, default: 0 },
  clubName: { type: String, default: 'Error! Missing Club Name Data.' },
  clubLogo: { type: String, default: 'Error! Missing Club Name Data.' },
  clubBanner: { type: String, default: 'Error! Missing Club Name Data.' },
  // clubSocials: { type: String, default: 'Error! Missing Club Name Data.' },
  clubDescription: { type: String, default: 'Error! Missing Club Name Data.' },
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

async function getClubSocials() {
  try {
    loadingSocials.value = true

    let clubid = props.clubID
    let { data, error } = await supabase.rpc('getclubssocials', { clubid })

    if (error) throw error

    socialLinks.value = data
    console.log(socialLinks.value)
  } catch (error) {
    loadingSocials.value = error.message
    console.error('Error fetching data:', error)
    console.log('Error type:', typeof error)
  } finally {
    loadingSocials.value = false
  }
}

onMounted(() => {
  getClubSocials()
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

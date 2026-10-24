// File Name: useClubData.js
// Author: Rhett Bauchop - 20722517
// Purpose: Storage for loaded club data for clubs admin, accessed by all admin pages and headerClubs.
// Clubs version of sessionStore

import { ref, watch } from 'vue'
import { supabase } from '../../backend/supabase'
import { useAuth } from './useAuth'

const clubDetails = ref(null)
const loadingClub = ref(false)
const clubError = ref(null)
const socialError = ref(null)
const loadingSocials = ref(true)
const clubSocials = ref({})
let loadedClubDetailsId = null
let loadedClubSocialsId = null
let clubDetailsRequest = null
let clubSocialsRequest = null

// Initial load for all details about the authenticated club
async function loadClubDetails(clubId) {
  if (!clubId || loadedClubDetailsId === clubId) return clubDetails.value
  if (clubDetailsRequest?.clubId === clubId) return clubDetailsRequest.promise

  loadingClub.value = true
  clubError.value = null

  const promise = supabase
    .rpc('getspecificclubdata', { clubid: clubId })
    .then(({ data, error }) => {
      if (error) throw error

      clubDetails.value = Array.isArray(data) ? data[0] ?? null : data
      loadedClubDetailsId = clubId
      return clubDetails.value
    })
    .catch((error) => {
      clubError.value = error
      throw error
    })
    .finally(() => {
      loadingClub.value = false
      clubDetailsRequest = null
    })

  clubDetailsRequest = { clubId, promise }
  return promise
}

// Initial load of all the social media links matching the authenticated club
async function loadClubSocials(clubId) {
  if (!clubId || loadedClubSocialsId === clubId) return clubSocials.value
  if (clubSocialsRequest?.clubId === clubId) return clubSocialsRequest.promise

  loadingSocials.value = true
  socialError.value = null

  const promise = supabase
    .rpc('getclubsocials', { clubid: clubId })
    .then(({ data, error }) => {
      if (error) throw error

      clubSocials.value = Array.isArray(data) ? data[0] ?? {} : data ?? {}
      loadedClubSocialsId = clubId
      return clubSocials.value
    })
    .catch((error) => {
      socialError.value = error
      throw error
    })
    .finally(() => {
      loadingSocials.value = false
      clubSocialsRequest = null
    })

  clubSocialsRequest = { clubId, promise }
  return promise
}


export function useClubData() {
  const { profile } = useAuth()

  // actively update if changes happen to the loged in club account
  watch(
    () => profile.value?.clubID,
    (clubId) => {
      if (clubId) loadClubDetails(clubId).catch(() => {})
      if (clubId) loadClubSocials(clubId).catch(() => {})
    },
    { immediate: true },
  )

  return {
    clubDetails,
    loadingClub,
    clubError,
    clubSocials,
    loadingSocials,
    socialError,
    loadClubDetails,
    loadClubSocials,
  }
}

import { ref, watch } from 'vue'
import { supabase } from '../../backend/supabase'
import { useAuth } from './useAuth'

const clubDetails = ref(null)
const loadingClub = ref(false)
const clubError = ref(null)
let loadedClubId = null
let clubRequest = null

async function loadClubDetails(clubId) {
  if (!clubId || loadedClubId === clubId) return clubDetails.value
  if (clubRequest && clubRequest.clubId === clubId) return clubRequest.promise

  loadingClub.value = true
  clubError.value = null

  const promise = supabase
    .rpc('getspecificclubdata', { clubid: clubId })
    .then(({ data, error }) => {
      if (error) throw error

      clubDetails.value = Array.isArray(data) ? data[0] ?? null : data
      loadedClubId = clubId
      return clubDetails.value
    })
    .catch((error) => {
      clubError.value = error
      throw error
    })
    .finally(() => {
      loadingClub.value = false
      clubRequest = null
    })

  clubRequest = { clubId, promise }
  return promise
}

export function useClubData() {
  const { profile } = useAuth()

  watch(
    () => profile.value?.clubID,
    (clubId) => {
      if (clubId) loadClubDetails(clubId).catch(() => {})
    },
    { immediate: true },
  )

  return { clubDetails, loadingClub, clubError, loadClubDetails }
}

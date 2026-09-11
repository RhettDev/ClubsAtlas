import { ref, unref } from 'vue'
import { supabase } from '../../backend/supabase'

const loadingClubs = ref(true)
const clubsList = ref([])
const recommendedClubs = ref([])
const recommendedIDs = ref([])
const finalClubs = ref([])

// Get all entries from the clubFilter Table, Returning the filterID, clubID and each filter value
async function getClubsFilter() {
  try {
    loadingClubs.value = true

    let { data, error } = await supabase.rpc('getclubfilter')

    if (error) throw error

    clubsList.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loadingClubs.value = false
  }
}

// Get the club data based on an array of clubIDs
async function getRecommendedClubsData() {
  try {
    loadingClubs.value = true

    let { data, error } = await supabase.rpc('getfilteredclubs', {
      recommendedids: [...recommendedIDs.value],
    })

    if (error) throw error

    finalClubs.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loadingClubs.value = false
  }
}

export function clubRecommendations(givenFilters) {
  // Normalise values, allowing "Health Medical Science" to match "HealthMedicalScience"
  function normaliseValue(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
  }

  //function to filter the list of clubs based on a specific field
  function filterList(filterValue, filterField, excludedClubs) {
    const value = unref(filterValue)
    if (!value || !filterField) return null // checks filter from user is provided.

    const shortList = clubsList.value.filter(
      (club) =>
        !excludedClubs.value.includes(club) && //ensures clubs is already not in the list
        normaliseValue(club[filterField]) === normaliseValue(value), //checks club filter value against user given filter value
    )
    return shortList[Math.floor(Math.random() * shortList.length)] ?? null
  }

  function filterClubs(filters = givenFilters) {
    recommendedClubs.value = []
    recommendedIDs.value = []
    finalClubs.value = []

    const addRandomClub = (filter, filterField) => {
      const club = filterList(filter, filterField, recommendedClubs)
      console.log(club)
      if (club && club.clubID != null) {
        recommendedClubs.value.push(club)
        recommendedIDs.value.push(club.clubID)
      }
    }

    addRandomClub(filters.degree, 'degree')
    addRandomClub(filters.degree, 'degree')
    addRandomClub(filters.faith, 'faith')
    addRandomClub(filters.nationality, 'nationality')
    addRandomClub(filters.type, 'type')
    addRandomClub(filters.type, 'type')

    console.log([...recommendedIDs.value])
    return getRecommendedClubsData()
  }

  return {
    loadingClubs,
    recommendedClubs,
    finalClubs,
    filterClubs,
    getClubsFilter,
    getRecommendedClubsData,
  }
}

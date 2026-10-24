// File Name: clubRecommend.js
// Author: Rhett Bauchop - 20722517
// Purpose: Algorithm for filtering clubs and providing a list of recommended clubs based on user input
// Gets clubs by filtering different lists based on different variables, creating a short list to pick a random club from
// Completes multiple rounds to get a range of clubs

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
  const filters = givenFilters
  // Normalise values, allowing "Health Medical Science" to match "HealthMedicalScience"
  function normaliseValue(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
  }

  // Get rid of all or all but one of one category of clubs to create a basic list.
  // Used to filter out faith or nationality clubs, 
  // getting rid of them all if the user isnt interested, or only leaves one if the user is interested in one
  function preFilterList(eligible, filterValue, filterField, empty = false) {
    const value = unref(filterValue)
    // None Selected is the dropdown from signup step 2 being left untouched.
    if (normaliseValue(value) === normaliseValue('Not Interested')) empty = true
    if (normaliseValue(value) === normaliseValue('None Selected')) empty = true

    if (empty) {
      // Filter out all options.
      return eligible.filter(
        (club) => club[filterField] === null || club[filterField] === undefined,
      )
    }

    if (!value || !filterField) return eligible // Check if user has entered option for the field

    // Filter out all options for the category except the one the user selected.
    return eligible.filter((club) => {
      const clubValue = club[filterField]
      return clubValue == null || normaliseValue(clubValue) === normaliseValue(value)
    })
  }

  // Picks a random club that is not already in the recommended list from a certain category. This is for supporting recommendations
  function addRandomClubFromList(eligible, excludedClubs, round) {
    const shortList = eligible.filter(
      (club) => !excludedClubs.value.includes(club), // ensures clubs is already not in the list
    )
    const club = shortList[Math.floor(Math.random() * shortList.length)] ?? null

    if (club && club.clubID != null) {
      recommendedClubs.value.push(club)
      recommendedIDs.value.push(club.clubID)
      console.log("Chosen Club,",club.clubID,"chosen in round",round)
    }
  }

  // Picks any random club from a list, used after a shortlist has been filtered down
  function addRandomClub(eligible, excludedClubs, filterField, value) {
    const shortList = eligible.filter(
      (club) =>
        !excludedClubs.value.includes(club) && // ensures clubs is already not in the list
        normaliseValue(club[filterField]) === normaliseValue(value), // match club filter with value
    )
    const club = shortList[Math.floor(Math.random() * shortList.length)] ?? null

    if (club && club.clubID != null) {
      recommendedClubs.value.push(club)
      recommendedIDs.value.push(club.clubID)
      // Print for understanding recommendation reasoning
      console.log("Chosen Club,",club.clubID,"chosen in round",filterField)
    }
  }

  // Algorithm Body
  function findClubs(filters = givenFilters) {
    // Reset global arrays
    recommendedClubs.value = []
    recommendedIDs.value = []
    finalClubs.value = []

    const degree = unref(filters.degree)
    const faith = unref(filters.faith)
    const nationality = unref(filters.nationality)
    const type = unref(filters.type)
    const interests = unref(filters.interests)

    // Get all clubs that dont include non-selected faiths and nationalities
    let baseEligible = preFilterList(clubsList.value, filters.faith, 'faith')
    baseEligible = preFilterList(baseEligible, filters.nationality, 'nationality')

    // Get all clubs that dont fall under selected degree
    let noDegreeEligible = preFilterList(baseEligible, filters.degree, 'degree', true)

    // Map User selected interests
    const selectedInterests = (Array.isArray(interests) ? interests : [interests])
      .filter(Boolean)
      .map(normaliseValue)

    // Check any user interest against any club interest
    // Looks to ensure the every club has at least one interest in common
    // Only one interest is needed as two would filter too many clubs out
    const filterByInterests = (clubs) =>
      clubs.filter((club) =>
        [club.intA, club.intB, club.intC].some(
          (clubInterest) =>
            clubInterest && selectedInterests.includes(normaliseValue(clubInterest)),
        ),
      )

    // ---------------------------- Club Recommendation -------------------------------
    // Round A DTI: Degree Relevant, ClubType Matching, and Interets Filtered
    const degreeTypeEligible = filterByInterests(
      baseEligible.filter(
        (club) =>
          normaliseValue(club.degree) === normaliseValue(degree) &&
          normaliseValue(club.type) === normaliseValue(type),
      ),
    )
    addRandomClubFromList(degreeTypeEligible, recommendedClubs, "DTI")

    // Round B DI: Degree Relevant, and Interets Filtered
    const degreeOnlyEligible = filterByInterests(
      baseEligible.filter((club) => normaliseValue(club.degree) === normaliseValue(degree)),
    )
    addRandomClubFromList(degreeOnlyEligible, recommendedClubs, "DI")

    // Add two degree based clubs if only one of the two filters above trigger
    // Often when the user selects Party Vibes or Project Work, as majority of clubs fall under the other two categories
    if (recommendedIDs.value.length < 2) {
      addRandomClub(baseEligible, recommendedClubs, 'degree', degree, "SupportingDegree")
      addRandomClub(baseEligible, recommendedClubs, 'degree', degree, "SupportingDegree")
    }

    // Round C NDTI: Degree Irrelevant, ClubType Matching, and Interets Filtered
    // Note: all clubs that are social study have a degree attached
    const typeOnlyEligible = filterByInterests(
      noDegreeEligible.filter((club) => normaliseValue(club.type) === normaliseValue(type)),
    )
    addRandomClubFromList(typeOnlyEligible, recommendedClubs, "NDTI")

    // Round D NDI: Degree Irrelevant, and Interets Filtered
    const noneEligible = filterByInterests(noDegreeEligible)
    addRandomClubFromList(noneEligible, recommendedClubs, "NDI")

    // Add Faith and Nationality Clubs that match user
    if(faith){
      addRandomClub(clubsList.value, recommendedClubs, 'faith', faith)
    }
    if(nationality){
      addRandomClub(clubsList.value, recommendedClubs, 'nationality', nationality)
    }

    console.log([...recommendedIDs.value])
    return getRecommendedClubsData()
  }

  return {
    loadingClubs,
    recommendedClubs,
    finalClubs,
    getClubsFilter,
    getRecommendedClubsData,
    findClubs,
  }
}

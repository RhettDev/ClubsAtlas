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

  function preFilterList(eligible, filterValue, filterField, empty = false) {
    const value = unref(filterValue)
    if (normaliseValue(value) === normaliseValue('Not Interested')) empty = true

    if (empty) {
      // Filter out all options.
      return eligible.filter(
        (club) => club[filterField] === null || club[filterField] === undefined,
      )
    }

    if (!value || !filterField) return eligible // Check if user has entered option for the field

    return eligible.filter((club) => {
      const clubValue = club[filterField]
      return clubValue == null || normaliseValue(clubValue) === normaliseValue(value)
    })
  }

  function addRandomClubFromList(eligible, excludedClubs) {
    const shortList = eligible.filter(
      (club) => !excludedClubs.value.includes(club), // ensures clubs is already not in the list
    )
    const club = shortList[Math.floor(Math.random() * shortList.length)] ?? null

    if (club && club.clubID != null) {
      console.log(club)
      recommendedClubs.value.push(club)
      recommendedIDs.value.push(club.clubID)
    }
  }

  function addRandomClub(eligible, excludedClubs, filterField, value) {
    console.log('test')
    const shortList = eligible.filter(
      (club) =>
        !excludedClubs.value.includes(club) && // ensures clubs is already not in the list
        normaliseValue(club[filterField]) === normaliseValue(value), // match club filter with value
    )
    const club = shortList[Math.floor(Math.random() * shortList.length)] ?? null

    if (club && club.clubID != null) {
      console.log(club)
      recommendedClubs.value.push(club)
      recommendedIDs.value.push(club.clubID)
    }
  }

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
    const filterByInterests = (clubs) =>
      clubs.filter((club) =>
        [club.intA, club.intB, club.intC].some(
          (clubInterest) =>
            clubInterest && selectedInterests.includes(normaliseValue(clubInterest)),
        ),
      )

    // ---------------------------- Club Recommendation -------------------------------
    // Degree ClubType and Interets
    const degreeTypeEligible = filterByInterests(
      baseEligible.filter(
        (club) =>
          normaliseValue(club.degree) === normaliseValue(degree) &&
          normaliseValue(club.type) === normaliseValue(type),
      ),
    )
    addRandomClubFromList(degreeTypeEligible, recommendedClubs)

    // Degree and Interests
    const degreeOnlyEligible = filterByInterests(
      baseEligible.filter((club) => normaliseValue(club.degree) === normaliseValue(degree)),
    )
    addRandomClubFromList(degreeOnlyEligible, recommendedClubs)

    // Add two degree based clubs if neither of the two filters above trigger
    if (recommendedIDs.value.length < 2) {
      addRandomClub(baseEligible, recommendedClubs, 'degree', degree)
      addRandomClub(baseEligible, recommendedClubs, 'degree', degree)
    }

    // No Degree ClubType and Interests
    // all clubs that are social study have a degree attached,
    const typeOnlyEligible = filterByInterests(
      noDegreeEligible.filter((club) => normaliseValue(club.type) === normaliseValue(type)),
    )
    addRandomClubFromList(typeOnlyEligible, recommendedClubs)

    // No Degree Interests
    const noneEligible = filterByInterests(noDegreeEligible)
    addRandomClubFromList(noneEligible, recommendedClubs)

    // Add Faith and Nationality Clubs that match user
    addRandomClub(clubsList.value, recommendedClubs, 'faith', faith)
    addRandomClub(clubsList.value, recommendedClubs, 'nationality', nationality)

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

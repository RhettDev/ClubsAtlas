import { ref } from "vue"

const demoUserClubs = ref(null)
const demoUserDetails = ref(null)
const demoUserFilters = ref(null)

const isDemoSession = ref(false)

function startDemoSession() {
  isDemoSession.value = true
}

function clearDemoSession() {
  isDemoSession.value = false
  demoUserClubs.value = null
  demoUserDetails.value = null
  demoUserFilters.value = null
}

export function demoSessionData(){

  function dropFollowingClub(clubID){
    const updatedDemoClubs = demoUserClubs.value.filter(club => club !== clubID)
    demoUserClubs.value = updatedDemoClubs
  }
  function addFollowClub(clubID){
    demoUserClubs.value.push(clubID)
  }

  return {
      demoUserClubs,
      demoUserDetails,
      demoUserFilters,
      isDemoSession,
      startDemoSession,
      clearDemoSession,
      dropFollowingClub,
      addFollowClub
  }
}
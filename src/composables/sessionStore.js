// File Name: sessionStore.js
// Author: Rhett Bauchop - 20722517
// Purpose: Stores user data for the demo process. Data is taken in during student signup process and kept and accessed here.

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

  // Filter out the club whose id is the one being dropped.
  function dropFollowingClub(clubID){
    const updatedDemoClubs = demoUserClubs.value.filter(club => club !== clubID)
    demoUserClubs.value = updatedDemoClubs
  }
  // Add club to list based on clubID
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
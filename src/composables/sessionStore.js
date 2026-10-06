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

    return {
        demoUserClubs,
        demoUserDetails,
        demoUserFilters,
        isDemoSession,
        startDemoSession,
        clearDemoSession
    }
}
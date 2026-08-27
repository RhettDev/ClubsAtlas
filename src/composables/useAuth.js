import { ref, computed } from 'vue'
import { supabase } from '../../backend/supabase'

const authUser = ref(null)
const profile = ref(null)
const userType = ref(null) // 'student' | 'club'
const loading = ref(true)

async function fetchProfile(authUserId) {
  // try student first then club
  profile.value = null
  userType.value = null
  const { data: student, error: studentError } = await supabase
    .from('studentUser')
    .select('*')
    .eq('AuthUserID', authUserId)
    .maybeSingle()

  if (studentError) throw studentError

  if (student) {
    profile.value = student
    userType.value = 'student'
    return
  }

  const { data: club, error: clubError } = await supabase
    .from('clubUser')
    .select('*')
    .eq('AuthUserID', authUserId)
    .maybeSingle()

  if (clubError) throw clubError
  console.log(club)

  if (club) {
    profile.value = club
    userType.value = 'club'
    console.log("club category")
    return
  }
}

supabase.auth.onAuthStateChange(async (_event, session) => {
  authUser.value = session?.user ?? null
  if (authUser.value) {
    await fetchProfile(authUser.value.id)
  } else {
    profile.value = null
    userType.value = null
  }
  loading.value = false
})

export function useAuth() {
  const isLoggedIn = computed(() => !!authUser.value)

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    
    if (data.user) {
      await fetchProfile(data.user.id)
    }
    
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return { authUser, profile, userType, isLoggedIn, loading, login, logout }
}

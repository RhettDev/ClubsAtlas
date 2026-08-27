import { ref, computed } from 'vue'
import { supabase } from '../../backend/supabase'

const authUser = ref(null)
const profile = ref(null)
const userType = ref(null) // 'student' | 'club'
const loading = ref(true)

async function fetchProfile(authUserId) {
  // try student first then club
  const { data: student } = await supabase
    .from('StudentUser')
    .select('*')
    .eq('AuthUserID', authUserId)
    .maybeSingle()

  if (student) {
    profile.value = student
    userType.value = 'student'
    return
  }

  const { data: club } = await supabase
    .from('ClubUser')
    .select('*')
    .eq('AuthUserID', authUserId)
    .maybeSingle()

  if (club) {
    profile.value = club
    userType.value = 'club'
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
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return { authUser, profile, userType, isLoggedIn, loading, login, logout }
}

// File Name: auth.js
// Author: Rhett Bauchop - 20722517
// Purpose: Handles authentication of users through LoginPage.vue
// Code provided by [24] Supabase, “Auth. Use Supabase to authenticate and authorize your users.,” Supabase, [Online]. Available: https://supabase.com/docs/guides/auth/passwords. [Accessed 02 09 2026].
// Modified to include the type of user, student or clubs admin as it directs them differently after login

const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body // userType: 'student' | 'club'
  const table = userType === 'club' ? '"ClubUser"' : '"StudentUser"' // Set user type

  const result = await pool.query(`SELECT * FROM ${table} WHERE "Email" = $1`, [email]) // Get user data
  const user = result.rows[0]
  if (!user || !(await bcrypt.compare(password, user.PasswordHash))) { // Validate password
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.StudentID || user.ClubID, userType }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.json({ token, user, userType })
})

// routes/auth.js
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body // userType: 'student' | 'club'
  const table = userType === 'club' ? '"ClubUser"' : '"StudentUser"'

  const result = await pool.query(`SELECT * FROM ${table} WHERE "Email" = $1`, [email])
  const user = result.rows[0]
  if (!user || !(await bcrypt.compare(password, user.PasswordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.StudentID || user.ClubID, userType }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.json({ token, user, userType })
})

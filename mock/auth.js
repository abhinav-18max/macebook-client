const PRIVATE_KEY = "abkdhneji452ds8"
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const auth = async (req, res, next) => {
    try {
      const cookies = cookie.parse(req.headers.cookie)
      const token = cookies.auth
      const response = await jwt.verify(token, PRIVATE_KEY)
      req.user = { username: response.username }
      next()
    } catch (e) {
      res.status(401).send()
    }
  }
  
module.exports = auth
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {function} next 
 * @returns 
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_VALIDATION_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = {
    authenticateToken
}
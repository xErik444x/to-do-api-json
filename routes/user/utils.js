const jwt = require('jsonwebtoken');

/**
 * 
 * @param {String} username 
 * @returns 
 */
const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.JWT_VALIDATION_TOKEN, { expiresIn: '1800s' });
}

module.exports = {
    generateAccessToken
}
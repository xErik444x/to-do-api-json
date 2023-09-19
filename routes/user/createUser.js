//Esta ruta es solo para activar el jwt, solo se usa como ejemplo, no usar a nivel produccion xd
//process.env.JWT_VALIDATION_TOKEN
const {generateAccessToken} = require("./utils")

module.exports = ((req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    res.json({
        user: req.body.username,
        token: token
    });
});

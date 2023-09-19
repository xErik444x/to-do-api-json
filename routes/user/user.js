const { Router } = require("express");
var router = Router();

const createUser = require("./createUser")

router.post('/login', createUser);
module.exports = router;
var {Router} = require('express');
var router = Router();

const health = require("./get-health")

router.get('/', health);



module.exports = router;
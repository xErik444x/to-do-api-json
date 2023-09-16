var {Router} = require('express');
var router = Router();

const getTasks = require("./get-task")
const postTask = require("./post-task")
const putTask = require("./put-task")
const deleteTask = require("./delete-task")
const {checkIfJsonExists} = require("../../middlewares/check-data")

router.use(checkIfJsonExists);
router.get('/', getTasks);
router.post('/', postTask);
router.put('/:taskId', putTask);
router.delete('/:taskId', deleteTask);


module.exports = router;
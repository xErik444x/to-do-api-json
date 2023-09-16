var {Router} = require('express');
var router = Router();

const getTasks = require("./get-task")
const saveTask = require("./save-task")
const deleteTask = require("./delete-task")
const {checkIfJsonExists} = require("../../middlewares/check-data")

router.use(checkIfJsonExists);
router.get('/', getTasks);
router.post('/', saveTask);
router.delete('/:taskId', deleteTask);


module.exports = router;
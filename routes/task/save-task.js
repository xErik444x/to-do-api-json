var express = require('express');
var router = express.Router();
const {checkIfTaskNameExists, checkBodyPost} = require("../../middlewares/check-data")
const fs = require('fs');
const path = require("path");
const { randomUUID } = require('crypto');

router.use(checkBodyPost);
router.use(checkIfTaskNameExists);
router.post('/', function(req, res) {
    console.log("llega al post")
    const dataPath = path.join(__dirname, '../../data/tasks.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    console.log(`🐧 -> file: save-task.js:16 -> router.post -> data:`, data)
    const newObject = req.body;
    data.push({...newObject, id:randomUUID()});
    const updatedContent = JSON.stringify(data, null, 2); // El tercer argumento (2) es para dar formato legible al JSON
    fs.writeFileSync(dataPath, updatedContent);

    res.send(200);

});

module.exports = router;

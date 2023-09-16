var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

router.get('/', function(req, res) {
    const dataPath = path.join(__dirname, '../../data/tasks.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent).filter((task) => !task.delete);
    res.send({tasks:data});

});

module.exports = router;

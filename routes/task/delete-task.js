var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

//baja logica
router.delete('/:idTask', function(req, res) {
    const idTask = req.params.idTask;
    const dataPath = path.join(__dirname, '../../data/tasks.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const user = req.user.username;
    const encontrado = data.findIndex((task) => task.delete ? false : task.id === idTask && task.user == user)
    if(encontrado === -1){
        return  res.sendStatus(404);
    }
    data[encontrado].delete = true
    data[encontrado].updated = new Date()
    const updatedContent = JSON.stringify(data, null, 2); // El tercer argumento (2) es para dar formato legible al JSON
    fs.writeFileSync(dataPath, updatedContent);
    res.sendStatus(204);
});

module.exports = router;

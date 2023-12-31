const fs = require("fs")
const path = require("path")
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {function} next 
 * @returns 
 */
const checkIfJsonExists = (req, res, next) => {
    const dataFolderPath = path.join(__dirname, '../data');
    const dataPath = path.join(dataFolderPath, 'tasks.json');
    
    createFolderIfNotExists(dataFolderPath);

    const dataExists = fs.existsSync(dataPath);

    if (!dataExists) {
        fs.writeFile(dataPath, "[]", err => {
            if (err) {
                console.error(err);
            }
            return next();
        });
        return;
    }
    return next();
};

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {function} next 
 * @returns 
 */
const checkIfTaskNameExists = (req, res, next) => {
    const dataPath = path.join(__dirname, '../data/tasks.json');
    
    fs.readFile(dataPath, (err, data) => {
        if(err){
            return res.status(401).send({message: "No tasks found"})
        }
        const user = req.user && req.user.username;
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        const tasks = JSON.parse(data);
        const filterTasks = tasks.filter((task) => !task.delete && task.user == user)
        const duplicateName = filterTasks.find(task => task.name.toLowerCase() === req.body.name.toLowerCase());

        if (duplicateName) {
        return res.status(400).send({ message: "Duplicate task name" });
        }
        return next();
    });
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {function} next 
 * @returns 
 */
const checkBodyPost = (req, res, next) => {
    if(!req.body || !Object.keys(req.body).length){
        return res.status(401).send({message: "invalid body"})
    }
    const requiredProps = ['name', 'description'];

    if (!checkObjectProperties(req.body, requiredProps)) {
        return res.status(401).send({message: "invalid body"})
    } 
    return next();
}
const createFolderIfNotExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath);
        } catch (err) {
            console.error('Error al crear la carpeta:', err);
        }
    }
};


module.exports = {
    checkIfJsonExists,
    checkIfTaskNameExists: checkIfTaskNameExists,
    checkBodyPost
}

function checkObjectProperties(obj, requiredProperties) {
    for (const property of requiredProperties) {
      if (!(property in obj)) {
        return false;
      }
    }
    return true;
}
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
    const dataPath = path.join(__dirname, '../data/tasks.json');
    const dataExists = fs.existsSync(dataPath)
    if(!dataExists){
        fs.writeFile(dataPath, "[]", err => {
            if (err) {
                console.error(err);
            }
            return next();
        });
    }else{
        return next();
    }
}

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
            console.log(`🐧 -> file: check-data.js -> fs.readFile -> err:`, err)
            return res.status(401).send({message: "No tasks found"})
        }
        if(data){
            
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
const express = require('express');
const listEndpoints = require('express-list-endpoints');
require("dotenv").config({path:"./env/dev.env"})

const healthRouter = require('./routes/health/health');
const taskRouter = require('./routes/task/task');
const userRouter = require('./routes/user/user');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/user', userRouter);


if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    const endpoints = listEndpoints(app);
    console.table(endpoints);
  });
}

module.exports = app;
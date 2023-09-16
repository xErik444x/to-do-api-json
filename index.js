const express = require('express');
const listEndpoints = require('express-list-endpoints');

const healthRouter = require('./routes/health/health');
const taskRouter = require('./routes/task/task');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/task', taskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  const endpoints = listEndpoints(app);
  console.table(endpoints);
});
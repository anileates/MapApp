const express = require("express");
const morgan = require("morgan");
const routes = require('./routes/index');
const connectDatabase = require('./helpers/connectDatabase');
const customErrorHandler = require('./middlewares/customErrorHandler');
const app = express();

require('dotenv').config({path: './config/.env'})

connectDatabase();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => { return res.send('Map App is up and running!')})

app.use('/api/v1', routes);

app.use(customErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const express = require("express");
const morgan = require("morgan");
const routes = require('./routes/index');
const connectDatabase = require('./helpers/connectDatabase');
const app = express();

require('dotenv').config({path: 'src/config/.env'})

connectDatabase();

app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message || "Internal Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

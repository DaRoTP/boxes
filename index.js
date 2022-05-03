require('dotenv').config()
const express = require("express");

const ENV = require('./conf/env.conf');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./routes")(app);

app.listen(ENV.PORT, () => {
    console.log(`Server Running on Port: [${ENV.PORT}] with API TYPE: ${ENV.API_TYPE}`)
});
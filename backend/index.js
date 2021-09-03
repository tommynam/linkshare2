const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

const Service = require("./Service");
const Router = require("./Router");

const linkService = new Service(knex);

app.use("/api/link/", new Router(Service).router());

app.listen(8080, () => {
  console.log("Application listening to port 8080");
});
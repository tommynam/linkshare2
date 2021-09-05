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

const LinkService = require("./services/LinkService");
const LinkRouter = require("./routers/LinkRouter");

const linkService = new LinkService(knex);

app.use("/api/link/", new LinkRouter(linkService).router());

app.listen(8080, () => {
  console.log("Application listening to port 8080");
});
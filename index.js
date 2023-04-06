const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const connect = require("./server/database/connectiondb");
const auth = require("./server/routes/router");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connect();

app.use("/", auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

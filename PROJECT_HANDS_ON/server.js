require("./models/db");
require("./models/employee.model");
require("./models/CredModel");
require("./models/ApproveExpModel");

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const employeeController = require("./controllers/employeeController");
const userController = require("./controllers/userController");
const credController = require("./controllers/credController");
const approveExpController = require("./controllers/approveExpController");

const bodyparser = require("body-parser");
const req = require("express/lib/request");

var app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(cors());
app.use("/employee", employeeController);
app.use("/user", userController);
app.use("/cred", credController);
app.use("/addExp", approveExpController);

app.listen(port, () => {
  console.log(`Express server started at port :${port}`);
});

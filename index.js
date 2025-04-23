const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectToMongo = require("./config/db.js");

connectToMongo();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  console.log("request hit");
  return res.status(200).send("Welcome To The Back-End");
});

app.use("/user", require("./routes/user.js"));
app.use("/role", require("./routes/roleType.js"));
app.use("/config", require("./routes/config.js"));
app.use("/destinations", require("./routes/destinations.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

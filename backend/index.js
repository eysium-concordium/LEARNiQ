const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/lecture", require("./routes/lectures"));
app.use("/api/dashboard", require("./routes/Dashboard"));

app.listen(port, () => {
  console.log(` Backend started at http://localhost:${port}`);
});

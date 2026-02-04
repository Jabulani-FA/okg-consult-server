// const app = require('./app');

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://okgconsult.com",
  "https://www.okgconsult.com",
];

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("OKG Consult Backend is running");
});

// Dynamically load all routes from the routes directory
fs.readdirSync("./routes").forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    app.use("/api", route);
  }
});
// const mailRoutes = require("./routes/mail");
// const userRoutes = require("./routes/user");
// app.use("/api", mailRoutes);
// app.use("/api", userRoutes)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

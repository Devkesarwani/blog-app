require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const composeRoutes = require("./routes/composeRoutes");
const viewRoutes = require("./routes/viewRoute");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(process.env.DB_URI)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/compose", requireAuth, (req, res) => res.render("compose"));
app.use(authRoutes);
app.use(composeRoutes);
app.use(viewRoutes);

// 7xZ3KnhDIShGUAyq
// devkesarwani2428

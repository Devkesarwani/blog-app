require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const composeRoutes = require("./routes/composeRoutes");
const viewRoutes = require("./routes/viewRoute");
const cookieParser = require("cookie-parser");
const path = require("path");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory

app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/compose", requireAuth, (req, res) => res.render("compose"));
app.use(authRoutes);
app.use(composeRoutes);
app.use(viewRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./utils/passport");
const { secretKey, mongoURI } = require("./utils/config"); 

const app = express();

app.use(cors());
app.use(express.json());
// app.use(passport.initialize());
// require("./utils/passport.js")(passport);

mongoose
  .connect(
    "mongodb+srv://sakshiS:WvyBPotl1dbYa3Sz@cluster0.eron0yd.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};

app.use("/api/auth", require("./routes/auth"));
app.use("/api/assessments", require("./routes/assessment"));

app.get("/api/check-auth", (req, res) => {
  const isAuthenticated = req.session.isAuthenticated || false;
  res.json({ isAuthenticated });
});

app.get("/api/admin-only-route", authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin-only route accessed successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

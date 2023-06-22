const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/config"); // Create the config file

// Middleware to verify the user's authentication token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if the user has the required role
const checkRole = (role) => (req, res, next) => {
  const { role: userRole } = req.user;
  if (userRole !== role) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = {
  authenticateToken,
  checkRole,
};

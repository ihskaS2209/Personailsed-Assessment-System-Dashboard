require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://sakshiS:Frw580PAOsXWFGL9@cluster0.eron0yd.mongodb.net/?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "sakshi",
};

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Authroute = require("./routes/authRoutes");
dotenv.config();

// Middleware to handle JSON requests
const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 8787;



app.use("/api", Authroute);

// Connect to MongoDB before starting the server
(async () => {
  await connectDB(); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

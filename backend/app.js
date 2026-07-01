const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./configuration/mongoose_config");

const recruitmentRoutes = require("./routes/recruitmentRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://geeksforgeeks-six.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/recruitment", recruitmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
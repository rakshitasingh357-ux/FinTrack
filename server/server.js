const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDatabase = require(
  "./config/database"
);

const authRoutes = require(
  "./routes/authRoutes"
);

const transactionRoutes = require(
  "./routes/transactionRoutes"
);

const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);

const budgetRoutes = require(
  "./routes/budgetRoutes"
);

const goalRoutes = require(
  "./routes/goalRoutes"
);

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "FinTrack Backend is Running Successfully"
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/budgets",
  budgetRoutes
);

app.use(
  "/api/goals",
  goalRoutes
);

const PORT = process.env.PORT || 5000;

if (process.env.MONGO_URI) {
  connectDatabase();
} else {
  console.log(
    "MongoDB not connected yet. Add MONGO_URI to .env"
  );
}

app.listen(PORT, () => {
  console.log(
    "FinTrack Backend running on port " + PORT
  );
});

const express = require("express");

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createBudget,
  getBudgets,
  deleteBudget
} = require(
  "../controllers/budgetController"
);

const router = express.Router();

router.post(
  "/",
  protect,
  createBudget
);

router.get(
  "/",
  protect,
  getBudgets
);

router.delete(
  "/:id",
  protect,
  deleteBudget
);

module.exports = router;
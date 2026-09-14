const Budget = require(
  "../models/Budget"
);

async function createBudget(req, res) {
  try {
    const category = req.body.category;
    const limit = req.body.limit;

    if (!category || !limit) {
      return res.status(400).json({
        message: "Please fill all budget fields."
      });
    }

    const budget = await Budget.create({
      user: req.userId,
      category: category,
      limit: Number(limit)
    });

    res.status(201).json({
      message: "Budget created successfully.",
      budget: budget
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getBudgets(req, res) {
  try {
    const budgets = await Budget.find({
      user: req.userId
    });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function deleteBudget(req, res) {
  try {
    await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    res.json({
      message: "Budget deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createBudget,
  getBudgets,
  deleteBudget
};
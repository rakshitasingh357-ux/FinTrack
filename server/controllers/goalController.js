const Goal = require("../models/Goal");

async function createGoal(req, res) {
  try {
    const title = req.body.title;
    const targetAmount = req.body.targetAmount;
    const deadline = req.body.deadline;

    if (!title || !targetAmount) {
      return res.status(400).json({
        message: "Please enter goal title and target amount."
      });
    }

    const goal = await Goal.create({
      user: req.userId,
      title: title,
      targetAmount: Number(targetAmount),
      deadline: deadline
    });

    res.status(201).json({
      message: "Goal created successfully.",
      goal: goal
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getGoals(req, res) {
  try {
    const goals = await Goal.find({
      user: req.userId
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function updateGoal(req, res) {
  try {
    const savedAmount = req.body.savedAmount;

    const goal = await Goal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId
      },
      {
        savedAmount: Number(savedAmount)
      },
      {
        new: true
      }
    );

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found."
      });
    }

    res.json({
      message: "Goal updated successfully.",
      goal: goal
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function deleteGoal(req, res) {
  try {
    await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    res.json({
      message: "Goal deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
};
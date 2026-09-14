const Transaction = require(
  "../models/Transaction"
);

async function createTransaction(req, res) {
  try {
    const name = req.body.name;
    const amount = req.body.amount;
    const type = req.body.type;
    const category = req.body.category;

    if (!name || !amount || !type || !category) {
      return res.status(400).json({
        message: "Please fill all transaction fields."
      });
    }

    const transaction = await Transaction.create({
      user: req.userId,
      name: name,
      amount: Number(amount),
      type: type,
      category: category
    });

    res.status(201).json({
      message: "Transaction added successfully.",
      transaction: transaction
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await Transaction.find({
      user: req.userId
    }).sort({
      createdAt: -1
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found."
      });
    }

    res.json({
      message: "Transaction deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction
};
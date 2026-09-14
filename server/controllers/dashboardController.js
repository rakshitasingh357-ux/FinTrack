const Transaction = require(
  "../models/Transaction"
);

async function getDashboard(req, res) {
  try {
    const transactions = await Transaction.find({
      user: req.userId
    }).sort({
      createdAt: -1
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome =
          totalIncome + transaction.amount;
      }

      if (transaction.type === "expense") {
        totalExpense =
          totalExpense + transaction.amount;
      }
    });

    const balance =
      totalIncome - totalExpense;

    const recentTransactions =
      transactions.slice(0, 5);

    res.json({
      balance: balance,
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      recentTransactions: recentTransactions
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getDashboard
};
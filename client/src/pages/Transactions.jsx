import {
  useEffect,
  useState,
} from "react";

import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/api";

import {
  Plus,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  X,
} from "lucide-react";

function Transactions() {
  const [transactions, setTransactions] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [type, setType] =
    useState("expense");

  const [category, setCategory] =
    useState("");

  const [message, setMessage] =
    useState("");

  const loadTransactions = async () => {
    try {
      const response =
        await getTransactions();

      setTransactions(
        Array.isArray(response)
          ? response
          : []
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load transactions."
      );
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({
        name,
        amount: Number(amount),
        type,
        category,
      });

      setName("");
      setAmount("");
      setType("expense");
      setCategory("");
      setShowForm(false);

      setMessage(
        "Transaction added successfully!"
      );

      loadTransactions();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to add transaction."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);

      setMessage(
        "Transaction deleted."
      );

      loadTransactions();
    } catch (error) {
      setMessage(
        "Unable to delete transaction."
      );
    }
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString(
      "en-IN"
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="welcome-text">
            MONEY ACTIVITY
          </p>

          <h1>
            Transactions
          </h1>

          <p>
            Track every rupee coming in
            and going out.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowForm(true)
          }
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>
                  Add Transaction
                </h2>

                <p>
                  Add your latest financial
                  activity.
                </p>
              </div>

              <button
                className="icon-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="transaction-form"
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                <div className="input-group">
                  <label>
                    Transaction Name
                  </label>

                  <input
                    type="text"
                    placeholder="Example: Salary"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Amount
                  </label>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Type
                  </label>

                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value)
                    }
                  >
                    <option value="income">
                      Income
                    </option>

                    <option value="expense">
                      Expense
                    </option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    placeholder="Example: Food"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="primary-button full-button"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="glass-card table-card">
        <div className="section-heading">
          <div>
            <h2>
              All Transactions
            </h2>

            <p>
              {transactions.length} transactions
              found
            </p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="empty-state">
            <ArrowUpCircle size={40} />

            <h3>
              No transactions yet
            </h3>

            <p>
              Add your first transaction
              to start tracking.
            </p>
          </div>
        ) : (
          <div className="transaction-list">
            {transactions.map(
              (transaction) => (
                <div
                  className="transaction-row"
                  key={transaction._id}
                >
                  <div className="transaction-left">
                    <div
                      className={
                        transaction.type ===
                        "income"
                          ? "transaction-icon income"
                          : "transaction-icon expense"
                      }
                    >
                      {transaction.type ===
                      "income" ? (
                        <ArrowUpCircle
                          size={21}
                        />
                      ) : (
                        <ArrowDownCircle
                          size={21}
                        />
                      )}
                    </div>

                    <div>
                      <h3>
                        {transaction.name}
                      </h3>

                      <p>
                        {transaction.category}
                      </p>
                    </div>
                  </div>

                  <div className="transaction-right">
                    <div
                      className={
                        transaction.type ===
                        "income"
                          ? "amount income-text"
                          : "amount expense-text"
                      }
                    >
                      {transaction.type ===
                      "income"
                        ? "+"
                        : "-"}

                      ₹
                      {formatMoney(
                        transaction.amount
                      )}
                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          transaction._id
                        )
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
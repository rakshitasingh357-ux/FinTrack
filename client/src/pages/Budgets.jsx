import {
  useEffect,
  useState,
} from "react";

import {
  getBudgets,
  addBudget,
  deleteBudget,
} from "../services/api";

import {
  Plus,
  Trash2,
  X,
  Wallet,
} from "lucide-react";

function Budgets() {
  const [budgets, setBudgets] =
    useState([]);

  const [category, setCategory] =
    useState("");

  const [limit, setLimit] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const loadBudgets = async () => {
    try {
      const response =
        await getBudgets();

      setBudgets(
        Array.isArray(response)
          ? response
          : []
      );
    } catch (error) {
      setMessage(
        "Unable to load budgets."
      );
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBudget({
        category,
        limit: Number(limit),
      });

      setCategory("");
      setLimit("");
      setShowForm(false);

      setMessage(
        "Budget created successfully!"
      );

      loadBudgets();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to create budget."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);

      setMessage(
        "Budget deleted successfully!"
      );

      loadBudgets();
    } catch (error) {
      setMessage(
        "Unable to delete budget."
      );
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="welcome-text">
            FINANCIAL CONTROL
          </p>

          <h1>
            Budgets
          </h1>

          <p>
            Set limits and take control
            of your spending.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowForm(true)
          }
        >
          <Plus size={18} />
          Create Budget
        </button>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal small-modal">
            <div className="modal-header">
              <div>
                <h2>
                  Create Budget
                </h2>

                <p>
                  Set a spending limit.
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

              <div className="input-group">
                <label>
                  Budget Limit
                </label>

                <input
                  type="number"
                  placeholder="Enter amount"
                  value={limit}
                  onChange={(e) =>
                    setLimit(e.target.value)
                  }
                  required
                />
              </div>

              <button
                className="primary-button full-button"
                type="submit"
              >
                Create Budget
              </button>
            </form>
          </div>
        </div>
      )}

      {budgets.length === 0 ? (
        <div className="glass-card empty-state">
          <Wallet size={45} />

          <h3>
            No budgets created yet
          </h3>

          <p>
            Create a budget to start
            controlling your spending.
          </p>
        </div>
      ) : (
        <div className="budget-grid">
          {budgets.map((budget) => (
            <div
              className="glass-card budget-card"
              key={budget._id}
            >
              <div className="budget-top">
                <div>
                  <p>
                    MONTHLY BUDGET
                  </p>

                  <h2>
                    {budget.category}
                  </h2>
                </div>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(budget._id)
                  }
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="budget-limit">
                ₹
                {Number(
                  budget.limit
                ).toLocaleString("en-IN")}
              </div>

              <p className="budget-description">
                Spending limit for this
                category.
              </p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Budgets;
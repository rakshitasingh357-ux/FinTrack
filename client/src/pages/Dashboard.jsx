import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getDashboard,
} from "../services/api";

import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  ReceiptText,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const savedUser =
        localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      try {
        const response =
          await getDashboard();

        setDashboard(response);
      } catch (error) {
        if (
          error.response?.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          navigate("/login");
          return;
        }

        setError(
          "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const formatMoney = (value) => {
    return Number(
      value || 0
    ).toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="loading-page">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-page">
        {error}
      </div>
    );
  }

  const recentTransactions =
    dashboard?.recentTransactions || [];

  const userName =
    user?.name ||
    "User";

  return (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <p className="welcome-text">
            OVERVIEW
          </p>

          <h1>
            Welcome back, {userName} 👋
          </h1>

          <p>
            Here's what's happening
            with your money today.
          </p>
        </div>

        <div className="date-badge">
          <TrendingUp size={18} />
          Financial Overview
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Wallet size={24} />
          </div>

          <p>Total Balance</p>

          <h2>
            ₹
            {formatMoney(
              dashboard?.balance
            )}
          </h2>

          <span>
            Your current balance
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <ArrowUpCircle size={24} />
          </div>

          <p>Total Income</p>

          <h2>
            ₹
            {formatMoney(
              dashboard?.totalIncome
            )}
          </h2>

          <span className="positive">
            Money received
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <ArrowDownCircle size={24} />
          </div>

          <p>Total Expenses</p>

          <h2>
            ₹
            {formatMoney(
              dashboard?.totalExpense
            )}
          </h2>

          <span>
            Money spent
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <ReceiptText size={24} />
          </div>

          <p>Transactions</p>

          <h2>
            {recentTransactions.length}
          </h2>

          <span>
            Recent activity
          </span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="glass-card recent-card">
          <div className="section-heading">
            <div>
              <h2>
                Recent Transactions
              </h2>

              <p>
                Your latest financial activity
              </p>
            </div>

            <button
              className="text-button"
              onClick={() =>
                navigate("/transactions")
              }
            >
              View All
            </button>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="empty-state">
              <ReceiptText size={40} />

              <h3>
                No transactions yet
              </h3>

              <p>
                Add your first transaction
                to start tracking.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  navigate("/transactions")
                }
              >
                Add Transaction
              </button>
            </div>
          ) : (
            <div className="transaction-list">
              {recentTransactions.map(
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
                        "income"
                          ? "↑"
                          : "↓"}
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
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="glass-card summary-card">
          <h2>
            Financial Summary
          </h2>

          <div className="summary-item">
            <span>
              Income
            </span>

            <strong>
              ₹
              {formatMoney(
                dashboard?.totalIncome
              )}
            </strong>
          </div>

          <div className="summary-line">
            <div
              className="income-line"
              style={{
                width:
                  dashboard?.totalIncome > 0
                    ? "100%"
                    : "0%",
              }}
            />
          </div>

          <div className="summary-item">
            <span>
              Expenses
            </span>

            <strong>
              ₹
              {formatMoney(
                dashboard?.totalExpense
              )}
            </strong>
          </div>

          <div className="summary-line">
            <div
              className="expense-line"
              style={{
                width:
                  dashboard?.totalExpense > 0
                    ? `${Math.min(
                        (dashboard.totalExpense /
                          Math.max(
                            dashboard.totalIncome,
                            1
                          )) *
                          100,
                        100
                      )}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import {
  useEffect,
  useState,
} from "react";

import {
  getTransactions,
} from "../services/api";

import {
  TrendingUp,
  Wallet,
  PiggyBank,
  ArrowDownCircle,
} from "lucide-react";

function Analytics() {
  const [transactions, setTransactions] =
    useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response =
          await getTransactions();

        setTransactions(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const income =
    transactions
      .filter(
        (item) =>
          item.type === "income"
      )
      .reduce(
        (total, item) =>
          total + item.amount,
        0
      );

  const expense =
    transactions
      .filter(
        (item) =>
          item.type === "expense"
      )
      .reduce(
        (total, item) =>
          total + item.amount,
        0
      );

  const balance =
    income - expense;

  const savingRate =
    income > 0
      ? Math.round(
          (balance / income) * 100
        )
      : 0;

  const categories = {};

  transactions
    .filter(
      (item) =>
        item.type === "expense"
    )
    .forEach((item) => {
      categories[item.category] =
        (categories[item.category] || 0) +
        item.amount;
    });

  const topCategory =
    Object.entries(categories)
      .sort(
        (a, b) => b[1] - a[1]
      )[0] || [
        "No data",
        0,
      ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="welcome-text">
            INSIGHTS & ANALYTICS
          </p>

          <h1>
            Financial Analytics
          </h1>

          <p>
            Understand your spending
            behavior and money trends.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="glass-card analytics-large">
          <div className="section-heading">
            <div>
              <h2>
                Financial Overview
              </h2>

              <p>
                Your current financial
                performance.
              </p>
            </div>

            <TrendingUp
              size={28}
            />
          </div>

          <div className="analytics-chart">
            <div className="chart-column">
              <div
                className="chart-bar income-bar"
                style={{
                  height:
                    `${income > 0 ? 85 : 10}%`,
                }}
              />

              <span>
                Income
              </span>
            </div>

            <div className="chart-column">
              <div
                className="chart-bar expense-bar"
                style={{
                  height:
                    `${
                      expense > 0
                        ? Math.min(
                            (
                              expense /
                              Math.max(
                                income,
                                expense
                              )
                            ) *
                              85,
                            85
                          )
                        : 10
                    }%`,
                }}
              />

              <span>
                Expense
              </span>
            </div>

            <div className="chart-column">
              <div
                className="chart-bar balance-bar"
                style={{
                  height:
                    `${
                      balance > 0
                        ? Math.min(
                            (
                              balance /
                              Math.max(
                                income,
                                1
                              )
                            ) *
                              85,
                            85
                          )
                        : 10
                    }%`,
                }}
              />

              <span>
                Savings
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card analytics-card">
          <div className="analytics-icon blue">
            <Wallet size={24} />
          </div>

          <p>
            Top Category
          </p>

          <h2>
            {topCategory[0]}
          </h2>

          <span>
            ₹
            {Number(
              topCategory[1]
            ).toLocaleString("en-IN")}
            {" "}spent
          </span>
        </div>

        <div className="glass-card analytics-card">
          <div className="analytics-icon green">
            <PiggyBank size={24} />
          </div>

          <p>
            Saving Rate
          </p>

          <h2>
            {savingRate}%
          </h2>

          <span>
            Current savings performance
          </span>
        </div>

        <div className="glass-card analytics-card">
          <div className="analytics-icon red">
            <ArrowDownCircle size={24} />
          </div>

          <p>
            Total Expenses
          </p>

          <h2>
            ₹
            {Number(
              expense
            ).toLocaleString("en-IN")}
          </h2>

          <span>
            Based on all transactions
          </span>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
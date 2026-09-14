import {
  useEffect,
  useState,
} from "react";

import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} from "../services/api";

import {
  Plus,
  Target,
  Trash2,
  X,
} from "lucide-react";

function Goals() {
  const [goals, setGoals] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [message, setMessage] =
    useState("");

  const loadGoals = async () => {
    try {
      const response =
        await getGoals();

      setGoals(
        Array.isArray(response)
          ? response
          : []
      );
    } catch (error) {
      setMessage(
        "Unable to load goals."
      );
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addGoal({
        title,
        targetAmount:
          Number(targetAmount),
        deadline,
      });

      setTitle("");
      setTargetAmount("");
      setDeadline("");

      setShowForm(false);

      setMessage(
        "Goal created successfully!"
      );

      loadGoals();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to create goal."
      );
    }
  };

  const addMoney = async (
    goal
  ) => {
    const amount = window.prompt(
      "Enter amount to add:"
    );

    if (
      !amount ||
      Number(amount) <= 0
    ) {
      return;
    }

    try {
      await updateGoal(
        goal._id,
        {
          savedAmount:
            Number(goal.savedAmount || 0) +
            Number(amount),
        }
      );

      setMessage(
        "Goal updated successfully!"
      );

      loadGoals();
    } catch (error) {
      setMessage(
        "Unable to update goal."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoal(id);

      setMessage(
        "Goal deleted successfully!"
      );

      loadGoals();
    } catch (error) {
      setMessage(
        "Unable to delete goal."
      );
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="welcome-text">
            BUILD YOUR FUTURE
          </p>

          <h1>
            Financial Goals
          </h1>

          <p>
            Save with purpose and
            achieve your dreams.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowForm(true)
          }
        >
          <Plus size={18} />
          New Goal
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
                  Create Goal
                </h2>

                <p>
                  Start saving for
                  something important.
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
                  Goal Name
                </label>

                <input
                  type="text"
                  placeholder="Example: Dream Vacation"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label>
                  Target Amount
                </label>

                <input
                  type="number"
                  placeholder="Enter target amount"
                  value={targetAmount}
                  onChange={(e) =>
                    setTargetAmount(
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label>
                  Target Date
                </label>

                <input
                  type="date"
                  value={deadline}
                  onChange={(e) =>
                    setDeadline(e.target.value)
                  }
                />
              </div>

              <button
                className="primary-button full-button"
                type="submit"
              >
                Create Goal
              </button>
            </form>
          </div>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="glass-card empty-state">
          <Target size={45} />

          <h3>
            No goals yet
          </h3>

          <p>
            Create your first financial
            goal and start saving.
          </p>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => {
            const percentage =
              Math.min(
                (
                  (goal.savedAmount || 0) /
                  Math.max(
                    goal.targetAmount,
                    1
                  )
                ) *
                  100,
                100
              );

            return (
              <div
                className="glass-card goal-card"
                key={goal._id}
              >
                <div className="goal-top">
                  <div className="goal-icon">
                    <Target size={25} />
                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(goal._id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h2>
                  {goal.title}
                </h2>

                <p>
                  ₹
                  {Number(
                    goal.savedAmount || 0
                  ).toLocaleString("en-IN")}
                  {" "}saved of ₹
                  {Number(
                    goal.targetAmount
                  ).toLocaleString("en-IN")}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width:
                        `${percentage}%`,
                    }}
                  />
                </div>

                <div className="goal-footer">
                  <strong>
                    {Math.round(
                      percentage
                    )}% Completed
                  </strong>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      addMoney(goal)
                    }
                  >
                    Add Savings
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Goals;
import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
  registerUser,
} from "../services/api";

import {
  TrendingUp,
  Mail,
  Lock,
  User,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      let response;

      if (isRegister) {
        response = await registerUser({
          name,
          email,
          password,
        });
      } else {
        response = await loginUser({
          email,
          password,
        });
      }

      if (response.token) {
        localStorage.setItem(
          "token",
          response.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

        navigate("/");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setMessage("");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">
            <TrendingUp size={30} />
          </div>

          <h1>FinTrack</h1>
        </div>

        <div className="login-hero">
          <p className="login-tag">
            SMART PERSONAL FINANCE
          </p>

          <h2>
            Take control of your
            <span> financial future.</span>
          </h2>

          <p>
            Track your spending,
            manage your budgets,
            build savings goals and
            understand your money.
          </p>

          <div className="feature-list">
            <div>
              ✓ Track income and expenses
            </div>

            <div>
              ✓ Manage monthly budgets
            </div>

            <div>
              ✓ Build financial goals
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-container">
          <p className="welcome-text">
            {isRegister
              ? "CREATE YOUR ACCOUNT"
              : "WELCOME BACK"}
          </p>

          <h2>
            {isRegister
              ? "Start your journey"
              : "Welcome Back"}
          </h2>

          <p className="login-description">
            {isRegister
              ? "Create your FinTrack account and start managing your finances."
              : "Login to continue managing your finances."}
          </p>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            {isRegister && (
              <div className="input-group">
                <label>
                  Full Name
                </label>

                <div className="input-wrapper">
                  <User size={18} />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>
                Email Address
              </label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>
                Password
              </label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {message && (
              <div className="form-message">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Create Account"
                  : "Login"}
            </button>
          </form>

          <p className="switch-auth">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={switchMode}
              type="button"
            >
              {isRegister
                ? " Login"
                : " Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
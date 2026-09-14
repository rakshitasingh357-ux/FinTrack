import axios from "axios";

const API_URL =
  "https://fintrack-b61l.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (
  userData
) => {
  const response =
    await api.post(
      "/auth/register",
      userData
    );

  return response.data;
};

export const loginUser = async (
  userData
) => {
  const response =
    await api.post(
      "/auth/login",
      userData
    );

  return response.data;
};

export const getDashboard = async () => {
  const response =
    await api.get("/dashboard");

  return response.data;
};

export const getTransactions =
  async () => {
    const response =
      await api.get("/transactions");

    return response.data;
  };

export const addTransaction =
  async (transactionData) => {
    const response =
      await api.post(
        "/transactions",
        transactionData
      );

    return response.data;
  };

export const deleteTransaction =
  async (id) => {
    const response =
      await api.delete(
        `/transactions/${id}`
      );

    return response.data;
  };

export const getBudgets = async () => {
  const response =
    await api.get("/budgets");

  return response.data;
};

export const addBudget =
  async (budgetData) => {
    const response =
      await api.post(
        "/budgets",
        budgetData
      );

    return response.data;
  };

export const deleteBudget =
  async (id) => {
    const response =
      await api.delete(
        `/budgets/${id}`
      );

    return response.data;
  };

export const getGoals = async () => {
  const response =
    await api.get("/goals");

  return response.data;
};

export const addGoal =
  async (goalData) => {
    const response =
      await api.post(
        "/goals",
        goalData
      );

    return response.data;
  };

export const updateGoal =
  async (id, goalData) => {
    const response =
      await api.put(
        `/goals/${id}`,
        goalData
      );

    return response.data;
  };

export const deleteGoal =
  async (id) => {
    const response =
      await api.delete(
        `/goals/${id}`
      );

    return response.data;
  };

export default api;
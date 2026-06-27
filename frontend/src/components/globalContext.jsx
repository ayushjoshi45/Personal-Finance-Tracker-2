import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "/transaction";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Add income
  const addIncome = async (income) => {
    console.log("Income data being sent:", income);
    try {
      const response = await axios.post(`${BASE_URL}/add-income`, income);
      getIncomes(); // Fetch updated incomes
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };

  // Get incomes
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete-income/${id}`);
      getIncomes(); // Fetch updated incomes
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };

  // Calculate total income
  const totalIncome = () => {
    let total = 0;
    incomes.forEach((income) => {
      total += income.amount;
    });
    return total;
  };

  // Add expense
  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-expense`, expense);
      getExpenses(); // Fetch updated expenses
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };

  // Get expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
      getExpenses(); // Fetch updated expenses
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };

  // Calculate total expenses
  const totalExpenses = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });
    return total;
  };

  // Calculate total balance (income - expenses)
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Get transaction history
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

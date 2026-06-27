import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../components/globalContext";
import { plus } from "../utils/Icons";

function Form() {
  const { addIncome, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      setError("Please fill all required fields.");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Amount must be a positive number!");
      return;
    }

    addIncome({
      ...inputState,
      amount: Number(amount),
      date: date.toISOString(),
    });

    setInputState({
      title: "",
      amount: "",
      date: null,
      category: "",
      description: "",
    });

    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-4 shadow-xl"
    >
      <h2 className="text-lg font-bold text-gray-200">
        Add Income
      </h2>

      {error && <p className="text-rose-400 text-xs font-medium">{error}</p>}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Title
        </label>
        <input
          type="text"
          value={title}
          placeholder="e.g. Salary, Freelance"
          onChange={handleInput("title")}
          className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Amount (INR)
        </label>
        <input
          value={amount}
          type="text"
          placeholder="e.g. 50000"
          onChange={handleInput("amount")}
          className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
        />
      </div>

      <div className="space-y-1 flex flex-col">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          Date
        </label>
        <DatePicker
          selected={date}
          placeholderText="Select Date"
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date })}
          className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 cursor-pointer"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Category
        </label>
        <select
          value={category}
          onChange={handleInput("category")}
          className="w-full bg-[#110e1a] border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 cursor-pointer"
        >
          <option value="" disabled className="bg-[#110e1a]">
            Select Category
          </option>
          <option value="salary" className="bg-[#110e1a]">Salary</option>
          <option value="freelancing" className="bg-[#110e1a]">Freelancing</option>
          <option value="investments" className="bg-[#110e1a]">Investments</option>
          <option value="stocks" className="bg-[#110e1a]">Stocks</option>
          <option value="bitcoin" className="bg-[#110e1a]">Bitcoin</option>
          <option value="bank" className="bg-[#110e1a]">Bank Transfer</option>
          <option value="youtube" className="bg-[#110e1a]">YouTube</option>
          <option value="other" className="bg-[#110e1a]">Other</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Description
        </label>
        <textarea
          value={description}
          placeholder="Add a reference note"
          onChange={handleInput("description")}
          className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 h-20 resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] rounded-xl shadow-lg shadow-emerald-600/20 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 mt-2 cursor-pointer"
      >
        {plus} Add Income
      </button>
    </form>
  );
}

export default Form;

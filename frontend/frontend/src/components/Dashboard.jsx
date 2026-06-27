import { useEffect } from "react";
import Chart from "./Chart";
import History from "./History";
import { useGlobalContext } from "../components/globalContext";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  // Safe checks for min/max to prevent Infinity/-Infinity when lists are empty
  const minSalary = incomes.length > 0 ? Math.min(...incomes.map((item) => item.amount)) : 0;
  const maxSalary = incomes.length > 0 ? Math.max(...incomes.map((item) => item.amount)) : 0;
  const minExpense = expenses.length > 0 ? Math.min(...expenses.map((item) => item.amount)) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map((item) => item.amount)) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Financial Overview
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor your incomes, expenses, and net balance breakdown
        </p>
      </div>

      {/* Main Grid: Statistics & Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Summary Cards & Chart */}
        <div className="xl:col-span-2 space-y-6 flex flex-col">
          {/* Summary Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Total Income */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border border-emerald-500/20 rounded-2xl p-6 shadow-lg shadow-emerald-500/5 hover:border-emerald-500/30 transition duration-300">
              <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Total Income
              </h2>
              <p className="text-3xl font-bold text-emerald-400 mt-2">
                ₹{totalIncome().toLocaleString()}
              </p>
            </div>

            {/* Total Expense */}
            <div className="bg-gradient-to-br from-rose-500/10 to-red-600/5 border border-rose-500/20 rounded-2xl p-6 shadow-lg shadow-rose-500/5 hover:border-rose-500/30 transition duration-300">
              <h2 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Total Expenses
              </h2>
              <p className="text-3xl font-bold text-rose-400 mt-2">
                ₹{totalExpenses().toLocaleString()}
              </p>
            </div>

            {/* Total Balance */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-600/5 border border-indigo-500/20 rounded-2xl p-6 shadow-lg shadow-indigo-500/5 hover:border-indigo-500/30 transition duration-300">
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Net Balance
              </h2>
              <p className="text-3xl font-bold text-indigo-400 mt-2">
                ₹{totalBalance().toLocaleString()}
              </p>
            </div>
          </div>

          {/* Transaction Breakdown Doughnut Chart */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center flex-1 min-h-[340px]">
            <h2 className="text-lg font-bold text-gray-200 self-start mb-4">
              Breakdown Analysis
            </h2>
            <div className="w-full max-w-[280px] md:max-w-[320px] aspect-square flex items-center justify-center">
              <Chart income={totalIncome()} expense={totalExpenses()} balance={totalBalance()} />
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & Ranges */}
        <div className="space-y-6">
          {/* History Component */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 shadow-xl">
            <History />
          </div>

          {/* Min & Max Analytics Panel */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-200">
              Salary & Expense Limits
            </h2>

            {/* Salary Range */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Incomes Range
              </p>
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-4 py-3 rounded-xl">
                <span className="text-sm text-gray-400">Minimum</span>
                <span className="text-sm font-semibold text-emerald-400">₹{minSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-4 py-3 rounded-xl">
                <span className="text-sm text-gray-400">Maximum</span>
                <span className="text-sm font-semibold text-emerald-400">₹{maxSalary.toLocaleString()}</span>
              </div>
            </div>

            {/* Expense Range */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Expenses Range
              </p>
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-4 py-3 rounded-xl">
                <span className="text-sm text-gray-400">Minimum</span>
                <span className="text-sm font-semibold text-rose-400">₹{minExpense.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-4 py-3 rounded-xl">
                <span className="text-sm text-gray-400">Maximum</span>
                <span className="text-sm font-semibold text-rose-400">₹{maxExpense.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

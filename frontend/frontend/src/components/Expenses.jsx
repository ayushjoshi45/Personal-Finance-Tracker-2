import React, { useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import IncomeItem from "../components/IncomeItem";
import { useGlobalContext } from "../components/globalContext";

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-wide">Expenses</h1>
        <p className="text-gray-400 text-sm mt-1">Manage and track your expenditures</p>
      </div>

      {/* Total Banner */}
      <div className="bg-gradient-to-br from-rose-500/10 to-red-500/5 border border-rose-500/20 shadow-md shadow-rose-500/5 rounded-2xl p-5 flex justify-between items-center">
        <span className="text-sm font-semibold text-rose-400 uppercase tracking-wider">
          Total Expense
        </span>
        <span className="text-3xl font-bold text-rose-400">
          ₹{totalExpenses().toLocaleString()}
        </span>
      </div>

      {/* Content Columns */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[360px] flex-shrink-0">
          <ExpenseForm />
        </div>
        <div className="flex-1 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {expenses.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No expenses added yet. Fill out the form to add one!
            </p>
          ) : (
            expenses.map(
              ({ _id, title, amount, date, category, description, type }) => (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="border-l-rose-500"
                  deleteItem={deleteExpense}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;

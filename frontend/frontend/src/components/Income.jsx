import React, { useEffect } from "react";
import Form from "../components/Form";
import IncomeItem from "../components/IncomeItem";
import { useGlobalContext } from "../components/globalContext";

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-wide">Incomes</h1>
        <p className="text-gray-400 text-sm mt-1">Manage and track your earnings</p>
      </div>

      {/* Total Banner */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 shadow-md shadow-emerald-500/5 rounded-2xl p-5 flex justify-between items-center">
        <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
          Total Income
        </span>
        <span className="text-3xl font-bold text-emerald-400">
          ₹{totalIncome().toLocaleString()}
        </span>
      </div>

      {/* Content Columns */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[360px] flex-shrink-0">
          <Form />
        </div>
        <div className="flex-1 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {incomes.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No incomes added yet. Fill out the form to add one!
            </p>
          ) : (
            incomes.map(
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
                  indicatorColor="border-l-emerald-500"
                  deleteItem={deleteIncome}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Income;

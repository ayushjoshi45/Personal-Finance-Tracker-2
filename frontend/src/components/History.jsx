import React from "react";
import { useGlobalContext } from '../components/globalContext';

function History() {
  const { transactionHistory } = useGlobalContext();
  const history = transactionHistory();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-200">Recent Activity</h2>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          No recent transactions found
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map(({ _id, title, amount, type }) => (
            <div
              key={_id}
              className={`bg-white/5 hover:bg-white/10 p-4 rounded-xl flex justify-between items-center transition-all duration-300 border border-white/5 border-l-4 ${
                type === "expense" ? "border-l-rose-500" : "border-l-emerald-500"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200 tracking-wide">
                  {title}
                </span>
                <span className="text-xs text-gray-400 capitalize mt-0.5">
                  {type}
                </span>
              </div>

              <span
                className={`text-base font-bold ${
                  type === "expense" ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {type === "expense" ? `-₹${amount.toLocaleString()}` : `+₹${amount.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;

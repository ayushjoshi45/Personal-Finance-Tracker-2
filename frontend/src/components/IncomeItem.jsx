import React from "react";
import { dateFormat } from "../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../utils/Icons";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return circle;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return circle;
    }
  };

  const isExpense = type === "expense";

  return (
    <div
      className={`bg-white/5 hover:bg-white/10 rounded-2xl p-4 flex items-center gap-4 w-full border border-white/5 border-l-4 transition-all duration-300 ${
        isExpense ? "border-l-rose-500" : "border-l-emerald-500"
      }`}
    >
      {/* Icon Wrapper */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center border border-white/5 text-2xl bg-white/5 ${
        isExpense ? "text-rose-400" : "text-emerald-400"
      }`}>
        {isExpense ? expenseCatIcon() : categoryIcon()}
      </div>

      {/* Details Container */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isExpense ? "bg-rose-500" : "bg-emerald-500"}`}></span>
          <h5 className="text-base font-bold text-gray-200 truncate">
            {title}
          </h5>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-1">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-gray-400">
            <span className={`font-semibold ${isExpense ? "text-rose-400" : "text-emerald-400"}`}>
              {isExpense ? "-" : "+"}₹{amount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              {calender} {dateFormat(date)}
            </span>
            {description && (
              <span className="flex items-center gap-1.5 truncate max-w-[150px] md:max-w-[200px]" title={description}>
                {comment} {description}
              </span>
            )}
          </div>

          {/* Action button */}
          <button
            className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition duration-200 cursor-pointer self-end md:self-center ml-auto"
            onClick={() => deleteItem(id)}
            title="Delete Transaction"
          >
            {trash}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;

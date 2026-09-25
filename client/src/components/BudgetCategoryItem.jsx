import React from "react";

const BudgetCategoryItem = ({ item }) => {
  console.log(item)

  const getPercentageColor = () => {
    if (100 - item.percentLeft > 100) return "text-rose-500";
    if (100 - item.percentLeft >= 90) return "text-amber-500";
    return "text-emerald-500";
  };


  return (
    <div className="px-4 py-5 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-md">
      <div className="flex items-center mb-1 justify-between gap-4 space-y-2">
        <div>
          <div>
            <div className="font-semibold text-lg text-slate-200">{item.category}</div>
            <div className="text-slate-400">
              Rs.{item.spent.toFixed(2)} of Rs.{item.allocated.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className={`${getPercentageColor()} font-semibold`}>
            {item.percentLeft}%
          </div>
          <div className="text-sm">
            {item.remaining >= 0 ? (
              <span className="text-emerald-500">Rs.{item.remaining} left</span>
            ) : (
              <span className="text-rose-500">
                Over budget by Rs.{Math.abs(item.remaining)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-800 rounded mb-1">

        <div
          className="h-full bg-blue-500 rounded shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ width: `${100 - parseFloat(item.percentLeft)}%` }}
        />
      </div>

    </div>
  );
};

export default BudgetCategoryItem;

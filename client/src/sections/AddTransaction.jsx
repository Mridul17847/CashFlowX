import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import toast from "react-hot-toast";

function AddTransaction() {
  // Access functions from the app's context
  const { addTransaction, getBudgetUsage } = useAppContext();

  // Local state for form inputs
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [loading, setLoading] = useState(false); // Used to disable UI during submission

  // Predefined category options
  const expenseTypes = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Other",
  ];

  const incomeTypes = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other",
  ];

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!category || !amount || !type) {
      toast.error("Please select a type, category and enter an amount.");
      return;
    }

    setLoading(true); // Disable UI elements

    try {
      // Save transaction using context method
      await addTransaction({
        category,
        amount,
        type,
        description,
      });

      // Refresh budget data
      await getBudgetUsage();

      // Reset form fields
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Re-enable UI elements
    }
  };

  return (
    <div className="w-full">
      {/* Card container */}
      <div className="rounded-xl bg-slate-900/50 backdrop-blur-md py-6 px-6 border border-slate-800">
        <h1 className="text-xl font-semibold mb-6 text-slate-200">
          <span className="text-blue-400">+</span> Add Transactions
        </h1>

        {/* Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Transaction Type Selector */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-slate-400 mb-2.5"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="pl-3 py-2.5 bg-slate-800/50 text-slate-200 border border-slate-700 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            >
              {["Expense", "Income"].map((item, index) => (
                <option key={index} value={item} className="bg-slate-800">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-slate-400 mb-2.5"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                Rs
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 pr-3 py-2.5 bg-slate-800/50 text-slate-200 placeholder-slate-500 border border-slate-700 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-400 mb-2.5"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-3 py-2.5 bg-slate-800/50 text-slate-200 border border-slate-700 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            >
              <option value="" className="bg-slate-800 text-slate-400">Select category...</option>
              {(type === "Expense" ? expenseTypes : incomeTypes).map(
                (item, index) => (
                  <option key={index} value={item} className="bg-slate-800">
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-400 mb-2.5"
            >
              Description
            </label>
            <input
              type="text"
              placeholder="Transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2.5 bg-slate-800/50 text-slate-200 placeholder-slate-500 border border-slate-700 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full ${
                type === "Income"
                  ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                  : "bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
              } text-white font-semibold py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? "Loading..."
                : `+ ${type === "Income" ? "Add Income" : "Add Expense"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;

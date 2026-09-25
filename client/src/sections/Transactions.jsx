import React, { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';
import TransactionCard from '../components/TransactionCard';


function TransactionHistory() {
  const { transactions,search,setSearch } = useAppContext();
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let temp = [...transactions];

    // Filter by type
    if (typeFilter !== 'All') {
      temp = temp.filter((t) => t.type.toLowerCase() === typeFilter.toLowerCase());
    }

    // Search by description
    if (search) {
      temp = temp.filter((t) =>
        t.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'Date') {
      temp.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Amount') {
      temp.sort((a, b) => b.amount - a.amount);
    }

    setFiltered(temp);
  }, [search, typeFilter, sortBy, transactions]);

  return (
    <div className="w-full">

      <div className="rounded-xl bg-slate-900/50 backdrop-blur-md p-6 border border-slate-800 mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-200">
          <ArrowDownUp className="text-blue-400" size={20} /> Filter Transactions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800/50 text-slate-200 placeholder-slate-400 border border-slate-700 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-800/50 text-slate-200 border border-slate-700 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="All" className="bg-slate-800">All Types</option>
            <option value="Income" className="bg-slate-800">Income</option>
            <option value="Expense" className="bg-slate-800">Expense</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800/50 text-slate-200 border border-slate-700 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="Date" className="bg-slate-800">Date</option>
            <option value="Amount" className="bg-slate-800">Amount</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/50 backdrop-blur-md p-6 border border-slate-800">
        <h3 className="text-2xl font-semibold mb-4 text-slate-200">
          Transaction History
        </h3>

        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-400">No transactions found.</p>
          ) : (
            filtered.map((item, index) => (
              <TransactionCard item={item} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;

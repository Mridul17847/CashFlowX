import React from 'react'
import {CalendarDays } from 'lucide-react';
function TransactionCard({item}) {
    return (
        <div
            className="flex justify-between items-center bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all px-4 py-4 rounded-xl"
        >
            <div>
                <h4 className="font-bold text-lg text-slate-200">{item.description}</h4>
                <p className="text-sm text-slate-400">{item.category}</p>
                <div className="flex items-center text-sm text-slate-500 mt-1">
                    <CalendarDays size={14} className="mr-1" />
                    {new Date(item.date).toLocaleString()}
                </div>
            </div>

            <div className="text-right">
                <p
                    className={`font-bold text-xl
                        ${item.type === 'Expense' ? 'text-rose-500' : 'text-emerald-400'
                        }`}
                >
                    Rs.{parseFloat(item.amount).toFixed(2)}
                </p>
                <p className="text-sm text-slate-400">{item.type}</p>
            </div>
        </div>
    )
}

export default TransactionCard
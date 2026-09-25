import React, { useState } from 'react';
import { SquarePen, X, Save } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';

function BudgetCardDisplay({ item }) {
    const { updateBudget, deleteBudget,getBudgetUsage,getBudgets } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAmount, setEditedAmount] = useState(item.amount);

    const handleSave = async () => {
        try {
            await updateBudget(
                item._id,
                {
                    category: item.category,
                    amount: editedAmount
                }
            );
            await getBudgetUsage();
            setIsEditing(false);
        } catch (error) {
            return null;
        }
    }

    const handleDelete = async () => {
        try {
            await deleteBudget(item._id);
            await getBudgets();
            await getBudgetUsage();
        } catch (error) {
            return null
        }
    }

    return (
        <div className='bg-slate-800/50 flex flex-col md:flex-row justify-between items-start md:items-center px-5 py-4 rounded-xl border border-transparent hover:border-slate-700 transition-all'>
  
            <div>
                <p className='font-semibold text-xl text-slate-200'>{item.category}</p>
                <p className='text-sm text-slate-400'>Monthly Budget</p>
            </div>

            <div className='flex items-center justify-between gap-4 mt-3 md:mt-0'>
                {isEditing ? (
                    <input
                        type='number'
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(e.target.value)}
                        className='border border-slate-700 bg-slate-900 text-slate-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-blue-500'
                    />
                ) : (
                    <span className='text-lg font-bold text-slate-200'>Rs {item.amount.toFixed(2)}</span>
                )}
                <div className='flex gap-2'>
                    {isEditing ? (
                        <button
                            className='hover:bg-emerald-500/10 text-emerald-400 p-1 rounded-md border border-slate-700 hover:border-emerald-400/50 transition-colors'
                            onClick={handleSave}
                        >
                            <Save size={20} />
                        </button>
                    ) : (
                        <button
                            className='hover:bg-blue-500/10 text-blue-400 p-1 rounded-md border border-slate-700 hover:border-blue-400/50 transition-colors'
                            onClick={() => setIsEditing(true)}
                        >
                            <SquarePen size={20} />
                        </button>
                    )}
                    <button
                        className='hover:bg-rose-500/10 text-rose-500 p-1 rounded-md border border-slate-700 hover:border-rose-400/50 transition-colors'
                        onClick={handleDelete}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BudgetCardDisplay;

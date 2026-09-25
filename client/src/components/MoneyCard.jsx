import React from 'react'

function MoneyCard({ title, icon, amount=0, style, textColor = "",isPrice=true }) {
    return (
        <div className='w-full py-6 px-5 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-md space-y-1 hover:border-slate-700 transition-colors'>
            <div className='flex items-center justify-between gap-4 text-sm font-medium text-slate-400'>
                <span>{title}</span>
                <span className={`${style} text-xl bg-slate-800/50 p-2 rounded-lg`}>{icon}</span>
            </div>
            {
                isPrice ? 
                 <span className={`text-2xl font-bold ${textColor}`}>Rs.{(parseFloat(amount)).toFixed(2)}</span>
                 :
                  <span className={`text-2xl font-bold ${textColor}`}>{parseFloat(amount).toFixed(2)}%</span>
            }
          
        </div>
    )
}

export default MoneyCard
import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { TextToSpeechButton } from '../components/TextToSpeechButton';
import { IndianRupee, Plus, X } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExpenseCategory } from '../types';

export default function Expenses() {
  const { expenses, addExpense, totalExpenses } = useFarm();
  const { t } = useLanguage();
  const ttsSummaryText = (t("tts_expenses_summary") || "").replace("{amount}", totalExpenses.toString()).replace("{count}", expenses.length.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Seeds' as ExpenseCategory,
    description: '',
    amount: ''
  });

  const categories: ExpenseCategory[] = ['Seeds', 'Fertilizer', 'Labour', 'Equipment', 'Irrigation', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      ...formData,
      amount: Number(formData.amount)
    });
    setIsModalOpen(false);
    setFormData({ date: new Date().toISOString().split('T')[0], category: 'Seeds', description: '', amount: '' });
  };

  // Group expenses by month for chart
  const monthlyData = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.name === month);
    if (existing) {
      existing.total += exp.amount;
    } else {
      acc.push({ name: month, total: exp.amount });
    }
    return acc;
  }, [] as {name: string, total: number}[]).reverse(); // simple reverse for demo, assumes ordered data

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Farm Expenses</h1>
          <p className="text-slate-500 mt-1 text-lg">Monitor and track your financial activities.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900">Expense History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase font-bold tracking-tighter">
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Description</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                  {expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => (
                    <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">{new Date(expense.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-800">{expense.description}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">{formatCurrency(expense.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-emerald-600 rounded-2xl p-8 text-white shadow-md">
            <p className="text-emerald-100 font-medium mb-2">Total Expenses</p>
            <p className="text-4xl font-bold">{formatCurrency(totalExpenses)}</p>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Monthly Trend</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [formatCurrency(value), 'Total']}
                  />
                  <Area type="monotone" dataKey="total" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-emerald-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Add New Expense</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 shadow-sm">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <input 
                    type="date" required
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <select 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ExpenseCategory})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 bg-white"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <input 
                    type="text" required
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    placeholder="e.g. Wheat Seeds"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Amount (₹)</label>
                  <input 
                    type="number" required min="1"
                    value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

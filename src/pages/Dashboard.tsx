import React from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { TextToSpeechButton } from '../components/TextToSpeechButton';
import { Sprout, Map, IndianRupee, CheckSquare, CloudSun, Calendar } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockExpenseData = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 3000 },
  { name: 'Mar', total: 2000 },
  { name: 'Apr', total: 2780 },
  { name: 'May', total: 1890 },
  { name: 'Jun', total: 2390 },
  { name: 'Jul', total: 3490 },
];

export default function Dashboard() {
  const { crops, expenses, tasks, totalExpenses, totalArea } = useFarm();
  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const { t } = useLanguage();
  
  const ttsSummaryText = t('tts_dashboard_summary')
    .replace('{crops}', crops.length.toString())
    .replace('{area}', totalArea.toString())
    .replace('{tasks}', pendingTasks.length.toString());

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("greeting")}</h1>
          <p className="text-slate-500 mt-1 text-lg">{t("greeting_sub")}</p>
          <div className="mt-4">
            <TextToSpeechButton text={ttsSummaryText} />
          </div>
        </div>
        <div className="hidden lg:block">
          <LanguageSelector variant="light" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 content-start">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t("active_crops")}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-emerald-700">{crops.length}</h3>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-md">{t("this_month")}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t("farm_area")}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-emerald-700">{totalArea} <span className="text-lg font-normal text-slate-400">{t("acres")}</span></h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t("total_expenses")}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-emerald-700">{formatCurrency(totalExpenses)}</h3>
            <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-md">{t("target")}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t("pending_tasks")}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-emerald-700">{pendingTasks.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* My Crops */}
          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
              <h4 className="font-bold text-slate-900">{t("current_crop_cycle")}</h4>
              <button className="text-xs font-semibold text-emerald-600 hover:underline">{t("view_full_list")}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase font-bold tracking-tighter">
                  <tr>
                    <th className="px-6 py-3 font-medium">Crop</th>
                    <th className="px-6 py-3 font-medium">Field</th>
                    <th className="px-6 py-3 font-medium">Area</th>
                    <th className="px-6 py-3 font-medium">Sown Date</th>
                    <th className="px-6 py-3 font-medium">Expected Harvest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                  {crops.slice(0, 3).map((crop) => (
                    <tr key={crop.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-emerald-800">{crop.name}</td>
                      <td className="px-6 py-4">{crop.field}</td>
                      <td className="px-6 py-4">{crop.area} Acres</td>
                      <td className="px-6 py-4">{new Date(crop.sownDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                      <td className="px-6 py-4">{new Date(crop.expectedHarvestDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expense Chart */}
          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Expense Overview</h2>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockExpenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    contentStyle={{ borderRadius: '12px', border: '1px solid #d1fae5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [formatCurrency(value), 'Total']}
                  />
                  <Area type="monotone" dataKey="total" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">

          {/* Weather Card */}
          <div className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
              <CloudSun className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Map className="w-5 h-5 text-blue-100" />
                <span className="font-medium text-blue-50">My Farm Location</span>
              </div>
              <div className="flex items-end gap-4 mb-8">
                <span className="text-6xl font-bold tracking-tighter">28°</span>
                <span className="text-2xl text-blue-100 mb-1">C</span>
                <span className="text-xl font-medium ml-2 mb-2">Sunny</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div>
                  <p className="text-blue-100 mb-1">Humidity</p>
                  <p className="font-semibold text-lg">62%</p>
                </div>
                <div>
                  <p className="text-blue-100 mb-1">Rain Prob.</p>
                  <p className="font-semibold text-lg">20%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm flex flex-col flex-1">
            <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
              <h4 className="font-bold text-slate-900">{t("next_actions")}</h4>
            </div>
            <div className="p-4 space-y-4">
              {pendingTasks.slice(0, 4).map((task) => {
                const date = new Date(task.date);
                const today = new Date();
                const isTomorrow = date.getDate() === today.getDate() + 1 && date.getMonth() === today.getMonth();
                
                let dateText = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                if (isTomorrow) dateText = 'Tomorrow';

                const markerColor = task.priority === 'High' ? 'bg-amber-400' : task.priority === 'Medium' ? 'bg-blue-400' : 'bg-emerald-400';

                return (
                  <div key={task.id} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${markerColor}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.name}</p>
                      <p className="text-xs text-slate-400">{dateText}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

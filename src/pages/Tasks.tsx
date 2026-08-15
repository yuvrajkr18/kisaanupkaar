import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { TextToSpeechButton } from '../components/TextToSpeechButton';
import { Plus, X, Calendar, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { TaskPriority } from '../types';

export default function Tasks() {
  const { tasks, addTask, toggleTaskStatus, deleteTask } = useFarm();
  const { t } = useLanguage();
  const pendingCount = tasks.filter(task => task.status === 'Pending').length;
  const ttsSummaryText = (t("tts_tasks_summary") || "").replace("{count}", pendingCount.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'Medium' as TaskPriority,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(formData);
    setIsModalOpen(false);
    setFormData({ name: '', date: new Date().toISOString().split('T')[0], priority: 'Medium' });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'Completed' ? 1 : -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const priorityColors = {
    High: 'bg-red-50 text-red-700 border-red-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Farm Activities</h1>
          <p className="text-slate-500 mt-1 text-lg">Keep track of your daily tasks and operations.</p>
          <div className="mt-4"><TextToSpeechButton text={ttsSummaryText} /></div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {sortedTasks.map((task) => (
            <div 
              key={task.id} 
              className={cn(
                "p-4 sm:p-6 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50 group",
                task.status === 'Completed' && "bg-slate-50/50"
              )}
            >
              <div className="flex items-center gap-4 flex-1">
                <button 
                  onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    "shrink-0 transition-colors",
                    task.status === 'Completed' ? "text-emerald-500 hover:text-emerald-600" : "text-slate-300 hover:text-emerald-500"
                  )}
                >
                  {task.status === 'Completed' ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "text-lg font-semibold truncate transition-colors",
                    task.status === 'Completed' ? "text-slate-400 line-through" : "text-slate-900"
                  )}>
                    {task.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(task.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-md border",
                      priorityColors[task.priority],
                      task.status === 'Completed' && "opacity-50"
                    )}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No tasks found. Add a task to get started!
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-emerald-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Add New Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 shadow-sm">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Task Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    placeholder="e.g. Irrigation for Field A"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <input 
                    type="date" required
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Priority</label>
                  <select 
                    value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as TaskPriority})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
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
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

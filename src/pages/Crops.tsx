import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { useLanguage } from '../context/LanguageContext';
import { TextToSpeechButton } from '../components/TextToSpeechButton';
import { Sprout, Plus, X, Calendar } from 'lucide-react';

export default function Crops() {
  const { crops, addCrop } = useFarm();
  const { t } = useLanguage();
  const ttsSummaryText = (t("tts_crops_summary") || "You have {count} crops").replace("{count}", crops.length.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    field: '',
    area: '',
    sownDate: '',
    expectedHarvestDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrop({
      ...formData,
      area: Number(formData.area),
      status: 'Growing'
    });
    setIsModalOpen(false);
    setFormData({ name: '', field: '', area: '', sownDate: '', expectedHarvestDate: '', notes: '' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Crops</h1>
          <p className="text-slate-500 mt-1 text-lg">Manage and monitor all your crops in one place.</p>
          <div className="mt-4"><TextToSpeechButton text={ttsSummaryText} /></div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Crop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{crop.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{crop.field}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {crop.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Area</p>
                  <p className="font-semibold text-slate-800">{crop.area} Acres</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Sown</p>
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(crop.sownDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Harvest</p>
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(crop.expectedHarvestDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Crop Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-emerald-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Add New Crop</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 shadow-sm">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Crop Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    placeholder="e.g. Wheat"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Field</label>
                  <input 
                    type="text" required
                    value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    placeholder="e.g. Field A"
                  />
                </div>
                
                <div className="col-span-2 space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Area (Acres)</label>
                  <input 
                    type="number" required min="0.1" step="0.1"
                    value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    placeholder="0.0"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Sowing Date</label>
                  <input 
                    type="date" required
                    value={formData.sownDate} onChange={e => setFormData({...formData, sownDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Expected Harvest</label>
                  <input 
                    type="date" required
                    value={formData.expectedHarvestDate} onChange={e => setFormData({...formData, expectedHarvestDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
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
                  Save Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

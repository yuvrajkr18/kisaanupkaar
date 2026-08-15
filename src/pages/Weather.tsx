import React from 'react';
import { CloudSun, Wind, Droplets, CloudRain, Sun, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TextToSpeechButton } from '../components/TextToSpeechButton';

export default function Weather() {
  const { t } = useLanguage();
  const ttsSummaryText = (t("tts_weather_summary") || "").replace("{condition}", "Sunny").replace("{temp}", "28");
  const forecast = [
    { day: 'Tomorrow', icon: Sun, temp: 30, condition: 'Sunny' },
    { day: 'Friday', icon: CloudSun, temp: 28, condition: 'Partly Cloudy' },
    { day: 'Saturday', icon: CloudRain, temp: 25, condition: 'Light Rain' },
    { day: 'Sunday', icon: CloudSun, temp: 27, condition: 'Partly Cloudy' },
    { day: 'Monday', icon: Sun, temp: 29, condition: 'Sunny' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Weather Forecast</h1>
        <p className="text-slate-500 mt-1 text-lg">Plan your farming activities based on weather conditions.</p>
        <div className="mt-4"><TextToSpeechButton text={ttsSummaryText} /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Current Weather - Big Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl p-8 lg:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
            <Sun className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-10 text-blue-100">
              <MapPin className="w-5 h-5" />
              <span className="font-medium text-lg">My Farm Location</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="flex items-start gap-4">
                <span className="text-8xl font-bold tracking-tighter leading-none">28°</span>
                <div className="flex flex-col pt-2">
                  <span className="text-4xl text-blue-100 font-light">C</span>
                  <span className="text-3xl font-medium mt-1">Sunny</span>
                </div>
              </div>
              <div className="text-blue-100 pb-2">
                <p>Feels like 31°C</p>
                <p>Last updated: 10:00 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-0.5">Humidity</p>
                  <p className="font-semibold text-xl">62%</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-0.5">Wind Speed</p>
                  <p className="font-semibold text-xl">12 km/h</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CloudRain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-0.5">Rain Prob.</p>
                  <p className="font-semibold text-xl">20%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 px-2">5-Day Forecast</h2>
          <div className="space-y-4">
            {forecast.map((day, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                    <day.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{day.day}</h4>
                    <p className="text-sm text-slate-500">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">{day.temp}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

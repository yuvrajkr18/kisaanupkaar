import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, IndianRupee, CheckSquare, LineChart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';

export default function Landing() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">KisaanUpkaar</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-emerald-600 transition-colors">{t("about")}</a>
          <a href="#features" className="hover:text-emerald-600 transition-colors">{t("features")}</a>
          <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">{t("how_it_works")}</a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector variant="light" />
          <Link 
            to="/login"
            className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
          >
            {t("login")}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-12 lg:py-24 max-w-7xl mx-auto w-full gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
            <Sprout className="w-4 h-4" />
            <span>Smart Farming Platform</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            {t("landing_title_1")} <br className="hidden lg:block"/>
            <span className="text-emerald-600">{t("landing_title_2")}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {t("landing_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white text-base font-semibold rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              {t("get_started")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-slate-700 text-base font-semibold rounded-full hover:bg-slate-200 transition-colors text-center"
            >
              {t("explore_features")}
            </a>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="absolute inset-0 bg-emerald-200 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Farming" 
            className="w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/3]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to run your farm</h2>
            <p className="text-slate-600">Powerful tools designed specifically for modern farmers.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Crop Management</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Track crops, fields, sowing dates and expected harvests with ease.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Expense Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Record and monitor seeds, fertilizer, labour and other farming expenses.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Farm Activities</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Keep track of irrigation, fertilizer application, harvesting and other tasks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Farm Insights</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                View useful information about farm performance and data-driven recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">How KisaanUpkaar Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
            
            {[
              { num: 1, title: 'Add your farm' },
              { num: 2, title: 'Manage crops & activities' },
              { num: 3, title: 'Track expenses' },
              { num: 4, title: 'Make better decisions' }
            ].map((step) => (
              <div key={step.num} className="bg-white relative flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F8FAF8] border-4 border-white shadow-md flex items-center justify-center text-xl font-bold text-emerald-600">
                  {step.num}
                </div>
                <h4 className="font-semibold text-slate-900 w-32">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Leaf className="w-5 h-5 text-emerald-500" />
            <span className="text-xl font-bold tracking-tight">KisaanUpkaar</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

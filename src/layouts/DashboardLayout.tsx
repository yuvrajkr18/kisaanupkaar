import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  Map, 
  IndianRupee, 
  CheckSquare, 
  CloudSun, 
  User, 
  LogOut,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav_dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav_crops'), path: '/crops', icon: Sprout },
    { name: t('nav_fields'), path: '/fields', icon: Map },
    { name: t('nav_expenses'), path: '/expenses', icon: IndianRupee },
    { name: t('nav_tasks'), path: '/tasks', icon: CheckSquare },
    { name: t('nav_weather'), path: '/weather', icon: CloudSun },
  ];

  const bottomNavItems = [
    { name: t('nav_profile'), path: '/profile', icon: User },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const NavContent = () => (
    <>
      <div className="p-6 flex items-center gap-2 border-b border-emerald-50">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-emerald-900">KisaanUpkaar</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMobileMenu}
            className={({ isActive }) => cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer",
              isActive 
                ? "bg-emerald-50 text-emerald-700 font-semibold" 
                : "text-slate-500 hover:bg-[#F8FAF8]"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-emerald-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
            AJ
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">Farmer John</p>
            <p className="text-xs text-slate-500">Premium Plan</p>
          </div>
        </div>
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMobileMenu}
            className={({ isActive }) => cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer",
              isActive 
                ? "bg-emerald-50 text-emerald-700 font-semibold" 
                : "text-slate-500 hover:bg-[#F8FAF8]"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
        <button
          onClick={() => navigate('/login')}
          className="flex w-full items-center gap-3 p-3 rounded-xl font-medium text-slate-500 hover:bg-[#F8FAF8] hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          {t('nav_logout')}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAF8] font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r border-emerald-100 bg-white z-10">
        <NavContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={closeMobileMenu} />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "lg:hidden fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <button 
          onClick={closeMobileMenu}
          className="absolute top-8 right-4 p-2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>
        <NavContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-white border-b border-emerald-100">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-bold text-slate-800">KisaanUpkaar</span>
          </div>
          <LanguageSelector variant="light" />
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

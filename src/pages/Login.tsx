import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No real auth for prototype, just redirect
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 lg:p-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-emerald-600 p-3 rounded-2xl mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Enter your details to access your farm.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Email or Phone</label>
            <input 
              type="text" 
              required
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-slate-400"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <button className="text-emerald-600 font-medium hover:text-emerald-700">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

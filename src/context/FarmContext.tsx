import React, { createContext, useContext, useState, useEffect } from 'react';
import { Crop, Expense, Task } from '../types';

interface FarmContextType {
  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  toggleTaskStatus: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  totalExpenses: number;
  totalArea: number;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

const initialCrops: Crop[] = [
  { id: '1', name: 'Wheat', field: 'Field A', area: 5, sownDate: '2026-11-10', expectedHarvestDate: '2027-03-20', status: 'Growing' },
  { id: '2', name: 'Soybean', field: 'Field B', area: 4, sownDate: '2026-06-15', expectedHarvestDate: '2026-10-10', status: 'Growing' },
  { id: '3', name: 'Rice', field: 'Field C', area: 3, sownDate: '2026-07-02', expectedHarvestDate: '2026-11-15', status: 'Growing' },
];

const initialExpenses: Expense[] = [
  { id: '1', date: '2026-08-10', category: 'Seeds', description: 'Wheat Seeds', amount: 4500 },
  { id: '2', date: '2026-08-12', category: 'Fertilizer', description: 'Urea', amount: 3200 },
  { id: '3', date: '2026-08-15', category: 'Labour', description: 'Field Work', amount: 6000 },
  { id: '4', date: '2026-08-20', category: 'Equipment', description: 'Tractor Rental', amount: 8000 },
  { id: '5', date: '2026-08-22', category: 'Irrigation', description: 'Water Pump', amount: 2800 },
];

const initialTasks: Task[] = [
  { id: '1', name: 'Fertilizer application', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], priority: 'High', status: 'Pending' },
  { id: '2', name: 'Irrigation', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], priority: 'Medium', status: 'Pending' },
  { id: '3', name: 'Harvest preparation', date: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0], priority: 'Medium', status: 'Pending' },
  { id: '4', name: 'Crop inspection', date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], priority: 'Low', status: 'Pending' },
];

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [crops, setCrops] = useState<Crop[]>(() => {
    const saved = localStorage.getItem('farmwise_crops');
    return saved ? JSON.parse(saved) : initialCrops;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('farmwise_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('farmwise_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('farmwise_crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('farmwise_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('farmwise_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addCrop = (crop: Omit<Crop, 'id'>) => {
    setCrops([...crops, { ...crop, id: Date.now().toString() }]);
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
  };

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    setTasks([...tasks, { ...task, id: Date.now().toString(), status: 'Pending' }]);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalArea = crops.reduce((sum, crop) => sum + crop.area, 0);

  return (
    <FarmContext.Provider value={{ crops, addCrop, expenses, addExpense, tasks, addTask, toggleTaskStatus, deleteTask, totalExpenses, totalArea }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}

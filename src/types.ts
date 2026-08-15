export type CropStatus = 'Growing' | 'Harvested' | 'Failed';

export interface Crop {
  id: string;
  name: string;
  field: string;
  area: number;
  sownDate: string;
  expectedHarvestDate: string;
  status: CropStatus;
  notes?: string;
}

export type ExpenseCategory = 'Seeds' | 'Fertilizer' | 'Labour' | 'Equipment' | 'Irrigation' | 'Other';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
}

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'Completed';

export interface Task {
  id: string;
  name: string;
  date: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskSchema {
  name: string;
  description?: string;
  category?: string;
  priority: number;
  data?: DataEntry[];
  schedule: TaskSchedule;
  [k: string]: unknown;
}
export interface DataEntry {
  typedef?: string;
  value?: string;
  [k: string]: unknown;
}
export interface TaskSchedule {
  start_date?: string;
  due_date?: string;
  repeat_frequency?: "daily" | "weekly" | "monthly";
  repeat_days?: string;
  [k: string]: unknown;
}

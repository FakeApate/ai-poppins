import moment from "moment";

export class TaskSchema {
  name: string;
  description?: string;
  category?: string;
  priority: number;
  data?: DataEntry[];
  schedule: TaskSchedule;
  [k: string]: unknown;

  constructor(task: TaskSchema) {
    this.name = task.name;
    this.description = task.description;
    this.category = task.category;
    this.priority = task.priority;
    this.data = task.data;
    this.schedule = task.schedule;
  }

  // Define a static method for creating a TaskSchema object from a plain JavaScript object
  static fromDocument(doc: any): TaskSchema {
    const task: TaskSchema = {
      name: doc.name,
      priority: doc.priority,
      schedule: doc.schedule,
    };

    if (doc.description) {
      task.description = doc.description;
    }

    if (doc.category) {
      task.category = doc.category;
    }

    if (doc.data) {
      task.data = doc.data;
    }

    // Convert the start_date and due_date fields to Date objects
    if (doc.schedule.start_date) {
      task.schedule.start_date = moment(doc.schedule.start_date);
    }

    if (doc.schedule.due_date) {
      task.schedule.due_date = moment(doc.schedule.due_date);
    }

    if (doc.schedule.repeat_frequency) {
      task.schedule.repeat_frequency = doc.schedule.repeat_frequency;
    }

    if (doc.schedule.repeat_days) {
      task.schedule.repeat_days = parseInt(
        doc.schedule.repeat_days.slice(2),
        2
      );
    }

    return task;
  }
}

export class DataEntry {
  typedef?: string;
  value?: string;
  [k: string]: unknown;
}

export class TaskSchedule {
  start_date?: moment.Moment;
  due_date?: moment.Moment;
  repeat_frequency?: "daily" | "weekly" | "monthly";
  repeat_days?: number;
  [k: string]: unknown;
}

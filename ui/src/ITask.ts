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
      schedule: TaskSchedule.fromDocument(doc.schedule),
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

    return task;
  }
}

export class DataEntry {
  typedef?: string;
  value?: string;
  [k: string]: unknown;
}
enum Days {
  Sunday,
  Saturdays,
  Friday,
  Thursday,
  Wednesday,
  Tuesday,
  Monday,
}

export class TaskSchedule {
  static fromDocument(doc: any): TaskSchedule {
    const schedule: TaskSchedule = {};
    if (doc.duration) {
      let d = new Date(Date.now());
      const durationParts: number[] = (doc.duration as string).split("Z")[0].split(":").map<number>((value: string, index: number) => {
        return parseInt(value);
      });
      schedule.duration = `${durationParts[0]}h ${durationParts[1]}m ${durationParts[2]}s`;
    }

    if (doc.repeat_frequency) {
      schedule.repeat_frequency = doc.repeat_frequency;
    }

    let taskDays: (Days | undefined)[] | undefined;
    if (doc.repeat_days) {
      schedule.repeat_days = parseInt(doc.repeat_days.slice(2), 2);
      let list: number[] | undefined;
      if (schedule.repeat_frequency === "weekly") {
        list = new Array<number>(7).fill(0);
      }
      if (schedule.repeat_frequency === "monthly") {
        list = new Array<number>(32).fill(0);
      }
      if (list) {
        for (let i = list.length; i >= 0; i--) {
          var res = 1 << i;
          res = schedule.repeat_days & res;
          if (res > 0) {
            list[i] = 1;
          }
        }
        taskDays = list.map<Days | undefined>(
          (value: number, index: number) => {
            if (value === 1) return index;
          }
        );
        taskDays = taskDays.filter((value) => {
          if (value) return value;
        });
      }
    }
    schedule.taskDays = taskDays as Days[];
    return schedule;
  }

  duration?: string;
  repeat_frequency?: "daily" | "weekly" | "monthly";
  repeat_days?: number;
  taskDays?: Days[];
  [k: string]: unknown;
}

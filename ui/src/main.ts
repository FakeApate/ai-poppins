import { app, BrowserWindow } from "electron";
import ejs from "ejs";
import { readRandom } from "./MongoDB_API";
import { TaskSchema, DataEntry, TaskSchedule } from "./ITask";
import moment from "moment";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 422,
    height: 600,
  });
  readRandom().then((value) => {
    if (value == null) return;
    const task = TaskSchema.fromDocument(value);
    task.duration = moment
      .duration(task.schedule.due_date?.diff(task.schedule.start_date))
      .asDays();
    console.log(task);
    let template = ejs.fileLoader("src/templates/main.ejs");
    let html: string;
    if (typeof template === "string") {
      html = ejs.render(
        template,
        { task, moment },
        { filename: "src/templates/main.ejs" }
      );
    } else {
      html = ejs.render(
        template.toString(),
        { task, moment },
        { filename: "src/templates/main.ejs" }
      );
    }
    win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
    win.addListener("resized", () => {
      console.log(win.getSize());
    });
  });
};

app.whenReady().then(() => {
  createWindow();
});

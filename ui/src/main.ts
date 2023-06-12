import { app, BrowserWindow } from "electron";
import ejs from "ejs";
import { readRandom } from "./MongoDB_API";
import { TaskSchema, DataEntry, TaskSchedule } from "./ITask";
import fs from "fs";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 422,
    height: 600,
  });

  const dirpath = "tasks/";
  let dir = fs.readdirSync(dirpath);
  
  dir = dir.filter((value: string) => {
    return value.includes("json") ? value : null;
  });

  let tasks = dir.map<TaskSchema>((value) => {
    const fileDoc = fs.readFileSync(dirpath + value).toString();
    return TaskSchema.fromDocument(JSON.parse(fileDoc));
  });

  let template = ejs.fileLoader("src/templates/main.ejs");
  let html: string;
  if (typeof template === "string") {
    html = ejs.render(
      template,
      { tasks },
      { filename: "src/templates/main.ejs" }
    );
  } else {
    html = ejs.render(
      template.toString(),
      { tasks },
      { filename: "src/templates/main.ejs" }
    );
  }
  win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  //#endregion
};

app.whenReady().then(() => {
  createWindow();
});

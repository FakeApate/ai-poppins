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
  //#region mongodb
  // //MongoDB
  // readRandom().then((value) => {
  //   if (value == null) return;
  //   const task = TaskSchema.fromDocument(value);
  //   task.duration = moment
  //     .duration(task.schedule.due_date?.diff(task.schedule.start_date))
  //     .asDays();
  //   console.log(task);
  //   let template = ejs.fileLoader("src/templates/main.ejs");
  //   let html: string;
  //   if (typeof template === "string") {
  //     html = ejs.render(
  //       template,
  //       { task, moment },
  //       { filename: "src/templates/main.ejs" }
  //     );
  //   } else {
  //     html = ejs.render(
  //       template.toString(),
  //       { task, moment },
  //       { filename: "src/templates/main.ejs" }
  //     );
  //   }
  //   win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  //   win.addListener("resized", () => {
  //     console.log(win.getSize());
  //   });
  // });
  //#endregion
  //#region file
  //File

  const dirpath = "mongoPlayground/";
  let dir = fs.readdirSync(dirpath);
  dir = dir.filter((value: string) => {
      return value.includes("json") ? (value.includes("aipoppings_2") ? null : value) : null;
  });
  let filename = dir[Math.round(Math.random()* (dir.length-1))];
  const fileDoc = fs.readFileSync(dirpath + filename).toString();
  const task = TaskSchema.fromDocument(JSON.parse(fileDoc));
  let template = ejs.fileLoader("src/templates/main.ejs");
  let html: string;
  if (typeof template === "string") {
    html = ejs.render(
      template,
      { task },
      { filename: "src/templates/main.ejs" }
    );
  } else {
    html = ejs.render(
      template.toString(),
      { task },
      { filename: "src/templates/main.ejs" }
    );
  }
  win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  //#endregion
};

app.whenReady().then(() => {
  createWindow();
});

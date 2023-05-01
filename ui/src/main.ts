import { app, BrowserWindow } from 'electron';

import ejs from 'ejs';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  let template = ejs.fileLoader('src/templates/card.ejs')
  let html : string;
  if(typeof template === 'string'){
    html = ejs.render(template,{task});
  }
  else {
    html = ejs.render(template.toString(),{task});
  }
  
  win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
}

app.whenReady().then(() => {
  createWindow()
})


const task = {
  "name": "Market Research Report",
  "description": "Complete a report on market research for the new product launch",
  "category": "Marketing",
  "start_date": "2023-04-19T09:00:00Z",
  "due_date": "2023-05-01T17:00:00Z",
  "priority": 9,
  "repeating": null,
  "data": [
    {
      "data_type": "@type/market-research",
      "data_value": { }
    }
  ]
};

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Factory {
  create(...args: unknown[]): unknown
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TaskFactory implements Factory {
  create(data: string): Task {
    return JSON.parse(data) as Task
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTMLTaskFactory implements Factory {
  create(data: Task): HTMLTaskFactory | null {
    const ht = new HTMLTask()
    const card = document.createElement('div')
    const card_body = document.createElement('div')
    const card_title = document.createElement('h5')
    const card_subtitle = document.createElement('h6')
    const card_text = document.createElement('p')
    const card_start_date = document.createElement('div')
    const card_due_date = document.createElement('div')
    const card_priority = document.createElement('div')
    const card_data = document.createElement('ul')

    card_title.innerText = data.name
    if (data.description) card_text.innerText = data.description
    if (data.category) card_subtitle.innerText = data.category
    if (data.start_date && data.due_date) {
      card_start_date.innerText = data.start_date.toDateString()
      card_due_date.innerText = data.due_date.toDateString()
    }
    if (data.priority) card_priority.innerText = data.priority.toString()
    if (data.data) {
      for (const itemData of data.data) {
        const item = document.createElement('li')
        item.innerText = `${itemData.data_type}:${itemData.data_value}`
        card_data.appendChild(item)
      }
    }
    return null
  }
}

interface Task {
  name: string
  description?: string
  category?: string
  start_date?: Date
  due_date?: Date
  priority?: number
  repeating: string
  data?: Array<{
    data_type: string
    data_value: string
  }>
}

/*
<div class="card">
  <div class="card-body">
    <h5 class="card-title"></h5>
    <h6 class="card-subtitle mb-2 text-muted"></h6>
    <p class="card-text"></p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Start Date: </li>
      <li class="list-group-item">Due Date: </li>
      <li class="list-group-item">Priority: </li>
    </ul>
  </div>
</div>
*/
class HTMLTask {
  container: HTMLDivElement | undefined
}

export { HTMLTask, HTMLTaskFactory }
export type { Task, Factory }

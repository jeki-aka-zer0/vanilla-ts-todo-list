import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#todo-list')
const form = document.getElementById('crete-todo-item') as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>('#new-todo-item-title')
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener('submit', e => {
  e.preventDefault()

  if ('' == input?.value || null == input?.value) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ''
})

function addListItem (task: Task): void {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks (): void {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks (): Task[] {
  const tasksJSON = localStorage.getItem('TASKS')
  if (null == tasksJSON) return []
  return JSON.parse(tasksJSON)
}

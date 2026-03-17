import { Component } from 'react'
import { TaskInput } from './TaskInput.jsx'
import { TaskList } from './TaskList.jsx'
import { CurrentPrevTask } from './CurrentPrevTask.jsx'

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export class TodoApp extends Component {
  state = {
    tasks: [
      { id: makeId(), title: 'Сделать ToDo на React', completed: false, deleted: false },
      { id: makeId(), title: 'Потрогать useRef (предыдущая задача)', completed: true, deleted: false },
    ],
    currentTitle: '',
  }

  setCurrentTitle = (value) => {
    this.setState({ currentTitle: value })
  }

  addTask = () => {
    const title = this.state.currentTitle.trim()
    if (!title) return

    const next = {
      id: makeId(),
      title,
      completed: false,
      deleted: false,
    }

    this.setState((prev) => ({
      tasks: [next, ...prev.tasks],
      currentTitle: '',
    }))
  }

  toggleCompleted = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    }))
  }

  deleteTask = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, deleted: true } : t)),
    }))
  }

  render() {
    const { tasks, currentTitle } = this.state
    const visibleCount = tasks.reduce((acc, t) => acc + (t.deleted ? 0 : 1), 0)
    const completedCount = tasks.reduce(
      (acc, t) => acc + (!t.deleted && t.completed ? 1 : 0),
      0,
    )

    return (
      <div className="todo">
        <header className="todoHeader">
          <h1 className="todoTitle">ToDo List</h1>
          <div
            style={{
              marginTop: 8,
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontFamily: 'ui-monospace, Consolas, monospace',
              fontSize: 14,
              opacity: 0.9,
            }}
          >
            <span>Всего: {visibleCount}</span>
            <span>Выполнено: {completedCount}</span>
          </div>
        </header>

        <section className="todoMain">
          <TaskInput
            value={currentTitle}
            onChange={this.setCurrentTitle}
            onAdd={this.addTask}
          />

          <CurrentPrevTask current={currentTitle} />

          <TaskList tasks={tasks} onToggle={this.toggleCompleted} onDelete={this.deleteTask} />
        </section>
      </div>
    )
  }
}


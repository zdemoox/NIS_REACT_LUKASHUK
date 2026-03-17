import { TaskItem } from './TaskItem.jsx'

export function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <p className="empty">Пока нет задач.</p>
  }

  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  )
}


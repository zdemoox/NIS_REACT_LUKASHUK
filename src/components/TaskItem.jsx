export function TaskItem({ task, onToggle, onDelete }) {
  // условный рендеринг удаления: элемент исчезает, но остаётся в состоянии (deleted=true)
  if (task.deleted) return null

  return (
    <li className={task.completed ? 'task taskCompleted' : 'task'}>
      <label className="taskLeft">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label={task.completed ? 'Снять выполнение' : 'Отметить выполненной'}
        />
        <span className="taskTitle">{task.title}</span>
      </label>

      <div className="taskRight">
        {task.completed ? <span className="badge">Выполнено</span> : null}
        <button className="btn btnGhost" type="button" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </li>
  )
}


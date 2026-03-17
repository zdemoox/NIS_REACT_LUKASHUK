# ToDo List (React) — SEM3

## Запуск (Windows PowerShell)

```powershell
cd d:\React\SEM3\todo-list
npm install
npm run dev
```

## Структура

- `todo-list/src/components/TodoApp.jsx`: **классовый** компонент, хранит состояние списка, добавление/удаление/выполнение, подъём состояния через props
- `todo-list/src/components/TaskInput.jsx`: **функциональный** компонент, `useRef` для фокуса инпута (в т.ч. после добавления)
- `todo-list/src/components/CurrentPrevTask.jsx`: **функциональный** компонент, `useRef` для “предыдущего значения текущей задачи”
- `todo-list/src/components/TaskItem.jsx`: условный рендеринг удалённых задач + отображение выполненных
- `todo-list/src/App.css`: внешний CSS (completed подсветка и т.д.)


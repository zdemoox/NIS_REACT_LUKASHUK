import './App.css'
import { Header } from './components/Header/Header'
import { TodoWidget } from './widgets/TodoWidget'
import { WeatherWidget } from './widgets/WeatherWidget'
import { FinanceWidget } from './widgets/FinanceWidget'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <main className="page">
        <section className="intro">
          <h1 className="pageTitle">Личная панель</h1>
          <p className="pageSubtitle">Данные сохраняются в localStorage. Валидация — на вводе.</p>
        </section>

        <div className="grid">
          <TodoWidget />
          <WeatherWidget />
          <FinanceWidget />
        </div>
      </main>
    </>
  )
}

export default App

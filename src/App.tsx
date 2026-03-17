import './App.css'
import { AxiosAbortDemo } from './components/AxiosAbortDemo'
import { Card } from './components/Card'
import { UsersRtkQuery } from './components/UsersRtkQuery'

function App() {
  return (
    <main className="page">
      <header className="pageHeader">
        <div>
          <h1 className="pageTitle">Users client</h1>
          <p className="muted">
            RTK Query (GET/POST/PUT) + Axios (interceptors + AbortController)
          </p>
        </div>
        <div className="muted mono">jsonplaceholder.typicode.com</div>
      </header>

      <div className="grid">
        <Card title="RTK Query users">
          <UsersRtkQuery />
        </Card>
        <Card title="Axios GET + AbortController">
          <AxiosAbortDemo />
        </Card>
      </div>
    </main>
  )
}

export default App

import './App.css'
import { UnreadMessages } from './UnreadMessages'

function App() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
      }}
    >
      <UnreadMessages />
    </section>
  )
}

export default App

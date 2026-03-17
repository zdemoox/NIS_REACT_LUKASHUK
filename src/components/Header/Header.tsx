import styles from './Header.module.scss'
import type { Theme } from '../../hooks/useTheme'

type Props = {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.title}>Mini Dashboard</div>
        <div className={styles.subtitle}>To‑Do • Weather • Finance • Theme</div>
      </div>

      <nav className={styles.nav} aria-label="Dashboard actions">
        <div className={styles.pill}>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={onToggleTheme}
              aria-label="Toggle theme"
            />
            {theme === 'dark' ? 'Dark' : 'Light'}
          </label>
        </div>
      </nav>
    </header>
  )
}


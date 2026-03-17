import { useEffect, useMemo, useState } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorage'

type GeoResult = {
  name: string
  latitude: number
  longitude: number
  country_code?: string
}

type CurrentWeather = {
  temperature: number
  windspeed: number
  weathercode: number
  time: string
}

function codeLabel(code: number) {
  if (code === 0) return 'Clear'
  if (code === 1 || code === 2) return 'Mostly clear'
  if (code === 3) return 'Cloudy'
  if (code >= 45 && code <= 48) return 'Fog'
  if (code >= 51 && code <= 57) return 'Drizzle'
  if (code >= 61 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Showers'
  if (code >= 95) return 'Thunderstorm'
  return `Code ${code}`
}

export function WeatherWidget() {
  const [city, setCity] = useLocalStorageState('weather.city', 'Moscow')
  const [query, setQuery] = useState(city)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [geo, setGeo] = useState<GeoResult | null>(null)
  const [current, setCurrent] = useState<CurrentWeather | null>(null)

  const title = useMemo(() => {
    if (!geo) return city
    return `${geo.name}${geo.country_code ? `, ${geo.country_code.toUpperCase()}` : ''}`
  }, [city, geo])

  async function load(nextCity: string) {
    const trimmed = nextCity.trim()
    if (trimmed.length < 2) {
      setError('Город: минимум 2 символа')
      return
    }

    setLoading(true)
    setError(null)
    setCurrent(null)
    setGeo(null)
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=ru&format=json`,
      )
      if (!geoRes.ok) throw new Error('Geocoding failed')
      const geoJson: { results?: GeoResult[] } = await geoRes.json()
      const g = geoJson.results?.[0]
      if (!g) throw new Error('Город не найден')
      setGeo(g)

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current_weather=true&timezone=auto`,
      )
      if (!weatherRes.ok) throw new Error('Weather failed')
      const weatherJson: { current_weather?: CurrentWeather } = await weatherRes.json()
      if (!weatherJson.current_weather) throw new Error('Нет данных')
      setCurrent(weatherJson.current_weather)
      setCity(trimmed)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load(city)
  }, [])

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,var(--social-bg))] p-4 text-left">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="m-0">Погода</h2>
          <div className="text-sm text-[var(--text)]">{title}</div>
        </div>
        <div className="text-xs text-[var(--text)]">{current ? new Date(current.time).toLocaleString() : '—'}</div>
      </div>

      <form
        className="mb-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          void load(query)
        }}
      >
        <input
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Город…"
          aria-label="City"
        />
        <button
          className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] px-3 py-2 text-sm font-medium text-[var(--accent)] shadow-sm transition hover:shadow-[var(--shadow)] disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? '...' : 'Load'}
        </button>
      </form>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
          <div className="text-xs text-[var(--text)]">Temp</div>
          <div className="text-lg font-semibold text-[var(--text-h)]">
            {current ? `${Math.round(current.temperature)}°C` : '—'}
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
          <div className="text-xs text-[var(--text)]">Wind</div>
          <div className="text-lg font-semibold text-[var(--text-h)]">
            {current ? `${Math.round(current.windspeed)} km/h` : '—'}
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
          <div className="text-xs text-[var(--text)]">Now</div>
          <div className="truncate text-lg font-semibold text-[var(--text-h)]">
            {current ? codeLabel(current.weathercode) : '—'}
          </div>
        </div>
      </div>
    </section>
  )
}


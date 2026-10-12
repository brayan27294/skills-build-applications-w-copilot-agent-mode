import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

type ApiHealth = {
  status: string
  database: string
}

function Dashboard() {
  const [apiHealth, setApiHealth] = useState<ApiHealth | null>(null)

  useEffect(() => {
    let isMounted = true

    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json() as Promise<ApiHealth>
      })
      .then((health) => {
        if (isMounted) setApiHealth(health)
      })
      .catch(() => {
        if (isMounted) setApiHealth(null)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="app-shell">
      <header className="navbar border-bottom bg-white">
        <div className="container">
          <a className="navbar-brand fw-semibold" href="/">
            <span className="brand-mark" aria-hidden="true">O</span>
            OctoFit Tracker
          </a>
          <span className="small text-secondary">Activity dashboard</span>
        </div>
      </header>

      <main className="container py-5">
        <div className="row justify-content-center">
          <section className="col-lg-8 col-xl-7">
            <p className="eyebrow mb-2">YOUR TRAINING SPACE</p>
            <h1 className="display-5 fw-semibold mb-3">Build a rhythm that lasts.</h1>
            <p className="lead text-secondary mb-4">
              Your activities, teams, and progress will come together here.
            </p>
            <div className="service-status d-flex align-items-center justify-content-between">
              <div>
                <h2 className="h6 mb-1">API service</h2>
                <p className="small text-secondary mb-0">
                  {apiHealth ? `MongoDB ${apiHealth.database}` : 'Waiting for the API'}
                </p>
              </div>
              <span
                className={`status-dot ${apiHealth?.status === 'ok' ? 'is-online' : ''}`}
                aria-label={apiHealth?.status === 'ok' ? 'API online' : 'API unavailable'}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function App() {
  return <Routes><Route path="/" element={<Dashboard />} /></Routes>
}

export default App

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext.jsx'

export default function Usuarios() {
  const { updateApiStatus } = useApiContext()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setLoading(true)
      setError('')
      updateApiStatus('loading')
      try {
        const res = await fetch('https://dummyjson.com/users?limit=8', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setUsers(data.users || [])
        updateApiStatus('online')
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error al cargar usuarios.')
          updateApiStatus('offline')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [updateApiStatus])

  return (
    <main className="main-container">
      <section className="hero-banner" style={{ minHeight: 'unset', padding: '36px 44px', marginBottom: '24px' }}>
        <div>
          <span className="pill-demo-badge">Compradores DummyJSON</span>
          <h1 className="hero-title" style={{ fontSize: '32px' }}>Usuarios con Carritos</h1>
          <p className="hero-subtitle">
            Cada carrito en la API está asignado a un <code>userId</code> registrado en el sistema.
          </p>
        </div>
      </section>

      {loading && (
        <div className="detail-panel loading-box">
          <span className="spinner-icon" />
          <p>Cargando usuarios de la API…</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-panel">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {users.map((u) => (
            <article key={u.id} className="stat-card" style={{ gap: '16px', padding: '20px' }}>
              <img
                src={u.image}
                alt={u.firstName}
                style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #e2e8f0' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span className="pill-demo-badge" style={{ alignSelf: 'flex-start', padding: '2px 8px', fontSize: '10px', marginBottom: '2px' }}>
                  ID #{u.id}
                </span>
                <strong style={{ fontSize: '15px', color: '#0f172a' }}>
                  {u.firstName} {u.lastName}
                </strong>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{u.email}</span>
                <Link to="/carritos" style={{ fontSize: '12px', color: '#4834d4', fontWeight: 700, marginTop: '4px' }}>
                  Ver sus carritos →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

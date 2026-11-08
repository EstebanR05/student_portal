import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext.jsx'

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

export default function Productos() {
  const { updateApiStatus } = useApiContext()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setLoading(true)
      setError('')
      updateApiStatus('loading')
      try {
        const res = await fetch('https://dummyjson.com/products?limit=8', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setProducts(data.products || [])
        updateApiStatus('online')
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error al cargar productos.')
          updateApiStatus('offline')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [updateApiStatus])

  return (
    <main className="main-container">
      <section className="hero-banner" style={{ minHeight: 'unset', padding: '36px 44px', marginBottom: '24px' }}>
        <div>
          <span className="pill-demo-badge">Catálogo DummyJSON</span>
          <h1 className="hero-title" style={{ fontSize: '32px' }}>Productos Disponibles</h1>
          <p className="hero-subtitle">
            Estos son algunos de los artículos que los usuarios añaden a sus carritos de compra.
          </p>
        </div>
      </section>

      {loading && (
        <div className="detail-panel loading-box">
          <span className="spinner-icon" />
          <p>Cargando productos de la API…</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-panel">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {products.map((p) => (
            <article key={p.id} className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
              <div style={{ width: '100%', height: '160px', background: '#f8fafc', borderRadius: '14px', display: 'grid', placeItems: 'center', overflow: 'hidden', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                <img src={p.thumbnail} alt={p.title} style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <span className="pill-demo-badge" style={{ marginBottom: '6px' }}>{p.category}</span>
              <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '2px 0 6px', color: '#0f172a' }}>{p.title}</h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 'auto' }}>
                <strong style={{ fontSize: '18px', color: '#4834d4', fontWeight: 800 }}>{formatCurrency(p.price)}</strong>
                <Link to="/carritos" className="btn-primary-purple" style={{ padding: '6px 14px', fontSize: '11px' }}>
                  Ver en Carritos
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

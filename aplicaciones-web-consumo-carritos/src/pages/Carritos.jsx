import { useEffect, useState, useRef } from 'react'
import { getCarts } from '../services/cartsApi.js'
import { useApiContext } from '../context/ApiContext.jsx'
import { API_DOCUMENTATION_URL } from '../data/apiConfig.js'
import StatsOverview from '../components/StatsOverview.jsx'
import CartListMaster from '../components/CartListMaster.jsx'
import CartDetailView from '../components/CartDetailView.jsx'

export default function Carritos() {
  const { updateApiStatus } = useApiContext()
  const [carts, setCarts] = useState([])
  const [activeCartId, setActiveCartId] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const masterDetailRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCartsData() {
      setLoading(true)
      setError('')
      updateApiStatus('loading')

      try {
        const data = await getCarts({ limit: 20, page: 1, signal: controller.signal })
        const cartList = Array.isArray(data.carts) ? data.carts : []
        setCarts(cartList)
        if (cartList.length > 0) {
          setActiveCartId(cartList[0].id)
        }
        updateApiStatus('online')
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'No fue posible conectar con la API de Carritos.')
          updateApiStatus('offline')
          setCarts([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCartsData()

    return () => controller.abort()
  }, [refreshKey, updateApiStatus])

  const activeCart = carts.find((c) => c.id === activeCartId) || carts[0] || null

  function scrollToCarts() {
    masterDetailRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="main-container">
      {/* ========================================================
          1. HERO BANNER (100% FIEL A LA MAQUETA)
          ======================================================== */}
      <section className="hero-banner-exact" aria-label="Introducción a Carritos DummyJSON">
        <div className="hero-left-content">
          <span className="pill-api-demo">API Demo</span>
          <h1 className="hero-main-title">Carritos (Carts)</h1>
          <p className="hero-sub-description">
            Explora, busca y visualiza los carritos de compra de la API de DummyJSON.
          </p>

          <div className="hero-btns-row">
            <button type="button" className="btn-ver-carritos" onClick={scrollToCarts}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>Ver Carritos</span>
            </button>

            <a
              href={API_DOCUMENTATION_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ver-api"
            >
              <span aria-hidden="true">&gt;</span>
              <span>Ver en la API</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Exact Graphic with Wave + 3D Cart matching mockup */}
        <div className="hero-right-illustration">
          <img
            src="/hero-banner-art.jpg"
            alt="Carrito de compras 3D con paquetes y bolsas moradas"
            className="hero-cart-render"
          />
        </div>
      </section>

      {/* ========================================================
          2. METRICS / STATS OVERVIEW CARDS (4 TARJETAS)
          ======================================================== */}
      <StatsOverview carts={carts} />

      {/* ========================================================
          3. MASTER-DETAIL SPLIT VIEW (LISTA + INSPECTOR)
          ======================================================== */}
      <div ref={masterDetailRef}>
        {loading && carts.length === 0 ? (
          <div className="detail-inspector-panel" style={{ display: 'grid', placeItems: 'center', minHeight: '300px' }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid #ece8ff',
                  borderTopColor: '#4b3381',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                  margin: '0 auto 12px',
                }}
              />
              <p style={{ color: '#64748b', fontSize: '13px' }}>Cargando datos desde DummyJSON…</p>
            </div>
          </div>
        ) : error && carts.length === 0 ? (
          <div
            style={{
              padding: '24px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '16px',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            role="alert"
          >
            <div>
              <strong style={{ display: 'block', fontSize: '14px' }}>Error al conectar con la API</strong>
              <span style={{ fontSize: '13px' }}>{error}</span>
            </div>
            <button
              type="button"
              className="btn-ver-carritos"
              onClick={() => setRefreshKey((k) => k + 1)}
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="master-detail-split">
            {/* Left Column: Master List */}
            <CartListMaster
              carts={carts}
              activeCartId={activeCartId}
              onSelectCart={(id) => setActiveCartId(id)}
            />

            {/* Right Column: Detail Inspector */}
            <CartDetailView cart={activeCart} />
          </div>
        )}
      </div>

      {/* ========================================================
          4. NOTA DIDÁCTICA DE INSPECCIÓN HTTP
          ======================================================== */}
      <section className="learning-note-exact">
        <div className="learning-note-icon">&lt;/&gt;</div>
        <div className="learning-note-text">
          <strong>Inspección de consumo de API REST (Práctica del Profesor)</strong>
          <p>
            Abre las herramientas de desarrollador (<kbd>F12</kbd>) &gt; pestaña <strong>Network / Red</strong> y filtra por <strong>Fetch/XHR</strong>.
            Al interactuar con los carritos, verifica la solicitud <code>GET /carts</code> y comprueba cómo React transforma el JSON de respuesta en la vista dividida en tiempo real.
          </p>
        </div>
        <a href={API_DOCUMENTATION_URL} target="_blank" rel="noreferrer" className="learning-note-link">
          DummyJSON Carts Docs ↗
        </a>
      </section>
    </main>
  )
}

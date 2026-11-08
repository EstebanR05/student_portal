import { useState, useRef, useEffect } from 'react'
import { requestApiEndpoint } from '../services/cartsApi.js'
import { API_EXAMPLES } from '../data/apiExamples.js'
import { API_BASE_URL, API_DOCUMENTATION_URL } from '../data/apiConfig.js'
import { useApiContext } from '../context/ApiContext.jsx'

export default function ExploradorAPI() {
  const { updateApiStatus } = useApiContext()
  const [endpoint, setEndpoint] = useState(API_EXAMPLES[0].value)
  const [customPath, setCustomPath] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [duration, setDuration] = useState(null)
  const [status, setStatus] = useState(null)
  const activeControllerRef = useRef(null)

  useEffect(() => () => activeControllerRef.current?.abort(), [])

  async function handleSendRequest(pathToSend = customPath.trim() || endpoint) {
    activeControllerRef.current?.abort()
    const controller = new AbortController()
    activeControllerRef.current = controller

    setLoading(true)
    setError('')
    setResponse(null)
    setStatus(null)
    updateApiStatus('loading')
    const startedAt = performance.now()

    try {
      const data = await requestApiEndpoint(pathToSend, controller.signal)
      setResponse(data)
      setStatus(200)
      updateApiStatus('online')
    } catch (err) {
      setError(err.message || 'Error al ejecutar solicitud HTTP.')
      setStatus('Error')
      updateApiStatus('offline')
    } finally {
      if (activeControllerRef.current === controller) {
        setDuration(Math.round(performance.now() - startedAt))
        setLoading(false)
        activeControllerRef.current = null
      }
    }
  }

  return (
    <main className="main-container">
      <section className="hero-banner" style={{ padding: '36px 44px', minHeight: 'unset', marginBottom: '24px' }}>
        <div>
          <span className="pill-demo-badge">Herramienta Didáctica</span>
          <h1 className="hero-title" style={{ fontSize: '32px' }}>
            Laboratorio de Consumo de API REST
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '640px' }}>
            Prueba endpoints reales de DummyJSON Carts. Inspecciona el estado HTTP, tiempo de latencia y la estructura JSON que recibe React.
          </p>
        </div>
      </section>

      <section className="api-explorer-section">
        <div className="api-section-header">
          <div>
            <span className="pill-demo-badge">Petición HTTP</span>
            <h2>Probar un Endpoint de Carritos</h2>
          </div>
          <span className="http-badge-get">GET</span>
        </div>

        {/* Preset Selector */}
        <div className="api-select-row">
          <select
            value={endpoint}
            onChange={(e) => {
              setEndpoint(e.target.value)
              setCustomPath('')
            }}
          >
            {API_EXAMPLES.map((ex) => (
              <option key={ex.value} value={ex.value}>
                {ex.label} ({ex.value})
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn-primary-purple"
            onClick={() => handleSendRequest()}
            disabled={loading}
          >
            {loading ? 'Consultando…' : 'Enviar Solicitud'}
          </button>
        </div>

        {/* Endpoint Preview */}
        <div className="endpoint-preview" style={{ marginBottom: '18px' }}>
          <span>GET</span>
          <code>{API_BASE_URL}{customPath.trim() || endpoint}</code>
        </div>

        {/* Metrics Row */}
        <div className="response-summary">
          <div>
            <span>Estado HTTP</span>
            <strong className={status === 200 ? 'response-ok' : status ? 'response-error' : ''}>
              {loading ? 'Procesando…' : status ? `${status} ${status === 200 ? 'OK' : ''}` : '—'}
            </strong>
          </div>
          <div>
            <span>Tiempo de respuesta</span>
            <strong>{duration !== null ? `${duration} ms` : '—'}</strong>
          </div>
          <div>
            <span>Formato</span>
            <strong>application/json</strong>
          </div>
        </div>

        {/* JSON Viewer */}
        <div className="response-panel">
          <div className="response-panel-heading">
            <strong>Cuerpo de la Respuesta (Payload)</strong>
            <span>{response ? 'JSON válido' : error ? 'Error capturado' : 'A la espera de solicitud'}</span>
          </div>

          {loading && (
            <div className="loading-box" style={{ minHeight: '160px' }}>
              <span className="spinner-icon" />
              <p style={{ color: '#64748b', fontSize: '13px' }}>Enviando petición a DummyJSON…</p>
            </div>
          )}

          {!loading && error && (
            <div style={{ padding: '20px', color: '#dc2626', background: '#fef2f2' }}>
              <strong>Error: </strong> {error}
            </div>
          )}

          {!loading && response !== null && (
            <pre className="json-viewer-box">
              <code>{JSON.stringify(response, null, 2)}</code>
            </pre>
          )}
        </div>
      </section>

      <section className="learning-note" style={{ marginTop: '28px' }}>
        <div className="note-icon">&lt;/&gt;</div>
        <div>
          <strong>Inspección con DevTools</strong>
          <p>
            Presiona <kbd>F12</kbd> &gt; <strong>Network</strong> &gt; filtra por <strong>Fetch/XHR</strong> y compara el tiempo de respuesta registrado por el navegador con el medido aquí por React usando <code>performance.now()</code>.
          </p>
        </div>
        <a href={API_DOCUMENTATION_URL} target="_blank" rel="noreferrer">
          Ver Documentación ↗
        </a>
      </section>
    </main>
  )
}

import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <main className="main-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <span style={{ fontSize: '64px', fontWeight: 900, color: '#4834d4', display: 'block', marginBottom: '12px' }}>
        404
      </span>
      <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>Página no encontrada</h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
        La ruta a la que intentas acceder no existe en la aplicación de carritos.
      </p>
      <Link to="/carritos" className="btn-primary-purple">
        Volver a Carritos
      </Link>
    </main>
  )
}

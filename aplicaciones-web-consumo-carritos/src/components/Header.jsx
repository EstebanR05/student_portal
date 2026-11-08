import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="topbar">
      {/* Brand logo matching mockup */}
      <Link to="/carritos" className="brand-wrapper" aria-label="DummyJSON Inicio">
        <div className="brand-cube-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <span className="brand-title">DummyJSON</span>
      </Link>

      {/* Nav pills */}
      <nav className="topbar-nav" aria-label="Navegación principal">
        <NavLink to="/productos" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
          Productos
        </NavLink>
        <NavLink to="/carritos" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
          Carritos
        </NavLink>
        <NavLink to="/usuarios" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
          Usuarios
        </NavLink>
      </nav>

      {/* Right side: Button </ > API */}
      <div className="topbar-actions">
        <Link to="/api" className="btn-api-outline" title="Abrir Laboratorio de API REST">
          <span>&lt;/&gt;</span>
          <span>API</span>
        </Link>
      </div>
    </header>
  )
}

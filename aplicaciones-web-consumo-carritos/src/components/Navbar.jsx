import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav className="primary-nav" aria-label="Navegación principal">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/carritos">Catálogo de Carritos</NavLink>
        <NavLink to="/api">Explorador API</NavLink>
        <NavLink to="/simulador">Simulador POST/DELETE</NavLink>
        <NavLink to="/contacto">Documentación</NavLink>
      </nav>
    </div>
  )
}

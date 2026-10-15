import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { FormularioContext } from "../context/FormularioContext";

function Navbar() {
  const { cantidadInscripciones, formulario } = useContext(FormularioContext);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const primerNombre = formulario.nombre ? formulario.nombre.trim().split(" ")[0] : null;

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="site-nav">
      <div className="nav-container">
        {/* Barra móvil con marca y botón hamburguesa */}
        <div className="nav-mobile-bar">
          <NavLink to="/" className="nav-mobile-brand" onClick={cerrarMenu}>
            🎓 Academiq Hub
          </NavLink>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {primerNombre && (
              <span className="nav-user-pill nav-user-pill--mobile">
                👤 {primerNombre}
              </span>
            )}
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={menuAbierto}
            >
              {menuAbierto ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Lista de navegación (horizontal en desktop, colapsable en móvil) */}
        <ul className={`nav-menu ${menuAbierto ? "nav-menu--open" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={cerrarMenu}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nosotros"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={cerrarMenu}
            >
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/servicios"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={cerrarMenu}
            >
              Servicios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calificaciones"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={cerrarMenu}
            >
              Calificaciones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={cerrarMenu}
            >
              Contacto
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/servicios"
              className={({ isActive }) => `nav-badge-link ${isActive ? "active" : ""}`}
              onClick={cerrarMenu}
            >
              📝 Matrícula ({cantidadInscripciones})
            </NavLink>
          </li>
          {primerNombre && (
            <li className="nav-user-item nav-user-item--desktop">
              <span className="nav-user-pill">
                👤 {primerNombre}
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

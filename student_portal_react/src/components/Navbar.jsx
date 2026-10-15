import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

function Navbar() {
  const { cantidadInscripciones, formulario } = useContext(FormularioContext);

  const primerNombre = formulario.nombre ? formulario.nombre.trim().split(" ")[0] : null;

  return (
    <nav className="site-nav">
      <div className="nav-container">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/nosotros" className={({ isActive }) => (isActive ? "active" : "")}>
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/servicios" className={({ isActive }) => (isActive ? "active" : "")}>
              Servicios
            </NavLink>
          </li>
          <li>
            <NavLink to="/calificaciones" className={({ isActive }) => (isActive ? "active" : "")}>
              Calificaciones
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={({ isActive }) => (isActive ? "active" : "")}>
              Contacto
            </NavLink>
          </li>
          <li>
            <NavLink to="/servicios" className={({ isActive }) => `nav-badge-link ${isActive ? "active" : ""}`}>
              📝 Matrícula ({cantidadInscripciones})
            </NavLink>
          </li>
          {primerNombre && (
            <li className="nav-user-item">
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

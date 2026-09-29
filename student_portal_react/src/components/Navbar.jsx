import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-container">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/calificaciones">Calificaciones</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

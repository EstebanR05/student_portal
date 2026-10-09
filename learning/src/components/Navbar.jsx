import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

function Navbar() {
  const { cantidadProductos } = useContext(FormularioContext);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <NavLink to="/" className="brand">
          TechStore
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <NavLink to="/productos">
            🛒 Carrito ({cantidadProductos})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

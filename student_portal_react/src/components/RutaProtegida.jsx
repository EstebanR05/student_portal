import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ children, rolesPermitidos = [] }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default RutaProtegida;

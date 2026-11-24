import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";
import { useAuth } from "./context/AuthContext";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import ServicioDetalle from "./pages/ServicioDetalle";
import Calificaciones from "./pages/Calificaciones";
import Contacto from "./pages/Contacto";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import RecursosInteractivos from "./pages/RecursosInteractivos";
import CargarCurso from "./pages/CargarCurso";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./styles.css";

function App() {
  const { autenticado } = useAuth();
  const location = useLocation();
  const mostrarChrome = autenticado && location.pathname !== "/login";

  const rutas = (
    <Routes>
      <Route
        path="/"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <Inicio />
          </RutaProtegida>
        }
      />
      <Route
        path="/nosotros"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <Nosotros />
          </RutaProtegida>
        }
      />
      <Route
        path="/servicios"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <Servicios />
          </RutaProtegida>
        }
      />
      <Route
        path="/servicios/nuevo"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <CargarCurso />
          </RutaProtegida>
        }
      />
      <Route
        path="/servicios/:id"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <ServicioDetalle />
          </RutaProtegida>
        }
      />
      <Route
        path="/recursos"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <RecursosInteractivos />
          </RutaProtegida>
        }
      />
      <Route
        path="/calificaciones"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <Calificaciones />
          </RutaProtegida>
        }
      />
      <Route
        path="/contacto"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <Contacto />
          </RutaProtegida>
        }
      />
      <Route
        path="/contacto/nueva"
        element={
          <RutaProtegida rolesPermitidos={["administrador", "usuario"]}>
            <NuevaSolicitud />
          </RutaProtegida>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (!mostrarChrome) {
    return rutas;
  }

  return <Navbar>{rutas}</Navbar>;
}

export default App;

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";
import { useAuth } from "./context/AuthContext";
import Inicio from "./pages/Inicio";
import SemestresCursados from "./pages/SemestresCursados";
import SemestreNotas from "./pages/SemestreNotas";
import Matricular from "./pages/Matricular";
import FormularioMatriculacion from "./pages/FormularioMatriculacion";
import ConfiguracionPerfil from "./pages/ConfiguracionPerfil";
import AdminConfiguraciones from "./pages/AdminConfiguraciones";
import AdminMaterias from "./pages/AdminMaterias";
import AdminCarreras from "./pages/AdminCarreras";
import AdminCarreraDetalle from "./pages/AdminCarreraDetalle";
import AdminEstudiantes from "./pages/AdminEstudiantes";
import AdminEstudianteNotas from "./pages/AdminEstudianteNotas";
import AdminMatriculas from "./pages/AdminMatriculas";
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

      {/* Rutas Estudiante */}
      <Route
        path="/semestres"
        element={
          <RutaProtegida rolesPermitidos={["usuario"]}>
            <SemestresCursados />
          </RutaProtegida>
        }
      />
      <Route
        path="/semestres/:numero/notas"
        element={
          <RutaProtegida rolesPermitidos={["usuario"]}>
            <SemestreNotas />
          </RutaProtegida>
        }
      />
      <Route
        path="/matricular"
        element={
          <RutaProtegida rolesPermitidos={["usuario"]}>
            <Matricular />
          </RutaProtegida>
        }
      />
      <Route
        path="/matricular/formulario"
        element={
          <RutaProtegida rolesPermitidos={["usuario"]}>
            <FormularioMatriculacion />
          </RutaProtegida>
        }
      />
      <Route
        path="/perfil"
        element={
          <RutaProtegida rolesPermitidos={["usuario"]}>
            <ConfiguracionPerfil />
          </RutaProtegida>
        }
      />

      {/* Rutas Administrador */}
      <Route
        path="/admin/configuraciones"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminConfiguraciones />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/materias"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminMaterias />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/carreras"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminCarreras />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/carreras/:carreraId"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminCarreraDetalle />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/estudiantes"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminEstudiantes />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/estudiantes/:estudianteId"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminEstudianteNotas />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/matriculas"
        element={
          <RutaProtegida rolesPermitidos={["administrador"]}>
            <AdminMatriculas />
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

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AuthProvider, { useAuth } from "../context/AuthContext";
import RutaProtegida from "../components/RutaProtegida";
import Login from "../pages/Login";

function AuthTester() {
  const { usuario, autenticado, iniciarSesion, cerrarSesion } = useAuth();
  return (
    <div>
      <span data-testid="autenticado">{String(autenticado)}</span>
      <span data-testid="usuario-rol">{usuario ? usuario.rol : "ninguno"}</span>
      <span data-testid="usuario-nombre">{usuario ? usuario.nombre : "anonimo"}</span>
      <button type="button" onClick={() => iniciarSesion("admin@unicomfacauca.edu.co", "Admin123")}>
        Login Admin
      </button>
      <button type="button" onClick={() => iniciarSesion("esteban.restrepo@unicomfacauca.edu.co", "Esteban123")}>
        Login Estudiante
      </button>
      <button type="button" onClick={() => iniciarSesion("bad@academiq.edu.co", "wrong")}>
        Login Invalido
      </button>
      <button type="button" onClick={cerrarSesion}>
        Logout
      </button>
    </div>
  );
}

describe("AuthContext y RutaProtegida", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("permite iniciar sesión como administrador y persiste en sessionStorage", () => {
    render(
      <AuthProvider>
        <AuthTester />
      </AuthProvider>
    );

    expect(screen.getByTestId("autenticado")).toHaveTextContent("false");

    act(() => {
      screen.getByText("Login Admin").click();
    });

    expect(screen.getByTestId("autenticado")).toHaveTextContent("true");
    expect(screen.getByTestId("usuario-rol")).toHaveTextContent("administrador");
    const guardado = JSON.parse(sessionStorage.getItem("academiq_usuario"));
    expect(guardado.correo).toBe("admin@unicomfacauca.edu.co");
    expect(guardado.rol).toBe("administrador");
  });

  it("permite iniciar sesión como estudiante (usuario) y cerrar sesión", () => {
    render(
      <AuthProvider>
        <AuthTester />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("Login Estudiante").click();
    });

    expect(screen.getByTestId("usuario-rol")).toHaveTextContent("usuario");
    expect(screen.getByTestId("usuario-nombre")).toHaveTextContent("Esteban Restrepo");

    act(() => {
      screen.getByText("Logout").click();
    });

    expect(screen.getByTestId("autenticado")).toHaveTextContent("false");
    expect(sessionStorage.getItem("academiq_usuario")).toBeNull();
  });

  it("rechaza credenciales inválidas sin autenticar", () => {
    let resultado;
    function Capturador() {
      const { iniciarSesion, autenticado } = useAuth();
      return (
        <div>
          <span data-testid="auth-flag">{String(autenticado)}</span>
          <button
            type="button"
            onClick={() => {
              resultado = iniciarSesion("no@academiq.edu.co", "12345");
            }}
          >
            Probar
          </button>
        </div>
      );
    }

    render(
      <AuthProvider>
        <Capturador />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("Probar").click();
    });

    expect(resultado.ok).toBe(false);
    expect(resultado.error).toMatch(/Credenciales inválidas/i);
    expect(screen.getByTestId("auth-flag")).toHaveTextContent("false");
  });

  it("RutaProtegida redirige a /login si no hay sesión", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/admin"]}>
          <Routes>
            <Route
              path="/admin"
              element={
                <RutaProtegida rolesPermitidos={["administrador"]}>
                  <div>Panel Admin</div>
                </RutaProtegida>
              }
            />
            <Route path="/login" element={<div>Página Login</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Página Login")).toBeInTheDocument();
  });

  it("RutaProtegida redirige a /404 si el rol no tiene permiso y permite si coincide", () => {
    sessionStorage.setItem(
      "academiq_usuario",
      JSON.stringify({ id: "est-1", nombre: "Esteban", correo: "esteban.restrepo@unicomfacauca.edu.co", rol: "usuario" })
    );

    const { unmount } = render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/admin"]}>
          <Routes>
            <Route
              path="/admin"
              element={
                <RutaProtegida rolesPermitidos={["administrador"]}>
                  <div>Panel Admin</div>
                </RutaProtegida>
              }
            />
            <Route path="/404" element={<div>Acceso Denegado 404</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Acceso Denegado 404")).toBeInTheDocument();
    unmount();

    sessionStorage.setItem(
      "academiq_usuario",
      JSON.stringify({ id: "admin-1", nombre: "Admin", correo: "admin@unicomfacauca.edu.co", rol: "administrador" })
    );

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/admin"]}>
          <Routes>
            <Route
              path="/admin"
              element={
                <RutaProtegida rolesPermitidos={["administrador"]}>
                  <div>Panel Admin</div>
                </RutaProtegida>
              }
            />
            <Route path="/404" element={<div>Acceso Denegado 404</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Panel Admin")).toBeInTheDocument();
  });

  it("Login renderiza formulario limpio sin botones de demostración y redirige si ya está autenticado", () => {
    const { unmount } = render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<div>Inicio Portal</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.queryByText(/Credenciales de Demostración/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Usar cuenta/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Correo institucional/i), {
      target: { value: "esteban.restrepo@unicomfacauca.edu.co" }
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Esteban123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    expect(screen.getByText("Inicio Portal")).toBeInTheDocument();
    unmount();

    // Si ya está autenticado y entra a /login, redirige a /
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<div>Inicio Portal</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Inicio Portal")).toBeInTheDocument();
  });
});

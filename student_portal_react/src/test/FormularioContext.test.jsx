import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import AuthProvider, { useAuth } from "../context/AuthContext";
import FormularioProvider, { useFormulario } from "../context/FormularioContext";

function FormularioTester() {
  const { iniciarSesion, cerrarSesion, usuario } = useAuth();
  const {
    formulario,
    inscripciones,
    agregarInscripcion,
    eliminarInscripcion,
    vaciarInscripciones,
    cantidadInscripciones,
    totalCreditos,
    catalogo,
    agregarCursoCatalogo,
    eliminarCursoCatalogo,
    solicitudes,
    agregarSolicitud
  } = useFormulario();

  return (
    <div>
      <span data-testid="usuario-id">{usuario ? usuario.id : "ninguno"}</span>
      <span data-testid="form-nombre">{formulario.nombre}</span>
      <span data-testid="cantidad">{cantidadInscripciones}</span>
      <span data-testid="creditos">{totalCreditos}</span>
      <span data-testid="catalogo-len">{catalogo.length}</span>
      <span data-testid="solicitudes-len">{solicitudes.length}</span>

      <button type="button" onClick={() => iniciarSesion("estudiante@academiq.edu.co", "Estudiante123")}>
        Login Estudiante
      </button>
      <button type="button" onClick={() => iniciarSesion("admin@academiq.edu.co", "Admin123")}>
        Login Admin
      </button>
      <button type="button" onClick={cerrarSesion}>
        Logout
      </button>

      <button
        type="button"
        onClick={() => agregarInscripcion({ id: 101, titulo: "React Avanzado", creditos: 4 })}
      >
        Agregar Inscripcion
      </button>
      <button type="button" onClick={() => eliminarInscripcion(101)}>
        Eliminar Inscripcion
      </button>
      <button type="button" onClick={vaciarInscripciones}>
        Vaciar Inscripciones
      </button>
      <button
        type="button"
        onClick={() =>
          agregarCursoCatalogo({
            titulo: "Inteligencia Artificial",
            creditos: 3,
            docente: "Dra. Gómez",
            estado: "pendiente"
          })
        }
      >
        Agregar Curso
      </button>
      <button type="button" onClick={() => eliminarCursoCatalogo(1)}>
        Eliminar Curso 1
      </button>
      <button
        type="button"
        onClick={() =>
          agregarSolicitud({
            nombre: "Esteban",
            correo: "esteban@academiq.edu.co",
            asunto: "Homologación",
            mensaje: "Solicitud de prueba"
          })
        }
      >
        Agregar Solicitud
      </button>
    </div>
  );
}

describe("FormularioContext (User-Scoped)", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  const renderTester = () =>
    render(
      <AuthProvider>
        <FormularioProvider>
          <FormularioTester />
        </FormularioProvider>
      </AuthProvider>
    );

  it("carga datos iniciales por usuario y persiste inscripciones en academiq_inscripciones_<id>", () => {
    renderTester();

    act(() => {
      screen.getByText("Login Estudiante").click();
    });

    expect(screen.getByTestId("usuario-id")).toHaveTextContent("est-1");
    expect(screen.getByTestId("form-nombre")).toHaveTextContent("Esteban Restrepo");
    // Estudiante inicia con 2 inscripciones pre-cargadas (IDs 2 y 3 = 7 créditos)
    expect(screen.getByTestId("cantidad")).toHaveTextContent("2");
    expect(screen.getByTestId("creditos")).toHaveTextContent("7");

    act(() => {
      screen.getByText("Agregar Inscripcion").click();
      screen.getByText("Agregar Inscripcion").click();
    });

    expect(screen.getByTestId("cantidad")).toHaveTextContent("3");
    expect(screen.getByTestId("creditos")).toHaveTextContent("11");
    expect(JSON.parse(localStorage.getItem("academiq_inscripciones_est-1"))).toHaveLength(3);

    act(() => {
      screen.getByText("Eliminar Inscripcion").click();
    });
    expect(screen.getByTestId("cantidad")).toHaveTextContent("2");

    act(() => {
      screen.getByText("Vaciar Inscripciones").click();
    });
    expect(screen.getByTestId("cantidad")).toHaveTextContent("0");
    expect(JSON.parse(localStorage.getItem("academiq_inscripciones_est-1"))).toHaveLength(0);
  });

  it("aisla solicitudes e inscripciones al cambiar de usuario", () => {
    renderTester();

    act(() => {
      screen.getByText("Login Estudiante").click();
    });
    expect(screen.getByTestId("solicitudes-len")).toHaveTextContent("4");

    act(() => {
      screen.getByText("Agregar Solicitud").click();
    });
    expect(screen.getByTestId("solicitudes-len")).toHaveTextContent("5");
    expect(JSON.parse(localStorage.getItem("academiq_solicitudes_est-1"))).toHaveLength(5);

    act(() => {
      screen.getByText("Login Admin").click();
    });
    expect(screen.getByTestId("usuario-id")).toHaveTextContent("admin-1");
    expect(screen.getByTestId("cantidad")).toHaveTextContent("0");
    expect(screen.getByTestId("solicitudes-len")).toHaveTextContent("6");
  });

  it("agrega y elimina cursos del catálogo persistiendo en academiq_catalogo", () => {
    renderTester();

    const inicial = Number(screen.getByTestId("catalogo-len").textContent);

    act(() => {
      screen.getByText("Agregar Curso").click();
    });

    expect(screen.getByTestId("catalogo-len")).toHaveTextContent(String(inicial + 1));
    const catalogoGuardado = JSON.parse(localStorage.getItem("academiq_catalogo"));
    expect(catalogoGuardado).toHaveLength(inicial + 1);
    expect(catalogoGuardado.some((c) => c.titulo === "Inteligencia Artificial")).toBe(true);

    act(() => {
      screen.getByText("Eliminar Curso 1").click();
    });
    expect(screen.getByTestId("catalogo-len")).toHaveTextContent(String(inicial));
  });
});

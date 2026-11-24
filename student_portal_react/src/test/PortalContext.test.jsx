import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import PortalProvider, {
  usePortal,
  calcularPromedioMateria,
  evaluarEstadoMateria
} from "../context/PortalContext";

function PortalTester() {
  const {
    config,
    materias,
    carreras,
    estudiantes,
    matriculas,
    actualizarConfig,
    agregarMateria,
    eliminarMateria,
    agregarCarrera,
    asignarMateriasSemestre,
    actualizarNotaEstudiante,
    obtenerMateriasQuedadas,
    crearSolicitudMatricula,
    resolverSolicitudMatricula
  } = usePortal();

  const est1 = estudiantes.find((e) => e.id === "est-1");
  const quedadasEst1 = obtenerMateriasQuedadas("est-1");

  return (
    <div>
      <span data-testid="max-creditos">{config.maxCreditosSemestre}</span>
      <span data-testid="total-materias">{materias.length}</span>
      <span data-testid="total-carreras">{carreras.length}</span>
      <span data-testid="quedadas-est1">{quedadasEst1.map((m) => m.id).join(",")}</span>
      <span data-testid="est2-sem2-estado">
        {estudiantes
          .find((e) => e.id === "est-2")
          ?.semestresCursados.find((s) => s.semestreNumero === 2)?.estado || "none"}
      </span>
      <span data-testid="total-matriculas">{matriculas.length}</span>

      <button type="button" onClick={() => actualizarConfig({ maxCreditosSemestre: 20 })}>
        Cambiar Config
      </button>
      <button
        type="button"
        onClick={() =>
          agregarMateria({
            id: "mat-test",
            codigo: "TST-101",
            titulo: "Testing Avanzado",
            creditos: 3,
            docente: "Ing. Test"
          })
        }
      >
        Agregar Materia
      </button>
      <button type="button" onClick={() => eliminarMateria("mat-test")}>
        Eliminar Materia
      </button>
      <button
        type="button"
        onClick={() =>
          agregarCarrera({
            id: "car-test",
            nombre: "Ingeniería de Software",
            codigo: "INGSOFT",
            semestres: [{ numero: 1, nombre: "Semestre 1", materiaIds: [] }]
          })
        }
      >
        Agregar Carrera
      </button>
      <button
        type="button"
        onClick={() => asignarMateriasSemestre("car-test", 1, ["mat-1"])}
      >
        Asignar Materia Semestre
      </button>
      <button
        type="button"
        onClick={() =>
          actualizarNotaEstudiante("est-1", 2, "mat-5", { nota1: 4, nota2: 4, nota3: 4 })
        }
      >
        Aprobar Quedada
      </button>
      <button
        type="button"
        onClick={() =>
          crearSolicitudMatricula({
            estudianteId: "est-1",
            estudianteNombre: est1.nombre,
            estudianteCorreo: est1.correo,
            carreraNombre: "Ingeniería en Sistemas",
            semestreNumero: 3,
            materias: [{ id: "mat-7", titulo: "Desarrollo Web Fullstack", codigo: "SIS-301", creditos: 4 }],
            totalCreditos: 4,
            telefono: "3104567890",
            observaciones: "Test"
          })
        }
      >
        Crear Matricula
      </button>
      <button type="button" onClick={() => resolverSolicitudMatricula("matr-1", "Aprobada")}>
        Aprobar Matricula 1
      </button>
    </div>
  );
}

describe("PortalContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("calcula promedios y evalúa Gana (>= 3.0) / Pierde (< 3.0)", () => {
    expect(calcularPromedioMateria(3.0, 3.0, 3.0)).toBe(3);
    expect(evaluarEstadoMateria(3.0)).toBe("Gana");
    expect(evaluarEstadoMateria(2.99)).toBe("Pierde");
  });

  it("gestiona configuración, materias, carreras y semestres persistiendo en localStorage", () => {
    render(
      <PortalProvider>
        <PortalTester />
      </PortalProvider>
    );

    expect(screen.getByTestId("max-creditos")).toHaveTextContent("24");
    expect(screen.getByTestId("total-materias")).toHaveTextContent("9");
    expect(screen.getByTestId("total-carreras")).toHaveTextContent("3");

    act(() => {
      screen.getByText("Cambiar Config").click();
      screen.getByText("Agregar Materia").click();
      screen.getByText("Agregar Carrera").click();
    });

    expect(screen.getByTestId("max-creditos")).toHaveTextContent("20");
    expect(screen.getByTestId("total-materias")).toHaveTextContent("10");
    expect(screen.getByTestId("total-carreras")).toHaveTextContent("4");

    act(() => {
      screen.getByText("Asignar Materia Semestre").click();
      screen.getByText("Eliminar Materia").click();
    });

    expect(screen.getByTestId("total-materias")).toHaveTextContent("9");
    const savedConfig = JSON.parse(localStorage.getItem("academiq_config"));
    expect(savedConfig.maxCreditosSemestre).toBe(20);
  });

  it("detecta materias quedadas de est-1 y actualiza estado al aprobar nota o matrícula", () => {
    render(
      <PortalProvider>
        <PortalTester />
      </PortalProvider>
    );

    expect(screen.getByTestId("quedadas-est1")).toHaveTextContent("mat-5");
    expect(screen.getByTestId("est2-sem2-estado")).toHaveTextContent("Disponible");

    act(() => {
      screen.getByText("Aprobar Quedada").click();
      screen.getByText("Aprobar Matricula 1").click();
      screen.getByText("Crear Matricula").click();
    });

    expect(screen.getByTestId("quedadas-est1")).toHaveTextContent("");
    expect(screen.getByTestId("est2-sem2-estado")).toHaveTextContent("En curso");
    expect(screen.getByTestId("total-matriculas")).toHaveTextContent("3");
  });
});

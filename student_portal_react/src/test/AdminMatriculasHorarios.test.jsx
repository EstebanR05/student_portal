import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PortalProvider, { usePortal } from "../context/PortalContext";
import AdminMatriculas from "../pages/AdminMatriculas";

const solicitud = {
  id: "solicitud", estudianteId: "est-2", estudianteNombre: "Estudiante",
  estudianteCorreo: "test@example.com", carreraNombre: "Sistemas", semestreNumero: 2,
  totalCreditos: 6, estado: "Pendiente",
  materias: [{ id: "a", titulo: "Materia A", creditos: 3 }, { id: "b", titulo: "Materia B", creditos: 3 }]
};

function AccesoDirecto() {
  const { resolverSolicitudMatricula } = usePortal();
  return <button onClick={() => resolverSolicitudMatricula("solicitud", "Aprobada")}>Intentar aprobación directa</button>;
}

function preparar(horarioB) {
  localStorage.setItem("academiq_matriculas", JSON.stringify([solicitud]));
  localStorage.setItem("academiq_materias", JSON.stringify([
    { id: "a", titulo: "Materia A", horario: "Lunes 08:00 - 10:00" },
    { id: "b", titulo: "Materia B", horario: horarioB }
  ]));
  render(<PortalProvider><AccesoDirecto /><AdminMatriculas /></PortalProvider>);
  fireEvent.click(screen.getByRole("button", { name: "Ver" }));
}

describe("Aprobación de matrículas", () => {
  beforeEach(() => localStorage.clear());

  it("bloquea la aprobación ante cruces, incluso desde el contexto", () => {
    preparar("Lunes 09:00 - 11:00");
    expect(screen.getByRole("alert")).toHaveTextContent("Materia A");
    expect(screen.getByRole("alert")).toHaveTextContent("Materia B");
    expect(screen.getByRole("button", { name: "Aprobar" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /Intentar aprobación directa/ }));
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("permite aprobar horarios consecutivos", () => {
    preparar("Lunes 10:00 - 12:00");
    fireEvent.click(screen.getByRole("button", { name: "Aprobar" }));
    expect(screen.getByText("Aprobada")).toBeInTheDocument();
  });

  it("bloquea horarios que no se pueden comprobar", () => {
    preparar("");
    expect(screen.getByRole("alert")).toHaveTextContent("Materia B: horario ausente o inválido");
    expect(screen.getByRole("button", { name: "Aprobar" })).toBeDisabled();
  });
});

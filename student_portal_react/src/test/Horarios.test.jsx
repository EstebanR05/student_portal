import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import PortalProvider from "../context/PortalContext";
import Matricular from "../pages/Matricular";
import { detectarCrucesHorario } from "../utils/horarios";

describe("Validación de cruces de horario", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("detecta cruce cuando dos materias comparten día y se solapan en horas", () => {
    const { cruces, idsEnCruce } = detectarCrucesHorario([
      { id: "m1", titulo: "Materia A", horario: "Lun / Mié 08:00 - 10:00" },
      { id: "m2", titulo: "Materia B", horario: "Lunes y Viernes 09:00 - 11:00" }
    ]);

    expect(cruces).toHaveLength(1);
    expect(cruces[0].diasComunes).toEqual(["Lunes"]);
    expect(idsEnCruce.has("m1")).toBe(true);
    expect(idsEnCruce.has("m2")).toBe(true);
  });

  it("no marca cruce en clases seguidas ni en días distintos", () => {
    const { cruces } = detectarCrucesHorario([
      { id: "m1", titulo: "Materia A", horario: "Lunes 08:00 - 10:00" },
      { id: "m2", titulo: "Materia B", horario: "Lunes 10:00 - 12:00" },
      { id: "m3", titulo: "Materia C", horario: "Martes 08:00 - 10:00" }
    ]);

    expect(cruces).toHaveLength(0);
  });

  it("bloquea el avance en Matricular cuando el estudiante elige dos materias cruzadas", () => {
    sessionStorage.setItem(
      "academiq_usuario",
      JSON.stringify({
        id: "est-1",
        nombre: "Esteban Restrepo",
        correo: "esteban.restrepo@unicomfacauca.edu.co",
        rol: "usuario"
      })
    );

    // Creamos un cruce en localStorage entre mat-7 (Sem 3) y mat-5 (quedada de est-1)
    localStorage.setItem(
      "academiq_materias",
      JSON.stringify([
        {
          id: "mat-5",
          codigo: "SIS-202",
          titulo: "Bases de Datos Relacionales",
          creditos: 4,
          docente: "Mg. Marcela Ruiz",
          horario: "Lunes 14:00 - 16:00",
          descripcion: "SQL"
        },
        {
          id: "mat-7",
          codigo: "SIS-301",
          titulo: "Desarrollo Web Fullstack",
          creditos: 4,
          docente: "Ing. Esteban Ramírez",
          horario: "Lun / Mié 14:00 - 16:00",
          descripcion: "React"
        }
      ])
    );

    render(
      <AuthProvider>
        <PortalProvider>
          <MemoryRouter initialEntries={[{ pathname: "/matricular", state: { semestreNumero: 3 } }]}>
            <Routes>
              <Route path="/matricular" element={<Matricular />} />
            </Routes>
          </MemoryRouter>
        </PortalProvider>
      </AuthProvider>
    );

    // Agregar mat-7 desde tab 1
    fireEvent.click(screen.getByRole("button", { name: /Agregar materia/i }));

    // Cambiar a tab de materias quedadas y agregar mat-5 (mismo horario Lunes 14:00 - 16:00)
    fireEvent.click(screen.getByRole("tab", { name: /Materias Quedadas/i }));
    fireEvent.click(screen.getByRole("button", { name: /Agregar materia/i }));

    expect(screen.getByText(/Tienes cruces de horario en tu selección/i)).toBeInTheDocument();
    const btnContinuar = screen.getByRole("button", { name: /Continuar al Formulario de Matriculación/i });
    expect(btnContinuar).toBeDisabled();

    // Al quitar la materia en cruce, se habilita nuevamente
    fireEvent.click(screen.getByRole("button", { name: /Quitar materia/i }));
    expect(btnContinuar).not.toBeDisabled();
  });
});

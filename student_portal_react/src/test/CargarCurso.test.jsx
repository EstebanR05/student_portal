import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import FormularioProvider from "../context/FormularioContext";
import CargarCurso from "../pages/CargarCurso";

describe("CargarCurso (Validación de archivos e imagen)", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/preview-curso");
    global.URL.revokeObjectURL = vi.fn();
  });

  const renderCargarCurso = () =>
    render(
      <AuthProvider>
        <FormularioProvider>
          <MemoryRouter>
            <CargarCurso />
          </MemoryRouter>
        </FormularioProvider>
      </AuthProvider>
    );

  it("rechaza archivos con tipo MIME inválido", () => {
    renderCargarCurso();

    const input = screen.getByLabelText(/Imagen de portada/i);
    const pdfFile = new File(["contenido"], "documento.pdf", { type: "application/pdf" });

    fireEvent.change(input, { target: { files: [pdfFile] } });

    expect(screen.getByRole("alert")).toHaveTextContent(/Formato no permitido/i);
    expect(screen.queryByAltText("Vista previa del curso")).not.toBeInTheDocument();
  });

  it("rechaza archivos mayores a 2 MB", () => {
    renderCargarCurso();

    const input = screen.getByLabelText(/Imagen de portada/i);
    const bigBuffer = new Uint8Array(2 * 1024 * 1024 + 10);
    const bigPng = new File([bigBuffer], "grande.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [bigPng] } });

    expect(screen.getByRole("alert")).toHaveTextContent(/supera el tamaño máximo permitido/i);
    expect(screen.queryByAltText("Vista previa del curso")).not.toBeInTheDocument();
  });

  it("acepta PNG/JPEG válido, muestra vista previa y guarda el curso", async () => {
    renderCargarCurso();

    fireEvent.change(screen.getByLabelText(/Nombre del curso/i), {
      target: { value: "Computación en la Nube" }
    });
    fireEvent.change(screen.getByLabelText(/Código/i), {
      target: { value: "INF-501" }
    });
    fireEvent.change(screen.getByLabelText(/Docente responsable/i), {
      target: { value: "Ing. Sofía Castro" }
    });
    fireEvent.change(screen.getByLabelText(/Horario/i), {
      target: { value: "Viernes 08:00 - 11:00" }
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Despliegue de arquitecturas cloud." }
    });

    const input = screen.getByLabelText(/Imagen de portada/i);
    const validPng = new File(["fake-image-bytes"], "portada.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [validPng] } });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(validPng);
    expect(screen.getByAltText("Vista previa del curso")).toHaveAttribute(
      "src",
      "blob:http://localhost/preview-curso"
    );

    fireEvent.click(screen.getByRole("button", { name: /Guardar Asignatura en Catálogo/i }));

    await waitFor(() => {
      const catalogo = JSON.parse(localStorage.getItem("academiq_catalogo"));
      expect(catalogo.some((c) => c.titulo === "Computación en la Nube")).toBe(true);
    });
  });
});

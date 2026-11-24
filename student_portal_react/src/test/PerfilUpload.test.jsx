import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthProvider from "../context/AuthContext";
import PortalProvider from "../context/PortalContext";
import ConfiguracionPerfil from "../pages/ConfiguracionPerfil";

function renderPerfil() {
  sessionStorage.setItem(
    "academiq_usuario",
    JSON.stringify({
      id: "est-1",
      nombre: "Esteban Restrepo",
      correo: "esteban.restrepo@unicomfacauca.edu.co",
      rol: "usuario",
      programa: "Ingeniería en Sistemas",
      codigo: "202210482",
      semestre: "Semestre 3"
    })
  );

  return render(
    <AuthProvider>
      <PortalProvider>
        <ConfiguracionPerfil />
      </PortalProvider>
    </AuthProvider>
  );
}

describe("ConfiguracionPerfil (Validación de imagen, vista previa y carrera solo lectura)", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-preview-url");
    globalThis.URL.revokeObjectURL = vi.fn();
  });

  it("muestra la carrera asignada como campo de solo lectura", () => {
    renderPerfil();
    const carreraInput = screen.getByLabelText(/Carrera asignada/i);
    expect(carreraInput).toHaveValue("Ingeniería en Sistemas");
    expect(carreraInput).toBeDisabled();
  });

  it("rechaza archivos con tipo MIME inválido y muestra Toast de error", () => {
    renderPerfil();
    const fileInput = screen.getByLabelText(/Foto de perfil/i);
    const badFile = new File(["contenido"], "documento.pdf", { type: "application/pdf" });

    fireEvent.change(fileInput, { target: { files: [badFile] } });

    expect(screen.getByRole("status")).toHaveTextContent(/Formato no permitido/i);
  });

  it("rechaza archivos que superen 2 MB", () => {
    renderPerfil();
    const fileInput = screen.getByLabelText(/Foto de perfil/i);
    const largeBuffer = new Uint8Array(2 * 1024 * 1024 + 10);
    const bigFile = new File([largeBuffer], "grande.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [bigFile] } });

    expect(screen.getByRole("status")).toHaveTextContent(/2 MB/i);
  });

  it("acepta una imagen válida (PNG/JPG/WebP <= 2 MB) y muestra vista previa", () => {
    renderPerfil();
    const fileInput = screen.getByLabelText(/Foto de perfil/i);
    const validFile = new File(["img-bytes"], "avatar.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    const preview = screen.getByAltText(/Vista previa de perfil/i);
    expect(preview).toHaveAttribute("src", "blob:mock-preview-url");
  });
});

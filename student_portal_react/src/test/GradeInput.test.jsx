import { useState } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GradeInput } from "../pages/AdminEstudianteNotas";

function Campo() {
  const [nota, setNota] = useState(4.5);
  return <GradeInput valor={nota} etiqueta="Nota" onGuardar={setNota} />;
}

describe("Edición de calificaciones", () => {
  it("permite borrar y escribir con coma, respetando el rango y dos decimales", async () => {
    const usuario = userEvent.setup();
    render(<Campo />);
    const campo = screen.getByRole("textbox", { name: "Nota" });
    await usuario.clear(campo);
    expect(campo).toHaveValue("");
    await usuario.type(campo, "3,456");
    expect(campo).toHaveValue("3,45");
    await usuario.clear(campo);
    await usuario.type(campo, "4.2");
    expect(campo).toHaveValue("4");
    await usuario.clear(campo);
    await usuario.type(campo, "5,1");
    expect(campo).toHaveValue("5,");
    await usuario.clear(campo);
    await usuario.tab();
    expect(campo).toHaveValue("5");
  });
});

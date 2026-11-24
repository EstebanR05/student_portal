import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import Dropdown from "../components/Dropdown";
import Toast from "../components/Toast";

describe("Componentes Interactivos (Sesión 13)", () => {
  it("Modal se abre, muestra contenido y se cierra con Escape", () => {
    const cerrar = vi.fn();
    render(
      <Modal abierto={true} cerrar={cerrar} titulo="Confirmación">
        <p>Contenido del modal</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(cerrar).toHaveBeenCalledTimes(1);
  });

  it("Tabs cambia de pestaña y actualiza aria-selected y tabpanel", () => {
    const items = [
      { titulo: "Sílabo", contenido: <p>Contenido Sílabo</p> },
      { titulo: "Horario", contenido: <p>Contenido Horario</p> }
    ];
    render(<Tabs items={items} />);

    const tab1 = screen.getByRole("tab", { name: "Sílabo" });
    const tab2 = screen.getByRole("tab", { name: "Horario" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Contenido Sílabo");

    fireEvent.click(tab2);
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Contenido Horario");
  });

  it("Accordion alterna apertura única y actualiza aria-expanded", () => {
    const items = [
      { pregunta: "Pregunta 1", respuesta: "Respuesta 1" },
      { pregunta: "Pregunta 2", respuesta: "Respuesta 2" }
    ];
    render(<Accordion items={items} />);

    const btn1 = screen.getByRole("button", { name: /Pregunta 1/i });
    const btn2 = screen.getByRole("button", { name: /Pregunta 2/i });

    expect(btn1).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(btn1);
    expect(btn1).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Respuesta 1")).toBeInTheDocument();

    fireEvent.click(btn2);
    expect(btn1).toHaveAttribute("aria-expanded", "false");
    expect(btn2).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByText("Respuesta 1")).not.toBeInTheDocument();
    expect(screen.getByText("Respuesta 2")).toBeInTheDocument();
  });

  it("Dropdown selecciona una opción y se cierra al hacer clic afuera", () => {
    const onSeleccionar = vi.fn();
    render(
      <div>
        <div data-testid="afuera">Zona externa</div>
        <Dropdown
          label="Elegir curso"
          opciones={["Algoritmos", "Bases de Datos"]}
          onSeleccionar={onSeleccionar}
        />
      </div>
    );

    const toggle = screen.getByRole("button", { name: /Elegir curso/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("option", { name: "Bases de Datos" }));
    expect(onSeleccionar).toHaveBeenCalledWith("Bases de Datos");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Reabrir y cerrar haciendo clic afuera
    fireEvent.click(screen.getByRole("button", { name: /Bases de Datos/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("afuera"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("Toast se renderiza con role='status' y se cierra automáticamente", () => {
    vi.useFakeTimers();
    const cerrar = vi.fn();

    render(<Toast mensaje="Guardado con éxito" tipo="success" cerrar={cerrar} duracion={3000} />);

    expect(screen.getByRole("status")).toHaveTextContent("Guardado con éxito");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(cerrar).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

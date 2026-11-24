import { useEffect, useRef, useState } from "react";

function Dropdown({ opciones = [], onSeleccionar, label = "Seleccionar opción" }) {
  const [abierto, setAbierto] = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);
  const contenedorRef = useRef(null);

  useEffect(() => {
    const manejarClickAfuera = (evento) => {
      if (contenedorRef.current && !contenedorRef.current.contains(evento.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", manejarClickAfuera);
    return () => document.removeEventListener("mousedown", manejarClickAfuera);
  }, []);

  const obtenerTexto = (opcion) =>
    typeof opcion === "string" ? opcion : opcion.label || opcion.titulo || String(opcion.value || "");

  const manejarSeleccion = (opcion) => {
    setSeleccionada(obtenerTexto(opcion));
    setAbierto(false);
    if (onSeleccionar) {
      onSeleccionar(opcion);
    }
  };

  return (
    <div className="dropdown" ref={contenedorRef}>
      <button
        type="button"
        className="dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        onClick={() => setAbierto((prev) => !prev)}
      >
        <span>{seleccionada || label}</span>
        <span aria-hidden="true">{abierto ? "▲" : "▼"}</span>
      </button>

      {abierto && (
        <ul className="dropdown-menu" role="listbox">
          {opciones.map((opcion, index) => {
            const texto = obtenerTexto(opcion);
            return (
              <li key={`${texto}-${index}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={seleccionada === texto}
                  className={`dropdown-item ${seleccionada === texto ? "dropdown-item--active" : ""}`}
                  onClick={() => manejarSeleccion(opcion)}
                >
                  {texto}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

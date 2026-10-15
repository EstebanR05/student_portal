import { createContext, useEffect, useState } from "react";

export const FormularioContext = createContext(null);

const formularioInicial = {
  nombre: "",
  correo: "",
  telefono: "",
  programa: "Ingeniería de Sistemas y Computación",
  asunto: "",
  mensaje: ""
};

function cargarFormularioInicial() {
  const formularioGuardado = localStorage.getItem("formulario");

  if (!formularioGuardado) {
    return formularioInicial;
  }

  try {
    return JSON.parse(formularioGuardado);
  } catch (error) {
    console.error("No se pudo recuperar el formulario:", error);
    return formularioInicial;
  }
}

function cargarInscripcionesInicial() {
  const inscripcionesGuardadas = localStorage.getItem("inscripciones");

  if (!inscripcionesGuardadas) {
    return [];
  }

  try {
    return JSON.parse(inscripcionesGuardadas);
  } catch (error) {
    console.error("No se pudo recuperar las inscripciones:", error);
    return [];
  }
}

export function FormularioProvider({ children }) {
  // El formulario se recupera desde localStorage al iniciar la aplicación.
  const [formulario, setFormulario] = useState(cargarFormularioInicial);

  // Cada cambio del formulario se sincroniza automáticamente con localStorage.
  useEffect(() => {
    localStorage.setItem("formulario", JSON.stringify(formulario));
  }, [formulario]);

  // Las inscripciones académicas se recuperan desde localStorage al iniciar la aplicación.
  const [inscripciones, setInscripciones] = useState(cargarInscripcionesInicial);

  // Cada cambio de inscripciones se sincroniza automáticamente con localStorage.
  useEffect(() => {
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
  }, [inscripciones]);

  const agregarInscripcion = (materia) => {
    setInscripciones((actuales) => {
      const existe = actuales.find((item) => item.id === materia.id);
      if (existe) {
        return actuales;
      }
      return [...actuales, materia];
    });
  };

  const eliminarInscripcion = (id) => {
    setInscripciones((actuales) => actuales.filter((item) => item.id !== id));
  };

  const vaciarInscripciones = () => {
    setInscripciones([]);
  };

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
  };

  const cantidadInscripciones = inscripciones.length;

  const totalCreditos = inscripciones.reduce(
    (acumulado, materia) => acumulado + (Number(materia.creditos) || 0),
    0
  );

  return (
    <FormularioContext.Provider
      value={{
        formulario,
        setFormulario,
        limpiarFormulario,
        inscripciones,
        agregarInscripcion,
        eliminarInscripcion,
        vaciarInscripciones,
        cantidadInscripciones,
        totalCreditos
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
}

export default FormularioProvider;

import { createContext, useContext, useEffect, useState } from "react";
import { servicios as serviciosIniciales } from "../data/servicios";
import { obtenerMockUsuario } from "../data/usuariosMock";
import { useAuth } from "./AuthContext";

export const FormularioContext = createContext(null);

const CATALOGO_KEY = "academiq_catalogo";

const formularioBase = {
  nombre: "",
  correo: "",
  telefono: "",
  programa: "Ingeniería en Sistemas",
  asunto: "",
  mensaje: ""
};

function crearFormularioPorDefecto(usuario) {
  if (!usuario) {
    return formularioBase;
  }
  return {
    ...formularioBase,
    nombre: usuario.nombre || "",
    correo: usuario.correo || "",
    programa: usuario.programa || formularioBase.programa
  };
}

function cargarFormularioUsuario(usuario) {
  if (!usuario?.id) {
    return formularioBase;
  }

  const key = `academiq_formulario_${usuario.id}`;
  const guardado = localStorage.getItem(key);
  if (!guardado) {
    return crearFormularioPorDefecto(usuario);
  }

  try {
    return JSON.parse(guardado);
  } catch (error) {
    console.error("No se pudo recuperar el formulario:", error);
    return crearFormularioPorDefecto(usuario);
  }
}

function cargarInscripcionesUsuario(usuario) {
  if (!usuario?.id) {
    return [];
  }

  const key = `academiq_inscripciones_${usuario.id}`;
  const guardadas = localStorage.getItem(key);
  if (!guardadas) {
    const mock = obtenerMockUsuario(usuario.id);
    return mock?.inscripcionesIniciales ? [...mock.inscripcionesIniciales] : [];
  }

  try {
    const parsed = JSON.parse(guardadas);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("No se pudo recuperar las inscripciones:", error);
    return [];
  }
}

function cargarSolicitudesUsuario(usuario) {
  if (!usuario?.id) {
    return [];
  }

  const key = `academiq_solicitudes_${usuario.id}`;
  const guardadas = localStorage.getItem(key);
  if (!guardadas) {
    const mock = obtenerMockUsuario(usuario.id);
    return mock?.solicitudesIniciales ? [...mock.solicitudesIniciales] : [];
  }

  try {
    const parsed = JSON.parse(guardadas);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("No se pudo recuperar las solicitudes:", error);
    return [];
  }
}

function cargarCatalogoInicial() {
  const catalogoGuardado = localStorage.getItem(CATALOGO_KEY);

  if (!catalogoGuardado) {
    return serviciosIniciales;
  }

  try {
    const parsed = JSON.parse(catalogoGuardado);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : serviciosIniciales;
  } catch (error) {
    console.error("No se pudo recuperar el catálogo:", error);
    return serviciosIniciales;
  }
}

export function FormularioProvider({ children }) {
  const { usuario } = useAuth();
  const usuarioId = usuario?.id || null;

  const [formularioState, setFormularioState] = useState(() => ({
    userId: usuarioId,
    data: cargarFormularioUsuario(usuario)
  }));
  const [inscripcionesState, setInscripcionesState] = useState(() => ({
    userId: usuarioId,
    items: cargarInscripcionesUsuario(usuario)
  }));
  const [solicitudesState, setSolicitudesState] = useState(() => ({
    userId: usuarioId,
    items: cargarSolicitudesUsuario(usuario)
  }));
  const [catalogo, setCatalogo] = useState(cargarCatalogoInicial);

  useEffect(() => {
    setFormularioState({
      userId: usuarioId,
      data: cargarFormularioUsuario(usuario)
    });
    setInscripcionesState({
      userId: usuarioId,
      items: cargarInscripcionesUsuario(usuario)
    });
    setSolicitudesState({
      userId: usuarioId,
      items: cargarSolicitudesUsuario(usuario)
    });
  }, [usuario, usuarioId]);

  useEffect(() => {
    if (usuarioId && formularioState.userId === usuarioId) {
      localStorage.setItem(
        `academiq_formulario_${usuarioId}`,
        JSON.stringify(formularioState.data)
      );
    }
  }, [formularioState, usuarioId]);

  useEffect(() => {
    if (usuarioId && inscripcionesState.userId === usuarioId) {
      localStorage.setItem(
        `academiq_inscripciones_${usuarioId}`,
        JSON.stringify(inscripcionesState.items)
      );
    }
  }, [inscripcionesState, usuarioId]);

  useEffect(() => {
    if (usuarioId && solicitudesState.userId === usuarioId) {
      localStorage.setItem(
        `academiq_solicitudes_${usuarioId}`,
        JSON.stringify(solicitudesState.items)
      );
    }
  }, [solicitudesState, usuarioId]);

  useEffect(() => {
    localStorage.setItem(CATALOGO_KEY, JSON.stringify(catalogo));
  }, [catalogo]);

  const formulario =
    formularioState.userId === usuarioId
      ? formularioState.data
      : crearFormularioPorDefecto(usuario);

  const inscripciones =
    inscripcionesState.userId === usuarioId ? inscripcionesState.items : [];

  const solicitudes =
    solicitudesState.userId === usuarioId ? solicitudesState.items : [];

  const setFormulario = (actualizador) => {
    setFormularioState((prev) => {
      const base =
        prev.userId === usuarioId ? prev.data : crearFormularioPorDefecto(usuario);
      const next =
        typeof actualizador === "function" ? actualizador(base) : actualizador;
      return { userId: usuarioId, data: next };
    });
  };

  const agregarInscripcion = (materia) => {
    setInscripcionesState((prev) => {
      const actuales = prev.userId === usuarioId ? prev.items : [];
      const existe = actuales.find((item) => item.id === materia.id);
      if (existe) {
        return { userId: usuarioId, items: actuales };
      }
      return { userId: usuarioId, items: [...actuales, materia] };
    });
  };

  const eliminarInscripcion = (id) => {
    setInscripcionesState((prev) => {
      const actuales = prev.userId === usuarioId ? prev.items : [];
      return {
        userId: usuarioId,
        items: actuales.filter((item) => item.id !== id)
      };
    });
  };

  const vaciarInscripciones = () => {
    setInscripcionesState({ userId: usuarioId, items: [] });
  };

  const limpiarFormulario = () => {
    setFormularioState({
      userId: usuarioId,
      data: crearFormularioPorDefecto(usuario)
    });
  };

  const agregarCursoCatalogo = (curso) => {
    const nuevoCurso = {
      ...curso,
      id: curso.id || Date.now(),
      creditos: Number(curso.creditos) || 3
    };
    setCatalogo((actuales) => [...actuales, nuevoCurso]);
    return nuevoCurso;
  };

  const eliminarCursoCatalogo = (id) => {
    setCatalogo((actuales) => actuales.filter((item) => item.id !== id));
  };

  const agregarSolicitud = (datos) => {
    const nuevaSolicitud = {
      ...datos,
      id: Date.now(),
      fecha: new Date().toISOString(),
      estado: datos.estado || "Radicada"
    };
    setSolicitudesState((prev) => {
      const actuales = prev.userId === usuarioId ? prev.items : [];
      return { userId: usuarioId, items: [nuevaSolicitud, ...actuales] };
    });
    return nuevaSolicitud;
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
        totalCreditos,
        catalogo,
        agregarCursoCatalogo,
        eliminarCursoCatalogo,
        solicitudes,
        agregarSolicitud
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
}

export function useFormulario() {
  const context = useContext(FormularioContext);
  if (!context) {
    throw new Error("useFormulario debe utilizarse dentro de un FormularioProvider");
  }
  return context;
}

export default FormularioProvider;

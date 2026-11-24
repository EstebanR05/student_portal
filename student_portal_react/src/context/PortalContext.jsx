import { createContext, useContext, useEffect, useState } from "react";
import { validarHorariosSolicitud } from "../utils/horarios";
import {
  CARRERAS_INICIALES,
  CONFIG_INICIAL,
  ESTUDIANTES_INICIALES,
  MATERIAS_INICIALES,
  MATRICULAS_INICIALES
} from "../data/portalMock";

export const PortalContext = createContext(null);

const KEYS = {
  config: "academiq_config",
  materias: "academiq_materias",
  carreras: "academiq_carreras",
  estudiantes: "academiq_estudiantes",
  matriculas: "academiq_matriculas"
};

function leerStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return fallback;
  }
}

export function calcularPromedioMateria(nota1, nota2, nota3) {
  const n1 = Number(nota1) || 0;
  const n2 = Number(nota2) || 0;
  const n3 = Number(nota3) || 0;
  return Number(((n1 + n2 + n3) / 3).toFixed(2));
}

export function evaluarEstadoMateria(promedio) {
  return Number(promedio) >= 3.0 ? "Gana" : "Pierde";
}

export function PortalProvider({ children }) {
  const [config, setConfig] = useState(() => leerStorage(KEYS.config, CONFIG_INICIAL));
  const [materias, setMaterias] = useState(() => leerStorage(KEYS.materias, MATERIAS_INICIALES));
  const [carreras, setCarreras] = useState(() => leerStorage(KEYS.carreras, CARRERAS_INICIALES));
  const [estudiantes, setEstudiantes] = useState(() => leerStorage(KEYS.estudiantes, ESTUDIANTES_INICIALES));
  const [matriculas, setMatriculas] = useState(() => leerStorage(KEYS.matriculas, MATRICULAS_INICIALES));

  useEffect(() => {
    localStorage.setItem(KEYS.config, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(KEYS.materias, JSON.stringify(materias));
  }, [materias]);

  useEffect(() => {
    localStorage.setItem(KEYS.carreras, JSON.stringify(carreras));
  }, [carreras]);

  useEffect(() => {
    localStorage.setItem(KEYS.estudiantes, JSON.stringify(estudiantes));
  }, [estudiantes]);

  useEffect(() => {
    localStorage.setItem(KEYS.matriculas, JSON.stringify(matriculas));
  }, [matriculas]);

  // --- Configuración ---
  const actualizarConfig = (nuevaConfig) => {
    setConfig((prev) => ({ ...prev, ...nuevaConfig }));
  };

  // --- Materias CRUD ---
  const agregarMateria = (datos) => {
    const nueva = {
      ...datos,
      id: datos.id || `mat-${Date.now()}`,
      creditos: Number(datos.creditos) || 3
    };
    setMaterias((prev) => [...prev, nueva]);
    return nueva;
  };

  const actualizarMateria = (id, datos) => {
    setMaterias((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, ...datos, creditos: Number(datos.creditos ?? m.creditos) } : m
      )
    );
  };

  const eliminarMateria = (id) => {
    setMaterias((prev) => prev.filter((m) => m.id !== id));
    setCarreras((prev) =>
      prev.map((car) => ({
        ...car,
        semestres: car.semestres.map((sem) => ({
          ...sem,
          materiaIds: sem.materiaIds.filter((mId) => mId !== id)
        }))
      }))
    );
  };

  // --- Carreras CRUD + Semestres inner CRUD ---
  const agregarCarrera = (datos) => {
    const nueva = {
      id: datos.id || `car-${Date.now()}`,
      nombre: datos.nombre,
      codigo: datos.codigo,
      facultad: datos.facultad || "Facultad de Ingeniería",
      descripcion: datos.descripcion || "",
      semestres: datos.semestres || []
    };
    setCarreras((prev) => [...prev, nueva]);
    return nueva;
  };

  const actualizarCarrera = (id, datos) => {
    setCarreras((prev) => prev.map((c) => (c.id === id ? { ...c, ...datos } : c)));
  };

  const eliminarCarrera = (id) => {
    setCarreras((prev) => prev.filter((c) => c.id !== id));
  };

  const agregarSemestreCarrera = (carreraId, semestre) => {
    setCarreras((prev) =>
      prev.map((car) => {
        if (car.id !== carreraId) return car;
        const numero = Number(semestre.numero);
        if (car.semestres.some((s) => s.numero === numero)) return car;
        const nuevoSem = {
          numero,
          nombre: semestre.nombre || `Semestre ${numero}`,
          materiaIds: semestre.materiaIds || []
        };
        return {
          ...car,
          semestres: [...car.semestres, nuevoSem].sort((a, b) => a.numero - b.numero)
        };
      })
    );
  };

  const actualizarSemestreCarrera = (carreraId, numeroSemestre, datos) => {
    setCarreras((prev) =>
      prev.map((car) => {
        if (car.id !== carreraId) return car;
        return {
          ...car,
          semestres: car.semestres.map((s) =>
            s.numero === Number(numeroSemestre) ? { ...s, ...datos } : s
          )
        };
      })
    );
  };

  const eliminarSemestreCarrera = (carreraId, numeroSemestre) => {
    setCarreras((prev) =>
      prev.map((car) => {
        if (car.id !== carreraId) return car;
        return {
          ...car,
          semestres: car.semestres.filter((s) => s.numero !== Number(numeroSemestre))
        };
      })
    );
  };

  const asignarMateriasSemestre = (carreraId, numeroSemestre, materiaIds) => {
    actualizarSemestreCarrera(carreraId, numeroSemestre, { materiaIds });
  };

  // --- Estudiantes ---
  const actualizarPerfilEstudiante = (estudianteId, datos) => {
    setEstudiantes((prev) =>
      prev.map((est) => {
        if (est.id !== estudianteId) return est;
        const { carreraId: _ignorarCarrera, ...permitidos } = datos;
        return { ...est, ...permitidos };
      })
    );
  };

  const actualizarNotaEstudiante = (estudianteId, semestreNumero, materiaId, notas) => {
    setEstudiantes((prev) =>
      prev.map((est) => {
        if (est.id !== estudianteId) return est;
        const semNum = Number(semestreNumero);
        const semExiste = est.semestresCursados.some((s) => s.semestreNumero === semNum);
        if (!semExiste) return est;

        return {
          ...est,
          semestresCursados: est.semestresCursados.map((sem) => {
            if (sem.semestreNumero !== semNum) return sem;
            const notaExiste = sem.notas.some((n) => n.materiaId === materiaId);
            const nuevaNota = {
              materiaId,
              nota1: Number(notas.nota1) || 0,
              nota2: Number(notas.nota2) || 0,
              nota3: Number(notas.nota3) || 0
            };
            return {
              ...sem,
              notas: notaExiste
                ? sem.notas.map((n) => (n.materiaId === materiaId ? nuevaNota : n))
                : [...sem.notas, nuevaNota]
            };
          })
        };
      })
    );
  };

  const obtenerMateriasQuedadas = (estudianteId) => {
    const est = estudiantes.find((e) => e.id === estudianteId);
    if (!est) return [];

    const aprobadasIds = new Set();
    const reprobadasMap = new Map();

    est.semestresCursados.forEach((sem) => {
      if (sem.estado === "Disponible") return;
      sem.notas.forEach((n) => {
        const prom = calcularPromedioMateria(n.nota1, n.nota2, n.nota3);
        if (prom >= 3.0) {
          aprobadasIds.add(n.materiaId);
        } else {
          reprobadasMap.set(n.materiaId, {
            materiaId: n.materiaId,
            promedioAnterior: prom,
            semestreOrigen: sem.semestreNumero
          });
        }
      });
    });

    const resultado = [];
    reprobadasMap.forEach((info, materiaId) => {
      if (!aprobadasIds.has(materiaId)) {
        const mat = materias.find((m) => m.id === materiaId);
        if (mat) {
          resultado.push({ ...mat, ...info });
        }
      }
    });
    return resultado;
  };

  // --- Matrículas ---
  const crearSolicitudMatricula = (solicitud) => {
    const nueva = {
      ...solicitud,
      id: `matr-${Date.now()}`,
      fecha: new Date().toISOString(),
      estado: "Pendiente"
    };
    setMatriculas((prev) => [nueva, ...prev]);
    return nueva;
  };

  const resolverSolicitudMatricula = (id, nuevoEstado) => {
    const solicitud = matriculas.find((m) => m.id === id);
    if (!solicitud || solicitud.estado !== "Pendiente") return { ok: false };

    if (nuevoEstado === "Aprobada") {
      const validacion = validarHorariosSolicitud(solicitud.materias, materias);
      if (validacion.cruces.length || validacion.sinHorarioValido.length) {
        return { ok: false, ...validacion };
      }
    }

    setMatriculas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, estado: nuevoEstado } : m))
    );

    if (nuevoEstado === "Aprobada") {
      setEstudiantes((prev) =>
        prev.map((est) => {
          if (est.id !== solicitud.estudianteId) return est;
          const semNum = Number(solicitud.semestreNumero);
          const notasIniciales = (solicitud.materias || []).map((mat) => ({
            materiaId: mat.id,
            nota1: 0,
            nota2: 0,
            nota3: 0
          }));

          const existeSem = est.semestresCursados.some((s) => s.semestreNumero === semNum);
          const semestresActualizados = existeSem
            ? est.semestresCursados.map((s) =>
                s.semestreNumero === semNum
                  ? { ...s, estado: "En curso", notas: notasIniciales }
                  : s
              )
            : [
                ...est.semestresCursados,
                {
                  semestreNumero: semNum,
                  periodo: "2026-1",
                  estado: "En curso",
                  notas: notasIniciales
                }
              ].sort((a, b) => a.semestreNumero - b.semestreNumero);

          return {
            ...est,
            semestresCursados: semestresActualizados
          };
        })
      );
    }
    return { ok: true };
  };

  return (
    <PortalContext.Provider
      value={{
        config,
        materias,
        carreras,
        estudiantes,
        matriculas,
        actualizarConfig,
        agregarMateria,
        actualizarMateria,
        eliminarMateria,
        agregarCarrera,
        actualizarCarrera,
        eliminarCarrera,
        agregarSemestreCarrera,
        actualizarSemestreCarrera,
        eliminarSemestreCarrera,
        asignarMateriasSemestre,
        actualizarPerfilEstudiante,
        actualizarNotaEstudiante,
        obtenerMateriasQuedadas,
        crearSolicitudMatricula,
        resolverSolicitudMatricula,
        calcularPromedioMateria,
        evaluarEstadoMateria
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal debe utilizarse dentro de un PortalProvider");
  }
  return context;
}

export default PortalProvider;

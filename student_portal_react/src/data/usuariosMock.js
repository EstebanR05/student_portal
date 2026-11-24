import { servicios } from "./servicios";

const obtenerCursoPorId = (id) => servicios.find((curso) => curso.id === id);

export const USUARIOS_MOCK = [
  {
    id: "est-1",
    nombre: "Esteban Restrepo",
    correo: "estudiante@academiq.edu.co",
    clave: "Estudiante123",
    rol: "usuario",
    programa: "Ingeniería en Sistemas",
    codigo: "202210482",
    semestre: "7° Semestre",
    inscripcionesIniciales: [obtenerCursoPorId(2), obtenerCursoPorId(3)].filter(Boolean),
    calificacionesIniciales: [
      { cursoId: 2, nota1: 4.1, nota2: 4.3, nota3: 4.0 },
      { cursoId: 3, nota1: 4.5, nota2: 4.2, nota3: 4.6 }
    ],
    solicitudesIniciales: [
      {
        id: "sol-est-1",
        nombre: "Esteban Restrepo",
        correo: "estudiante@academiq.edu.co",
        asunto: "Confirmación de horario de laboratorio",
        mensaje: "Solicito confirmar el salón asignado para la práctica de Bases de Datos Relacionales.",
        fecha: "2026-10-15T14:30:00.000Z",
        estado: "Respondida"
      },
      {
        id: "sol-est-2",
        nombre: "Esteban Restrepo",
        correo: "estudiante@academiq.edu.co",
        asunto: "Homologación de electiva técnica",
        mensaje: "Adjunto certificado de curso previo en desarrollo frontend para validación de créditos.",
        fecha: "2026-10-18T09:15:00.000Z",
        estado: "Pendiente"
      },
      {
        id: "sol-est-3",
        nombre: "Esteban Restrepo",
        correo: "estudiante@academiq.edu.co",
        asunto: "Certificado de matrícula activa",
        mensaje: "Requiero constancia de estudios vigente para trámite de prácticas empresariales.",
        fecha: "2026-10-20T11:20:00.000Z",
        estado: "En revisión"
      },
      {
        id: "sol-est-4",
        nombre: "Esteban Restrepo",
        correo: "estudiante@academiq.edu.co",
        asunto: "Revisión de nota segundo corte",
        mensaje: "Solicito retroalimentación sobre la sustentación del proyecto de Estructuras de Datos.",
        fecha: "2026-10-22T15:45:00.000Z",
        estado: "Respondida"
      }
    ]
  },
  {
    id: "admin-1",
    nombre: "Administrador Académico",
    correo: "admin@academiq.edu.co",
    clave: "Admin123",
    rol: "administrador",
    programa: "Dirección de Ingeniería en Sistemas",
    codigo: "ADM-001",
    semestre: "Panel Administrativo",
    inscripcionesIniciales: [],
    calificacionesIniciales: [
      { cursoId: 1, nota1: 4.5, nota2: 4.2, nota3: 4.4 },
      { cursoId: 2, nota1: 3.9, nota2: 4.1, nota3: 4.2 },
      { cursoId: 3, nota1: 4.3, nota2: 4.6, nota3: 4.4 },
      { cursoId: 4, nota1: 3.5, nota2: 3.8, nota3: 3.6 },
      { cursoId: 5, nota1: 2.4, nota2: 2.6, nota3: 2.5 },
      { cursoId: 6, nota1: 4.0, nota2: 4.1, nota3: 4.2 }
    ],
    solicitudesIniciales: [
      {
        id: "sol-adm-1",
        estudiante: "Esteban Restrepo",
        correo: "estudiante@academiq.edu.co",
        asunto: "Homologación de electiva técnica",
        mensaje: "Adjunto certificado de curso previo para validación de créditos académicos.",
        fecha: "2026-10-18T09:15:00.000Z",
        estado: "Pendiente"
      },
      {
        id: "sol-adm-2",
        estudiante: "Laura Martínez",
        correo: "laura.martinez@academiq.edu.co",
        asunto: "Ampliación de cupos en Arquitectura de Software",
        mensaje: "Requiero habilitar un cupo adicional para completar la carga del semestre.",
        fecha: "2026-10-19T16:40:00.000Z",
        estado: "En revisión"
      },
      {
        id: "sol-adm-3",
        estudiante: "Carlos Mendoza",
        correo: "carlos.mendoza@academiq.edu.co",
        asunto: "Cambio de grupo en Redes Computacionales",
        mensaje: "Tengo cruce de horario los miércoles en la mañana y solicito traslado al grupo B.",
        fecha: "2026-10-20T10:05:00.000Z",
        estado: "Pendiente"
      },
      {
        id: "sol-adm-4",
        estudiante: "Sofía Gómez",
        correo: "sofia.gomez@academiq.edu.co",
        asunto: "Certificado de promedio acumulado",
        mensaje: "Solicito certificado oficial firmado para postulación a beca de investigación.",
        fecha: "2026-10-21T14:15:00.000Z",
        estado: "Respondida"
      },
      {
        id: "sol-adm-5",
        estudiante: "Andrés Felipe Ruiz",
        correo: "andres.ruiz@academiq.edu.co",
        asunto: "Cancelación extemporánea de asignatura",
        mensaje: "Adjunto soporte médico para tramitar retiro de materia sin afectación de promedio.",
        fecha: "2026-10-22T08:50:00.000Z",
        estado: "En revisión"
      },
      {
        id: "sol-adm-6",
        estudiante: "Valentina Torres",
        correo: "valentina.torres@academiq.edu.co",
        asunto: "Aval para inscripción de trabajo de grado",
        mensaje: "Ya completé el 85% de los créditos y solicito autorización para registrar anteproyecto.",
        fecha: "2026-10-23T17:10:00.000Z",
        estado: "Respondida"
      }
    ]
  }
];

export function obtenerMockUsuario(usuarioId) {
  return USUARIOS_MOCK.find((u) => u.id === usuarioId) || null;
}

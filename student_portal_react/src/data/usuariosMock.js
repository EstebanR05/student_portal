export const USUARIOS_MOCK = [
  {
    id: "est-1",
    nombre: "Esteban Restrepo",
    correo: "esteban.restrepo@unicomfacauca.edu.co",
    clave: "Esteban123",
    rol: "usuario",
    programa: "Ingeniería en Sistemas",
    codigo: "202210482",
    semestre: "Semestre 3"
  },
  {
    id: "est-2",
    nombre: "Ariana Andrade",
    correo: "ariana.andrade@unicomfacauca.edu.co",
    clave: "Ariana123",
    rol: "usuario",
    programa: "Ingeniería en Sistemas",
    codigo: "202210519",
    semestre: "Semestre 2"
  },
  {
    id: "est-3",
    nombre: "Carlos Mendoza",
    correo: "carlos.mendoza@unicomfacauca.edu.co",
    clave: "Carlos123",
    rol: "usuario",
    programa: "Ingeniería Industrial",
    codigo: "202310104",
    semestre: "Semestre 2"
  },
  {
    id: "admin-1",
    nombre: "Administrador Académico",
    correo: "admin@unicomfacauca.edu.co",
    clave: "Admin123",
    rol: "administrador",
    programa: "Dirección de Ingeniería",
    codigo: "ADM-001",
    semestre: "Panel Administrativo"
  }
];

export function obtenerMockUsuario(usuarioId) {
  return USUARIOS_MOCK.find((u) => u.id === usuarioId) || null;
}

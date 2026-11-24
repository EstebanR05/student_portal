export const CONFIG_INICIAL = {
  maxCreditosSemestre: 24
};

export const MATERIAS_INICIALES = [
  {
    id: "mat-1",
    codigo: "SIS-101",
    titulo: "Lógica y Algoritmos",
    creditos: 4,
    docente: "Ing. Carlos Paredes",
    horario: "Lun / Mié 08:00 - 10:00",
    categoria: "Fundamentos",
    descripcion: "Pensamiento computacional, estructuras de control, recursividad y diseño de algoritmos."
  },
  {
    id: "mat-2",
    codigo: "SIS-102",
    titulo: "Cálculo Diferencial",
    creditos: 4,
    docente: "Mg. Ana Lucía Gómez",
    horario: "Mar / Jue 10:00 - 12:00",
    categoria: "Ciencias Básicas",
    descripcion: "Límites, derivadas, tasas de cambio y optimización aplicada a la ingeniería."
  },
  {
    id: "mat-3",
    codigo: "SIS-103",
    titulo: "Introducción a la Ingeniería",
    creditos: 2,
    docente: "Ing. Julián Mora",
    horario: "Vie 08:00 - 10:00",
    categoria: "Formación Profesional",
    descripcion: "Panorama de la disciplina, ética profesional y metodología de proyectos tecnológicos."
  },
  {
    id: "mat-4",
    codigo: "SIS-201",
    titulo: "Estructuras de Datos",
    creditos: 4,
    docente: "Ing. Carlos Paredes",
    horario: "Lun / Mié 10:00 - 12:00",
    categoria: "Programación",
    descripcion: "Listas enlazadas, pilas, colas, árboles binarios, grafos y análisis de complejidad."
  },
  {
    id: "mat-5",
    codigo: "SIS-202",
    titulo: "Bases de Datos Relacionales",
    creditos: 4,
    docente: "Mg. Marcela Ruiz",
    horario: "Mar / Jue 08:00 - 10:00",
    categoria: "Datos",
    descripcion: "Modelado entidad-relación, normalización, SQL avanzado y transacciones ACID."
  },
  {
    id: "mat-6",
    codigo: "SIS-203",
    titulo: "Álgebra Lineal",
    creditos: 3,
    docente: "Mg. Ana Lucía Gómez",
    horario: "Vie 10:00 - 13:00",
    categoria: "Ciencias Básicas",
    descripcion: "Vectores, matrices, determinantes, espacios vectoriales y transformaciones lineales."
  },
  {
    id: "mat-7",
    codigo: "SIS-301",
    titulo: "Desarrollo Web Fullstack",
    creditos: 4,
    docente: "Ing. Esteban Ramírez",
    horario: "Lun / Mié 14:00 - 16:00",
    categoria: "Ingeniería de Software",
    descripcion: "Arquitectura cliente-servidor, React moderno, APIs REST y persistencia de datos."
  },
  {
    id: "mat-8",
    codigo: "SIS-302",
    titulo: "Redes de Computadores",
    creditos: 4,
    docente: "Ing. Diana Castillo",
    horario: "Mar / Jue 14:00 - 16:00",
    categoria: "Infraestructura",
    descripcion: "Modelo OSI, TCP/IP, enrutamiento, subredes y seguridad perimetral básica."
  },
  {
    id: "mat-9",
    codigo: "SIS-303",
    titulo: "Sistemas Operativos",
    creditos: 3,
    docente: "Mg. Héctor Valencia",
    horario: "Vie 14:00 - 17:00",
    categoria: "Infraestructura",
    descripcion: "Gestión de procesos, hilos, concurrencia, memoria virtual y sistemas de archivos."
  }
];

export const CARRERAS_INICIALES = [
  {
    id: "car-sis",
    nombre: "Ingeniería en Sistemas",
    codigo: "INGSIS",
    facultad: "Facultad de Ingeniería",
    descripcion: "Formación integral en desarrollo de software, arquitectura de datos e infraestructura tecnológica.",
    semestres: [
      {
        numero: 1,
        nombre: "Semestre 1 - Fundamentos",
        materiaIds: ["mat-1", "mat-2", "mat-3"]
      },
      {
        numero: 2,
        nombre: "Semestre 2 - Núcleo Básico",
        materiaIds: ["mat-4", "mat-5", "mat-6"]
      },
      {
        numero: 3,
        nombre: "Semestre 3 - Construcción",
        materiaIds: ["mat-7", "mat-8", "mat-9"]
      }
    ]
  },
  {
    id: "car-ind",
    nombre: "Ingeniería Industrial",
    codigo: "INGIND",
    facultad: "Facultad de Ingeniería",
    descripcion: "Optimización de procesos productivos, gestión de operaciones y analítica organizacional.",
    semestres: [
      {
        numero: 1,
        nombre: "Semestre 1 - Bases Cuantitativas",
        materiaIds: ["mat-2", "mat-3", "mat-6"]
      },
      {
        numero: 2,
        nombre: "Semestre 2 - Sistemas y Datos",
        materiaIds: ["mat-1", "mat-5"]
      }
    ]
  },
  {
    id: "car-elec",
    nombre: "Ingeniería Electrónica",
    codigo: "INGELEC",
    facultad: "Facultad de Ingeniería",
    descripcion: "Diseño de sistemas embebidos, telecomunicaciones y automatización industrial.",
    semestres: [
      {
        numero: 1,
        nombre: "Semestre 1 - Ciencias y Lógica",
        materiaIds: ["mat-1", "mat-2", "mat-3"]
      },
      {
        numero: 2,
        nombre: "Semestre 2 - Conectividad",
        materiaIds: ["mat-6", "mat-8", "mat-9"]
      }
    ]
  }
];

export const ESTUDIANTES_INICIALES = [
  {
    id: "est-1",
    nombre: "Esteban Restrepo",
    correo: "esteban.restrepo@unicomfacauca.edu.co",
    carreraId: "car-sis",
    foto: "",
    telefono: "3104567890",
    codigo: "202210482",
    semestresCursados: [
      {
        semestreNumero: 1,
        periodo: "2025-1",
        estado: "Aprobado",
        notas: [
          { materiaId: "mat-1", nota1: 4.2, nota2: 4.0, nota3: 4.4 },
          { materiaId: "mat-2", nota1: 3.6, nota2: 3.8, nota3: 3.9 },
          { materiaId: "mat-3", nota1: 4.5, nota2: 4.3, nota3: 4.6 }
        ]
      },
      {
        semestreNumero: 2,
        periodo: "2025-2",
        estado: "Aprobado",
        notas: [
          { materiaId: "mat-4", nota1: 4.1, nota2: 4.3, nota3: 4.0 },
          { materiaId: "mat-5", nota1: 2.3, nota2: 2.5, nota3: 2.4 },
          { materiaId: "mat-6", nota1: 3.7, nota2: 3.5, nota3: 3.8 }
        ]
      },
      {
        semestreNumero: 3,
        periodo: "2026-1",
        estado: "Disponible",
        notas: []
      }
    ]
  },
  {
    id: "est-2",
    nombre: "Ariana Andrade",
    correo: "ariana.andrade@unicomfacauca.edu.co",
    carreraId: "car-sis",
    foto: "",
    telefono: "3112233445",
    codigo: "202210519",
    semestresCursados: [
      {
        semestreNumero: 1,
        periodo: "2025-2",
        estado: "Aprobado",
        notas: [
          { materiaId: "mat-1", nota1: 4.5, nota2: 4.4, nota3: 4.6 },
          { materiaId: "mat-2", nota1: 4.0, nota2: 4.1, nota3: 4.2 },
          { materiaId: "mat-3", nota1: 4.7, nota2: 4.5, nota3: 4.8 }
        ]
      },
      {
        semestreNumero: 2,
        periodo: "2026-1",
        estado: "Disponible",
        notas: []
      }
    ]
  },
  {
    id: "est-3",
    nombre: "Carlos Mendoza",
    correo: "carlos.mendoza@unicomfacauca.edu.co",
    carreraId: "car-ind",
    foto: "",
    telefono: "3129988776",
    codigo: "202310104",
    semestresCursados: [
      {
        semestreNumero: 1,
        periodo: "2025-2",
        estado: "Aprobado",
        notas: [
          { materiaId: "mat-2", nota1: 3.9, nota2: 3.8, nota3: 4.0 },
          { materiaId: "mat-3", nota1: 4.2, nota2: 4.1, nota3: 4.3 },
          { materiaId: "mat-6", nota1: 3.5, nota2: 3.6, nota3: 3.7 }
        ]
      },
      {
        semestreNumero: 2,
        periodo: "2026-1",
        estado: "En curso",
        notas: [
          { materiaId: "mat-1", nota1: 4.0, nota2: 3.9, nota3: 0 },
          { materiaId: "mat-5", nota1: 3.8, nota2: 4.1, nota3: 0 }
        ]
      }
    ]
  }
];

export const MATRICULAS_INICIALES = [
  {
    id: "matr-1",
    estudianteId: "est-2",
    estudianteNombre: "Ariana Andrade",
    estudianteCorreo: "ariana.andrade@unicomfacauca.edu.co",
    carreraNombre: "Ingeniería en Sistemas",
    semestreNumero: 2,
    materias: [
      { id: "mat-4", titulo: "Estructuras de Datos", codigo: "SIS-201", creditos: 4 },
      { id: "mat-5", titulo: "Bases de Datos Relacionales", codigo: "SIS-202", creditos: 4 },
      { id: "mat-6", titulo: "Álgebra Lineal", codigo: "SIS-203", creditos: 3 }
    ],
    totalCreditos: 11,
    telefono: "3112233445",
    observaciones: "Solicitud de matrícula regular para el periodo 2026-1.",
    fecha: "2026-02-10T10:15:00.000Z",
    estado: "Pendiente"
  },
  {
    id: "matr-2",
    estudianteId: "est-3",
    estudianteNombre: "Carlos Mendoza",
    estudianteCorreo: "carlos.mendoza@unicomfacauca.edu.co",
    carreraNombre: "Ingeniería Industrial",
    semestreNumero: 2,
    materias: [
      { id: "mat-1", titulo: "Lógica y Algoritmos", codigo: "SIS-101", creditos: 4 },
      { id: "mat-5", titulo: "Bases de Datos Relacionales", codigo: "SIS-202", creditos: 4 }
    ],
    totalCreditos: 8,
    telefono: "3129988776",
    observaciones: "Matrícula aprobada por coordinación académica.",
    fecha: "2026-02-08T14:30:00.000Z",
    estado: "Aprobada"
  }
];

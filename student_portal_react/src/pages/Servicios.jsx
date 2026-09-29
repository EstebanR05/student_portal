import { useState } from "react";
import ServiceCard from "../components/ServiceCard";

function Servicios() {
  const listaServicios = [
    {
      id: 1,
      titulo: "Desarrollo de Aplicaciones Web",
      descripcion: "Construcción de interfaces interactivas y aplicaciones SPA con React y arquitecturas modernas.",
      docente: "Ing. Roberto Gómez",
      creditos: 3,
      estado: "aprobada",
      categoria: "Ingeniería de Software"
    },
    {
      id: 2,
      titulo: "Estructuras de Datos y Algoritmos",
      descripcion: "Análisis y diseño de algoritmos eficientes, árboles, grafos y estructuras avanzadas.",
      docente: "Dra. Elena Vargas",
      creditos: 4,
      estado: "aprobada",
      categoria: "Ciencias de la Computación"
    },
    {
      id: 3,
      titulo: "Bases de Datos Relacionales",
      descripcion: "Modelado relacional, optimización de consultas SQL y diseño de esquemas normalizados.",
      docente: "Ing. Mauricio Peña",
      creditos: 3,
      estado: "aprobada",
      categoria: "Gestión de Datos"
    },
    {
      id: 4,
      titulo: "Arquitectura de Software",
      descripcion: "Patrones de diseño, microservicios y principios de mantenibilidad y escalabilidad.",
      docente: "Mag. Fernando Ruiz",
      creditos: 3,
      estado: "pendiente",
      categoria: "Ingeniería de Software"
    },
    {
      id: 5,
      titulo: "Cálculo Integral",
      descripcion: "Fundamentos matemáticos aplicados al modelado de problemas computacionales y físicos.",
      docente: "Lic. Patricia Morales",
      creditos: 4,
      estado: "reprobada",
      categoria: "Ciencias Básicas"
    },
    {
      id: 6,
      titulo: "Sistemas Operativos y Redes",
      descripcion: "Gestión de procesos, memoria, concurrencia y protocolos de comunicación en red.",
      docente: "Ing. Gabriel Torres",
      creditos: 3,
      estado: "aprobada",
      categoria: "Infraestructura"
    }
  ];

  const [filtro, setFiltro] = useState("todos");

  const serviciosFiltrados = listaServicios.filter((item) => {
    if (filtro === "todos") return true;
    return item.estado === filtro;
  });

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>🛠️ Catálogo de Servicios y Asignaturas</h2>
        <p>
          Vista dinámica generada a partir de un componente reutilizable (<code>ServiceCard</code>) utilizando
          el método <code>.map()</code> y filtrado interactivo por estado:
        </p>

        <div className="filter-group">
          <span>Filtrar por estado:</span>
          <button
            type="button"
            className={`btn btn--outline ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}
          >
            Todos
          </button>
          <button
            type="button"
            className={`btn btn--outline ${filtro === "aprobada" ? "active" : ""}`}
            onClick={() => setFiltro("aprobada")}
          >
            Aprobadas
          </button>
          <button
            type="button"
            className={`btn btn--outline ${filtro === "pendiente" ? "active" : ""}`}
            onClick={() => setFiltro("pendiente")}
          >
            Pendientes
          </button>
          <button
            type="button"
            className={`btn btn--outline ${filtro === "reprobada" ? "active" : ""}`}
            onClick={() => setFiltro("reprobada")}
          >
            Reprobadas
          </button>
        </div>

        <div className="card-grid">
          {serviciosFiltrados.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              titulo={servicio.titulo}
              descripcion={servicio.descripcion}
              docente={servicio.docente}
              creditos={servicio.creditos}
              estado={servicio.estado}
              categoria={servicio.categoria}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Servicios;

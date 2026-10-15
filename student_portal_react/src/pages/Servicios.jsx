import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import { servicios } from "../data/servicios";
import ServiceCard from "../components/ServiceCard";

function Servicios() {
  const navigate = useNavigate();
  const {
    inscripciones,
    agregarInscripcion,
    eliminarInscripcion,
    vaciarInscripciones,
    cantidadInscripciones,
    totalCreditos
  } = useContext(FormularioContext);

  const [filtro, setFiltro] = useState("todos");

  const serviciosFiltrados = servicios.filter((item) => {
    if (filtro === "todos") return true;
    return item.estado === filtro;
  });

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>🛠️ Catálogo de Servicios y Asignaturas</h2>
        <p>
          Explora las materias disponibles y gestiónalas directamente en tu plan de matrícula.
          Las inscripciones forman parte del <strong>estado global (Context API)</strong> y se conservan automáticamente
          en el navegador mediante <code>localStorage</code> y <code>useEffect()</code>.
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
          {serviciosFiltrados.map((servicio) => {
            const estaInscrita = inscripciones.some((item) => item.id === servicio.id);
            return (
              <ServiceCard
                key={servicio.id}
                id={servicio.id}
                titulo={servicio.titulo}
                descripcion={servicio.descripcion}
                docente={servicio.docente}
                creditos={servicio.creditos}
                estado={servicio.estado}
                categoria={servicio.categoria}
                onInscribir={agregarInscripcion}
                estaInscrita={estaInscrita}
              />
            );
          })}
        </div>

        {/* Sección de Estado Global Persistente: Mi Matrícula */}
        <section className="card" style={{ marginTop: "3rem", padding: "1.75rem", background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <div>
              <p className="badge badge--pending" style={{ marginBottom: "0.25rem" }}>ESTADO GLOBAL PERSISTENTE</p>
              <h3 style={{ margin: 0, color: "var(--color-primary)", fontSize: "1.25rem" }}>
                📋 Mi Plan de Matrícula ({cantidadInscripciones} {cantidadInscripciones === 1 ? "asignatura" : "asignaturas"})
              </h3>
            </div>

            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={vaciarInscripciones}
              disabled={inscripciones.length === 0}
            >
              Vaciar Matrícula
            </button>
          </div>

          {inscripciones.length === 0 ? (
            <div className="empty-state" style={{ padding: "2rem 1rem", textAlign: "center" }}>
              <p style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)" }}>
                Aún no has inscrito materias en tu plan semestral.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Haz clic en el botón <strong>"➕ Matricular"</strong> de cualquier asignatura del catálogo superior para agregarla.
              </p>
            </div>
          ) : (
            <>
              <p className="table-hint">👉 Desliza horizontalmente para ver las columnas de la tabla</p>

              <div className="table-responsive" style={{ marginTop: "0.5rem" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Asignatura</th>
                      <th>Docente</th>
                      <th className="text-center">Créditos</th>
                      <th className="text-center">Estado</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscripciones.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.titulo}</strong></td>
                        <td>{item.docente || "Por asignar"}</td>
                        <td className="text-center">{item.creditos}</td>
                        <td className="text-center">
                          <span className={`badge ${item.estado === "aprobada" ? "badge--approved" : item.estado === "reprobada" ? "badge--failed" : "badge--pending"}`}>
                            {item.estado}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn--danger-subtle btn--sm"
                            onClick={() => eliminarInscripcion(item.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="matricula-summary">
                <div>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginRight: "1rem" }}>
                    Total Asignaturas: <strong>{cantidadInscripciones}</strong>
                  </span>
                  <span style={{ fontSize: "1rem", color: "var(--color-primary)" }}>
                    Total Créditos: <strong>{totalCreditos} Créditos</strong>
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => navigate("/contacto")}
                >
                  Continuar Trámite en Contacto →
                </button>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default Servicios;

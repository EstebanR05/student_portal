import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";

function Contacto() {
  const { usuario } = useAuth();
  const { solicitudes } = useContext(FormularioContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [toast, setToast] = useState(null);
  const esAdmin = usuario?.rol === "administrador";

  useEffect(() => {
    if (location.state?.toastMensaje) {
      setToast({
        mensaje: location.state.toastMensaje,
        tipo: "success"
      });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const cerrarToast = useCallback(() => setToast(null), []);

  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const estado = (sol.estado || "Radicada").toLowerCase();
    if (filtroEstado === "todas") return true;
    if (filtroEstado === "pendiente") return estado === "pendiente" || estado === "radicada";
    if (filtroEstado === "revision") return estado === "en revisión";
    if (filtroEstado === "respondida") return estado === "respondida";
    return true;
  });

  return (
    <main className="main-content page-enter">
      <section className="section-block">
        <div className="solicitudes-header">
          <div>
            <h2 style={{ marginBottom: "0.4rem" }}>
              {esAdmin ? "📩 Bandeja de Solicitudes Académicas" : "📩 Mis Solicitudes Académicas"}
            </h2>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              {esAdmin
                ? "Consulta las solicitudes enviadas por los estudiantes o radica un nuevo registro administrativo."
                : "Revisa el estado de tus solicitudes radicadas o crea una nueva para atención académica."}
            </p>
          </div>

          <Link to="/contacto/nueva" className="btn btn--primary" style={{ flexShrink: 0 }}>
            + Nueva solicitud
          </Link>
        </div>

        <div className="solicitudes-toolbar">
          <div className="filter-pills" role="group" aria-label="Filtrar solicitudes por estado">
            {[
              { id: "todas", label: `Todas (${solicitudes.length})` },
              { id: "pendiente", label: "Pendientes" },
              { id: "revision", label: "En revisión" },
              { id: "respondida", label: "Respondidas" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter-pill ${filtroEstado === tab.id ? "active" : ""}`}
                onClick={() => setFiltroEstado(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="solicitudes-count">
            Mostrando <strong>{solicitudesFiltradas.length}</strong> de {solicitudes.length}
          </span>
        </div>

        {solicitudesFiltradas.length > 0 ? (
          <div className="solicitudes-grid">
            {solicitudesFiltradas.map((sol) => {
              const estado = sol.estado || "Radicada";
              const badgeClass =
                estado === "Respondida"
                  ? "badge--approved"
                  : estado === "En revisión"
                    ? "badge--info"
                    : "badge--pending";

              return (
                <article key={sol.id} className="solicitud-card">
                  <div className="solicitud-card-top">
                    <h3 className="solicitud-card-title">{sol.asunto}</h3>
                    <span className={`badge ${badgeClass}`}>{estado}</span>
                  </div>

                  <p className="solicitud-card-msg">{sol.mensaje}</p>

                  <div className="solicitud-card-meta">
                    <div className="solicitud-meta-item">
                      <span>Solicitante</span>
                      <strong>{sol.estudiante || sol.nombre}</strong>
                    </div>
                    <div className="solicitud-meta-item">
                      <span>Correo</span>
                      <strong>{sol.correo}</strong>
                    </div>
                    <div className="solicitud-meta-item">
                      <span>Fecha</span>
                      <strong>{new Date(sol.fecha).toLocaleDateString("es-CO")}</strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" style={{ marginTop: "1.5rem" }}>
            <h3>No hay solicitudes en esta categoría</h3>
            <p>Prueba cambiando el filtro o radica una nueva solicitud académica.</p>
            <Link to="/contacto/nueva" className="btn btn--primary" style={{ marginTop: "0.75rem" }}>
              + Crear solicitud
            </Link>
          </div>
        )}
      </section>

      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} cerrar={cerrarToast} />}
    </main>
  );
}

export default Contacto;

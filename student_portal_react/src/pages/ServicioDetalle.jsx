import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

function ServicioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { catalogo, inscripciones, agregarInscripcion, eliminarInscripcion } = useContext(FormularioContext);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [toast, setToast] = useState(null);

  const servicio = catalogo.find((item) => item.id === Number(id));

  if (!servicio) {
    return (
      <main className="main-content page-enter">
        <section className="section-block not-found-container">
          <p className="not-found-code">404</p>
          <h2 className="not-found-title">Asignatura o Servicio no encontrado</h2>
          <p className="not-found-text">
            No existe ningún servicio o materia asociada al identificador <strong>{id}</strong>.
          </p>
          <button type="button" className="btn btn--primary" onClick={() => navigate("/servicios")}>
            Volver al Catálogo
          </button>
        </section>
      </main>
    );
  }

  const estaInscrita = inscripciones.some((item) => item.id === servicio.id);

  const badgeClase =
    servicio.estado === "aprobada"
      ? "badge--approved"
      : servicio.estado === "reprobada"
      ? "badge--failed"
      : "badge--pending";

  const manejarInscribir = () => {
    agregarInscripcion(servicio);
    setToast({
      mensaje: `Inscripción confirmada en "${servicio.titulo}".`,
      tipo: "success"
    });
  };

  const confirmarCancelacion = () => {
    eliminarInscripcion(servicio.id);
    setModalCancelar(false);
    setToast({
      mensaje: `Matrícula cancelada para "${servicio.titulo}".`,
      tipo: "warning"
    });
  };

  return (
    <main className="main-content page-enter">
      <section className="section-block">
        <div style={{ marginBottom: "1rem" }}>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </div>

        <div className="card detail-card">
          {servicio.imagen && (
            <div className="detail-media">
              <img src={servicio.imagen} alt={`Portada de ${servicio.titulo}`} className="detail-image" />
            </div>
          )}

          <div className="card__header">
            <div>
              <span className="badge badge--pending" style={{ marginBottom: "0.5rem" }}>
                {servicio.categoria}
              </span>
              <h1 className="card__title" style={{ fontSize: "1.75rem", marginTop: "0.25rem" }}>
                {servicio.titulo}
              </h1>
            </div>
            <span className={`badge ${badgeClase}`}>{servicio.estado}</span>
          </div>

          <div className="card__body">
            <p className="card__desc" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
              {servicio.descripcion}
            </p>

            <div className="card__meta-list" style={{ marginTop: "1.5rem" }}>
              <div className="card__meta-item">
                <span className="meta-label">Docente Responsable:</span>
                <span className="meta-value">{servicio.docente}</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Créditos Académicos:</span>
                <span className="meta-value">{servicio.creditos} Créditos</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Horario:</span>
                <span className="meta-value">{servicio.horario || "Por definir"}</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Aula / Ubicación:</span>
                <span className="meta-value">{servicio.aula || "Campus Principal"}</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Modalidad:</span>
                <span className="meta-value">{servicio.modalidad || "Presencial"}</span>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            {estaInscrita ? (
              <button
                type="button"
                className="btn btn--danger-subtle"
                onClick={() => setModalCancelar(true)}
              >
                ✕ Cancelar Matrícula de esta Materia
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary"
                onClick={manejarInscribir}
              >
                ➕ Inscribir en Mi Matrícula
              </button>
            )}

            <Link to="/servicios" className="btn btn--outline">
              Ver Catálogo Completo
            </Link>

            <Link to="/contacto" className="btn btn--outline">
              Radicar Consulta en Contacto
            </Link>
          </div>

          {estaInscrita && (
            <div className="alert-box alert-box--success" style={{ marginTop: "1.5rem" }}>
              ✅ Esta asignatura está incluida en tu matrícula actual y guardada en el estado global.
            </div>
          )}
        </div>
      </section>

      <Modal
        abierto={modalCancelar}
        cerrar={() => setModalCancelar(false)}
        titulo="Cancelar Matrícula"
      >
        <p>¿Deseas cancelar tu inscripción en <strong>{servicio.titulo}</strong>?</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.25rem" }}>
          <button type="button" className="btn btn--outline" onClick={() => setModalCancelar(false)}>
            Mantener
          </button>
          <button type="button" className="btn btn--danger-subtle" onClick={confirmarCancelacion}>
            Confirmar cancelación
          </button>
        </div>
      </Modal>

      {toast && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          cerrar={() => setToast(null)}
        />
      )}
    </main>
  );
}

export default ServicioDetalle;

import { Link } from "react-router-dom";

function ServiceCard({
  id,
  titulo,
  descripcion,
  docente,
  creditos,
  estado,
  categoria,
  onInscribir,
  estaInscrita = false
}) {
  const badgeClase =
    estado === "aprobada" || estado === "disponible"
      ? "badge--approved"
      : estado === "reprobada"
      ? "badge--failed"
      : "badge--pending";

  return (
    <article className="card">
      <div className="card__header">
        <h3 className="card__title">{titulo}</h3>
        {estado && <span className={`badge ${badgeClase}`}>{estado}</span>}
      </div>
      <div className="card__body">
        <p className="card__desc">{descripcion}</p>
        <div className="card__meta-list">
          {docente && (
            <div className="card__meta-item">
              <span className="meta-label">Responsable / Docente:</span>
              <span className="meta-value">{docente}</span>
            </div>
          )}
          {creditos && (
            <div className="card__meta-item">
              <span className="meta-label">Créditos:</span>
              <span className="meta-value">{creditos} Créditos</span>
            </div>
          )}
          {categoria && (
            <div className="card__meta-item">
              <span className="meta-label">Categoría:</span>
              <span className="meta-value">{categoria}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-actions" style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
        {id && (
          <Link to={`/servicios/${id}`} className="btn btn--outline btn--sm">
            Ver detalle
          </Link>
        )}

        {onInscribir && (
          estaInscrita ? (
            <button type="button" className="btn btn--outline btn--sm" disabled style={{ opacity: 0.8 }}>
              ✓ Matriculada
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => onInscribir({ id, titulo, docente, creditos, estado, categoria })}
            >
              ➕ Matricular
            </button>
          )
        )}
      </div>
    </article>
  );
}

export default ServiceCard;

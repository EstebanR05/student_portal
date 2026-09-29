function ServiceCard({ titulo, descripcion, docente, creditos, estado, categoria }) {
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
    </article>
  );
}

export default ServiceCard;

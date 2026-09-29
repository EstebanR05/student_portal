function InfoCard({ titulo, descripcion, items = [], destacado = false }) {
  return (
    <article className={`card ${destacado ? "card--accent" : ""}`}>
      <div className="card__header">
        <h3 className="card__title">{titulo}</h3>
      </div>
      <div className="card__body">
        {descripcion && <p className="card__desc">{descripcion}</p>}
        {items.length > 0 && (
          <div className="card__meta-list">
            {items.map((item, index) => (
              <div key={index} className="card__meta-item">
                <span className="meta-label">{item.label}:</span>
                <span className="meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default InfoCard;

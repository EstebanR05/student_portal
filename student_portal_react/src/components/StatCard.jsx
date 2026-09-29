function StatCard({ titulo, items, accent = false }) {
  return (
    <article className={`card ${accent ? "card--accent" : ""}`}>
      <div className="card__header">
        <h3 className="card__title">{titulo}</h3>
      </div>
      <div className="card__body">
        <div className="card__meta-list">
          {items && items.map((item, index) => (
            <div key={index} className="card__meta-item">
              <span className="meta-label">{item.label}</span>
              <span className="meta-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default StatCard;

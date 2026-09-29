function CourseCard({ id, nombre, docente, creditos, horario, estado, onEditar, onEliminar }) {
  const claseEstado = estado === "aprobada" ? "approved" : estado === "reprobada" ? "failed" : "pending";

  return (
    <article className="card">
      <div className="card__header">
        <h3 className="card__title">{nombre}</h3>
        <span className={`badge badge--${claseEstado}`}>{estado}</span>
      </div>
      <div className="card__body">
        <div className="card__meta-list">
          <div className="card__meta-item">
            <span className="meta-label">Docente</span>
            <span className="meta-value">{docente}</span>
          </div>
          <div className="card__meta-item">
            <span className="meta-label">Créditos</span>
            <span className="meta-value">{creditos} Créditos</span>
          </div>
          <div className="card__meta-item">
            <span className="meta-label">Horario</span>
            <span className="meta-value">{horario}</span>
          </div>
        </div>
      </div>
      <div className="acciones-asignatura">
        <button
          type="button"
          className="btn btn--sm btn--outline"
          onClick={() => onEditar(id)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn--sm btn--danger-subtle"
          onClick={() => onEliminar(id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default CourseCard;

import { Link } from "react-router-dom";

function ServiceCard({ id, nombre, descripcion }) {
  return (
    <article className="service-card">
      <span className="service-number">0{id}</span>
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <Link className="btn btn-secondary" to={`/servicios/${id}`}>
        Ver servicio
      </Link>
    </article>
  );
}

export default ServiceCard;

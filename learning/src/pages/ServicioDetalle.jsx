import { useNavigate, useParams } from "react-router-dom";

function ServicioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="detail-card">
      <span className="section-kicker">SERVICIO {id}</span>
      <h1>Detalle del servicio</h1>
      <p>Vista de ejemplo de una ruta dinámica.</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Volver
      </button>
    </section>
  );
}

export default ServicioDetalle;

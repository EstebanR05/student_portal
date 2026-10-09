import { Link } from "react-router-dom";

function Servicios() {
  const servicios = [
    "Soporte técnico",
    "Instalación de software",
    "Consultoría tecnológica"
  ];

  return (
    <section>
      <div className="page-intro">
        <span className="section-kicker">SERVICIOS</span>
        <h1>Nuestros servicios</h1>
      </div>

      <div className="services-grid">
        {servicios.map((servicio, index) => (
          <article className="service-card" key={servicio}>
            <span className="service-number">0{index + 1}</span>
            <h2>{servicio}</h2>
            <p>Servicio tecnológico disponible para nuestros clientes.</p>
            <Link
              className="btn btn-secondary"
              to={`/servicios/${index + 1}`}
            >
              Ver servicio
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Servicios;

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="main-content">
      <section className="section-block not-found-container">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Página no encontrada</h2>
        <p className="not-found-text">
          La ruta que intentas consultar no existe o ha sido movida dentro de la aplicación.
        </p>
        <Link to="/" className="btn btn--primary">
          Volver a la Página de Inicio
        </Link>
      </section>
    </main>
  );
}

export default NotFound;

import { Link } from "react-router-dom";
import ClienteActual from "../components/ClienteActual";

function Inicio() {
  return (
    <section className="page">
      <div className="hero card">
        <p className="eyebrow">SESIÓN 10</p>
        <h1>Persistencia de estado en React</h1>
        <p>
          En esta sesión aprenderemos a conservar el carrito mediante
          localStorage y a sincronizarlo con React usando useEffect().
        </p>

        <Link to="/productos" className="button">
          Explorar productos
        </Link>
      </div>

      <ClienteActual />

      <section className="concept-grid">
        <article className="card">
          <h2>Context API</h2>
          <p>Comparte el estado del carrito entre diferentes componentes.</p>
        </article>

        <article className="card">
          <h2>localStorage</h2>
          <p>Conserva el carrito en el navegador después de recargar.</p>
        </article>

        <article className="card">
          <h2>useEffect</h2>
          <p>Sincroniza el estado de React con el almacenamiento local.</p>
        </article>
      </section>
    </section>
  );
}

export default Inicio;

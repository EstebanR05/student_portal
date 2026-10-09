function Utilidades() {
  return (
    <section className="card">
      <span className="eyebrow blue">EMPRESA</span>
      <h1>Nosotros</h1>

      <p>
        TechStore es una aplicación didáctica para demostrar
        la organización de una aplicación React mediante
        componentes y rutas.
      </p>

      <div className="info-grid">
        <div>
          <h3>Componentes</h3>
          <p>Header, Navbar, Footer, ProductCard y ServiceCard.</p>
        </div>

        <div>
          <h3>Routing</h3>
          <p>Rutas estáticas, rutas dinámicas y navegación.</p>
        </div>

        <div>
          <h3>Interacción</h3>
          <p>Cálculo de totales y navegación después de comprar.</p>
        </div>
      </div>
    </section>
  );
}

export default Utilidades;
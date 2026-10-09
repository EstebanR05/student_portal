import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import NoEncontrado from "./pages/NoEncontrado";

function App() {
  return (
    <>
      <Header />

      <main className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;

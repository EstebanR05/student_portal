import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormulario } from "../context/FormularioContext";

function FeaturedCourseCarousel({ cursos: cursosProp }) {
  const { catalogo } = useFormulario();
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  const cursos = cursosProp || catalogo || [];

  useEffect(() => {
    if (pausado || cursos.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndice((actual) => (actual + 1) % cursos.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [pausado, cursos.length]);

  if (cursos.length === 0) return null;

  const indiceSeguro = indice < cursos.length ? indice : 0;
  const curso = cursos[indiceSeguro];

  const irAnterior = () => {
    setIndice((actual) => (actual - 1 + cursos.length) % cursos.length);
  };

  const irSiguiente = () => {
    setIndice((actual) => (actual + 1) % cursos.length);
  };

  const badgeClase =
    curso.estado === "aprobada" || curso.estado === "disponible"
      ? "badge--approved"
      : curso.estado === "reprobada"
      ? "badge--failed"
      : "badge--pending";

  return (
    <section className="carousel-container" aria-label="Asignaturas destacadas">
      <div className="carousel-header">
        <div>
          <span className="badge badge--pending">CATÁLOGO DESTACADO</span>
          <h3 className="carousel-heading">Asignaturas del Periodo</h3>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={irAnterior}
            aria-label="Curso anterior"
          >
            ◀ Anterior
          </button>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setPausado((prev) => !prev)}
            aria-pressed={pausado}
          >
            {pausado ? "▶ Reanudar" : "⏸ Pausar"}
          </button>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={irSiguiente}
            aria-label="Siguiente curso"
          >
            Siguiente ▶
          </button>
        </div>
      </div>

      <div key={curso.id} className="carousel-slide">
        <div className="carousel-media">
          {curso.imagen ? (
            <img
              src={curso.imagen}
              alt={`Portada de ${curso.titulo}`}
              className="carousel-image"
            />
          ) : (
            <div className="carousel-placeholder">
              <span className="carousel-placeholder-icon" aria-hidden="true">🎓</span>
              <span className="badge badge--pending">{curso.categoria || "Asignatura"}</span>
            </div>
          )}
        </div>

        <div className="carousel-info">
          <div className="carousel-title-row">
            <h4 className="carousel-title">{curso.titulo}</h4>
            {curso.estado && (
              <span className={`badge ${badgeClase}`}>{curso.estado}</span>
            )}
          </div>
          <p className="carousel-desc">{curso.descripcion}</p>
          <div className="carousel-meta">
            <span>👨‍🏫 {curso.docente}</span>
            <span>📚 {curso.creditos} Créditos</span>
            {curso.horario && <span>🕒 {curso.horario}</span>}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Link to={`/servicios/${curso.id}`} className="btn btn--primary btn--sm">
              Ver Detalle del Curso →
            </Link>
          </div>
        </div>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Seleccionar asignatura">
        {cursos.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className={`carousel-dot ${idx === indiceSeguro ? "carousel-dot--active" : ""}`}
            onClick={() => setIndice(idx)}
            aria-label={`Ir al curso ${idx + 1}: ${item.titulo}`}
            aria-current={idx === indiceSeguro ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCourseCarousel;

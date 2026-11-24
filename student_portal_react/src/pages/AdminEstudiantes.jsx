import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortal } from "../context/PortalContext";
import Dropdown from "../components/Dropdown";

function obtenerIniciales(nombre = "") {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "ES";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

function AdminEstudiantes() {
  const { estudiantes, carreras } = usePortal();
  const navigate = useNavigate();
  const [carreraFiltro, setCarreraFiltro] = useState("todas");

  const opcionesFiltro = [
    { value: "todas", label: "Todas las carreras" },
    ...carreras.map((c) => ({ value: c.id, label: c.nombre }))
  ];

  const estudiantesFiltrados =
    carreraFiltro === "todas"
      ? estudiantes
      : estudiantes.filter((e) => e.carreraId === carreraFiltro);

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>Estudiantes registrados</h2>
            <p style={{ marginTop: "0.25rem", color: "var(--text-muted)" }}>
              Selecciona un estudiante para consultar y editar sus calificaciones por semestre.
            </p>
          </div>
          <Dropdown
            label="Filtrar por carrera"
            opciones={opcionesFiltro}
            onSeleccionar={(op) => setCarreraFiltro(op.value)}
          />
        </div>

        <div className="card-grid" style={{ marginTop: "1.25rem" }}>
          {estudiantesFiltrados.map((est) => {
            const carrera = carreras.find((c) => c.id === est.carreraId);
            return (
              <article
                key={est.id}
                className="card clickable-card"
                onClick={() => navigate(`/admin/estudiantes/${est.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/admin/estudiantes/${est.id}`);
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                  <span className="student-card-avatar">
                    {est.foto ? (
                      <img src={est.foto} alt={est.nombre} className="student-card-avatar-img" />
                    ) : (
                      obtenerIniciales(est.nombre)
                    )}
                  </span>
                  <div>
                    <h3 className="card__title" style={{ margin: 0 }}>{est.nombre}</h3>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Código: {est.codigo}
                    </span>
                  </div>
                </div>

                <div className="card__meta-list" style={{ marginTop: "1rem" }}>
                  <div className="card__meta-item">
                    <span className="meta-label">Carrera</span>
                    <span className="meta-value">{carrera?.nombre || "Sin asignar"}</span>
                  </div>
                  <div className="card__meta-item">
                    <span className="meta-label">Correo</span>
                    <span className="meta-value">{est.correo}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default AdminEstudiantes;

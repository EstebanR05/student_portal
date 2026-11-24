import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePortal } from "../context/PortalContext";
import Toast from "../components/Toast";

function AdminCarreraDetalle() {
  const { carreraId } = useParams();
  const navigate = useNavigate();
  const {
    carreras,
    materias,
    agregarSemestreCarrera,
    eliminarSemestreCarrera,
    asignarMateriasSemestre
  } = usePortal();

  const [nuevoNumero, setNuevoNumero] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const carrera = carreras.find((c) => c.id === carreraId);

  if (!carrera) {
    return (
      <main className="main-content page-enter">
        <div className="alert-box alert-box--error">Carrera no encontrada.</div>
        <button
          type="button"
          className="btn btn--outline btn--sm"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/admin/carreras")}
        >
          ← Volver a carreras
        </button>
      </main>
    );
  }

  const manejarAgregarSemestre = (e) => {
    e.preventDefault();
    const num = Number(nuevoNumero);
    if (!Number.isInteger(num) || num < 1 || num > 12) {
      setToast({ mensaje: "Ingresa un número de semestre válido (1 a 12).", tipo: "error" });
      return;
    }
    if (carrera.semestres.some((s) => s.numero === num)) {
      setToast({ mensaje: `El Semestre ${num} ya existe en esta carrera.`, tipo: "warning" });
      return;
    }

    agregarSemestreCarrera(carrera.id, {
      numero: num,
      nombre: nuevoNombre.trim() || `Semestre ${num}`,
      materiaIds: []
    });
    setNuevoNumero("");
    setNuevoNombre("");
    setToast({ mensaje: `Semestre ${num} agregado.`, tipo: "success" });
  };

  const toggleMateriaEnSemestre = (semestre, materiaId) => {
    const existe = semestre.materiaIds.includes(materiaId);
    const nuevosIds = existe
      ? semestre.materiaIds.filter((id) => id !== materiaId)
      : [...semestre.materiaIds, materiaId];

    asignarMateriasSemestre(carrera.id, semestre.numero, nuevosIds);
    setToast({
      mensaje: `Plan de estudios del Semestre ${semestre.numero} actualizado.`,
      tipo: "success"
    });
  };

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>{carrera.nombre} ({carrera.codigo})</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
              Gestiona los semestres de la carrera y asigna las materias correspondientes.
            </p>
          </div>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => navigate("/admin/carreras")}
          >
            ← Volver a carreras
          </button>
        </div>

        <form
          onSubmit={manejarAgregarSemestre}
          className="card"
          style={{
            margin: "1.25rem 0 0",
            maxWidth: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "150px 1fr auto",
            gap: "1rem",
            alignItems: "end"
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="sem-num">N° Semestre</label>
            <input
              id="sem-num"
              type="number"
              min="1"
              max="12"
              value={nuevoNumero}
              onChange={(e) => setNuevoNumero(e.target.value)}
              placeholder="Ej. 4"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="sem-nom">Nombre del semestre</label>
            <input
              id="sem-nom"
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Ej. Semestre 4 - Profundización"
            />
          </div>
          <button type="submit" className="btn btn--primary" style={{ height: "42px" }}>
            + Agregar Semestre
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          {carrera.semestres.map((sem) => (
            <section key={sem.numero} className="card">
              <div className="card__header">
                <div>
                  <h3 className="card__title">{sem.nombre}</h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {sem.materiaIds.length} materia(s) asignada(s)
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn--danger-subtle btn--sm"
                  onClick={() => {
                    eliminarSemestreCarrera(carrera.id, sem.numero);
                    setToast({ mensaje: `Semestre ${sem.numero} eliminado.`, tipo: "warning" });
                  }}
                >
                  Eliminar semestre
                </button>
              </div>

              <div className="checkbox-grid" style={{ marginTop: "0.75rem" }}>
                {materias.map((mat) => {
                  const asignada = sem.materiaIds.includes(mat.id);
                  return (
                    <label
                      key={mat.id}
                      className={`checkbox-pill ${asignada ? "checkbox-pill--active" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={asignada}
                        onChange={() => toggleMateriaEnSemestre(sem, mat.id)}
                      />
                      <span>
                        <strong>{mat.codigo}</strong> · {mat.titulo} ({mat.creditos} cr.)
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "success" })}
      />
    </main>
  );
}

export default AdminCarreraDetalle;

import { useState } from "react";
import CourseCard from "../components/CourseCard";

function Asignaturas({ asignaturas, onCrearAsignatura, onActualizarAsignatura, onEliminarAsignatura }) {
  const [filtro, setFiltro] = useState("todos");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    docente: "",
    creditos: 3,
    horario: "",
    estado: "pendiente",
    notas: "4.0, 4.0, 4.0, 4.0, 4.0"
  });

  const asignaturasFiltradas = asignaturas.filter((materia) => {
    if (filtro === "todos") return true;
    return materia.estado === filtro;
  });

  const handleEditarClick = (id) => {
    const materia = asignaturas.find((m) => m.id === id);
    if (!materia) return;
    setEditandoId(materia.id);
    setForm({
      nombre: materia.nombre,
      docente: materia.docente,
      creditos: materia.creditos,
      horario: materia.horario,
      estado: materia.estado,
      notas: materia.notas.join(", ")
    });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setForm({
      nombre: "",
      docente: "",
      creditos: 3,
      horario: "",
      estado: "pendiente",
      notas: "4.0, 4.0, 4.0, 4.0, 4.0"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const notasArray = form.notas
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !Number.isNaN(n));

    if (notasArray.length !== 5 || notasArray.some((nota) => nota < 0 || nota > 5)) {
      alert("Por favor ingresa exactamente 5 notas válidas (0.0 a 5.0 separadas por coma).");
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      docente: form.docente.trim(),
      creditos: Number(form.creditos),
      horario: form.horario.trim(),
      estado: form.estado,
      notas: notasArray
    };

    if (editandoId) {
      onActualizarAsignatura(editandoId, payload);
    } else {
      onCrearAsignatura(payload);
    }

    handleCancelar();
  };

  return (
    <section>
      <h2>📚 Asignaturas Matriculadas</h2>

      <div className="filter-group">
        <span>Filtrar por estado:</span>
        <button
          type="button"
          className={`btn btn--outline ${filtro === "todos" ? "active" : ""}`}
          onClick={() => setFiltro("todos")}
        >
          Todas
        </button>
        <button
          type="button"
          className={`btn btn--outline ${filtro === "aprobada" ? "active" : ""}`}
          onClick={() => setFiltro("aprobada")}
        >
          Aprobadas
        </button>
        <button
          type="button"
          className={`btn btn--outline ${filtro === "pendiente" ? "active" : ""}`}
          onClick={() => setFiltro("pendiente")}
        >
          Pendientes
        </button>
        <button
          type="button"
          className={`btn btn--outline ${filtro === "reprobada" ? "active" : ""}`}
          onClick={() => setFiltro("reprobada")}
        >
          Reprobadas
        </button>
      </div>

      <div className="card-grid">
        {asignaturasFiltradas.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}>
            <p>No se encontraron asignaturas con el estado <strong>{filtro}</strong>.</p>
          </div>
        ) : (
          asignaturasFiltradas.map((materia) => (
            <CourseCard
              key={materia.id}
              id={materia.id}
              nombre={materia.nombre}
              docente={materia.docente}
              creditos={materia.creditos}
              horario={materia.horario}
              estado={materia.estado}
              onEditar={handleEditarClick}
              onEliminar={onEliminarAsignatura}
            />
          ))
        )}
      </div>

      <div className="form-section-card">
        <h3>{editandoId ? "Editar Asignatura" : "Agregar Nueva Asignatura"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Nombre de la Asignatura</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej. Desarrollo de Aplicaciones Web"
                required
              />
            </div>
            <div className="form-group">
              <label>Docente</label>
              <input
                type="text"
                value={form.docente}
                onChange={(e) => setForm({ ...form, docente: e.target.value })}
                placeholder="Ej. Ing. Roberto Gómez"
                required
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Créditos</label>
              <input
                type="number"
                min="1"
                max="10"
                value={form.creditos}
                onChange={(e) => setForm({ ...form, creditos: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Horario</label>
              <input
                type="text"
                value={form.horario}
                onChange={(e) => setForm({ ...form, horario: e.target.value })}
                placeholder="Ej. Lun. y Mié. 08:00 - 10:00"
                required
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
                required
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="reprobada">Reprobada</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>5 Calificaciones (separadas por comas, rango 0.0 - 5.0)</label>
            <input
              type="text"
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              placeholder="Ej. 4.5, 4.0, 3.8, 4.2, 4.6"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              {editandoId ? "Guardar Cambios" : "Guardar Asignatura"}
            </button>
            {editandoId && (
              <button type="button" className="btn btn--outline" onClick={handleCancelar}>
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Asignaturas;

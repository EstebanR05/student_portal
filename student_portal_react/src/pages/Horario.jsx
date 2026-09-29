import { useState } from "react";

function Horario({ horarios, asignaturas, onCrearHorario, onActualizarHorario, onEliminarHorario }) {
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    dia: "Lunes",
    hora: "",
    asignaturaId: asignaturas.length > 0 ? asignaturas[0].id : "",
    docente: ""
  });

  const handleEditarClick = (id) => {
    const item = horarios.find((h) => h.id === id);
    if (!item) return;
    setEditandoId(item.id);
    setForm({
      dia: item.dia,
      hora: item.hora,
      asignaturaId: item.asignaturaId,
      docente: item.docente
    });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setForm({
      dia: "Lunes",
      hora: "",
      asignaturaId: asignaturas.length > 0 ? asignaturas[0].id : "",
      docente: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.asignaturaId) {
      alert("Selecciona una asignatura válida.");
      return;
    }

    const payload = {
      dia: form.dia,
      hora: form.hora.trim(),
      asignaturaId: Number(form.asignaturaId),
      docente: form.docente.trim()
    };

    if (editandoId) {
      onActualizarHorario(editandoId, payload);
    } else {
      onCrearHorario(payload);
    }

    handleCancelar();
  };

  return (
    <section>
      <h2>📅 Horario Académico Semanal</h2>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora</th>
              <th>Asignatura</th>
              <th>Docente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center" style={{ padding: "2.5rem", color: "var(--text-muted)" }}>
                  No hay actividades registradas en el horario.
                </td>
              </tr>
            ) : (
              horarios.map((actividad) => {
                const materia = asignaturas.find((m) => m.id === actividad.asignaturaId);
                return (
                  <tr key={actividad.id}>
                    <td><strong>{actividad.dia}</strong></td>
                    <td>{actividad.hora}</td>
                    <td>{materia ? materia.nombre : "Asignatura no vinculada"}</td>
                    <td>{actividad.docente}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className="btn btn--outline btn--sm"
                          onClick={() => handleEditarClick(actividad.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn--danger-subtle btn--sm"
                          onClick={() => onEliminarHorario(actividad.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="form-section-card">
        <h3>{editandoId ? "Editar Actividad del Horario" : "Agregar Actividad al Horario"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Día</label>
              <select
                value={form.dia}
                onChange={(e) => setForm({ ...form, dia: e.target.value })}
                required
              >
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Franja Horaria</label>
              <input
                type="text"
                value={form.hora}
                onChange={(e) => setForm({ ...form, hora: e.target.value })}
                placeholder="Ej. 08:00 - 10:00"
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Asignatura</label>
              <select
                value={form.asignaturaId}
                onChange={(e) => setForm({ ...form, asignaturaId: e.target.value })}
                required
              >
                {asignaturas.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Docente a Cargo</label>
              <input
                type="text"
                value={form.docente}
                onChange={(e) => setForm({ ...form, docente: e.target.value })}
                placeholder="Ej. Ing. Roberto Gómez"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              {editandoId ? "Guardar Cambios" : "Guardar Horario"}
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

export default Horario;

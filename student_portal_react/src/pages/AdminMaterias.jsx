import { useState } from "react";
import { usePortal } from "../context/PortalContext";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const HORA_MINIMA = "07:00";
const HORA_MAXIMA = "22:00";

const HORAS_MILITARES = Array.from({ length: 16 }, (_, idx) => {
  const hh = String(7 + idx).padStart(2, "0");
  return `${hh}:00`;
});

const FORM_VACIO = {
  codigo: "",
  titulo: "",
  creditos: "3",
  docente: "",
  dias: ["Lunes"],
  horaInicio: "08:00",
  horaFin: "10:00",
  categoria: "Programación",
  descripcion: ""
};

function aMinutos(hora) {
  if (!hora || !/^\d{2}:\d{2}$/.test(hora)) return null;
  const [hh, mm] = hora.split(":").map(Number);
  return hh * 60 + mm;
}

function validarRangoHorario(dias, horaInicio, horaFin) {
  if (!dias || dias.length === 0) {
    return "Selecciona al menos un día entre Lunes y Viernes.";
  }

  const minPermitido = aMinutos(HORA_MINIMA);
  const maxPermitido = aMinutos(HORA_MAXIMA);
  const ini = aMinutos(horaInicio);
  const fin = aMinutos(horaFin);

  if (ini === null || fin === null) {
    return "Ingresa una hora de inicio y fin válidas en formato militar (HH:MM).";
  }
  if (ini < minPermitido || ini > maxPermitido) {
    return "La hora de inicio debe estar entre las 07:00 y las 22:00.";
  }
  if (fin < minPermitido || fin > maxPermitido) {
    return "La hora de fin debe estar entre las 07:00 y las 22:00.";
  }
  if (ini >= fin) {
    return "La hora de fin debe ser posterior a la hora de inicio.";
  }
  return "";
}

function parsearHorario(horario = "") {
  const diasDetectados = DIAS_SEMANA.filter((dia) =>
    horario.toLowerCase().includes(dia.toLowerCase())
  );
  const matchHoras = horario.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);

  return {
    dias: diasDetectados.length > 0 ? diasDetectados : ["Lunes"],
    horaInicio: matchHoras ? matchHoras[1] : "08:00",
    horaFin: matchHoras ? matchHoras[2] : "10:00"
  };
}

function formatearHorario(dias, horaInicio, horaFin) {
  const ordenados = DIAS_SEMANA.filter((d) => dias.includes(d));
  const textoDias =
    ordenados.length === 2
      ? `${ordenados[0]} y ${ordenados[1]}`
      : ordenados.join(", ");
  return `${textoDias} ${horaInicio} - ${horaFin}`;
}

function AdminMaterias() {
  const { materias, agregarMateria, actualizarMateria, eliminarMateria } = usePortal();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [errorHorario, setErrorHorario] = useState("");
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const abrirCrear = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
    setErrorHorario("");
    setModalAbierto(true);
  };

  const abrirEditar = (materia) => {
    const parsed = parsearHorario(materia.horario);
    setEditandoId(materia.id);
    setForm({
      codigo: materia.codigo,
      titulo: materia.titulo,
      creditos: String(materia.creditos),
      docente: materia.docente,
      dias: parsed.dias,
      horaInicio: parsed.horaInicio,
      horaFin: parsed.horaFin,
      categoria: materia.categoria || "Programación",
      descripcion: materia.descripcion || ""
    });
    setErrorHorario(validarRangoHorario(parsed.dias, parsed.horaInicio, parsed.horaFin));
    setModalAbierto(true);
  };

  const toggleDia = (dia) => {
    const nuevosDias = form.dias.includes(dia)
      ? form.dias.filter((d) => d !== dia)
      : [...form.dias, dia];
    setForm({ ...form, dias: nuevosDias });
    setErrorHorario(validarRangoHorario(nuevosDias, form.horaInicio, form.horaFin));
  };

  const cambiarHora = (campo, valor) => {
    const siguiente = { ...form, [campo]: valor };
    setForm(siguiente);
    setErrorHorario(validarRangoHorario(siguiente.dias, siguiente.horaInicio, siguiente.horaFin));
  };

  const manejarGuardar = (e) => {
    e.preventDefault();
    if (!form.codigo.trim() || !form.titulo.trim() || !form.docente.trim()) {
      setToast({
        mensaje: "Código, título y docente son obligatorios.",
        tipo: "error"
      });
      return;
    }

    const err = validarRangoHorario(form.dias, form.horaInicio, form.horaFin);
    if (err) {
      setErrorHorario(err);
      setToast({ mensaje: err, tipo: "warning" });
      return;
    }

    const payload = {
      codigo: form.codigo.trim().toUpperCase(),
      titulo: form.titulo.trim(),
      creditos: Number(form.creditos) || 3,
      docente: form.docente.trim(),
      horario: formatearHorario(form.dias, form.horaInicio, form.horaFin),
      categoria: form.categoria,
      descripcion: form.descripcion.trim() || "Asignatura del plan de estudios."
    };

    if (editandoId) {
      actualizarMateria(editandoId, payload);
      setToast({ mensaje: "Materia actualizada correctamente.", tipo: "success" });
    } else {
      agregarMateria(payload);
      setToast({ mensaje: "Materia creada correctamente.", tipo: "success" });
    }
    setModalAbierto(false);
  };

  const manejarEliminar = (materia) => {
    eliminarMateria(materia.id);
    setToast({ mensaje: `Materia "${materia.titulo}" eliminada.`, tipo: "warning" });
  };

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>Gestión de Materias</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
              Administra el catálogo oficial de asignaturas ({materias.length} registradas).
            </p>
          </div>
          <button type="button" className="btn btn--primary" onClick={abrirCrear}>
            + Nueva Materia
          </button>
        </div>

        <div className="table-responsive" style={{ marginTop: "1.25rem" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Asignatura</th>
                <th>Créditos</th>
                <th>Docente</th>
                <th>Horario</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((mat) => (
                <tr key={mat.id}>
                  <td className="font-bold">{mat.codigo}</td>
                  <td>{mat.titulo}</td>
                  <td>{mat.creditos}</td>
                  <td>{mat.docente}</td>
                  <td>{mat.horario}</td>
                  <td className="text-center">
                    <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        className="btn btn--outline btn--sm"
                        onClick={() => abrirEditar(mat)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn--danger-subtle btn--sm"
                        onClick={() => manejarEliminar(mat)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        titulo={editandoId ? "Editar Materia" : "Nueva Materia"}
      >
        <form onSubmit={manejarGuardar}>
          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="mat-codigo">Código</label>
              <input
                id="mat-codigo"
                type="text"
                value={form.codigo}
                onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                placeholder="Ej. SIS-401"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mat-creditos">Créditos</label>
              <input
                id="mat-creditos"
                type="number"
                min="1"
                max="10"
                value={form.creditos}
                onChange={(e) => setForm({ ...form, creditos: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mat-titulo">Nombre de la materia</label>
            <input
              id="mat-titulo"
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mat-docente">Docente</label>
            <input
              id="mat-docente"
              type="text"
              value={form.docente}
              onChange={(e) => setForm({ ...form, docente: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Días de clase (Lunes a Viernes)</label>
            <div className="filter-pills" style={{ marginTop: "0.35rem" }}>
              {DIAS_SEMANA.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  className={`filter-pill ${form.dias.includes(dia) ? "active" : ""}`}
                  onClick={() => toggleDia(dia)}
                >
                  {dia}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="mat-hora-inicio">Hora inicio (07:00 - 22:00)</label>
              <select
                id="mat-hora-inicio"
                value={form.horaInicio}
                onChange={(e) => cambiarHora("horaInicio", e.target.value)}
                required
              >
                {HORAS_MILITARES.slice(0, -1).map((hora) => (
                  <option key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mat-hora-fin">Hora fin (07:00 - 22:00)</label>
              <select
                id="mat-hora-fin"
                value={form.horaFin}
                onChange={(e) => cambiarHora("horaFin", e.target.value)}
                required
              >
                {HORAS_MILITARES.slice(1).map((hora) => (
                  <option key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errorHorario && (
            <p className="error" style={{ marginTop: "-0.35rem", marginBottom: "0.75rem" }}>
              {errorHorario}
            </p>
          )}

          <div className="form-group">
            <label htmlFor="mat-desc">Descripción</label>
            <textarea
              id="mat-desc"
              rows="2"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn--outline" onClick={() => setModalAbierto(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={Boolean(errorHorario)}>
              {editandoId ? "Guardar cambios" : "Crear materia"}
            </button>
          </div>
        </form>
      </Modal>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "success" })}
      />
    </main>
  );
}

export default AdminMaterias;

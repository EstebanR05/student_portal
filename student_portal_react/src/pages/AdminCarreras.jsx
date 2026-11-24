import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortal } from "../context/PortalContext";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const FORM_VACIO = {
  nombre: "",
  codigo: "",
  facultad: "Facultad de Ingeniería",
  descripcion: ""
};

function AdminCarreras() {
  const { carreras, agregarCarrera, actualizarCarrera, eliminarCarrera } = usePortal();
  const navigate = useNavigate();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const abrirCrear = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
    setModalAbierto(true);
  };

  const abrirEditar = (e, carrera) => {
    e.stopPropagation();
    setEditandoId(carrera.id);
    setForm({
      nombre: carrera.nombre,
      codigo: carrera.codigo,
      facultad: carrera.facultad,
      descripcion: carrera.descripcion
    });
    setModalAbierto(true);
  };

  const manejarEliminar = (e, carrera) => {
    e.stopPropagation();
    eliminarCarrera(carrera.id);
    setToast({ mensaje: `Carrera "${carrera.nombre}" eliminada.`, tipo: "warning" });
  };

  const manejarGuardar = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.codigo.trim()) {
      setToast({ mensaje: "Nombre y código de carrera son obligatorios.", tipo: "error" });
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      codigo: form.codigo.trim().toUpperCase(),
      facultad: form.facultad.trim() || "Facultad de Ingeniería",
      descripcion: form.descripcion.trim()
    };

    if (editandoId) {
      actualizarCarrera(editandoId, payload);
      setToast({ mensaje: "Carrera actualizada correctamente.", tipo: "success" });
    } else {
      agregarCarrera(payload);
      setToast({ mensaje: "Carrera creada correctamente.", tipo: "success" });
    }
    setModalAbierto(false);
  };

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>Gestión de Carreras</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
              Selecciona una carrera para configurar sus semestres y asignar materias.
            </p>
          </div>
          <button type="button" className="btn btn--primary" onClick={abrirCrear}>
            + Nueva Carrera
          </button>
        </div>

        <div className="card-grid" style={{ marginTop: "1.25rem" }}>
          {carreras.map((car) => (
            <article
              key={car.id}
              className="card clickable-card"
              onClick={() => navigate(`/admin/carreras/${car.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`/admin/carreras/${car.id}`);
                }
              }}
            >
              <div className="card__header">
                <h3 className="card__title">{car.nombre}</h3>
                <span className="badge badge--approved">{car.codigo}</span>
              </div>
              <p className="card__desc">{car.descripcion || car.facultad}</p>
              <div className="card__meta-list">
                <div className="card__meta-item">
                  <span className="meta-label">Facultad</span>
                  <span className="meta-value">{car.facultad}</span>
                </div>
                <div className="card__meta-item">
                  <span className="meta-label">Semestres configurados</span>
                  <span className="meta-value">{car.semestres.length}</span>
                </div>
              </div>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={(e) => abrirEditar(e, car)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn--danger-subtle btn--sm"
                  onClick={(e) => manejarEliminar(e, car)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        titulo={editandoId ? "Editar Carrera" : "Nueva Carrera"}
      >
        <form onSubmit={manejarGuardar}>
          <div className="form-group">
            <label htmlFor="car-nombre">Nombre de la carrera</label>
            <input
              id="car-nombre"
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-codigo">Código</label>
            <input
              id="car-codigo"
              type="text"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              placeholder="Ej. INGSIS"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-facultad">Facultad</label>
            <input
              id="car-facultad"
              type="text"
              value={form.facultad}
              onChange={(e) => setForm({ ...form, facultad: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-desc">Descripción</label>
            <textarea
              id="car-desc"
              rows="2"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn--outline" onClick={() => setModalAbierto(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              {editandoId ? "Guardar cambios" : "Crear carrera"}
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

export default AdminCarreras;

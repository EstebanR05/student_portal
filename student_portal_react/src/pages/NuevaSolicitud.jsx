import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";

function NuevaSolicitud() {
  const navigate = useNavigate();
  const {
    formulario,
    setFormulario,
    limpiarFormulario,
    inscripciones,
    totalCreditos,
    cantidadInscripciones,
    agregarSolicitud
  } = useContext(FormularioContext);

  const [errores, setErrores] = useState({});

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  }

  function validar() {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!formulario.correo.includes("@")) {
      nuevosErrores.correo = "Correo no válido";
    }

    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    }

    if (!formulario.asunto.trim()) {
      nuevosErrores.asunto = "El asunto es obligatorio";
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío";
    }

    return nuevosErrores;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const nuevosErrores = validar();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const asuntoGuardado = formulario.asunto.trim();
    setErrores({});

    agregarSolicitud({
      nombre: formulario.nombre.trim(),
      correo: formulario.correo.trim(),
      telefono: formulario.telefono.trim(),
      programa: formulario.programa.trim(),
      asunto: asuntoGuardado,
      mensaje: formulario.mensaje.trim()
    });

    setFormulario((actual) => ({
      ...actual,
      asunto: "",
      mensaje: ""
    }));

    navigate("/contacto", {
      state: {
        toastMensaje: `Solicitud "${asuntoGuardado}" radicada y guardada en tu historial.`
      }
    });
  }

  return (
    <main className="main-content page-enter">
      <section className="section-block">
        <div className="page-header-row">
          <div>
            <h2>📝 Nueva Solicitud Académica</h2>
            <p style={{ marginBottom: 0 }}>
              Completa el formulario para radicar una nueva solicitud. Al enviarla volverás al listado para verla registrada.
            </p>
          </div>
          <Link to="/contacto" className="btn btn--outline">
            ← Volver a solicitudes
          </Link>
        </div>

        <div className="contacto-layout" style={{ marginTop: "1.5rem" }}>
          <div>
            <form onSubmit={manejarEnvio} noValidate style={{ maxWidth: "100%", margin: 0 }}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ej. Esteban Restrepo"
                />
                {errores.nombre && <p className="error">{errores.nombre}</p>}
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="correo">Correo electrónico</label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    placeholder="usuario@academiq.edu.co"
                  />
                  {errores.correo && <p className="error">{errores.correo}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono de contacto</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    placeholder="Ej. 300 123 4567"
                  />
                  {errores.telefono && <p className="error">{errores.telefono}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="programa">Programa Académico</label>
                <input
                  id="programa"
                  name="programa"
                  type="text"
                  value={formulario.programa}
                  onChange={manejarCambio}
                  placeholder="Ej. Ingeniería en Sistemas"
                />
              </div>

              <div className="form-group">
                <label htmlFor="asunto">Asunto de la solicitud</label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  value={formulario.asunto}
                  onChange={manejarCambio}
                  placeholder="Ej. Certificado de notas o cruce de horario"
                />
                {errores.asunto && <p className="error">{errores.asunto}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje o detalle</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  placeholder="Describe brevemente tu solicitud académica..."
                />
                {errores.mensaje && <p className="error">{errores.mensaje}</p>}
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                <button type="submit" className="btn btn--primary">
                  Radicar Solicitud
                </button>
                <button type="button" className="btn btn--outline" onClick={limpiarFormulario}>
                  Limpiar campos
                </button>
              </div>
            </form>
          </div>

          <aside className="card card--accent">
            <div className="card__header">
              <h3 className="card__title">Resumen de Sesión</h3>
              <span className="badge badge--approved">Persistente</span>
            </div>
            <div className="card__body">
              <p className="card__desc">
                Los campos del borrador se guardan automáticamente en <code>localStorage</code> mientras escribes.
              </p>
              <div className="card__meta-list">
                <div className="card__meta-row">
                  <span>Materias en matrícula:</span>
                  <strong>{cantidadInscripciones}</strong>
                </div>
                <div className="card__meta-row">
                  <span>Créditos acumulados:</span>
                  <strong>{totalCreditos}</strong>
                </div>
              </div>

              {inscripciones.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Asignaturas seleccionadas:
                  </p>
                  <ul className="feature-list" style={{ paddingLeft: "1.1rem", margin: 0 }}>
                    {inscripciones.map((item) => (
                      <li key={item.id} style={{ fontSize: "0.84rem" }}>
                        {item.nombre} ({item.creditos} créd.)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default NuevaSolicitud;

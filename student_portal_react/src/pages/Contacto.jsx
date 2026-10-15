import { useContext, useState } from "react";
import { FormularioContext } from "../context/FormularioContext";

function Contacto() {
  const {
    formulario,
    setFormulario,
    limpiarFormulario,
    inscripciones,
    totalCreditos,
    cantidadInscripciones
  } = useContext(FormularioContext);

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
    setEnviado(false);
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

    setErrores({});
    setEnviado(true);
  }

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>📩 Formulario de Atención y Solicitudes Académicas</h2>
        <p>
          Los datos ingresados en este formulario pertenecen al <strong>Context API</strong> y se sincronizan
          automáticamente en <strong>localStorage</strong> mediante <code>useEffect()</code> para no perderse al recargar la página:
        </p>

        <div className="contacto-layout">
          {/* Formulario Principal */}
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
                  placeholder="Ej. Carlos Andrés Mendoza"
                />
                {errores.nombre && <p className="error">{errores.nombre}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="correo">Correo electrónico</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formulario.correo}
                  onChange={manejarCambio}
                  placeholder="ejemplo@universidad.edu.co"
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
                  placeholder="Ej. 3001234567"
                />
                {errores.telefono && <p className="error">{errores.telefono}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="programa">Programa académico</label>
                <input
                  id="programa"
                  name="programa"
                  type="text"
                  value={formulario.programa}
                  onChange={manejarCambio}
                  placeholder="Programa de estudio"
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
                  placeholder="Ej. Homologación de créditos o confirmación de matrícula"
                />
                {errores.asunto && <p className="error">{errores.asunto}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Descripción de la solicitud</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  placeholder="Escribe aquí los detalles de tu consulta..."
                  rows="4"
                ></textarea>
                {errores.mensaje && <p className="error">{errores.mensaje}</p>}
              </div>

              <div className="contacto-acciones">
                <button type="submit" className="btn btn--primary" style={{ flex: 1 }}>
                  Guardar y Enviar Solicitud
                </button>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={limpiarFormulario}
                >
                  Limpiar
                </button>
              </div>

              {enviado && (
                <div className="success-message">
                  <strong>¡Información enviada y persistida correctamente!</strong>
                  <p>
                    Estimado/a <strong>{formulario.nombre}</strong>, tu solicitud sobre "<em>{formulario.asunto}</em>" ha sido registrada.
                    Los datos fueron guardados en el estado global y persistidos en el almacenamiento local de tu navegador.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Panel Lateral de Resumen (Context API) */}
          <aside>
            <div className="card" style={{ height: "fit-content", background: "#f8fafc" }}>
              <div className="card__header">
                <h3 className="card__title">📋 Resumen de la Sesión</h3>
                <span className="badge badge--pending">Context API</span>
              </div>

              <div className="card__body">
                <div className="card__meta-list">
                  <div className="card__meta-item">
                    <span className="meta-label">Estudiante:</span>
                    <span className="meta-value">{formulario.nombre || "Sin registrar"}</span>
                  </div>
                  <div className="card__meta-item">
                    <span className="meta-label">Correo:</span>
                    <span className="meta-value">{formulario.correo || "Sin registrar"}</span>
                  </div>
                  <div className="card__meta-item">
                    <span className="meta-label">Teléfono:</span>
                    <span className="meta-value">{formulario.telefono || "Sin registrar"}</span>
                  </div>
                  <div className="card__meta-item">
                    <span className="meta-label">Programa:</span>
                    <span className="meta-value">{formulario.programa || "Sin registrar"}</span>
                  </div>
                </div>

                <div style={{ margin: "1.25rem 0", padding: "1rem", backgroundColor: "#ffffff", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "var(--color-primary)" }}>
                    Estado de Matrícula Activa
                  </h4>
                  <p style={{ margin: "0 0 0.35rem 0", fontSize: "0.9rem" }}>
                    Materias Seleccionadas: <strong>{cantidadInscripciones}</strong>
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    Créditos Totales: <strong>{totalCreditos} Créditos</strong>
                  </p>
                </div>

                <p className="card__desc" style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-muted)" }}>
                  💡 <em>Tip:</em> Gracias a <code>localStorage</code> y <code>useEffect()</code>, puedes recargar el navegador
                  y comprobar que la información se mantiene intacta.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Contacto;

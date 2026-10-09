import { useState } from "react";

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

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
        <h2>📩 Formulario de Atención y Contacto</h2>
        <p>
          Completa el siguiente formulario para radicar tus consultas, solicitudes de tutoría o soporte técnico:
        </p>

        <form onSubmit={manejarEnvio} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ingresa tu nombre completo"
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
              placeholder="tu.correo@universidad.edu.co"
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
            <label htmlFor="asunto">Asunto de la solicitud</label>
            <input
              id="asunto"
              name="asunto"
              type="text"
              value={formulario.asunto}
              onChange={manejarCambio}
              placeholder="Ej. Solicitud de tutoría académica"
            />
            {errores.asunto && <p className="error">{errores.asunto}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Descripción del mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formulario.mensaje}
              onChange={manejarCambio}
              placeholder="Describe detalladamente tu solicitud..."
            ></textarea>
            {errores.mensaje && <p className="error">{errores.mensaje}</p>}
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
            Enviar información
          </button>

          {enviado && (
            <div className="success-message">
              <strong>¡Información enviada correctamente!</strong>
              <p>Estimado/a {formulario.nombre}, tu mensaje sobre "{formulario.asunto}" ha sido registrado con éxito.</p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Contacto;

import { useState } from "react";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tipo: "",
    mensaje: ""
  });

  const [alerta, setAlerta] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.email.trim() || !form.tipo || !form.mensaje.trim()) {
      setAlerta({
        tipo: "error",
        mensaje: "⚠️ Por favor, completa todos los campos obligatorios."
      });
      return;
    }

    if (!form.email.includes("@") || !form.email.includes(".")) {
      setAlerta({
        tipo: "error",
        mensaje: "⚠️ Ingresa un correo electrónico con formato válido."
      });
      return;
    }

    setAlerta({
      tipo: "success",
      mensaje: `✅ ¡Solicitud recibida! Estimado/a ${form.nombre}, tu requerimiento de tipo "${form.tipo}" ha sido registrado correctamente.`
    });

    setForm({
      nombre: "",
      email: "",
      tipo: "",
      mensaje: ""
    });
  };

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>📩 Formulario de Contacto</h2>
        <p>
          Si tienes alguna duda o solicitud académica, completa los campos a continuación para ponerte en
          contacto con nosotros:
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo (*)</label>
            <input
              type="text"
              id="nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico (*)</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de Solicitud (*)</label>
            <select
              id="tipo"
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              required
            >
              <option value="">-- Selecciona una categoría --</option>
              <option value="Información Académica">Información Académica</option>
              <option value="Soporte de Plataforma">Soporte de Plataforma</option>
              <option value="Revisión de Calificaciones">Revisión de Calificaciones</option>
              <option value="Solicitud de Tutoría">Solicitud de Tutoría</option>
              <option value="Otra Consulta">Otra Consulta</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Descripción del Mensaje (*)</label>
            <textarea
              id="mensaje"
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              placeholder="Describe detalladamente el motivo de tu consulta..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
            Enviar Mensaje
          </button>

          {alerta && (
            <div className={`alert-box alert-box--${alerta.tipo}`}>
              {alerta.mensaje}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Contacto;

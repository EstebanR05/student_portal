import { useContext} from "react";
import { FormularioContext } from "../context/FormularioContext";

function FormularioContacto({ onSubmit, errores }) {
  const { formulario, setFormulario } = useContext(FormularioContext);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value
    }));
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h2>Datos del cliente</h2>
      <p>El estado del formulario pertenece al Context API.</p>

      <div className="form-group">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={manejarCambio}
          placeholder="Ej. Cesar Corchuelo"
        />
        {errores.nombre && <small className="error-text">{errores.nombre}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          placeholder="ejemplo@correo.com"
        />
        {errores.correo && <small className="error-text">{errores.correo}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          value={formulario.telefono}
          onChange={manejarCambio}
          placeholder="300 000 0000"
        />
        {errores.telefono && <small className="error-text">{errores.telefono}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Dirección</label>
        <textarea
          id="direccion"
          name="direccion"
          value={formulario.direccion}
          onChange={manejarCambio}
          placeholder="Dirección de entrega"
          rows="3"
        />
        {errores.direccion && <small className="error-text">{errores.direccion}</small>}
      </div>

      <button className="btn btn-primary" type="submit">
        Guardar datos
      </button>
    </form>
  );
}

export default FormularioContacto;

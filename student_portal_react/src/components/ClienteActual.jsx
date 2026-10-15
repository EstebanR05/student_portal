import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";

function ClienteActual() {
  const { formulario, cantidadInscripciones, totalCreditos } = useContext(FormularioContext);

  const tieneDatos = Boolean(formulario.nombre || formulario.correo || formulario.telefono);

  return (
    <section className="card client-card">
      <div className="card__header">
        <h3 className="card__title">🎓 Estudiante en Sesión (Estado Global)</h3>
        {tieneDatos && <span className="badge badge--approved">Activo</span>}
      </div>

      {tieneDatos ? (
        <div className="client-info">
          <p>
            <strong>Nombre:</strong> {formulario.nombre || "No registrado"}
          </p>
          <p>
            <strong>Correo:</strong> {formulario.correo || "No registrado"}
          </p>
          <p>
            <strong>Teléfono:</strong> {formulario.telefono || "No registrado"}
          </p>
          <p>
            <strong>Programa:</strong> {formulario.programa || "Ingeniería de Sistemas y Computación"}
          </p>
          <p>
            <strong>Asignaturas Matriculadas:</strong> {cantidadInscripciones} ({totalCreditos} créditos)
          </p>
        </div>
      ) : (
        <div className="empty-state">
          <p>No hay datos de estudiante registrados en el estado global.</p>
          <p className="text-muted" style={{ fontSize: "0.88rem", margin: "0.4rem 0 1rem 0" }}>
            Los datos que registres en el formulario de Contacto se compartirán automáticamente en toda la aplicación y se guardarán en el navegador.
          </p>
          <Link to="/contacto" className="btn btn--primary btn--sm">
            Registrar datos en Contacto
          </Link>
        </div>
      )}
    </section>
  );
}

export default ClienteActual;

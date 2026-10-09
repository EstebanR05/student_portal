import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

function ResumenFormulario() {
  const { formulario } = useContext(FormularioContext);

  return (
    <aside className="form-preview">
      <div className="section-heading">
        <span className="section-kicker">02 · CONTEXT</span>
        <h2>Estado compartido</h2>
        <p>
          Este componente obtiene los datos directamente desde el contexto.
        </p>
      </div>

      <div className="preview-card">
        <div className="preview-status">
          <span className="status-dot"></span>
          Actualización en tiempo real
        </div>

        {Object.entries(formulario).map(([campo, valor]) => (
          <div className="preview-item" key={campo}>
            <span>{campo}</span>
            <strong>{valor || "Sin ingresar"}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ResumenFormulario;

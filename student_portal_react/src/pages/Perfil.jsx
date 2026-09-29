import { useState } from "react";
import StatCard from "../components/StatCard";

function Perfil({ perfil, onActualizarPerfil }) {
  const [formData, setFormData] = useState({
    nombre: perfil.nombre,
    programa: perfil.programa,
    semestre: perfil.semestre,
    correo: perfil.correo
  });

  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "semestre" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onActualizarPerfil(formData);
    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3000);
  };

  const datosPerfil = [
    { label: "Nombre Completo", value: perfil.nombre },
    { label: "Código Estudiantil", value: perfil.codigo },
    { label: "Programa Académico", value: perfil.programa },
    { label: "Semestre", value: `${perfil.semestre}° Semestre Académico` },
    { label: "Correo Institucional", value: perfil.correo }
  ];

  return (
    <section>
      <h2>👤 Perfil del Estudiante</h2>
      <div className="card-grid">
        <StatCard titulo="Información Registrada" items={datosPerfil} />

        <article className="card">
          <div className="card__header">
            <h3 className="card__title">Editar Perfil</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="programa">Programa Académico</label>
              <input
                type="text"
                id="programa"
                name="programa"
                value={formData.programa}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="semestre">Semestre</label>
              <input
                type="number"
                id="semestre"
                name="semestre"
                min="1"
                max="12"
                value={formData.semestre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary">Guardar Cambios</button>
            {mensajeExito && (
              <div className="alert-box alert-box--success" style={{ display: "block" }}>
                ✅ Perfil actualizado correctamente.
              </div>
            )}
          </form>
        </article>
      </div>
    </section>
  );
}

export default Perfil;

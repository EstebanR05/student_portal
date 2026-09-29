import InfoCard from "../components/InfoCard";

function Inicio() {
  const datosEstudiante = [
    { label: "Estudiante", value: "Carlos Andrés Mendoza Silva" },
    { label: "Código", value: "EST-20242089" },
    { label: "Programa", value: "Ingeniería de Sistemas y Computación" }
  ];

  const datosAcademicos = [
    { label: "Semestre", value: "4° Semestre Académico" },
    { label: "Créditos Matriculados", value: "20 Créditos" },
    { label: "Estado", value: "Activo / Matriculado" }
  ];

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>🏠 Página de Inicio</h2>
        <p>
          Bienvenido al portal web institucional de <strong>Academiq Hub</strong>. Esta aplicación permite
          gestionar de forma centralizada la información académica, asignaturas y servicios estudiantiles.
        </p>

        <div className="card-grid">
          <InfoCard
            titulo="Datos del Estudiante"
            descripcion="Información institucional registrada para el periodo actual."
            items={datosEstudiante}
            destacado={true}
          />

          <InfoCard
            titulo="Resumen del Periodo"
            descripcion="Estado de matrícula y carga académica vigente."
            items={datosAcademicos}
            destacado={true}
          />
        </div>
      </section>
    </main>
  );
}

export default Inicio;

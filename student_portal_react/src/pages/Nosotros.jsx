import InfoCard from "../components/InfoCard";

function Nosotros() {
  const pilares = [
    { label: "Misión", value: "Formar líderes con excelencia técnica y compromiso social." },
    { label: "Visión", value: "Ser referente en innovación y educación tecnológica de calidad." },
    { label: "Valores", value: "Integridad, excelencia, innovación y colaboración." }
  ];

  const infoPlataforma = [
    { label: "Institución", value: "Academiq Hub University" },
    { label: "Plataforma", value: "Portal de Gestión Académica v2.0" },
    { label: "Soporte", value: "soporte@academiqhub.edu.co" }
  ];

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>👥 Acerca de Nosotros</h2>
        <p>
          En <strong>Academiq Hub</strong> estamos comprometidos con el desarrollo integral de los estudiantes,
          proporcionando herramientas digitales modernas para optimizar su experiencia universitaria.
        </p>

        <div className="card-grid">
          <InfoCard
            titulo="Nuestra Identidad Institucional"
            descripcion="Principios que guían nuestra labor académica."
            items={pilares}
          />

          <InfoCard
            titulo="Sobre la Plataforma"
            descripcion="Sistema centralizado de información académica para estudiantes y docentes."
            items={infoPlataforma}
          />
        </div>
      </section>
    </main>
  );
}

export default Nosotros;

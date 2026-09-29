import { useState } from "react";

function Calificaciones() {
  const calificacionesData = [
    { id: 1, materia: "Desarrollo de Aplicaciones Web", notas: [4.5, 4.0, 3.8, 4.2, 4.6] },
    { id: 2, materia: "Estructuras de Datos y Algoritmos", notas: [3.8, 4.0, 3.5, 4.5, 4.2] },
    { id: 3, materia: "Bases de Datos Relacionales", notas: [4.2, 4.5, 4.8, 3.9, 4.4] },
    { id: 4, materia: "Arquitectura de Software", notas: [3.5, 3.2, 4.0, 3.8, 3.5] },
    { id: 5, materia: "Cálculo Integral", notas: [2.0, 2.5, 2.8, 2.2, 2.4] },
    { id: 6, materia: "Sistemas Operativos y Redes", notas: [3.9, 4.1, 4.0, 3.7, 4.3] }
  ];

  const [promedioGeneral, setPromedioGeneral] = useState(null);

  const calcularPromedioNotas = (notas) => {
    const suma = notas.reduce((acc, curr) => acc + Number(curr), 0);
    return Number((suma / notas.length).toFixed(2));
  };

  const handleCalcularGeneral = () => {
    const promedios = calificacionesData.map((m) => calcularPromedioNotas(m.notas));
    const promedio = calcularPromedioNotas(promedios);
    setPromedioGeneral(promedio);
  };

  return (
    <main className="main-content">
      <section className="section-block">
        <h2>📊 Calificaciones y Rendimiento Académico</h2>
        <p>
          Consulta de notas registradas por asignatura, cálculo automático del promedio por materia y estado
          aprobatorio (mínimo 3.0):
        </p>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Asignatura</th>
                <th className="text-center">Nota 1</th>
                <th className="text-center">Nota 2</th>
                <th className="text-center">Nota 3</th>
                <th className="text-center">Nota 4</th>
                <th className="text-center">Nota 5</th>
                <th className="text-center">Promedio Final</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {calificacionesData.map((item) => {
                const prom = calcularPromedioNotas(item.notas);
                const aprobada = prom >= 3.0;
                return (
                  <tr key={item.id}>
                    <td className="font-bold">{item.materia}</td>
                    <td className="text-center">{item.notas[0].toFixed(1)}</td>
                    <td className="text-center">{item.notas[1].toFixed(1)}</td>
                    <td className="text-center">{item.notas[2].toFixed(1)}</td>
                    <td className="text-center">{item.notas[3].toFixed(1)}</td>
                    <td className="text-center">{item.notas[4].toFixed(1)}</td>
                    <td className="text-center font-bold" style={{ color: "var(--color-brand)" }}>
                      {prom.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${aprobada ? "badge--approved" : "badge--failed"}`}>
                        {aprobada ? "Aprobada" : "Reprobada"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="acciones-calificaciones">
          <button type="button" className="btn btn--primary" onClick={handleCalcularGeneral}>
            Calcular Promedio General del Semestre
          </button>
        </div>

        {promedioGeneral !== null && (
          <div className="summary-card">
            <h3>Promedio General del Semestre</h3>
            <div className="score">{promedioGeneral.toFixed(2)} / 5.0</div>
            <div
              className={`alert-box ${
                promedioGeneral >= 4.0
                  ? "alert-box--success"
                  : promedioGeneral >= 3.0
                  ? "alert-box--info"
                  : "alert-box--error"
              }`}
            >
              {promedioGeneral >= 4.0
                ? "🌟 ¡Excelente rendimiento académico! Tu promedio supera el estándar institucional."
                : promedioGeneral >= 3.0
                ? "👍 Rendimiento académico satisfactorio. Cumples con el valor mínimo aprobatorio de 3.0."
                : "⚠️ Rendimiento académico en riesgo. El promedio está por debajo del mínimo de 3.0."}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Calificaciones;

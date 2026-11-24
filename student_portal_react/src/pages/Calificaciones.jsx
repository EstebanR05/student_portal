import { useCallback, useState } from "react";
import { useFormulario } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";
import { obtenerMockUsuario } from "../data/usuariosMock";
import Toast from "../components/Toast";

function Calificaciones() {
  const { catalogo } = useFormulario();
  const { usuario } = useAuth();
  const [toast, setToast] = useState(null);

  const mockUsuario = obtenerMockUsuario(usuario?.id);
  const calificacionesIniciales = mockUsuario?.calificacionesIniciales || [];

  const calificacionesData = calificacionesIniciales
    .map((registro) => {
      const curso = catalogo.find((c) => c.id === registro.cursoId);
      if (!curso) return null;
      return {
        id: curso.id,
        materia: curso.titulo,
        notas: [
          Number(registro.nota1),
          Number(registro.nota2),
          Number(registro.nota3)
        ]
      };
    })
    .filter(Boolean);

  const calcularPromedioNotas = (notas) => {
    const suma = notas.reduce((acc, curr) => acc + Number(curr), 0);
    return Number((suma / notas.length).toFixed(2));
  };

  const promediosPorMateria = calificacionesData.map((m) => ({
    ...m,
    promedio: calcularPromedioNotas(m.notas)
  }));

  const aprobadas = promediosPorMateria.filter((m) => m.promedio >= 3.0).length;
  const reprobadas = promediosPorMateria.length - aprobadas;

  const promedioCalculado =
    promediosPorMateria.length > 0
      ? calcularPromedioNotas(promediosPorMateria.map((m) => m.promedio))
      : null;

  const [promedioGeneral, setPromedioGeneral] = useState(promedioCalculado);

  const handleCalcularGeneral = () => {
    if (promediosPorMateria.length === 0) return;
    setPromedioGeneral(promedioCalculado);
    setToast({
      mensaje: `Promedio general actualizado: ${promedioCalculado.toFixed(2)} / 5.0`,
      tipo: promedioCalculado >= 3.0 ? "success" : "warning"
    });
  };

  const cerrarToast = useCallback(() => setToast(null), []);

  return (
    <main className="main-content page-enter">
      <section className="section-block">
        <div className="solicitudes-header">
          <div>
            <h2 style={{ marginBottom: "0.35rem" }}>📊 Calificaciones y Rendimiento Académico</h2>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              Registro de notas para <strong>{usuario?.nombre}</strong> · Mínimo aprobatorio: <strong>3.0</strong>
            </p>
          </div>

          {calificacionesData.length > 0 && (
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleCalcularGeneral}
              style={{ flexShrink: 0 }}
            >
              Calcular Promedio General
            </button>
          )}
        </div>

        {calificacionesData.length === 0 ? (
          <div className="empty-state" style={{ padding: "2rem 1rem", textAlign: "center", marginTop: "1.25rem" }}>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              No hay calificaciones registradas para tu usuario en este periodo.
            </p>
          </div>
        ) : (
          <>
            <div className="calificaciones-kpi-strip">
              <div className="kpi-card kpi-card--blue">
                <span className="kpi-value">
                  {promedioGeneral !== null ? `${promedioGeneral.toFixed(2)} / 5.0` : "—"}
                </span>
                <span className="kpi-label">Promedio General</span>
              </div>
              <div className="kpi-card kpi-card--green">
                <span className="kpi-value">{aprobadas}</span>
                <span className="kpi-label">Asignaturas aprobadas</span>
              </div>
              <div className="kpi-card kpi-card--amber">
                <span className="kpi-value">{reprobadas}</span>
                <span className="kpi-label">Por recuperar</span>
              </div>
              <div className="kpi-card kpi-card--purple">
                <span className="kpi-value">
                  {promedioGeneral !== null
                    ? promedioGeneral >= 4.0
                      ? "Sobresaliente"
                      : promedioGeneral >= 3.0
                        ? "Satisfactorio"
                        : "En riesgo"
                    : "Pendiente"}
                </span>
                <span className="kpi-label">Estado del periodo</span>
              </div>
            </div>

            <div className="table-responsive grades-table-compact" style={{ marginTop: "1.1rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>Asignatura</th>
                    <th className="text-center">Nota 1</th>
                    <th className="text-center">Nota 2</th>
                    <th className="text-center">Nota 3</th>
                    <th className="text-center">Promedio Final</th>
                    <th className="text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {promediosPorMateria.map((item) => {
                    const aprobada = item.promedio >= 3.0;
                    return (
                      <tr key={item.id}>
                        <td className="font-bold">{item.materia}</td>
                        <td className="text-center">{item.notas[0].toFixed(1)}</td>
                        <td className="text-center">{item.notas[1].toFixed(1)}</td>
                        <td className="text-center">{item.notas[2].toFixed(1)}</td>
                        <td className="text-center font-bold" style={{ color: "var(--color-brand)" }}>
                          {item.promedio.toFixed(2)}
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
          </>
        )}
      </section>

      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} cerrar={cerrarToast} />}
    </main>
  );
}

export default Calificaciones;

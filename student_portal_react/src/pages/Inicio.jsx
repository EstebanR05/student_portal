import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";
import FeaturedCourseCarousel from "../components/FeaturedCourseCarousel";

const PROXIMOS_EVENTOS = [
  { dia: "Lun 24", titulo: "Inicio de clases", detalle: "Apertura oficial del semestre académico" },
  { dia: "Mié 26", titulo: "Revisión de solicitudes", detalle: "Comité de programa y homologaciones" },
  { dia: "Vie 28", titulo: "Cierre de registro", detalle: "Fecha límite de matrícula y ajustes" }
];

function Inicio() {
  const { usuario } = useAuth();
  const {
    catalogo,
    solicitudes,
    totalCreditos,
    cantidadInscripciones
  } = useContext(FormularioContext);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMensajeVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const esAdmin = usuario?.rol === "administrador";
  const nombreUsuario = usuario?.nombre || "Usuario";

  const accesosRapidos = esAdmin
    ? [
        {
          to: "/servicios/nuevo",
          titulo: "Nuevo curso",
          desc: "Publicar asignatura en el catálogo",
          tono: "blue",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          )
        },
        {
          to: "/servicios",
          titulo: "Gestionar catálogo",
          desc: "Revisar cursos y cupos activos",
          tono: "indigo",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        },
        {
          to: "/recursos",
          titulo: "Recursos UI",
          desc: "Componentes y guías interactivas",
          tono: "emerald",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          )
        },
        {
          to: "/calificaciones",
          titulo: "Calificaciones",
          desc: "Consolidado de rendimiento",
          tono: "amber",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          )
        }
      ]
    : [
        {
          to: "/servicios",
          titulo: "Matricular materias",
          desc: "Explora el catálogo del periodo",
          tono: "blue",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        },
        {
          to: "/calificaciones",
          titulo: "Mis calificaciones",
          desc: "Consulta notas y promedio",
          tono: "emerald",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          )
        },
        {
          to: "/recursos",
          titulo: "Recursos UI",
          desc: "Herramientas y guías de apoyo",
          tono: "indigo",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          )
        },
        {
          to: "/contacto",
          titulo: "Enviar solicitud",
          desc: "Radica trámites académicos",
          tono: "amber",
          icono: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ];

  const notificaciones = [
    ...(solicitudes || []).slice(0, 3).map((sol) => ({
      id: sol.id,
      titulo: sol.asunto,
      detalle: `${sol.estado || "Registrada"} · ${sol.estudiante || sol.nombre || "Portal"}`,
      tipo: sol.estado === "Respondida" ? "ok" : "pending"
    })),
    {
      id: "sys-update",
      titulo: esAdmin ? "Panel de gestión activo" : "Matrícula semestral habilitada",
      detalle: esAdmin
        ? `${catalogo.length} asignaturas publicadas en el catálogo`
        : `${totalCreditos} créditos inscritos actualmente`,
      tipo: "info"
    }
  ];

  return (
    <main className="main-content page-enter">
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <section className="dashboard-hero">
            <div className="dashboard-hero-copy">
              <span className="dashboard-hero-eyebrow">
                ¡BIENVENIDO, {nombreUsuario.toUpperCase()}!
              </span>
              <h1 className="dashboard-hero-title">Academiq Hub</h1>
              <p className="dashboard-hero-subtitle">
                Plataforma académica y de servicios estudiantiles · {usuario?.programa || "Ingeniería en Sistemas"}
              </p>

              <div className={`animated-message dashboard-notice ${mensajeVisible ? "is-visible" : ""}`}>
                <span>
                  ✨ <strong>{esAdmin ? "Gestión Activa:" : "Periodo Activo:"}</strong>{" "}
                  {esAdmin
                    ? `${catalogo.length} asignaturas publicadas y ${solicitudes.length} solicitudes registradas.`
                    : `Tienes ${cantidadInscripciones} materias (${totalCreditos} créditos) en matrícula.`}
                </span>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => setMensajeVisible((prev) => !prev)}
                >
                  {mensajeVisible ? "Ocultar aviso" : "Mostrar aviso"}
                </button>
              </div>
            </div>

            <div className="dashboard-hero-art" aria-hidden="true">
              <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
                <rect x="28" y="34" width="132" height="84" rx="10" fill="#ffffff" stroke="#93c5fd" strokeWidth="2.5" />
                <rect x="40" y="46" width="108" height="54" rx="6" fill="#eff6ff" />
                <rect x="52" y="58" width="52" height="8" rx="4" fill="#2563eb" />
                <rect x="52" y="72" width="84" height="6" rx="3" fill="#93c5fd" />
                <rect x="52" y="84" width="66" height="6" rx="3" fill="#bfdbfe" />
                <path d="M78 118h32l6 14H72l6-14z" fill="#bfdbfe" />
                <rect x="60" y="132" width="68" height="6" rx="3" fill="#2563eb" />
                <g transform="translate(132, 16)">
                  <path d="M36 6L6 20l30 14 30-14-30-14z" fill="#0f172a" />
                  <path d="M16 25v14c0 6 9 11 20 11s20-5 20-11V25l-20 9-20-9z" fill="#1e293b" />
                  <line x1="62" y1="22" x2="62" y2="42" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="62" cy="44" r="3.5" fill="#2563eb" />
                </g>
                <g transform="translate(136, 94)">
                  <rect x="0" y="0" width="64" height="44" rx="7" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <line x1="12" y1="14" x2="52" y2="14" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
                  <line x1="12" y1="24" x2="42" y2="24" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="48" cy="32" r="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
                </g>
              </svg>
            </div>
          </section>

          <section className="kpi-grid" aria-label="Indicadores principales">
            <article className="kpi-card kpi-card--blue">
              <span className="kpi-label">Asignaturas activas</span>
              <strong className="kpi-value">{catalogo.length}</strong>
              <span className="kpi-meta">Catálogo disponible</span>
            </article>

            <article className="kpi-card kpi-card--amber">
              <span className="kpi-label">Solicitudes registradas</span>
              <strong className="kpi-value">{solicitudes.length}</strong>
              <span className="kpi-meta">Gestión de trámites</span>
            </article>

            <article className="kpi-card kpi-card--green">
              <span className="kpi-label">Materias matriculadas</span>
              <strong className="kpi-value">{cantidadInscripciones}</strong>
              <span className="kpi-meta">{totalCreditos} créditos inscritos</span>
            </article>

            <article className="kpi-card kpi-card--lavender">
              <span className="kpi-label">{esAdmin ? "Nivel de acceso" : "Semestre actual"}</span>
              <strong className="kpi-value kpi-value--text">
                {usuario?.semestre || (esAdmin ? "Administrador" : "7° Semestre")}
              </strong>
              <span className="kpi-meta">{usuario?.codigo || "UNICOMFACAUCA"}</span>
            </article>
          </section>

          <section className="dashboard-section">
            <div className="dashboard-section-head">
              <h2>Accesos rápidos</h2>
            </div>
            <div className="quick-actions-grid">
              {accesosRapidos.map((accion) => (
                <Link key={accion.to + accion.titulo} to={accion.to} className="quick-action-card">
                  <span className={`quick-action-icon quick-action-icon--${accion.tono}`}>
                    {accion.icono}
                  </span>
                  <div>
                    <strong className="quick-action-title">{accion.titulo}</strong>
                    <span className="quick-action-desc">{accion.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="dashboard-section-head">
              <h2>Asignaturas destacadas</h2>
              <Link to="/servicios" className="dashboard-link">
                Ver todas →
              </Link>
            </div>
            <FeaturedCourseCarousel cursos={catalogo} />
          </section>
        </div>

        <aside className="dashboard-rail" aria-label="Resumen lateral">
          <section className="rail-card">
            <div className="rail-card-head">
              <h3>Notificaciones</h3>
              <span className="badge badge--pending">{notificaciones.length}</span>
            </div>
            <div className="notif-list">
              {notificaciones.map((item) => (
                <div key={item.id} className="notif-item">
                  <span className={`notif-status notif-status--${item.tipo}`} aria-hidden="true">
                    {item.tipo === "ok" ? "✓" : item.tipo === "pending" ? "!" : "i"}
                  </span>
                  <div className="notif-content">
                    <strong>{item.titulo}</strong>
                    <span>{item.detalle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rail-card">
            <div className="rail-card-head">
              <h3>Próximos eventos</h3>
              <span className="rail-card-tag">Calendario</span>
            </div>
            <div className="event-list">
              {PROXIMOS_EVENTOS.map((ev) => (
                <div key={ev.dia} className="event-item">
                  <span className="event-date">{ev.dia}</span>
                  <div className="event-content">
                    <strong>{ev.titulo}</strong>
                    <span>{ev.detalle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default Inicio;

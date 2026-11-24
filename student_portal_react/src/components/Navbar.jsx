import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import Modal from "./Modal";
import Accordion from "./Accordion";
import Footer from "./Footer";

const FAQS_INSTITUCIONALES = [
  {
    pregunta: "¿Cómo funciona el límite de créditos por semestre?",
    respuesta:
      "El límite estándar de créditos por semestre lo define la Dirección Académica en Configuraciones (por defecto 24 créditos). No podrás inscribir asignaturas que superen ese tope."
  },
  {
    pregunta: "¿Cuál es la nota mínima aprobatoria?",
    respuesta:
      "Cada asignatura se evalúa con tres cortes académicos. El promedio final igual o superior a 3.0 se considera aprobado (Gana); inferior a 3.0 se considera reprobado (Pierde)."
  },
  {
    pregunta: "¿Cómo matriculo una materia que perdí anteriormente?",
    respuesta:
      "Al iniciar la matrícula de tu próximo semestre disponible, encontrarás la pestaña 'Materias Quedadas / Reprobadas' para incluirlas junto con las materias regulares."
  },
  {
    pregunta: "¿Quién aprueba las solicitudes de matrícula?",
    respuesta:
      "Las solicitudes enviadas pasan a estado Pendiente y son revisadas por el Administrador Académico, quien las aprueba o rechaza desde el módulo de Matrículas."
  }
];

function obtenerIniciales(nombre = "") {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "AH";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

function Navbar({ children }) {
  const { usuario, cerrarSesion } = useAuth();
  const { matriculas, estudiantes } = usePortal();
  const location = useLocation();
  const enMatricular = location.pathname.startsWith("/matricular");
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [userMenuAbierto, setUserMenuAbierto] = useState(false);
  const [notifAbierto, setNotifAbierto] = useState(false);
  const [nosotrosAbierto, setNosotrosAbierto] = useState(false);
  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const notifMenuRef = useRef(null);

  const cerrarSidebar = () => setSidebarAbierto(false);

  const manejarCerrarSesion = () => {
    cerrarSesion();
    setSidebarAbierto(false);
    setUserMenuAbierto(false);
    setNotifAbierto(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const manejarClickAfuera = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuAbierto(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setNotifAbierto(false);
      }
    };

    const manejarEscape = (event) => {
      if (event.key === "Escape") {
        setUserMenuAbierto(false);
        setNotifAbierto(false);
        setSidebarAbierto(false);
      }
    };

    document.addEventListener("mousedown", manejarClickAfuera);
    document.addEventListener("keydown", manejarEscape);
    return () => {
      document.removeEventListener("mousedown", manejarClickAfuera);
      document.removeEventListener("keydown", manejarEscape);
    };
  }, []);

  const esAdmin = usuario?.rol === "administrador";
  const estudianteActual = !esAdmin
    ? estudiantes.find((e) => e.id === usuario?.id)
    : null;
  const nombreVisible = estudianteActual?.nombre || usuario?.nombre || "Usuario";
  const correoVisible = estudianteActual?.correo || usuario?.correo || "";
  const iniciales = obtenerIniciales(nombreVisible);

  const notificacionesLista = esAdmin
    ? matriculas.filter((m) => m.estado === "Pendiente").slice(0, 4)
    : matriculas.filter((m) => m.estudianteId === usuario?.id).slice(0, 4);

  const pendientesAdminCount = matriculas.filter((m) => m.estado === "Pendiente").length;

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="topbar-menu-btn"
            onClick={() => setSidebarAbierto((prev) => !prev)}
            aria-label={sidebarAbierto ? "Cerrar menú lateral" : "Abrir menú lateral"}
            aria-expanded={sidebarAbierto}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {sidebarAbierto ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <NavLink to="/" className="topbar-brand" onClick={cerrarSidebar}>
            <span className="topbar-brand-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
            <span className="topbar-brand-text">Academiq Hub</span>
          </NavLink>
        </div>

        <div className="topbar-right">
          <div className="topbar-dropdown-wrap" ref={notifMenuRef}>
            <button
              type="button"
              className="topbar-icon-btn"
              onClick={() => {
                setNotifAbierto((prev) => !prev);
                setUserMenuAbierto(false);
              }}
              aria-label="Notificaciones"
              aria-expanded={notifAbierto}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {notificacionesLista.length > 0 && (
                <span className="topbar-notif-dot" aria-hidden="true" />
              )}
            </button>

            {notifAbierto && (
              <div className="topbar-dropdown topbar-notif-dropdown" role="menu">
                <div className="topbar-dropdown-header">
                  <span>Notificaciones</span>
                  <span className="badge badge--pending">{notificacionesLista.length}</span>
                </div>
                <div className="topbar-notif-list">
                  {notificacionesLista.length > 0 ? (
                    notificacionesLista.map((sol) => (
                      <div key={sol.id} className="topbar-notif-item">
                        <strong>
                          {esAdmin
                            ? `Matrícula: ${sol.estudianteNombre}`
                            : `Matrícula Semestre ${sol.semestreNumero}`}
                        </strong>
                        <span>
                          Estado: {sol.estado} · {sol.totalCreditos} créditos
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="topbar-notif-item">
                      <strong>Sistema operativo</strong>
                      <span>Sin novedades académicas pendientes.</span>
                    </div>
                  )}
                </div>
                <div className="topbar-dropdown-footer">
                  <NavLink
                    to={esAdmin ? "/admin/matriculas" : "/semestres"}
                    className="topbar-dropdown-link"
                    onClick={() => setNotifAbierto(false)}
                  >
                    {esAdmin ? "Revisar Matrículas →" : "Ver Semestres →"}
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="topbar-icon-btn"
            onClick={() => {
              setNosotrosAbierto(true);
              setNotifAbierto(false);
              setUserMenuAbierto(false);
            }}
            aria-label="Nosotros e información institucional"
            title="Nosotros"
          >
            <span style={{ fontWeight: 800, fontSize: "1rem", lineHeight: 1 }}>!</span>
          </button>

          <span className="topbar-divider" aria-hidden="true" />

          <span className="topbar-inst-badge">🏛 UNICOMFACAUCA</span>

          <div className="topbar-dropdown-wrap" ref={userMenuRef}>
            <button
              type="button"
              className="topbar-user-btn"
              onClick={() => {
                setUserMenuAbierto((prev) => !prev);
                setNotifAbierto(false);
              }}
              aria-expanded={userMenuAbierto}
              aria-haspopup="menu"
            >
              <span className="user-avatar" aria-hidden="true">
                {estudianteActual?.foto ? (
                  <img
                    src={estudianteActual.foto}
                    alt={nombreVisible}
                    className="user-avatar-img"
                  />
                ) : (
                  iniciales
                )}
              </span>
              <span className="topbar-user-meta">
                <span className="topbar-user-name">{nombreVisible}</span>
                <span className="topbar-user-role">
                  {esAdmin ? "Administrador" : "Estudiante"}
                </span>
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {userMenuAbierto && (
              <div className="topbar-dropdown topbar-user-dropdown" role="menu">
                <div className="topbar-user-summary">
                  <strong>{nombreVisible}</strong>
                  <span>{correoVisible}</span>
                  <span className="badge badge--approved" style={{ marginTop: "0.35rem", alignSelf: "flex-start" }}>
                    {esAdmin ? "Administrador" : "Estudiante"}
                  </span>
                </div>
                {!esAdmin && (
                  <button
                    type="button"
                    className="topbar-menu-action"
                    onClick={() => {
                      setUserMenuAbierto(false);
                      navigate("/perfil");
                    }}
                  >
                    Configuración de perfil
                  </button>
                )}
                <button
                  type="button"
                  className="topbar-logout-action"
                  onClick={manejarCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="app-body">
        {sidebarAbierto && (
          <div
            className="sidebar-backdrop"
            onClick={cerrarSidebar}
            aria-hidden="true"
          />
        )}

        <aside
          className={`app-sidebar ${sidebarAbierto ? "app-sidebar--open" : ""}`}
          aria-label="Navegación principal"
        >
          <div className="sidebar-section">
            <span className="sidebar-heading">
              {esAdmin ? "ADMINISTRACIÓN" : "PORTAL ESTUDIANTIL"}
            </span>
            <nav className="sidebar-nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={cerrarSidebar}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Inicio</span>
              </NavLink>

              {!esAdmin ? (
                <>
                  <NavLink
                    to="/semestres"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span>Semestres cursados</span>
                  </NavLink>

                  {enMatricular ? (
                    <span className="sidebar-link active" aria-current="page">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Matricular</span>
                    </span>
                  ) : (
                    <span
                      className="sidebar-link sidebar-link--disabled"
                      aria-disabled="true"
                      title="Se activa al seleccionar Matricular desde Semestres cursados"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Matricular</span>
                      <span className="sidebar-lock-tag" aria-hidden="true">🔒</span>
                    </span>
                  )}

                  <NavLink
                    to="/perfil"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Configuración de perfil</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/admin/configuraciones"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span>Configuraciones</span>
                  </NavLink>

                  <NavLink
                    to="/admin/materias"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span>Materias</span>
                  </NavLink>

                  <NavLink
                    to="/admin/carreras"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>Carreras</span>
                  </NavLink>

                  <NavLink
                    to="/admin/estudiantes"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>Estudiantes</span>
                  </NavLink>

                  <NavLink
                    to="/admin/matriculas"
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    onClick={cerrarSidebar}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span>Matrículas</span>
                    {pendientesAdminCount > 0 && (
                      <span className="sidebar-badge">{pendientesAdminCount}</span>
                    )}
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          <div className="sidebar-footer">
            <button
              type="button"
              className="btn btn--outline btn--sm sidebar-logout-btn"
              onClick={manejarCerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="app-main">
          {children}
          <Footer />
        </div>
      </div>

      <Modal
        abierto={nosotrosAbierto}
        cerrar={() => setNosotrosAbierto(false)}
        titulo="Acerca de Academiq Hub · UNICOMFACAUCA"
      >
        <p style={{ marginTop: 0, color: "var(--text-muted)", fontSize: "0.94rem" }}>
          <strong>Academiq Hub</strong> es la plataforma académica institucional diseñada para gestionar
          carreras, planes de estudio, matrículas semestrales y seguimiento de calificaciones en{" "}
          <strong>UNICOMFACAUCA</strong>.
        </p>
        <div style={{ margin: "1rem 0" }}>
          <Accordion items={FAQS_INSTITUCIONALES} />
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setNosotrosAbierto(false)}
          >
            Entendido
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;

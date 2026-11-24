import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { FormularioContext } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

function obtenerIniciales(nombre = "") {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "AH";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

function Navbar({ children }) {
  const { cantidadInscripciones, solicitudes } = useContext(FormularioContext);
  const { usuario, cerrarSesion } = useAuth();
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [userMenuAbierto, setUserMenuAbierto] = useState(false);
  const [notifAbierto, setNotifAbierto] = useState(false);
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
  const iniciales = obtenerIniciales(usuario?.nombre);
  const notificacionesRecientes = (solicitudes || []).slice(0, 3);

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
              {notificacionesRecientes.length > 0 && (
                <span className="topbar-notif-dot" aria-hidden="true" />
              )}
            </button>

            {notifAbierto && (
              <div className="topbar-dropdown topbar-notif-dropdown" role="menu">
                <div className="topbar-dropdown-header">
                  <span>Notificaciones</span>
                  <span className="badge badge--pending">{notificacionesRecientes.length}</span>
                </div>
                <div className="topbar-notif-list">
                  {notificacionesRecientes.length > 0 ? (
                    notificacionesRecientes.map((sol) => (
                      <div key={sol.id} className="topbar-notif-item">
                        <strong>{sol.asunto}</strong>
                        <span>Estado: {sol.estado || "Registrada"}</span>
                      </div>
                    ))
                  ) : (
                    <div className="topbar-notif-item">
                      <strong>Sistema operativo</strong>
                      <span>Sin solicitudes pendientes por revisar.</span>
                    </div>
                  )}
                </div>
                <div className="topbar-dropdown-footer">
                  <NavLink
                    to="/recursos"
                    className="topbar-dropdown-link"
                    onClick={() => setNotifAbierto(false)}
                  >
                    Ir a Recursos →
                  </NavLink>
                </div>
              </div>
            )}
          </div>

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
              <span className="user-avatar" aria-hidden="true">{iniciales}</span>
              <span className="topbar-user-meta">
                <span className="topbar-user-name">{usuario?.nombre || "Usuario"}</span>
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
                  <strong>{usuario?.nombre}</strong>
                  <span>{usuario?.correo}</span>
                  <span className="badge badge--approved" style={{ marginTop: "0.35rem", alignSelf: "flex-start" }}>
                    {usuario?.rol}
                  </span>
                </div>
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
            <span className="sidebar-heading">PRINCIPAL</span>
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

              <NavLink
                to="/servicios"
                end={false}
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={cerrarSidebar}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>Servicios y Matrícula</span>
                {cantidadInscripciones > 0 && (
                  <span className="sidebar-badge">{cantidadInscripciones}</span>
                )}
              </NavLink>

              <NavLink
                to="/calificaciones"
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={cerrarSidebar}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-6" />
                </svg>
                <span>Calificaciones</span>
              </NavLink>

              <NavLink
                to="/recursos"
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={cerrarSidebar}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Recursos</span>
              </NavLink>

              <NavLink
                to="/contacto"
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={cerrarSidebar}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Solicitudes</span>
              </NavLink>

              <NavLink
                to="/nosotros"
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={cerrarSidebar}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>Nosotros</span>
              </NavLink>
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
    </div>
  );
}

export default Navbar;

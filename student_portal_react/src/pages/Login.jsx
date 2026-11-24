import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";

function Login() {
  const { iniciarSesion, autenticado } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [recordarme, setRecordarme] = useState(true);
  const [error, setError] = useState("");
  const [modalAyuda, setModalAyuda] = useState(false);

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  const rutaDestino = location.state?.from || "/";

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setError("");

    const resultado = iniciarSesion(correo, clave);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }

    navigate(rutaDestino, { replace: true });
  };

  return (
    <div className="login-wrapper">
      <header className="login-topbar">
        <div className="login-topbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="#0f172a" />
            <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="#2563eb" />
          </svg>
          <span>Academiq Hub</span>
        </div>
        <div className="login-topbar-inst">
          <span className="login-topbar-divider" aria-hidden="true" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2L2 7V9H22V7L12 2Z" fill="#0f172a" />
            <path d="M4 11V18H7V11H4ZM10.5 11V18H13.5V11H10.5ZM17 11V18H20V11H17ZM2 20V22H22V20H2Z" fill="#0f172a" />
          </svg>
          <span>UNICOMFACAUCA</span>
        </div>
      </header>

      <main className="login-page page-enter">
      <section className="login-split-card" aria-label="Inicio de sesión">
        <div className="login-split-left" aria-hidden="true">
          <div className="login-blob login-blob--top" />
          <div className="login-blob login-blob--bottom" />

          <svg
            className="login-illustration"
            viewBox="0 0 420 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft background circle */}
            <circle cx="205" cy="185" r="130" fill="#dbeafe" opacity="0.65" />

            {/* Diploma scroll */}
            <g transform="rotate(-14 140 100)">
              <rect x="115" y="42" width="44" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="137" cy="44" rx="22" ry="7" fill="#e2e8f0" />
              <rect x="112" y="102" width="50" height="12" rx="3" fill="#2563eb" />
              <path d="M126 114L118 134L130 128L137 136L144 128L156 134L148 114H126Z" fill="#1d4ed8" />
            </g>

            {/* Monitor */}
            <rect x="95" y="128" width="210" height="136" rx="12" fill="#0f172a" />
            <rect x="105" y="138" width="190" height="106" rx="6" fill="#1e293b" />
            {/* Screen UI lines */}
            <rect x="122" y="156" width="84" height="10" rx="4" fill="#3b82f6" opacity="0.85" />
            <rect x="122" y="176" width="142" height="8" rx="4" fill="#64748b" opacity="0.5" />
            <rect x="122" y="192" width="118" height="8" rx="4" fill="#64748b" opacity="0.4" />
            <circle cx="200" cy="254" r="4" fill="#3b82f6" />
            {/* Monitor Stand */}
            <path d="M180 264H220L228 294H172L180 264Z" fill="#94a3b8" />
            <rect x="150" y="292" width="100" height="9" rx="4.5" fill="#64748b" />

            {/* Graduation Cap on top-left of monitor */}
            <g transform="rotate(-22 105 130)">
              <polygon points="105,88 168,112 105,136 42,112" fill="#0f172a" />
              <path d="M68 122V148C68 156 142 156 142 148V122L105 136L68 122Z" fill="#1e293b" />
              <line x1="164" y1="114" x2="164" y2="150" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="164" cy="152" r="5" fill="#f59e0b" />
            </g>

            {/* Stylized cable & wall outlet */}
            <rect x="332" y="182" width="38" height="44" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="345" cy="200" r="3" fill="#64748b" />
            <circle cx="357" cy="200" r="3" fill="#64748b" />
            <path
              d="M228 282C275 282 315 268 315 235C315 205 285 190 296 165"
              stroke="#1e293b"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Student figure on top of monitor */}
            <circle cx="288" cy="112" r="8" fill="#0f172a" />
            <path d="M278 122C278 118 298 118 298 122L302 142H274L278 122Z" fill="#2563eb" />
            {/* Student figure plugging cable */}
            <circle cx="318" cy="196" r="9" fill="#0f172a" />
            <path d="M306 208C306 203 330 203 330 208L332 238H304L306 208Z" fill="#1d4ed8" />
            <rect x="307" y="238" width="9" height="32" rx="4" fill="#0f172a" />
            <rect x="320" y="238" width="9" height="32" rx="4" fill="#0f172a" />
          </svg>
        </div>

        <div className="login-split-right">
          <div className="login-domain-pill">
            <span aria-hidden="true">🌐</span> academiqhub.edu.co
          </div>

          <div className="login-emblem" aria-hidden="true">
            <svg width="56" height="48" viewBox="0 0 64 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="32,4 58,15 32,26 6,15" fill="#0f172a" />
              <path d="M18 20V29C18 33 46 33 46 29V20L32 26L18 20Z" fill="#1e293b" />
              <line x1="54" y1="16" x2="54" y2="29" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 34C18 30 26 32 32 36C38 32 46 30 54 34V50C46 46 38 48 32 52C26 48 18 46 10 50V34Z" fill="#2563eb" />
              <path d="M32 36V52" stroke="#eff6ff" strokeWidth="2" />
            </svg>
          </div>

          <div className="login-brand-heading">
            <h1>ACADEMIQ HUB</h1>
            <p>PANEL DEL ESTUDIANTE</p>
          </div>

          <form onSubmit={manejarEnvio} className="login-clean-form" noValidate>
            <div className="login-field">
              <label htmlFor="login-correo" className="sr-only">
                Correo institucional
              </label>
              <input
                id="login-correo"
                type="email"
                className="login-underline-input"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo institucional"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field login-field--password">
              <label htmlFor="login-clave" className="sr-only">
                Contraseña
              </label>
              <input
                id="login-clave"
                type={mostrarClave ? "text" : "password"}
                className="login-underline-input"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                placeholder="Contraseña"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setMostrarClave((prev) => !prev)}
                aria-label={mostrarClave ? "Ocultar clave" : "Mostrar clave"}
              >
                {mostrarClave ? "🙈" : "👁"}
              </button>
            </div>

            <div className="login-options-row">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={recordarme}
                  onChange={(e) => setRecordarme(e.target.checked)}
                />
                <span>Recordarme</span>
              </label>

              <button
                type="button"
                className="login-forgot-link"
                onClick={() => setModalAyuda(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <div className="alert-box alert-box--error" role="alert" style={{ marginBottom: "1rem" }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn--primary login-submit-btn">
              Iniciar sesión
            </button>
          </form>
        </div>
      </section>

      <Modal
        abierto={modalAyuda}
        cerrar={() => setModalAyuda(false)}
        titulo="Recuperación de Acceso"
      >
        <p style={{ marginTop: 0, color: "var(--text-muted)", fontSize: "0.94rem" }}>
          Si olvidaste tu contraseña institucional, comunícate con la mesa de ayuda académica o verifica tu correo registrado en <strong>Academiq Hub</strong>.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn--primary" onClick={() => setModalAyuda(false)}>
            Entendido
          </button>
        </div>
      </Modal>
      </main>
    </div>
  );
}

export default Login;

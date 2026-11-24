import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import Toast from "../components/Toast";

const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

function ConfiguracionPerfil() {
  const { usuario, actualizarUsuarioSesion } = useAuth();
  const { estudiantes, carreras, actualizarPerfilEstudiante } = usePortal();

  const estudiante = estudiantes.find((e) => e.id === usuario?.id);
  const carrera = carreras.find((c) => c.id === estudiante?.carreraId);

  const [nombre, setNombre] = useState(estudiante?.nombre || usuario?.nombre || "");
  const [correo, setCorreo] = useState(estudiante?.correo || usuario?.correo || "");
  const [telefono, setTelefono] = useState(estudiante?.telefono || "");
  const [fotoDataUrl, setFotoDataUrl] = useState(estudiante?.foto || "");
  const [previewUrl, setPreviewUrl] = useState("");
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const manejarArchivo = (evento) => {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      setToast({
        mensaje: "Formato no permitido. Usa una imagen JPG, PNG o WebP.",
        tipo: "error"
      });
      evento.target.value = "";
      return;
    }

    if (archivo.size > MAX_BYTES) {
      setToast({
        mensaje: "La imagen supera el tamaño máximo de 2 MB.",
        tipo: "error"
      });
      evento.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(archivo);
    setPreviewUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFotoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(archivo);
  };

  const manejarGuardar = (evento) => {
    evento.preventDefault();
    if (!nombre.trim() || !correo.trim()) {
      setToast({
        mensaje: "El nombre y el correo institucional son obligatorios.",
        tipo: "error"
      });
      return;
    }

    if (estudiante) {
      actualizarPerfilEstudiante(estudiante.id, {
        nombre: nombre.trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
        foto: fotoDataUrl
      });
    }

    actualizarUsuarioSesion({
      nombre: nombre.trim(),
      correo: correo.trim()
    });

    setToast({
      mensaje: "Perfil actualizado correctamente.",
      tipo: "success"
    });
  };

  const imagenMostrada = previewUrl || fotoDataUrl;

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <h2>Configuración de perfil</h2>
        <p style={{ marginTop: "0.25rem", color: "var(--text-muted)" }}>
          Actualiza tu información personal y fotografía institucional.
        </p>

        <form onSubmit={manejarGuardar} className="card" style={{ marginTop: "1.25rem", maxWidth: "640px" }}>
          <div className="profile-photo-row">
            <div className="profile-photo-preview">
              {imagenMostrada ? (
                <img src={imagenMostrada} alt="Vista previa de perfil" className="profile-photo-img" />
              ) : (
                <span className="profile-photo-placeholder">Sin foto</span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label htmlFor="perfil-foto">Foto de perfil (JPG, PNG o WebP, máx. 2 MB)</label>
              <input
                id="perfil-foto"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={manejarArchivo}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "1.25rem" }}>
            <label htmlFor="perfil-carrera">
              Carrera asignada{" "}
              <span className="badge badge--approved" style={{ marginLeft: "0.4rem" }}>
                Solo lectura
              </span>
            </label>
            <input
              id="perfil-carrera"
              type="text"
              value={carrera?.nombre || usuario?.programa || "Ingeniería en Sistemas"}
              disabled
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="perfil-nombre">Nombre completo</label>
            <input
              id="perfil-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="perfil-correo">Correo institucional</label>
            <input
              id="perfil-correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="perfil-telefono">Teléfono</label>
            <input
              id="perfil-telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn--primary">
            Guardar cambios
          </button>
        </form>
      </div>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "success" })}
      />
    </main>
  );
}

export default ConfiguracionPerfil;

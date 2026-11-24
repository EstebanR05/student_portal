import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormulario } from "../context/FormularioContext";
import Toast from "../components/Toast";

const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const TAMANO_MAXIMO_BYTES = 2 * 1024 * 1024; // 2 MB

function CargarCurso() {
  const { agregarCursoCatalogo } = useFormulario();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [titulo, setTitulo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [creditos, setCreditos] = useState("3");
  const [horario, setHorario] = useState("");
  const [docente, setDocente] = useState("");
  const [categoria, setCategoria] = useState("Ingeniería de Software");
  const [estado, setEstado] = useState("pendiente");
  const [descripcion, setDescripcion] = useState("");

  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState("");
  const [errorArchivo, setErrorArchivo] = useState("");
  const [erroresForm, setErroresForm] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!archivo) {
      setVistaPrevia("");
      return;
    }

    const objectUrl = URL.createObjectURL(archivo);
    setVistaPrevia(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [archivo]);

  const manejarCambioArchivo = (evento) => {
    const seleccionado = evento.target.files?.[0];
    setErrorArchivo("");

    if (!seleccionado) {
      setArchivo(null);
      return;
    }

    if (!TIPOS_PERMITIDOS.includes(seleccionado.type)) {
      setErrorArchivo("Formato no permitido. Solo se aceptan imágenes JPG, PNG o WebP.");
      setArchivo(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (seleccionado.size > TAMANO_MAXIMO_BYTES) {
      setErrorArchivo("El archivo supera el tamaño máximo permitido de 2 MB.");
      setArchivo(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setArchivo(seleccionado);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!titulo.trim()) nuevosErrores.titulo = "El nombre del curso es obligatorio.";
    if (!codigo.trim()) nuevosErrores.codigo = "El código del curso es obligatorio.";
    if (!docente.trim()) nuevosErrores.docente = "El docente responsable es obligatorio.";
    if (!horario.trim()) nuevosErrores.horario = "El horario es obligatorio.";
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    const numCreditos = Number(creditos);
    if (!numCreditos || numCreditos < 1 || numCreditos > 10) {
      nuevosErrores.creditos = "Los créditos deben estar entre 1 y 10.";
    }
    return nuevosErrores;
  };

  const guardarCurso = (imagenBase64) => {
    agregarCursoCatalogo({
      titulo: titulo.trim(),
      codigo: codigo.trim(),
      creditos: Number(creditos),
      horario: horario.trim(),
      docente: docente.trim(),
      categoria: categoria.trim(),
      estado,
      descripcion: descripcion.trim(),
      imagen: imagenBase64 || ""
    });

    setToast({
      mensaje: `Curso "${titulo.trim()}" agregado al catálogo exitosamente.`,
      tipo: "success"
    });

    setTimeout(() => {
      navigate("/servicios");
    }, 600);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const errores = validarFormulario();

    if (Object.keys(errores).length > 0) {
      setErroresForm(errores);
      return;
    }

    setErroresForm({});

    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        guardarCurso(typeof lector.result === "string" ? lector.result : "");
      };
      lector.onerror = () => {
        setErrorArchivo("No se pudo procesar la imagen seleccionada.");
      };
      lector.readAsDataURL(archivo);
    } else {
      guardarCurso("");
    }
  };

  return (
    <main className="main-content page-enter">
      <section className="section-block">
        <h2>➕ Registrar Nueva Asignatura</h2>
        <p>
          Panel exclusivo para administradores. Completa la ficha académica y adjunta una imagen de portada
          (JPG, PNG o WebP, máximo 2 MB).
        </p>

        <form onSubmit={manejarEnvio} noValidate style={{ maxWidth: "680px" }}>
          <div className="form-group">
            <label htmlFor="curso-titulo">Nombre del curso</label>
            <input
              id="curso-titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej. Inteligencia Artificial Aplicada"
            />
            {erroresForm.titulo && <p className="error">{erroresForm.titulo}</p>}
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="curso-codigo">Código</label>
              <input
                id="curso-codigo"
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej. ING-405"
              />
              {erroresForm.codigo && <p className="error">{erroresForm.codigo}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="curso-creditos">Créditos</label>
              <input
                id="curso-creditos"
                type="number"
                min="1"
                max="10"
                value={creditos}
                onChange={(e) => setCreditos(e.target.value)}
              />
              {erroresForm.creditos && <p className="error">{erroresForm.creditos}</p>}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="curso-docente">Docente responsable</label>
              <input
                id="curso-docente"
                type="text"
                value={docente}
                onChange={(e) => setDocente(e.target.value)}
                placeholder="Ej. Dra. Laura Martínez"
              />
              {erroresForm.docente && <p className="error">{erroresForm.docente}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="curso-horario">Horario</label>
              <input
                id="curso-horario"
                type="text"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="Ej. Martes y Jueves 14:00 - 16:00"
              />
              {erroresForm.horario && <p className="error">{erroresForm.horario}</p>}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label htmlFor="curso-categoria">Categoría</label>
              <input
                id="curso-categoria"
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="curso-estado">Estado</label>
              <select
                id="curso-estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="reprobada">Reprobada</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="curso-descripcion">Descripción</label>
            <textarea
              id="curso-descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe los objetivos y contenidos del curso..."
              rows="3"
            />
            {erroresForm.descripcion && <p className="error">{erroresForm.descripcion}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="curso-imagen">Imagen de portada (JPG, PNG, WebP · Máx. 2 MB)</label>
            <input
              ref={fileInputRef}
              id="curso-imagen"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={manejarCambioArchivo}
            />
            {errorArchivo && (
              <p className="error" role="alert">
                {errorArchivo}
              </p>
            )}
          </div>

          {vistaPrevia && (
            <div className="preview-box">
              <p className="preview-label">Vista previa de portada:</p>
              <img src={vistaPrevia} alt="Vista previa del curso" className="preview-image" />
            </div>
          )}

          <div className="contacto-acciones" style={{ marginTop: "1.5rem" }}>
            <button type="submit" className="btn btn--primary">
              Guardar Asignatura en Catálogo
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => navigate("/servicios")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>

      {toast && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          cerrar={() => setToast(null)}
        />
      )}
    </main>
  );
}

export default CargarCurso;

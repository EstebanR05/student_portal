const listaPerfiles = [
    {
        id: 1,
        nombre: "Carlos Andrés Mendoza Silva",
        codigo: "EST-20242089",
        programa: "Ingeniería de Sistemas y Computación",
        semestre: 4,
        correo: "carlos.mendoza@universidad.edu.co"
    }
];

const listaAsignaturas = [
    {
        id: 1,
        nombre: "Desarrollo de Aplicaciones Web",
        docente: "Ing. Roberto Gómez",
        creditos: 3,
        horario: "Lun. y Mié. 08:00 - 10:00",
        estado: "pendiente",
        notas: [4.5, 4.0, 3.8, 4.2, 4.6]
    },
    {
        id: 2,
        nombre: "Estructuras de Datos y Algoritmos",
        docente: "Dra. Elena Vargas",
        creditos: 4,
        horario: "Mar. y Jue. 10:00 - 12:00",
        estado: "aprobada",
        notas: [3.8, 4.0, 3.5, 4.5, 4.2]
    },
    {
        id: 3,
        nombre: "Bases de Datos Relacionales",
        docente: "Ing. Mauricio Peña",
        creditos: 3,
        horario: "Lun. y Mié. 14:00 - 16:00",
        estado: "aprobada",
        notas: [4.2, 4.5, 4.8, 3.9, 4.4]
    },
    {
        id: 4,
        nombre: "Arquitectura de Software",
        docente: "Mag. Fernando Ruiz",
        creditos: 3,
        horario: "Vier. 08:00 - 12:00",
        estado: "pendiente",
        notas: [3.5, 3.2, 4.0, 3.8, 3.5]
    },
    {
        id: 5,
        nombre: "Cálculo Integral",
        docente: "Lic. Patricia Morales",
        creditos: 4,
        horario: "Mar. y Jue. 07:00 - 09:00",
        estado: "reprobada",
        notas: [2.0, 2.5, 2.8, 2.2, 2.4]
    },
    {
        id: 6,
        nombre: "Sistemas Operativos y Redes",
        docente: "Ing. Gabriel Torres",
        creditos: 3,
        horario: "Mar. y Jue. 14:00 - 16:00",
        estado: "aprobada",
        notas: [3.9, 4.1, 4.0, 3.7, 4.3]
    }
];

const listaHorarios = [
    {
        id: 1,
        dia: "Lunes",
        hora: "08:00 - 10:00",
        asignaturaId: 1,
        docente: "Ing. Roberto Gómez"
    },
    {
        id: 2,
        dia: "Lunes",
        hora: "14:00 - 16:00",
        asignaturaId: 3,
        docente: "Ing. Mauricio Peña"
    },
    {
        id: 3,
        dia: "Martes",
        hora: "07:00 - 09:00",
        asignaturaId: 5,
        docente: "Lic. Patricia Morales"
    },
    {
        id: 4,
        dia: "Martes",
        hora: "10:00 - 12:00",
        asignaturaId: 2,
        docente: "Dra. Elena Vargas"
    },
    {
        id: 5,
        dia: "Martes",
        hora: "14:00 - 16:00",
        asignaturaId: 6,
        docente: "Ing. Gabriel Torres"
    },
    {
        id: 6,
        dia: "Miércoles",
        hora: "08:00 - 10:00",
        asignaturaId: 1,
        docente: "Ing. Roberto Gómez"
    },
    {
        id: 7,
        dia: "Miércoles",
        hora: "14:00 - 16:00",
        asignaturaId: 3,
        docente: "Ing. Mauricio Peña"
    },
    {
        id: 8,
        dia: "Jueves",
        hora: "07:00 - 09:00",
        asignaturaId: 5,
        docente: "Lic. Patricia Morales"
    },
    {
        id: 9,
        dia: "Jueves",
        hora: "10:00 - 12:00",
        asignaturaId: 2,
        docente: "Dra. Elena Vargas"
    },
    {
        id: 10,
        dia: "Jueves",
        hora: "14:00 - 16:00",
        asignaturaId: 6,
        docente: "Ing. Gabriel Torres"
    },
    {
        id: 11,
        dia: "Viernes",
        hora: "08:00 - 12:00",
        asignaturaId: 4,
        docente: "Mag. Fernando Ruiz"
    }
];

const listaSolicitudes = [];

function obtenerSiguienteId(lista) {
    if (!lista || lista.length === 0) return 1;
    return Math.max(...lista.map((item) => item.id)) + 1;
}

function escaparHtml(texto) {
    if (texto === null || texto === undefined) return "";
    return String(texto).replace(/[&<>"']/g, (caracter) => {
        const mapa = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return mapa[caracter] || caracter;
    });
}

function calcularPromedio(notas) {
    if (!notas || notas.length === 0) return 0;
    const suma = notas.reduce((acumulado, nota) => acumulado + Number(nota), 0);
    return Number((suma / notas.length).toFixed(2));
}

function obtenerClaseEstado(estado) {
    const estadoMinuscula = String(estado).toLowerCase();
    if (estadoMinuscula === "aprobada") return "approved";
    if (estadoMinuscula === "reprobada") return "failed";
    return "pending";
}

function renderizarInicio() {
    const perfil = listaPerfiles[0];
    if (!perfil) return;

    const totalCreditos = listaAsignaturas.reduce((acumulado, item) => acumulado + item.creditos, 0);

    const elNombre = document.getElementById("resumen-nombre");
    const elCodigo = document.getElementById("resumen-codigo");
    const elPrograma = document.getElementById("resumen-programa");
    const elSemestre = document.getElementById("resumen-semestre");
    const elCreditos = document.getElementById("resumen-creditos");
    const elAsignaturas = document.getElementById("resumen-asignaturas");
    const elBadge = document.getElementById("badge-estudiante");

    if (elNombre) elNombre.textContent = perfil.nombre;
    if (elCodigo) elCodigo.textContent = perfil.codigo;
    if (elPrograma) elPrograma.textContent = perfil.programa;
    if (elSemestre) elSemestre.textContent = `${perfil.semestre}° Semestre`;
    if (elCreditos) elCreditos.textContent = `${totalCreditos} Créditos`;
    if (elAsignaturas) elAsignaturas.textContent = `${listaAsignaturas.length} Materias`;
    if (elBadge) elBadge.textContent = `${perfil.codigo} | Activo`;
}

function renderizarPerfil() {
    const perfil = listaPerfiles[0];
    if (!perfil) return;

    const infoNombre = document.getElementById("perfil-info-nombre");
    const infoCodigo = document.getElementById("perfil-info-codigo");
    const infoPrograma = document.getElementById("perfil-info-programa");
    const infoSemestre = document.getElementById("perfil-info-semestre");
    const infoCorreo = document.getElementById("perfil-info-correo");

    if (infoNombre) infoNombre.textContent = perfil.nombre;
    if (infoCodigo) infoCodigo.textContent = perfil.codigo;
    if (infoPrograma) infoPrograma.textContent = perfil.programa;
    if (infoSemestre) infoSemestre.textContent = `${perfil.semestre}° Semestre Académico`;
    if (infoCorreo) infoCorreo.textContent = perfil.correo;

    const inputNombre = document.getElementById("perfil-nombre");
    const inputPrograma = document.getElementById("perfil-programa");
    const inputSemestre = document.getElementById("perfil-semestre");
    const inputCorreo = document.getElementById("perfil-correo");

    if (inputNombre) inputNombre.value = perfil.nombre;
    if (inputPrograma) inputPrograma.value = perfil.programa;
    if (inputSemestre) inputSemestre.value = perfil.semestre;
    if (inputCorreo) inputCorreo.value = perfil.correo;
}

let filtroAsignaturasActual = "todos";

function renderizarAsignaturas(filtro = filtroAsignaturasActual) {
    filtroAsignaturasActual = filtro;
    const contenedor = document.getElementById("contenedor-asignaturas");
    if (!contenedor) return;

    const asignaturasFiltradas = listaAsignaturas.filter((materia) => {
        if (filtro === "todos") return true;
        return materia.estado === filtro;
    });

    contenedor.innerHTML = "";

    if (asignaturasFiltradas.length === 0) {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--text-muted); background: #f8fafc; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
                <p style="margin: 0; font-weight: 500;">No se encontraron asignaturas con el estado <strong>${escaparHtml(filtro)}</strong>.</p>
            </div>
        `;
    } else {
        asignaturasFiltradas.forEach((materia) => {
            const article = document.createElement("article");
            article.className = "card";
            article.innerHTML = `
                <div class="card__header">
                    <h3 class="card__title">${escaparHtml(materia.nombre)}</h3>
                    <span class="badge badge--${obtenerClaseEstado(materia.estado)}">
                        ${escaparHtml(materia.estado)}
                    </span>
                </div>
                <div class="card__body">
                    <div class="card__meta-list">
                        <div class="card__meta-item">
                            <span class="meta-label">Docente</span>
                            <span class="meta-value">${escaparHtml(materia.docente)}</span>
                        </div>
                        <div class="card__meta-item">
                            <span class="meta-label">Créditos</span>
                            <span class="meta-value">${materia.creditos} Créditos</span>
                        </div>
                        <div class="card__meta-item">
                            <span class="meta-label">Horario</span>
                            <span class="meta-value">${escaparHtml(materia.horario)}</span>
                        </div>
                    </div>
                </div>
                <div class="acciones-asignatura">
                    <button type="button" class="btn btn--sm btn--outline btn-editar-curso" data-id="${materia.id}">
                        Editar
                    </button>
                    <button type="button" class="btn btn--sm btn--danger-subtle btn-eliminar-curso" data-id="${materia.id}">
                        Eliminar
                    </button>
                </div>
            `;
            contenedor.appendChild(article);
        });
    }

    contenedor.querySelectorAll(".btn-editar-curso").forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = Number(boton.getAttribute("data-id"));
            cargarAsignaturaEnFormulario(id);
        });
    });

    contenedor.querySelectorAll(".btn-eliminar-curso").forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = Number(boton.getAttribute("data-id"));
            eliminarAsignatura(id);
        });
    });

    actualizarOpcionesSelectAsignaturas();
}

function cargarAsignaturaEnFormulario(id) {
    const materia = listaAsignaturas.find((item) => item.id === id);
    if (!materia) return;

    document.getElementById("curso-edit-id").value = materia.id;
    document.getElementById("curso-nombre").value = materia.nombre;
    document.getElementById("curso-docente").value = materia.docente;
    document.getElementById("curso-creditos").value = materia.creditos;
    document.getElementById("curso-horario").value = materia.horario;
    document.getElementById("curso-estado").value = materia.estado;
    document.getElementById("curso-notas").value = materia.notas.join(", ");

    document.getElementById("titulo-form-asignatura").textContent = `Editar Asignatura: ${materia.nombre}`;
    document.getElementById("btn-submit-asignatura").textContent = "Guardar Cambios";
    document.getElementById("btn-cancel-asignatura").style.display = "inline-block";

    document.getElementById("form-asignatura").scrollIntoView({ behavior: "smooth" });
}

function cancelarEdicionAsignatura() {
    document.getElementById("form-asignatura").reset();
    document.getElementById("curso-edit-id").value = "";
    document.getElementById("titulo-form-asignatura").textContent = "Agregar Nueva Asignatura";
    document.getElementById("btn-submit-asignatura").textContent = "Guardar Asignatura";
    document.getElementById("btn-cancel-asignatura").style.display = "none";
}

function eliminarAsignatura(id) {
    const indice = listaAsignaturas.findIndex((item) => item.id === id);
    if (indice === -1) return;

    listaAsignaturas.splice(indice, 1);

    for (let i = listaHorarios.length - 1; i >= 0; i--) {
        if (listaHorarios[i].asignaturaId === id) {
            listaHorarios.splice(i, 1);
        }
    }

    renderizarTodo();
}

function actualizarOpcionesSelectAsignaturas() {
    const select = document.getElementById("horario-asignatura");
    if (!select) return;

    const valorSeleccionadoActual = select.value;
    select.innerHTML = "";

    if (listaAsignaturas.length === 0) {
        select.innerHTML = '<option value="">(No hay asignaturas disponibles)</option>';
        return;
    }

    listaAsignaturas.forEach((materia) => {
        const option = document.createElement("option");
        option.value = materia.id;
        option.textContent = materia.nombre;
        if (String(materia.id) === String(valorSeleccionadoActual)) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function renderizarHorario() {
    const tablaBody = document.getElementById("tabla-horarios-body");
    if (!tablaBody) return;

    tablaBody.innerHTML = "";

    if (listaHorarios.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 2.5rem; color: var(--text-muted);">
                    No hay actividades registradas en el horario.
                </td>
            </tr>
        `;
        return;
    }

    listaHorarios.forEach((actividad) => {
        const materia = listaAsignaturas.find((m) => m.id === actividad.asignaturaId);
        const nombreMateria = materia ? materia.nombre : "Asignatura no vinculada";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${escaparHtml(actividad.dia)}</strong></td>
            <td>${escaparHtml(actividad.hora)}</td>
            <td>${escaparHtml(nombreMateria)}</td>
            <td>${escaparHtml(actividad.docente)}</td>
            <td>
                <div style="display: flex; gap: 0.4rem;">
                    <button type="button" class="btn btn--outline btn--sm btn-editar-horario" data-id="${actividad.id}">
                        Editar
                    </button>
                    <button type="button" class="btn btn--danger-subtle btn--sm btn-eliminar-horario" data-id="${actividad.id}">
                        Eliminar
                    </button>
                </div>
            </td>
        `;
        tablaBody.appendChild(tr);
    });

    tablaBody.querySelectorAll(".btn-editar-horario").forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = Number(boton.getAttribute("data-id"));
            cargarHorarioEnFormulario(id);
        });
    });

    tablaBody.querySelectorAll(".btn-eliminar-horario").forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = Number(boton.getAttribute("data-id"));
            eliminarHorario(id);
        });
    });
}

function cargarHorarioEnFormulario(id) {
    const item = listaHorarios.find((h) => h.id === id);
    if (!item) return;

    document.getElementById("horario-edit-id").value = item.id;
    document.getElementById("horario-dia").value = item.dia;
    document.getElementById("horario-hora").value = item.hora;
    document.getElementById("horario-asignatura").value = item.asignaturaId;
    document.getElementById("horario-docente").value = item.docente;

    document.getElementById("titulo-form-horario").textContent = "Editar Actividad del Horario";
    document.getElementById("btn-submit-horario").textContent = "Guardar Cambios";
    document.getElementById("btn-cancel-horario").style.display = "inline-block";

    document.getElementById("form-horario").scrollIntoView({ behavior: "smooth" });
}

function cancelarEdicionHorario() {
    document.getElementById("form-horario").reset();
    document.getElementById("horario-edit-id").value = "";
    document.getElementById("titulo-form-horario").textContent = "Agregar Actividad al Horario";
    document.getElementById("btn-submit-horario").textContent = "Guardar Horario";
    document.getElementById("btn-cancel-horario").style.display = "none";
}

function eliminarHorario(id) {
    const indice = listaHorarios.findIndex((item) => item.id === id);
    if (indice !== -1) {
        listaHorarios.splice(indice, 1);
        renderizarHorario();
        renderizarInicio();
    }
}

function renderizarCalificaciones() {
    const tablaBody = document.getElementById("tabla-calificaciones-body");
    if (!tablaBody) return;

    tablaBody.innerHTML = "";

    if (listaAsignaturas.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center" style="padding: 2.5rem; color: var(--text-muted);">
                    No hay asignaturas para calcular calificaciones.
                </td>
            </tr>
        `;
        return;
    }

    listaAsignaturas.forEach((materia) => {
        const promedioMateria = calcularPromedio(materia.notas);
        const estaAprobada = promedioMateria >= 3.0;
        const textoEstado = estaAprobada ? "Aprobada" : "Reprobada";
        const claseBadge = estaAprobada ? "badge--approved" : "badge--failed";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="font-bold">${escaparHtml(materia.nombre)}</td>
            <td class="text-center">${(materia.notas[0] || 0).toFixed(1)}</td>
            <td class="text-center">${(materia.notas[1] || 0).toFixed(1)}</td>
            <td class="text-center">${(materia.notas[2] || 0).toFixed(1)}</td>
            <td class="text-center">${(materia.notas[3] || 0).toFixed(1)}</td>
            <td class="text-center">${(materia.notas[4] || 0).toFixed(1)}</td>
            <td class="text-center font-bold" style="color: var(--color-brand); font-size: 1rem;">
                ${promedioMateria.toFixed(2)}
            </td>
            <td class="text-center">
                <span class="badge ${claseBadge}">${textoEstado}</span>
            </td>
        `;
        tablaBody.appendChild(tr);
    });
}

function calcularPromedioGeneral() {
    const contenedorResultado = document.getElementById("resultado-promedio-general");
    if (!contenedorResultado) return;

    if (listaAsignaturas.length === 0) {
        contenedorResultado.innerHTML = `
            <div class="alert-box alert-box--error">
                No hay asignaturas registradas para calcular el promedio.
            </div>
        `;
        return;
    }

    const promediosPorAsignatura = listaAsignaturas.map((materia) => calcularPromedio(materia.notas));
    const promedioGeneral = calcularPromedio(promediosPorAsignatura);

    let mensajeDesempeno = "";
    let claseMensaje = "";

    if (promedioGeneral >= 4.0) {
        mensajeDesempeno = "🌟 ¡Excelente rendimiento académico! Tu promedio supera el estándar de excelencia.";
        claseMensaje = "alert-box alert-box--success";
    } else if (promedioGeneral >= 3.0) {
        mensajeDesempeno = "👍 Rendimiento académico satisfactorio. Cumples con el valor mínimo aprobatorio de 3.0.";
        claseMensaje = "alert-box alert-box--info";
    } else {
        mensajeDesempeno = "⚠️ Rendimiento académico en riesgo. El promedio está por debajo del mínimo de 3.0.";
        claseMensaje = "alert-box alert-box--error";
    }

    contenedorResultado.innerHTML = `
        <div class="summary-card">
            <h3>Promedio General del Semestre</h3>
            <div class="score">${promedioGeneral.toFixed(2)} / 5.0</div>
            <div class="${claseMensaje}">${mensajeDesempeno}</div>
        </div>
    `;
}

function renderizarTodo() {
    renderizarInicio();
    renderizarPerfil();
    renderizarAsignaturas(filtroAsignaturasActual);
    renderizarHorario();
    renderizarCalificaciones();
}

document.addEventListener("DOMContentLoaded", () => {
    const anioActual = new Date().getFullYear();
    document.querySelectorAll(".anio-actual").forEach((elemento) => {
        elemento.textContent = anioActual;
    });

    const formPerfil = document.getElementById("form-perfil");
    if (formPerfil) {
        formPerfil.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const nuevoNombre = document.getElementById("perfil-nombre").value.trim();
            const nuevoPrograma = document.getElementById("perfil-programa").value.trim();
            const nuevoSemestre = Number(document.getElementById("perfil-semestre").value);
            const nuevoCorreo = document.getElementById("perfil-correo").value.trim();

            if (listaPerfiles.length > 0) {
                listaPerfiles[0].nombre = nuevoNombre;
                listaPerfiles[0].programa = nuevoPrograma;
                listaPerfiles[0].semestre = nuevoSemestre;
                listaPerfiles[0].correo = nuevoCorreo;
            }

            renderizarTodo();
            alert("✅ Perfil actualizado correctamente.");
        });
    }

    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach((b) => b.classList.remove("active"));
            boton.classList.add("active");

            const estado = boton.getAttribute("data-filtro");
            renderizarAsignaturas(estado);
        });
    });

    const formAsignatura = document.getElementById("form-asignatura");
    const btnCancelAsignatura = document.getElementById("btn-cancel-asignatura");

    if (btnCancelAsignatura) {
        btnCancelAsignatura.addEventListener("click", cancelarEdicionAsignatura);
    }

    if (formAsignatura) {
        formAsignatura.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const idEditando = document.getElementById("curso-edit-id").value;
            const nombre = document.getElementById("curso-nombre").value.trim();
            const docente = document.getElementById("curso-docente").value.trim();
            const creditos = Number(document.getElementById("curso-creditos").value);
            const horario = document.getElementById("curso-horario").value.trim();
            const estado = document.getElementById("curso-estado").value;
            const notasString = document.getElementById("curso-notas").value.trim();

            const notasArray = notasString
                .split(",")
                .map((n) => Number(n.trim()))
                .filter((n) => !Number.isNaN(n));

            if (notasArray.length !== 5 || notasArray.some((nota) => nota < 0 || nota > 5)) {
                alert("⚠️ Por favor ingresa exactamente 5 notas válidas (números entre 0.0 y 5.0 separados por coma).");
                return;
            }

            if (idEditando) {
                const idNumero = Number(idEditando);
                const materia = listaAsignaturas.find((item) => item.id === idNumero);
                if (materia) {
                    materia.nombre = nombre;
                    materia.docente = docente;
                    materia.creditos = creditos;
                    materia.horario = horario;
                    materia.estado = estado;
                    materia.notas = notasArray;
                }
            } else {
                const nuevaAsignatura = {
                    id: obtenerSiguienteId(listaAsignaturas),
                    nombre,
                    docente,
                    creditos,
                    horario,
                    estado,
                    notas: notasArray
                };
                listaAsignaturas.push(nuevaAsignatura);
            }

            cancelarEdicionAsignatura();
            renderizarTodo();
        });
    }

    const formHorario = document.getElementById("form-horario");
    const btnCancelHorario = document.getElementById("btn-cancel-horario");

    if (btnCancelHorario) {
        btnCancelHorario.addEventListener("click", cancelarEdicionHorario);
    }

    if (formHorario) {
        formHorario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const idEditando = document.getElementById("horario-edit-id").value;
            const dia = document.getElementById("horario-dia").value;
            const hora = document.getElementById("horario-hora").value.trim();
            const asignaturaId = Number(document.getElementById("horario-asignatura").value);
            const docente = document.getElementById("horario-docente").value.trim();

            if (!asignaturaId) {
                alert("⚠️ Debes seleccionar una asignatura válida.");
                return;
            }

            if (idEditando) {
                const item = listaHorarios.find((h) => h.id === Number(idEditando));
                if (item) {
                    item.dia = dia;
                    item.hora = hora;
                    item.asignaturaId = asignaturaId;
                    item.docente = docente;
                }
            } else {
                const nuevoHorario = {
                    id: obtenerSiguienteId(listaHorarios),
                    dia,
                    hora,
                    asignaturaId,
                    docente
                };
                listaHorarios.push(nuevoHorario);
            }

            cancelarEdicionHorario();
            renderizarTodo();
        });
    }

    const btnCalcularPromedio = document.getElementById("btn-promedio");
    if (btnCalcularPromedio) {
        btnCalcularPromedio.addEventListener("click", calcularPromedioGeneral);
    }

    const formSolicitud = document.getElementById("form-solicitud");
    if (formSolicitud) {
        formSolicitud.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const inputNombre = document.getElementById("contacto-nombre");
            const inputEmail = document.getElementById("contacto-email");
            const selectTipo = document.getElementById("tipo-solicitud");
            const inputMensaje = document.getElementById("contacto-mensaje");
            const alerta = document.getElementById("alerta-contacto");

            const nombre = inputNombre ? inputNombre.value.trim() : "";
            const email = inputEmail ? inputEmail.value.trim() : "";
            const tipo = selectTipo ? selectTipo.value : "";
            const mensaje = inputMensaje ? inputMensaje.value.trim() : "";

            if (!alerta) return;

            if (nombre === "" || email === "" || tipo === "" || mensaje === "") {
                alerta.className = "alert-box alert-box--error";
                alerta.textContent = "⚠️ Por favor, completa todos los campos obligatorios.";
                alerta.style.display = "block";
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                alerta.className = "alert-box alert-box--error";
                alerta.textContent = "⚠️ Ingresa un correo electrónico con formato válido.";
                alerta.style.display = "block";
                return;
            }

            const nuevaSolicitud = {
                id: obtenerSiguienteId(listaSolicitudes),
                fecha: new Date().toISOString().split("T")[0],
                nombre,
                email,
                tipo,
                mensaje
            };
            listaSolicitudes.push(nuevaSolicitud);

            alerta.className = "alert-box alert-box--success";
            alerta.innerHTML = `
                ✅ <strong>¡Solicitud registrada correctamente!</strong><br>
                Estimado/a <em>${escaparHtml(nombre)}</em>, tu solicitud de tipo <strong>"${escaparHtml(tipo)}"</strong> 
                ha sido guardada en la lista local. (Simulación local sin backend).
            `;
            alerta.style.display = "block";

            formSolicitud.reset();
        });
    }

    renderizarTodo();
});

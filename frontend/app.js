// Datos locales del portal. Simulan la respuesta de un backend, sin peticiones ni esperas.
const portalData = {
    perfiles: [{
        id: 1,
        nombre: "Carlos Andrés Mendoza Silva",
        codigo: "EST-20242089",
        programa: "Ingeniería de Sistemas y Computación",
        semestre: 4,
        correo: "carlos.mendoza@universidad.edu.co"
    }],
    asignaturas: [
        { id: 1, nombre: "Desarrollo de Aplicaciones Web", docente: "Ing. Roberto Gómez", creditos: 3, horario: "Lun. y Mié. 08:00 - 10:00", estado: "pendiente", notas: [4.5, 4.0, 3.8, 4.2, 4.6] },
        { id: 2, nombre: "Estructuras de Datos y Algoritmos", docente: "Dra. Elena Vargas", creditos: 4, horario: "Mar. y Jue. 10:00 - 12:00", estado: "aprobada", notas: [3.8, 4.0, 3.5, 4.5, 4.2] },
        { id: 3, nombre: "Bases de Datos Relacionales", docente: "Ing. Mauricio Peña", creditos: 3, horario: "Lun. y Mié. 14:00 - 16:00", estado: "aprobada", notas: [4.2, 4.5, 4.8, 3.9, 4.4] },
        { id: 4, nombre: "Arquitectura de Software", docente: "Mag. Fernando Ruiz", creditos: 3, horario: "Vier. 08:00 - 12:00", estado: "pendiente", notas: [3.5, 3.2, 4.0, 3.8, 3.5] },
        { id: 5, nombre: "Cálculo Integral", docente: "Lic. Patricia Morales", creditos: 4, horario: "Mar. y Jue. 07:00 - 09:00", estado: "reprobada", notas: [2.0, 2.5, 2.8, 2.2, 2.4] },
        { id: 6, nombre: "Sistemas Operativos y Redes", docente: "Ing. Gabriel Torres", creditos: 3, horario: "Mar. y Jue. 14:00 - 16:00", estado: "aprobada", notas: [3.9, 4.1, 4.0, 3.7, 4.3] }
    ],
    horarios: [
        { id: 1, dia: "Lunes", hora: "08:00 - 10:00", asignaturaId: 1, docente: "Ing. Roberto Gómez" },
        { id: 2, dia: "Lunes", hora: "14:00 - 16:00", asignaturaId: 3, docente: "Ing. Mauricio Peña" },
        { id: 3, dia: "Martes", hora: "07:00 - 09:00", asignaturaId: 5, docente: "Lic. Patricia Morales" },
        { id: 4, dia: "Martes", hora: "10:00 - 12:00", asignaturaId: 2, docente: "Dra. Elena Vargas" },
        { id: 5, dia: "Viernes", hora: "08:00 - 12:00", asignaturaId: 4, docente: "Mag. Fernando Ruiz" }
    ],
    solicitudes: []
};

function siguienteId(lista) {
    return lista.length ? Math.max(...lista.map((item) => item.id)) + 1 : 1;
}

function crearAsignatura(datos) {
    const asignatura = { id: siguienteId(portalData.asignaturas), ...datos };
    portalData.asignaturas.push(asignatura);
    return asignatura;
}

function actualizarAsignatura(id, datos) {
    const asignatura = portalData.asignaturas.find((item) => item.id === Number(id));
    if (asignatura) Object.assign(asignatura, datos);
    return asignatura;
}

function eliminarAsignatura(id) {
    const numeroId = Number(id);
    portalData.asignaturas = portalData.asignaturas.filter((item) => item.id !== numeroId);
    portalData.horarios = portalData.horarios.filter((item) => item.asignaturaId !== numeroId);
}

function crearHorario(datos) {
    const registro = { id: siguienteId(portalData.horarios), ...datos };
    portalData.horarios.push(registro);
    return registro;
}

function actualizarHorario(id, datos) {
    const registro = portalData.horarios.find((item) => item.id === Number(id));
    if (registro) Object.assign(registro, datos);
    return registro;
}

function eliminarHorario(id) {
    portalData.horarios = portalData.horarios.filter((item) => item.id !== Number(id));
}

function actualizarPerfil(datos) {
    Object.assign(portalData.perfiles[0], datos);
}

function crearSolicitud(datos) {
    portalData.solicitudes.push({ id: siguienteId(portalData.solicitudes), ...datos });
}

function escaparHtml(valor) {
    return String(valor).replace(/[&<>"']/g, (caracter) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[caracter]);
}

function promedio(notas) {
    return notas.reduce((total, nota) => total + nota, 0) / notas.length;
}

function claseEstado(estado) {
    return estado === "aprobada" ? "approved" : estado === "reprobada" ? "failed" : "pending";
}

function renderizarInicio() {
    const perfil = portalData.perfiles[0];
    document.getElementById("contenido-inicio").innerHTML = `<section id="inicio"><h2>Inicio</h2><div class="card-grid"><article class="card card--accent"><h3>${escaparHtml(perfil.nombre)}</h3><p>${escaparHtml(perfil.codigo)}</p><p>${escaparHtml(perfil.programa)}</p></article><article class="card"><h3>Resumen</h3><p>${portalData.asignaturas.length} asignaturas y ${portalData.horarios.length} actividades.</p></article></div></section>`;
}

function renderizarPerfil() {
    const perfil = portalData.perfiles[0];
    const contenedor = document.getElementById("contenido-perfil");
    contenedor.innerHTML = `<section id="perfil"><h2>Perfil</h2><div class="card-grid"><article class="card"><p><strong>Nombre:</strong> ${escaparHtml(perfil.nombre)}</p><p><strong>Código:</strong> ${escaparHtml(perfil.codigo)}</p><p><strong>Programa:</strong> ${escaparHtml(perfil.programa)}</p><p><strong>Semestre:</strong> ${perfil.semestre}</p><p><strong>Correo:</strong> ${escaparHtml(perfil.correo)}</p></article><article class="card"><h3>Editar perfil</h3><form id="form-perfil"><label>Nombre<input id="perfil-nombre" value="${escaparHtml(perfil.nombre)}" required></label><label>Programa<input id="perfil-programa" value="${escaparHtml(perfil.programa)}" required></label><label>Semestre<input id="perfil-semestre" type="number" min="1" value="${perfil.semestre}" required></label><label>Correo<input id="perfil-correo" type="email" value="${escaparHtml(perfil.correo)}" required></label><button class="btn btn--primary">Guardar cambios</button></form></article></div></section>`;
    document.getElementById("form-perfil").addEventListener("submit", (evento) => { evento.preventDefault(); actualizarPerfil({ nombre: document.getElementById("perfil-nombre").value.trim(), programa: document.getElementById("perfil-programa").value.trim(), semestre: Number(document.getElementById("perfil-semestre").value), correo: document.getElementById("perfil-correo").value.trim() }); renderizarTodo(); });
}

function renderizarAsignaturas(filtro = "todos", editandoId = null) {
    const contenedor = document.getElementById("contenido-asignaturas");
    const materias = portalData.asignaturas.filter((item) => filtro === "todos" || item.estado === filtro);
    contenedor.innerHTML = `<section id="asignaturas"><h2>Asignaturas</h2><div class="filter-group"><button class="btn btn--outline filtro" data-filtro="todos">Todas</button><button class="btn btn--outline filtro" data-filtro="aprobada">Aprobadas</button><button class="btn btn--outline filtro" data-filtro="pendiente">Pendientes</button><button class="btn btn--outline filtro" data-filtro="reprobada">Reprobadas</button></div><div class="card-grid">${materias.map((item) => `<article class="card"><h3>${escaparHtml(item.nombre)}</h3><p>${escaparHtml(item.docente)}</p><p>${item.creditos} créditos · ${escaparHtml(item.horario)}</p><span class="badge badge--${claseEstado(item.estado)}">${item.estado}</span><div class="acciones-asignatura"><button class="btn btn--outline editar" data-id="${item.id}">Editar</button><button class="btn btn--primary eliminar" data-id="${item.id}">Eliminar</button></div></article>`).join("")}</div></section><section><h2>${editandoId ? "Editar" : "Crear"} asignatura</h2><form id="form-asignatura"><label>Nombre<input id="curso-nombre" required></label><label>Docente<input id="curso-docente" required></label><label>Créditos<input id="curso-creditos" type="number" min="1" required></label><label>Horario<input id="curso-horario" required></label><label>Estado<select id="curso-estado"><option value="pendiente">Pendiente</option><option value="aprobada">Aprobada</option><option value="reprobada">Reprobada</option></select></label><label>5 notas separadas por comas<input id="curso-notas" required></label><button class="btn btn--primary">${editandoId ? "Guardar" : "Crear"}</button></form></section>`;
    document.querySelectorAll(".filtro").forEach((boton) => boton.addEventListener("click", () => renderizarAsignaturas(boton.dataset.filtro)));
    document.querySelectorAll(".eliminar").forEach((boton) => boton.addEventListener("click", () => { eliminarAsignatura(boton.dataset.id); renderizarTodo(); }));
    document.querySelectorAll(".editar").forEach((boton) => boton.addEventListener("click", () => { const item = portalData.asignaturas.find((curso) => curso.id === Number(boton.dataset.id)); renderizarAsignaturas(filtro, item.id); document.getElementById("curso-nombre").value=item.nombre; document.getElementById("curso-docente").value=item.docente; document.getElementById("curso-creditos").value=item.creditos; document.getElementById("curso-horario").value=item.horario; document.getElementById("curso-estado").value=item.estado; document.getElementById("curso-notas").value=item.notas.join(", "); }));
    document.getElementById("form-asignatura").addEventListener("submit", (evento) => { evento.preventDefault(); const notas=document.getElementById("curso-notas").value.split(",").map((valor)=>Number(valor.trim())); if(notas.length!==5||notas.some((nota)=>Number.isNaN(nota)||nota<0||nota>5)) return; const datos={nombre:document.getElementById("curso-nombre").value.trim(),docente:document.getElementById("curso-docente").value.trim(),creditos:Number(document.getElementById("curso-creditos").value),horario:document.getElementById("curso-horario").value.trim(),estado:document.getElementById("curso-estado").value,notas}; editandoId ? actualizarAsignatura(editandoId,datos) : crearAsignatura(datos); renderizarTodo(); });
}

function renderizarHorario(editandoId = null) {
    const contenedor = document.getElementById("contenido-horario");
    const opciones = portalData.asignaturas.map((item) => `<option value="${item.id}">${escaparHtml(item.nombre)}</option>`).join("");
    contenedor.innerHTML = `<section id="horario"><h2>Horario</h2><div class="table-responsive"><table><thead><tr><th>Día</th><th>Hora</th><th>Asignatura</th><th>Docente</th><th>Acciones</th></tr></thead><tbody>${portalData.horarios.map((item) => { const materia=portalData.asignaturas.find((curso)=>curso.id===item.asignaturaId); return `<tr><td>${escaparHtml(item.dia)}</td><td>${escaparHtml(item.hora)}</td><td>${materia ? escaparHtml(materia.nombre) : "Asignatura eliminada"}</td><td>${escaparHtml(item.docente)}</td><td><button class="btn btn--outline editar-horario" data-id="${item.id}">Editar</button> <button class="btn btn--primary eliminar-horario" data-id="${item.id}">Eliminar</button></td></tr>`; }).join("")}</tbody></table></div></section><section><h2>${editandoId ? "Editar" : "Crear"} actividad</h2><form id="form-horario"><label>Día<select id="horario-dia"><option>Lunes</option><option>Martes</option><option>Miércoles</option><option>Jueves</option><option>Viernes</option></select></label><label>Hora<input id="horario-hora" required></label><label>Asignatura<select id="horario-asignatura">${opciones}</select></label><label>Docente<input id="horario-docente" required></label><button class="btn btn--primary">${editandoId ? "Guardar" : "Crear"}</button></form></section>`;
    document.querySelectorAll(".eliminar-horario").forEach((boton)=>boton.addEventListener("click",()=>{eliminarHorario(boton.dataset.id);renderizarTodo();}));
    document.querySelectorAll(".editar-horario").forEach((boton)=>boton.addEventListener("click",()=>{const item=portalData.horarios.find((registro)=>registro.id===Number(boton.dataset.id));renderizarHorario(item.id);document.getElementById("horario-dia").value=item.dia;document.getElementById("horario-hora").value=item.hora;document.getElementById("horario-asignatura").value=item.asignaturaId;document.getElementById("horario-docente").value=item.docente;}));
    document.getElementById("form-horario").addEventListener("submit",(evento)=>{evento.preventDefault();const datos={dia:document.getElementById("horario-dia").value,hora:document.getElementById("horario-hora").value.trim(),asignaturaId:Number(document.getElementById("horario-asignatura").value),docente:document.getElementById("horario-docente").value.trim()};editandoId?actualizarHorario(editandoId,datos):crearHorario(datos);renderizarTodo();});
}

function renderizarCalificaciones() {
    const contenedor=document.getElementById("contenido-calificaciones");
    const promedios=portalData.asignaturas.map((item)=>promedio(item.notas));
    const general=promedios.length?promedio(promedios):0;
    contenedor.innerHTML=`<section id="calificaciones"><h2>Calificaciones</h2><div class="table-responsive"><table><thead><tr><th>Asignatura</th><th>Nota 1</th><th>Nota 2</th><th>Nota 3</th><th>Nota 4</th><th>Nota 5</th><th>Promedio</th><th>Estado</th></tr></thead><tbody>${portalData.asignaturas.map((item)=>{const valor=promedio(item.notas);const estado=valor>=3?"aprobada":"reprobada";return `<tr><td>${escaparHtml(item.nombre)}</td>${item.notas.map((nota)=>`<td>${nota.toFixed(1)}</td>`).join("")}<td>${valor.toFixed(2)}</td><td><span class="badge badge--${claseEstado(estado)}">${estado}</span></td></tr>`;}).join("")}</tbody></table></div><div class="acciones-calificaciones"><button id="btn-promedio" class="btn btn--primary">Calcular promedio general</button></div><div id="resultado-promedio-general"></div></section>`;
    document.getElementById("btn-promedio").addEventListener("click",()=>{document.getElementById("resultado-promedio-general").innerHTML=`<div class="summary-card"><h3>Promedio general</h3><div class="score">${general.toFixed(2)} / 5.0</div><p>${general>=3?"El promedio general cumple con el mínimo aprobatorio.":"El promedio general está por debajo del mínimo aprobatorio."}</p></div>`;});
}

function renderizarContacto() {
    const contenedor=document.getElementById("contenido-contacto");
    contenedor.innerHTML=`<section id="contacto"><h2>Contacto</h2><form id="form-solicitud"><label>Nombre<input id="nombre" required></label><label>Correo<input id="email" type="email" required></label><label>Tipo de solicitud<select id="tipo-solicitud" required><option value="">Selecciona una opción</option><option>Revisión de calificaciones</option><option>Solicitud de tutoría</option><option>Otra consulta académica</option></select></label><label>Descripción<textarea id="mensaje" required></textarea></label><button class="btn btn--primary">Registrar solicitud</button><p id="alerta-contacto" class="alert-box"></p></form></section>`;
    document.getElementById("form-solicitud").addEventListener("submit",(evento)=>{evento.preventDefault();const datos={nombre:document.getElementById("nombre").value.trim(),email:document.getElementById("email").value.trim(),tipo:document.getElementById("tipo-solicitud").value,mensaje:document.getElementById("mensaje").value.trim()};const alerta=document.getElementById("alerta-contacto");if(!datos.nombre||!datos.email||!datos.tipo||!datos.mensaje){alerta.textContent="Completa todos los campos.";alerta.className="alert-box alert-box--error";return;}crearSolicitud(datos);alerta.textContent="Solicitud registrada en la lista local. No se envió información a un servidor.";alerta.className="alert-box alert-box--success";evento.target.reset();});
}

function renderizarTodo() {
    renderizarInicio(); renderizarPerfil(); renderizarAsignaturas(); renderizarHorario(); renderizarCalificaciones(); renderizarContacto();
}

document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".anio-actual").forEach((elemento)=>{elemento.textContent=new Date().getFullYear();});
    renderizarTodo();
});

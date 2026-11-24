const MAPA_DIAS = [
  { canon: "Lunes", regex: /\blun(?:es)?\b/i },
  { canon: "Martes", regex: /\bmar(?:tes)?\b/i },
  { canon: "Miércoles", regex: /\bmi[eé](?:rcoles)?\b/i },
  { canon: "Jueves", regex: /\bjue(?:ves)?\b/i },
  { canon: "Viernes", regex: /\bvie(?:rnes)?\b/i },
  { canon: "Sábado", regex: /\bs[aá]b(?:ado)?\b/i }
];

function aMinutos(hora) {
  if (!hora || !/^\d{2}:\d{2}$/.test(hora)) return null;
  const [hh, mm] = hora.split(":").map(Number);
  return hh * 60 + mm;
}

export function parsearHorarioClase(horario = "") {
  const texto = String(horario || "");
  const dias = MAPA_DIAS.filter((d) => d.regex.test(texto)).map((d) => d.canon);
  const match = texto.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);

  const inicioMin = match ? aMinutos(match[1]) : null;
  const finMin = match ? aMinutos(match[2]) : null;

  return {
    dias,
    inicioMin,
    finMin,
    rangoTexto: match ? `${match[1]} - ${match[2]}` : ""
  };
}

export function hayCruceEntreMaterias(materiaA, materiaB) {
  const hA = parsearHorarioClase(materiaA?.horario);
  const hB = parsearHorarioClase(materiaB?.horario);

  if (
    hA.dias.length === 0 ||
    hB.dias.length === 0 ||
    hA.inicioMin === null ||
    hA.finMin === null ||
    hB.inicioMin === null ||
    hB.finMin === null
  ) {
    return null;
  }

  const diasComunes = hA.dias.filter((dia) => hB.dias.includes(dia));
  if (diasComunes.length === 0) return null;

  const seSolapan = hA.inicioMin < hB.finMin && hB.inicioMin < hA.finMin;
  if (!seSolapan) return null;

  return {
    materiaA,
    materiaB,
    diasComunes
  };
}

export function detectarCrucesHorario(materias = []) {
  const cruces = [];
  const idsEnCruce = new Set();

  for (let i = 0; i < materias.length; i += 1) {
    for (let j = i + 1; j < materias.length; j += 1) {
      const cruce = hayCruceEntreMaterias(materias[i], materias[j]);
      if (cruce) {
        cruces.push(cruce);
        idsEnCruce.add(materias[i].id);
        idsEnCruce.add(materias[j].id);
      }
    }
  }

  return { cruces, idsEnCruce };
}

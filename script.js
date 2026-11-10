const weeks = [
  { title: "Interpretação e legislação básica", sessions: [
    ["Segunda-feira", "Língua Portuguesa: interpretação de textos, gêneros e tipos textuais."],
    ["Quarta-feira", "Legislação: LDB — Lei nº 9.394/1996, Título V, Capítulo IV."],
    ["Sexta-feira", "Constituição Federal: artigos 37 a 41."]
  ]},
  { title: "Lógica e organização acadêmica", sessions: [
    ["Segunda-feira", "Raciocínio lógico: proposições, valores lógicos e conectivos."],
    ["Quarta-feira", "Organização acadêmica da graduação na UFMS: Resolução nº 430-Cograd/2021."],
    ["Sexta-feira", "Língua Portuguesa: funções da linguagem, coesão e coerência."]
  ]},
  { title: "Regime jurídico e estrutura curricular", sessions: [
    ["Segunda-feira", "Lei nº 8.112/1990: provimento, vacância e direitos."],
    ["Quarta-feira", "Cursos de graduação: PPC, estrutura curricular e componentes curriculares."],
    ["Sexta-feira", "Língua Inglesa: compreensão global, localização de ideias e cognatos."]
  ]},
  { title: "Procedimentos acadêmicos", sessions: [
    ["Segunda-feira", "Língua Portuguesa: relações semânticas e sentidos das palavras."],
    ["Quarta-feira", "Graduação: ingresso, matrícula e avaliação da aprendizagem."],
    ["Sexta-feira", "Raciocínio lógico: negação, equivalências e implicações."]
  ]},
  { title: "Deveres e vida acadêmica", sessions: [
    ["Segunda-feira", "Lei nº 8.112/1990: deveres, proibições e responsabilidades."],
    ["Quarta-feira", "Graduação: frequência, aproveitamento de estudos, integralização e colação de grau."],
    ["Sexta-feira", "Língua Portuguesa: ortografia e acentuação."]
  ]},
  { title: "Ingresso e processo administrativo", sessions: [
    ["Segunda-feira", "Raciocínio lógico: argumentos, inferências, diagramas e conjuntos."],
    ["Quarta-feira", "IN nº 88-Prograd/2025: ingresso, documentos, responsabilidades e prazos."],
    ["Sexta-feira", "Lei nº 9.784/1999: processo administrativo federal."]
  ]},
  { title: "Pós-graduação stricto sensu", sessions: [
    ["Segunda-feira", "Língua Portuguesa: classes de palavras e formação de palavras."],
    ["Quarta-feira", "Pós-graduação stricto sensu: organização, mestrado, doutorado, coordenação e colegiado."],
    ["Sexta-feira", "Língua Inglesa: vocabulário básico e gramática funcional."]
  ]},
  { title: "Pesquisa e sequência lógica", sessions: [
    ["Segunda-feira", "Decreto nº 9.283/2018: marco legal de ciência, tecnologia e inovação."],
    ["Quarta-feira", "Pós-graduação: ingresso, matrícula, vínculo, suspensão e cancelamento."],
    ["Sexta-feira", "Raciocínio lógico: sequências e padrões."]
  ]},
  { title: "Avaliação e Estatuto da UFMS", sessions: [
    ["Segunda-feira", "Língua Portuguesa: sintaxe, termos da oração e período composto."],
    ["Quarta-feira", "Pós-graduação: créditos, desempenho, frequência, qualificação e defesa."],
    ["Sexta-feira", "Estatuto da UFMS: Resolução nº 93/2021."]
  ]},
  { title: "Atos oficiais e raciocínio", sessions: [
    ["Segunda-feira", "Raciocínio lógico: orientação espacial e temporal, relações e princípio da contagem."],
    ["Quarta-feira", "Manual de Atos Oficiais da UFMS: estrutura e padronização."],
    ["Sexta-feira", "Língua Portuguesa: concordância verbal e nominal."]
  ]},
  { title: "Regimento e conduta estudantil", sessions: [
    ["Segunda-feira", "Regimento Geral da UFMS: Resolução nº 137/2021."],
    ["Quarta-feira", "Regulamento de Conduta Estudantil: Resolução nº 497-Coun/2026."],
    ["Sexta-feira", "Língua Portuguesa: regência, crase, tempos verbais e colocação pronominal."]
  ]},
  { title: "Revisão final e ética", sessions: [
    ["Segunda-feira", "Raciocínio lógico: combinatória, probabilidade, razões, proporções e porcentagens."],
    ["Quarta-feira", "Revisão dos procedimentos acadêmicos, documentação e conduta estudantil."],
    ["Sexta-feira", "Código de Ética da UFMS: Resolução nº 426/2026 e revisão geral."]
  ]}
];

const $ = (id) => document.getElementById(id);
const progressKey = "ufmsStudyProgress_v1";
const notesKey = "ufmsStudyNotes_v1";
let completed = new Set(JSON.parse(localStorage.getItem(progressKey) || "[]"));
let notes = JSON.parse(localStorage.getItem(notesKey) || "[]");
let currentWeek = 0;

function saveProgress() { localStorage.setItem(progressKey, JSON.stringify([...completed])); }
function saveNotes() { localStorage.setItem(notesKey, JSON.stringify(notes)); }
function sessionId(w, s) { return `${w}-${s}`; }
function weekDone(w) { return weeks[w].sessions.filter((_, s) => completed.has(sessionId(w, s))).length; }

function renderWeekList() {
  $("weekList").innerHTML = weeks.map((week, i) => `
    <button class="week-btn ${i === currentWeek ? "active" : ""}" data-week="${i}">
      Semana ${String(i + 1).padStart(2, "0")}
      <small>${weekDone(i)}/3 encontros • ${week.title}</small>
    </button>`).join("");
  document.querySelectorAll("[data-week]").forEach(btn => btn.addEventListener("click", () => {
    currentWeek = Number(btn.dataset.week); renderSchedule();
  }));
}

function renderSchedule() {
  const week = weeks[currentWeek];
  $("weekEyebrow").textContent = `SEMANA ${String(currentWeek + 1).padStart(2, "0")}`;
  $("weekTitle").textContent = week.title;
  $("weekProgress").textContent = `${weekDone(currentWeek)}/3 concluídos`;
  $("sessionList").innerHTML = week.sessions.map((session, s) => {
    const id = sessionId(currentWeek, s), done = completed.has(id);
    return `<label class="session ${done ? "done" : ""}">
      <input type="checkbox" data-session="${id}" ${done ? "checked" : ""}>
      <span><h3>${session[0]}</h3><p>${session[1]}</p></span>
    </label>`;
  }).join("");
  document.querySelectorAll("[data-session]").forEach(input => input.addEventListener("change", () => {
    input.checked ? completed.add(input.dataset.session) : completed.delete(input.dataset.session);
    saveProgress(); renderAll();
  }));
  renderWeekList(); renderOverall();
}

function renderOverall() {
  const total = weeks.length * 3, done = completed.size, percent = Math.round(done / total * 100);
  $("overallProgress").style.width = `${percent}%`;
  $("progressLabel").textContent = `${percent}% concluído`;
  $("progressDetail").textContent = `${done} de ${total} encontros concluídos`;
}
function renderPerformance() {
  $("performanceList").innerHTML = weeks.map((week, i) => {
    const count = weekDone(i), pct = Math.round(count / 3 * 100);
    return `<div class="performance-row"><strong>Semana ${i + 1}</strong>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span>${count}/3</span></div>`;
  }).join("");
}
function renderNotes() {
  $("noteWeek").innerHTML = weeks.map((w, i) => `<option value="${i}">Semana ${i + 1} — ${w.title}</option>`).join("");
  $("notesList").innerHTML = notes.length ? notes.map((note, i) => `
    <article class="note"><div class="note-head"><strong>Semana ${Number(note.week) + 1} • ${escapeHtml(note.subject)}</strong>
    <button class="delete-note" data-delete="${i}" type="button">Excluir</button></div>
    <p>${escapeHtml(note.text)}</p></article>`).join("") : '<p class="muted">Nenhuma anotação registrada ainda.</p>';
  document.querySelectorAll("[data-delete]").forEach(btn => btn.addEventListener("click", () => {
    notes.splice(Number(btn.dataset.delete), 1); saveNotes(); renderNotes();
  }));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function renderAll() { renderSchedule(); renderPerformance(); renderNotes(); }
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
  ["schedule", "performance", "notes"].forEach(name => $(`${name}Panel`).classList.toggle("hidden", name !== tab.dataset.tab));
}));
$("noteForm").addEventListener("submit", event => {
  event.preventDefault();
  notes.unshift({week: $("noteWeek").value, subject: $("noteSubject").value.trim(), text: $("noteText").value.trim()});
  saveNotes(); $("noteForm").reset(); renderNotes();
});
$("printBtn").addEventListener("click", () => window.print());
$("resetBtn").addEventListener("click", () => {
  if (confirm("Deseja realmente zerar todos os encontros concluídos? Suas anotações serão mantidas.")) {
    completed.clear(); saveProgress(); renderAll();
  }
});
renderAll();

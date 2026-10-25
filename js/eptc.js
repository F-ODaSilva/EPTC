/* EPTC — site data and behaviour.
   Data taken from EPTC's public Facebook page (posts of October 2026). Edit here, the page renders from it. */
const EPTC = {
  phones: ["+258 87 764 2199", "+258 84 764 2191"],
  whatsapp: "258877642199",
  instagram: "https://www.instagram.com/elton_pro_taing_centre/",
  facebook: "https://www.facebook.com/101516071416358",
  fee: 500,
  polos: [
    { id: "ponto-final", name: "Ponto Final", tag: "Sede", addr: "Av. Guerra Popular, ao lado da antiga Movitel", city: "Maputo" },
    { id: "alto-mae", name: "Alto-Maé", addr: "Av. 24 de Julho (Versalhes)", city: "Maputo" },
    { id: "magoanine", name: "Magoanine", addr: "Shoprite, paragem Impazole", city: "Maputo" },
    { id: "matola-700", name: "Matola 700", addr: "Sunshine Hospital / Padaria Boane", city: "Matola" },
    { id: "zona-verde", name: "Zona Verde", addr: "Paragem Dois Postos", city: "Matola" }
  ],
  courses: [
    { id: "elet-inst", area: "tec", name: "Eletricidade Instaladora e Manutenção", price: 2500, months: 6, img: "tecnicalstudentspractice3", icon: "bolt", line: "Instalações elétricas, quadros e manutenção, com prática em bancada." },
    { id: "elet-auto", area: "tec", name: "Eletricidade Auto e Eletrónica", price: 3000, months: 6, img: "tecnicalstudentclassfocused", icon: "bolt", line: "Sistemas elétricos de viaturas e eletrónica aplicada." },
    { id: "elet-ind", area: "tec", name: "Eletricidade Industrial e Comando de Máquinas", price: 3000, months: 6, img: "tecnicalstudentspractice", icon: "bolt", line: "Comandos, contactores e motores para indústria e oficinas." },
    { id: "informatica", area: "esc", name: "Informática", price: 1500, months: 3, img: "itstudentclassall", icon: "pc", line: "Do Windows ao Word, Excel e internet, para o dia a dia no escritório." },
    { id: "secretariado", area: "esc", name: "Secretariado", price: 1500, months: 3, icon: "folder", tone: "linen", line: "Atendimento, arquivo, redação de documentos e organização de escritório." },
    { id: "gestao", area: "esc", name: "Gestão e Marketing", price: 1500, months: 3, icon: "chart", tone: "navy", line: "Como gerir um negócio, vender e promover produtos e serviços." },
    { id: "design", area: "esc", name: "Design e Gráfico", price: 2500, months: 3, icon: "pen", tone: "orange", line: "Cartazes, logótipos e publicações para redes sociais." },
    { id: "linguas", area: "lin", name: "Cursos de Línguas", price: 900, months: 3, icon: "globe", tone: "navy", line: "Aprenda a falar com confiança. Preço por cada curso de língua." },
    { id: "comunicacao", area: "lin", name: "Comunicação", months: null, icon: "chat", tone: "linen", line: "Falar em público, apresentar trabalhos e comunicar sem vícios de linguagem." },
    { id: "exames", area: "exa", name: "Preparação para Exames de Admissão", price: 700, per: "por disciplina", months: null, icon: "book", tone: "orange", line: "Revisão orientada das disciplinas do exame, uma mensalidade por disciplina." }
  ],
  gallery: [
    ["tecnicalstudentspractice2", "Formandos de capacete numa aula prática de eletricidade"],
    ["itstudentclassteacher", "Formador a acompanhar uma formanda no computador"],
    ["tecnicalstudentclassall", "Turma técnica de farda laranja na sala"],
    ["graduation", "Cerimónia de graduação com o auditório cheio"],
    ["tecnicalstudentquestion", "Formando de luvas a levantar a mão para perguntar"],
    ["studentsclass", "Formandos atentos numa aula teórica"]
  ]
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const mt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " MT";
const wa = (text) => `https://wa.me/${EPTC.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
const icon = (n) => `<svg aria-hidden="true"><use href="#i-${n}"/></svg>`;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- nav ---------- */
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("solid", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const menuBtn = $("#menuBtn"), sheet = $("#sheet");
const setMenu = (open) => { sheet.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu"); document.body.classList.toggle("menu-open", open); };
menuBtn.addEventListener("click", () => setMenu(sheet.hidden));
sheet.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) setMenu(false); });

/* ---------- courses ---------- */
const grid = $("#courseGrid");
const courseCard = (c) => {
  const price = c.price ? `<span class="cc-price">${mt(c.price)}<small>/mês${c.per ? " " + c.per : ""}</small></span>` : `<span class="cc-price ask">Preço no polo</span>`;
  const dur = c.months ? `<span>${icon("clock")}${c.months} meses</span>` : "";
  const media = c.img
    ? `<div class="cc-media"><img src="assets/img/${c.img}-sm.webp" alt="" loading="lazy" width="800" height="534"></div>`
    : `<div class="cc-media tone-${c.tone}"><span class="cc-icon">${icon(c.icon)}</span></div>`;
  return `<article class="cc" data-area="${c.area}">
    ${media}
    <div class="cc-body">
      <div class="cc-meta">${dur}<span>${icon("scroll")}Certificado</span></div>
      <h3>${c.name}</h3>
      <p>${c.line}</p>
      <div class="cc-foot">${price}<a class="cc-cta" href="#inscricao" data-pick="${c.id}">Quero este curso ${icon("arrow")}</a></div>
    </div>
  </article>`;
};
const renderCourses = (f) => {
  const list = EPTC.courses.filter((c) => f === "all" || c.area === f);
  grid.innerHTML = list.map(courseCard).join("");
  grid.classList.remove("swap"); void grid.offsetWidth; grid.classList.add("swap");
};
$$("#courseTabs [role=tab]").forEach((t) => t.addEventListener("click", () => {
  $$("#courseTabs [role=tab]").forEach((x) => x.setAttribute("aria-selected", String(x === t)));
  renderCourses(t.dataset.f);
}));
renderCourses("all");

/* ---------- polos ---------- */
const maps = (p) => `https://www.google.com/maps/search/${encodeURIComponent(`${p.addr}, ${p.city}, Moçambique`)}`;
$("#poloGrid").innerHTML = EPTC.polos.map((p, k) => `<li class="polo reveal" style="--d:${k * 60}ms">
  <span class="polo-ic">${icon("pin")}</span>
  <h3>${p.name}${p.tag ? ` <em>${p.tag}</em>` : ""}</h3>
  <p>${p.addr}</p>
  <span class="polo-city">${p.city}</span>
  <a href="${maps(p)}" target="_blank" rel="noopener">Ver no mapa ${icon("arrow")}</a>
</li>`).join("");
$("#footPolos").innerHTML = EPTC.polos.map((p) => `<li>${p.name}${p.tag ? " (sede)" : ""}<span>${p.addr}</span></li>`).join("");

/* ---------- contacts ---------- */
const tel = (n) => "tel:" + n.replace(/\s/g, "");
$("#contactList").innerHTML = EPTC.phones.map((n) => `<li><a href="${tel(n)}">${icon("phone")}${n}</a></li>`).join("")
  + `<li><a href="${wa()}" target="_blank" rel="noopener">${icon("wa")}WhatsApp</a></li>`
  + `<li>${icon("clock")}Turmas de manhã, tarde e noite</li>`;
$("#sideActions").innerHTML = `<a class="btn btn-orange" href="${wa("Olá EPTC, gostaria de saber mais sobre os cursos.")}" target="_blank" rel="noopener">${icon("wa")}WhatsApp</a><a class="btn btn-line" href="${tel(EPTC.phones[0])}">${icon("phone")}Ligar</a>`;
$("#waBtn").href = wa("Olá EPTC, gostaria de saber mais sobre os cursos.");
$("#igLink").href = EPTC.instagram; $("#fbLink").href = EPTC.facebook;
$("#footSocial").innerHTML = `<a href="${EPTC.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("ig")}</a><a href="${EPTC.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("fb")}</a>`;

/* ---------- gallery + lightbox ---------- */
$("#gGrid").innerHTML = EPTC.gallery.map(([f, alt], k) => `<button class="g-item g${k}" data-full="assets/img/${f}.webp" aria-label="Ampliar: ${alt}"><img src="assets/img/${f}-sm.webp" alt="${alt}" loading="lazy" width="800" height="534"></button>`).join("");
const lb = $("#lightbox");
$("#gGrid").addEventListener("click", (e) => { const b = e.target.closest(".g-item"); if (!b) return; $("#lbImg").src = b.dataset.full; $("#lbImg").alt = b.querySelector("img").alt; lb.showModal(); });
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest("[data-close]")) lb.close(); });

/* ---------- story scroll ---------- */
const journey = $(".journey");
if (journey && !reduce) {
  const photos = $$(".journey-photos img", journey), steps = $$(".journey-steps li", journey), rail = $$(".journey-rail li", journey);
  let cur = -1, raf = 0;
  const tick = () => {
    const r = journey.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    journey.style.setProperty("--p", p.toFixed(3));
    const s = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999));
    if (s !== cur) {
      cur = s;
      photos.forEach((el, i) => el.classList.toggle("on", i === s));
      steps.forEach((el, i) => { el.classList.toggle("on", i === s); el.classList.toggle("past", i < s); });
      rail.forEach((el, i) => el.classList.toggle("on", i <= s));
    }
  };
  addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }, { passive: true });
  addEventListener("resize", tick); tick();
} else if (journey) journey.classList.add("static");

/* ---------- reveal ---------- */
if ("IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver((list) => list.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
} else $$(".reveal").forEach((el) => el.classList.add("in"));

/* ---------- enrol form ---------- */
const form = $("#enrolForm"), fCourse = $("#fCourse"), fPolo = $("#fPolo");
fCourse.insertAdjacentHTML("beforeend", EPTC.courses.map((c) => `<option value="${c.id}">${c.name}</option>`).join(""));
fPolo.insertAdjacentHTML("beforeend", EPTC.polos.map((p) => `<option value="${p.id}">${p.name}, ${p.city}</option>`).join(""));
document.addEventListener("click", (e) => {
  const pick = e.target.closest("[data-pick]");
  if (pick) { fCourse.value = pick.dataset.pick; check("fCourse", false); setTimeout(() => $("#fName").focus({ preventScroll: true }), 700); }
});
const rules = {
  fName: (v) => v.trim().split(/\s+/).length >= 2 || "Escreva o nome e o apelido.",
  fPhone: (v) => /^8[2-7]\d{7}$/.test(v.replace(/\D/g, "").replace(/^258/, "")) || "Escreva um número moçambicano, por exemplo 84 000 0000.",
  fCourse: (v) => !!v || "Escolha o curso que quer fazer.",
  fPolo: (v) => !!v || "Escolha o polo mais perto de si."
};
function check(id, show = true) {
  const el = $("#" + id), r = rules[id](el.value), f = el.closest(".field");
  if (show || r === true) { f.classList.toggle("invalid", r !== true); $(".err", f).textContent = r === true ? "" : r; }
  return r === true;
}
Object.keys(rules).forEach((id) => { $("#" + id).addEventListener("blur", () => check(id)); $("#" + id).addEventListener("change", () => check(id)); });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ok = Object.keys(rules).map((id) => check(id)).every(Boolean);
  if (!ok) { $(".invalid input, .invalid select", form)?.focus(); return; }
  const c = EPTC.courses.find((x) => x.id === fCourse.value), p = EPTC.polos.find((x) => x.id === fPolo.value);
  const name = $("#fName").value.trim(), first = name.split(/\s+/)[0], turno = $('input[name="turno"]:checked').value;
  $("#doneText").textContent = `Obrigado, ${first}. Recebemos o seu pedido para ${c.name}, no polo ${p.name}, turno da ${turno.toLowerCase()}. Confirme pelo WhatsApp para garantir a vaga.`;
  $("#doneWa").href = wa(`Olá EPTC, sou ${name}. Quero inscrever-me em ${c.name}, no polo ${p.name}, turno da ${turno.toLowerCase()}. Contacto: ${$("#fPhone").value.trim()}.`);
  form.hidden = true; $("#enrolDone").hidden = false;
});
$("#again").addEventListener("click", () => { form.reset(); form.hidden = false; $("#enrolDone").hidden = true; });

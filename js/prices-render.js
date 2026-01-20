// prices-render.js
(function () {
  const data = window.PRICES;
  if (!data || !Array.isArray(data.items)) return;

  const grid = document.getElementById("prijzenGrid");
  const note = document.getElementById("prijzenNote");

  grid.innerHTML = data.items.map(card => `
    <article class="prijs-card ${card.featured ? "is-featured" : ""}">
      ${card.featured ? `<div class="prijs-badge">Meest gekozen</div>` : ""}
      <h3>${escapeHtml(card.title)}</h3>
      <div class="prijs-price">${escapeHtml(card.price)}</div>
      <div class="prijs-sub">${escapeHtml(card.subtitle || "")}</div>
      <ul>
        ${(card.features || []).map(f => `<li>${escapeHtml(f)}</li>`).join("")}
      </ul>
      <a class="prijs-btn" href="${escapeAttr(card.ctaHref || "#contact")}">
        ${escapeHtml(card.ctaText || "Neem contact op")} <span aria-hidden="true">›</span>
      </a>
    </article>
  `).join("");

  note.textContent = data.note || "";
    // === Reveal animatie voor prijskaarten (na render) ===
  const prijsCards = grid.querySelectorAll(".prijs-card");

  const colsForWidth = () => {
    const w = window.innerWidth;
    if (w <= 720) return 1;
    if (w <= 1050) return 2;
    return 3;
  };

  const ioPrices = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const index = [...prijsCards].indexOf(el);
      const cols = colsForWidth();

      // stagger per rij (matcht jouw grid: 3, 2, 1 kolom)
      el.style.transitionDelay = ((index % cols) * 90) + "ms";
      el.classList.add("is-visible");

      ioPrices.unobserve(el);
    });
  }, { threshold: 0.45 });

  prijsCards.forEach(card => ioPrices.observe(card));

})();

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function escapeAttr(str){
  return escapeHtml(str).replaceAll("`","&#096;");
}

(function () {
  const data = window.PRICE_DATA;
  if (!data) return;

  renderSimpleTable("theorieTable", data.theorie, { withAction: false });
  renderSimpleTable("cbrTable", data.cbr, { withAction: true });

  const noteEl = document.getElementById("pricesNote");
  if (noteEl) noteEl.textContent = data.note || "";
})();

function renderSimpleTable(targetId, rows, opts) {
  const el = document.getElementById(targetId);
  if (!el || !Array.isArray(rows)) return;

  const withAction = !!opts.withAction;

  const header = withAction
    ? `<div class="trow thead">
         <div class="tcell item">Omschrijving</div>
         <div class="tcell action">Link</div>
         <div class="tcell price">Prijs</div>
       </div>`
    : `<div class="trow thead">
         <div class="tcell item">Omschrijving</div>
         <div class="tcell price">Prijs</div>
       </div>`;

  const body = rows.map(r => {
    const actionCell = withAction
      ? `<div class="tcell action">
           ${r.actionText ? `<a class="tlink" href="${escapeAttr(r.actionHref || "#")}" target="_blank" rel="noopener">${escapeHtml(r.actionText)}</a>` : `<span class="tmuted">—</span>`}
         </div>`
      : "";

    return `<div class="trow">
              <div class="tcell item">${escapeHtml(r.item)}</div>
              ${actionCell}
              <div class="tcell price">${escapeHtml(r.price)}</div>
            </div>`;
  }).join("");

  el.innerHTML = `<div class="ttable">${header}${body}</div>`;
}

const features = document.querySelectorAll(".feature");

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.55 });
features.forEach(f => obs.observe(f));


const cards = document.querySelectorAll(".cards .card");
const ob = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("card-visible");
  });
}, { threshold: 0.45 });
cards.forEach(c => ob.observe(c));

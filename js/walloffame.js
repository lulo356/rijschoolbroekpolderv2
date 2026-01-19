// walloffame.js
// Voeg hier alleen bestandsnamen toe (in ./assest/walloffame/ zetten)
const WAF_IMAGES = [
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg",
  "foto5.jpg",
  "foto6.jpg",
  "foto7.jpg",
  "foto8.jpg",
  // "geslaagd-004.jpg",
];

const BASE = "./assest/walloffame/";

(function initWallOfFame(){
  const grid = document.getElementById("wafGrid");
  if (!grid) return;

  grid.innerHTML = WAF_IMAGES.map(name => `
    <div class="waf-item" data-src="${BASE}${name}">
      <img loading="lazy" src="${BASE}${name}" alt="Geslaagd">
    </div>
  `).join("");

  // lightbox
  const lb = document.createElement("div");
  lb.className = "waf-lightbox";
  lb.innerHTML = `
    <button class="waf-lightbox-close" aria-label="Sluiten">×</button>
    <img alt="Geslaagd">
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector("img");
  const closeBtn = lb.querySelector(".waf-lightbox-close");

  function close(){
    lb.classList.remove("open");
    lbImg.src = "";
  }

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".waf-item");
    if (!item) return;
    lbImg.src = item.dataset.src;
    lb.classList.add("open");
  });

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  closeBtn.addEventListener("click", close);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

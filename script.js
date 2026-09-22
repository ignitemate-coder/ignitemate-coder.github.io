const galleries = [
  {
    number: "1870",
    name: "Impressionism",
    date: "1874",
    desc: "Light, atmosphere, and the fleeting moment.",
    status: "OPEN",
    type: "normal"
  },
  {
    number: "1907",
    name: "Cubism",
    date: "1907",
    desc: "Form reconsidered through simultaneous perspectives.",
    status: "OPEN",
    type: "normal"
  },
  {
    number: "1909",
    name: "Futurism",
    date: "1909",
    desc: "Motion, machinery, speed, and the modern world.",
    status: "OPEN",
    type: "normal"
  },
  {
    number: "1916",
    name: "Dada",
    date: "1916",
    desc: "Anti-art, chance, absurdity, and refusal.",
    status: "OPEN",
    type: "normal"
  },
  {
    number: "1924",
    name: "Surrealism",
    date: "1924",
    desc: "Dreams, automatism, and the irrational.",
    status: "OPEN",
    type: "normal"
  },
  {
    number: "1913",
    name: "Suprematism",
    date: "1915",
    desc: "Pure artistic feeling. Zero degree.",
    status: "██████",
    type: "suprematism"
  }
];

const normalDocs = {
  "1870": {
    title: "GALLERY 1870",
    subtitle: "IMPRESSIONISM",
    body: `
      <div class="meta-table">
        <div class="meta-key">GALLERY CLASS</div><div>IMPRESSIONISM</div>
        <div class="meta-key">ESTABLISHED</div><div>1874</div>
        <div class="meta-key">STATUS</div><div>OPEN</div>
      </div>
      <p>The Gallery maintains records concerning the Impressionist Notion and its associated artists, techniques, and works.</p>
      <h3>Archive Note</h3>
      <p>Records are currently stable. No anomalous archival behavior has been reported.</p>
    `
  },
  "1907": {
    title: "GALLERY 1907",
    subtitle: "CUBISM",
    body: `
      <div class="meta-table">
        <div class="meta-key">GALLERY CLASS</div><div>CUBISM</div>
        <div class="meta-key">ESTABLISHED</div><div>1907</div>
        <div class="meta-key">STATUS</div><div>OPEN</div>
      </div>
      <p>The Gallery maintains records concerning the Cubist Notion, including its treatment of perspective, form, and simultaneous viewpoints.</p>
      <h3>Archive Note</h3>
      <p>Records are currently stable. Cross-Gallery references remain functional.</p>
    `
  },
  "1909": {
    title: "GALLERY 1909",
    subtitle: "FUTURISM",
    body: `
      <div class="meta-table">
        <div class="meta-key">GALLERY CLASS</div><div>FUTURISM</div>
        <div class="meta-key">ESTABLISHED</div><div>1909</div>
        <div class="meta-key">STATUS</div><div>OPEN</div>
      </div>
      <p>The Gallery maintains records concerning movement, machinery, technological modernity, and the Futurist Notion.</p>
      <h3>Archive Note</h3>
      <p>Records are currently stable.</p>
    `
  },
  "1916": {
    title: "GALLERY 1916",
    subtitle: "DADA",
    body: `
      <div class="meta-table">
        <div class="meta-key">GALLERY CLASS</div><div>DADA</div>
        <div class="meta-key">ESTABLISHED</div><div>1916</div>
        <div class="meta-key">STATUS</div><div>OPEN</div>
      </div>
      <p>The Gallery maintains records concerning Dada's rejection of conventional artistic and cultural expectations.</p>
      <h3>Archive Note</h3>
      <p>Records are currently stable. Some records may appear intentionally contradictory.</p>
    `
  },
  "1924": {
    title: "GALLERY 1924",
    subtitle: "SURREALISM",
    body: `
      <div class="meta-table">
        <div class="meta-key">GALLERY CLASS</div><div>SURREALISM</div>
        <div class="meta-key">ESTABLISHED</div><div>1924</div>
        <div class="meta-key">STATUS</div><div>OPEN</div>
      </div>
      <p>The Gallery maintains records concerning dreams, automatism, unconscious imagery, and the Surrealist Notion.</p>
      <h3>Archive Note</h3>
      <p>Records are currently stable. Dream-related reports are filed separately.</p>
    `
  }
};

const grid = document.getElementById("gallery-grid");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("document-content");
const secretModal = document.getElementById("secret-modal");
const secretContent = document.getElementById("secret-content");
const statusEl = document.getElementById("archive-status");

let memoryStage = Number(localStorage.getItem("sup_memory_stage") || 0);
let visitedSuprematism = localStorage.getItem("sup_visited") === "1";
let cipherSolved = localStorage.getItem("sup_cipher") === "1";

function renderGalleries() {
  grid.innerHTML = galleries.map(g => `
    <article class="gallery ${g.type === "suprematism" ? "suprematism" : ""}" data-gallery="${g.number}">
      <div class="gallery-number">GALLERY #${g.number}</div>
      <div class="gallery-mark"></div>
      <h2>${g.name}</h2>
      <p>${g.date} / ${g.desc}</p>
      <div class="gallery-status">${g.status}</div>
    </article>
  `).join("");

  document.querySelectorAll(".gallery").forEach(card => {
    card.addEventListener("click", () => {
      const num = card.dataset.gallery;
      if (num === "1913") enterSuprematism();
      else openNormal(num);
    });
  });
}

function openNormal(num) {
  const d = normalDocs[num];
  modalContent.innerHTML = `<h2>${d.title}</h2><div class="eyebrow">${d.subtitle}</div>${d.body}`;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  secretModal.classList.add("hidden");
}

document.getElementById("modal-close").onclick = closeModal;
document.getElementById("secret-close").onclick = closeModal;
document.querySelectorAll(".modal-backdrop").forEach(x => x.onclick = closeModal);

function enterSuprematism() {
  visitedSuprematism = true;
  localStorage.setItem("sup_visited", "1");
  statusEl.textContent = "UNSTABLE";
  document.body.classList.add("failing");

  const fugue = document.getElementById("fugue");
  fugue.classList.remove("hidden");
  fugue.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    fugue.classList.add("hidden");
    fugue.setAttribute("aria-hidden", "true");
    document.body.classList.remove("failing");
    openSuprematistDocument();
  }, 3800);
}

function corrupt(text, level) {
  if (level <= 0) return text;
  if (level === 1) return text.replace(/[aeiou]/gi, "◼");
  if (level === 2) return text.replace(/[aeiou]/gi, "◼").replace(/[rnt]/gi, "");
  if (level >= 3) return text.replace(/[A-Za-z]/g, "◼");
}

function openSuprematistDocument() {
  memoryStage = Math.min(4, memoryStage + 1);
  localStorage.setItem("sup_memory_stage", memoryStage);

  const quote = memoryStage >= 3
    ? "The square is not a subconscious form."
    : "The square is not a subconscious form. It is the creation of intuitive reason. The face of the new art.";

  const title = memoryStage >= 4 ? "G-1913-2" : "AH! SO SORRY!";
  const erasedDescription = memoryStage >= 2
    ? `<p>${corrupt("The form of D-0.10 is unknown, and undescribable due to the self-classifying effects of G-1913-2.", memoryStage >= 4 ? 3 : 1)}</p>`
    : `<p>The form of D-0.10 is unknown, and undescribable due to the self-classifying effects of G-1913-2.</p>`;

  modalContent.innerHTML = `
    <div class="srm">
      <div class="eyebrow">THE RING / GALLERY 1913</div>
      <h2>${title}</h2>
      <div class="meta-table">
        <div class="meta-key">GALLERY #</div><div>1913</div>
        <div class="meta-key">GALLERY CLASS</div><div>${memoryStage >= 4 ? "██████████" : "SUPREMATISM"}</div>
        <div class="meta-key">STATUS</div><div class="danger">UNSAFE</div>
      </div>

      <div class="warning">
        GALLERY 1913 IS UNSAFE TO ENTER FOR VISITORS AT THIS TIME.<br>
        PLEASE COME BACK SOON!
      </div>

      <blockquote>${quote}</blockquote>

      <div class="black-square" aria-label="Black square"></div>

      <h3>Special Gallery Procedures</h3>
      <p>After passing the door, Patrons of the Ring currently experiencing:</p>
      <ul>
        <li>De-personalization</li>
        <li>Forgetfulness</li>
        <li>Somatic Nausea</li>
        <li>Religious Reverence</li>
      </ul>

      <p>may inquire for more help at the Corridor Reception desk, between Galleries 1870 and 1924. There, a gift shop will be available for perusing before Patrons are forced to leave.</p>

      <h3>Description</h3>
      <p>Gallery 1913 can only be entered through one doorway (D-0.10) in the Corridor of the Ring, and contains the mass majority of members of the Suprematist Notion.</p>

      ${erasedDescription}

      <p>When a subject enters within 3 meters of D-0.10 or upon visual contact with an artwork matching the Suprematist Notion with enough skill, G-1913's effects begin to exhibit on the subject, referred to as <b>G-1913-2</b>.</p>

      <h3>G-1913-2</h3>
      <p>The effect has been reported as a feeling of weightlessness and detachment from the body, with the void left by this dissociation being filled with something described by subjects as an <i>'other'</i>.</p>
      <p>Afflicted subjects enter a kind of trance, ceasing all bodily motions and staring off into space. Attempts to interrogate subjects have proved unfruitful in the discovery of this 'other'.</p>

      <h3>G-1913-3</h3>
      <p>Students of the Suprematism Notion appear to follow the same uniform stylization as normal students, though with unique identifiable quirks:</p>
      <ul>
        <li>Eyes.</li>
        <li>Religious Iconography.</li>
        <li>Wings.</li>
      </ul>

      <h3>Test Log G-1913-2</h3>
      <p>${memoryStage >= 2 ? corrupt("Exposure duration produces increasingly severe amnesia. At one hour, retrograde amnesia was observed.", memoryStage === 2 ? 1 : 2) : "1 minute — Full recovery.<br>10 minutes — Lacunar amnesia.<br>1 hour — Retrograde amnesia."}</p>

      <p class="danger">${memoryStage >= 3 ? "The archive cannot retain the remainder of this test log." : "Additional test records are available."}</p>

      <div id="cipher-area"></div>
    </div>
  `;

  modal.classList.remove("hidden");
  renderCipherArea();
}

function renderCipherArea() {
  const area = document.getElementById("cipher-area");
  if (!area) return;

  if (cipherSolved) {
    area.innerHTML = `
      <h3>DOCUMENT 001-A</h3>
      <p class="corrupt">You have already seen this.</p>
      <p>You have already forgotten this.</p>
      <p>It can be concluded that G-1913-2 exhibits the effect of a <b>self-keeping secret</b>, erasing all knowledge of the subject exhibiting it.</p>
      <p class="danger">Do not attempt to remember the missing material.</p>
      <button class="action" id="zero-open">OPEN RECORD: ZERO</button>
    `;
    document.getElementById("zero-open").onclick = openZero;
    return;
  }

  area.innerHTML = `
    <h3>RESTRICTED ADDENDUM</h3>
    <p>The remainder of this document has been moved to a restricted record.</p>
    <p>Access phrase recovered from the archive:</p>
    <div class="cipher">GSV ULIOV</div>
    <label for="cipher-answer">RECONSTRUCT THE RECORD</label>
    <input id="cipher-answer" autocomplete="off" spellcheck="false">
    <button class="action" id="cipher-submit">SUBMIT</button>
    <div class="feedback" id="cipher-feedback"></div>
  `;

  document.getElementById("cipher-submit").onclick = solveCipher;
  document.getElementById("cipher-answer").addEventListener("keydown", e => {
    if (e.key === "Enter") solveCipher();
  });
}

function solveCipher() {
  const answer = document.getElementById("cipher-answer").value.trim().toUpperCase();
  const feedback = document.getElementById("cipher-feedback");

  if (answer === "THE FORCE") {
    cipherSolved = true;
    localStorage.setItem("sup_cipher", "1");
    feedback.textContent = "The record remembers you.";
    setTimeout(openSuprematistDocument, 500);
  } else {
    feedback.textContent = "That information does not belong to this record.";
  }
}

function openZero() {
  secretContent.innerHTML = `
    <div class="zero-document">
      <div class="eyebrow">ARCHIVE RECORD: UNINDEXED</div>
      <h2>ZERO.</h2>
      <div class="zero-big">0</div>
      <div class="poem">Once ◼

We
Were

all lost in a trance

a

◼ Dizzying
whirl
◼

To where? Nobody knows

◼

at last
One ◼

With the stars

.

beautiful.</div>

      <h3>Record Status</h3>
      <p>Before the image there was the feeling.</p>
      <p>Before the feeling there was █████████████.</p>
      <p>There is no before.</p>
      <p>This document did not exist when the archive was first indexed.</p>
      <p>${memoryStage >= 3 ? "The archive has no memory of creating it." : "The archive cannot determine who created it."}</p>
    </div>
  `;
  secretModal.classList.remove("hidden");
}

document.getElementById("footer-zero").onclick = openZero;

let typed = "";
document.addEventListener("keydown", e => {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  typed += e.key.toLowerCase();
  if (typed.length > 8) typed = typed.slice(-8);
  if (typed === "zero") openZero();
});

window.addEventListener("load", () => {
  renderGalleries();

  const zeroScreen = document.getElementById("zero-screen");
  setTimeout(() => {
    zeroScreen.remove();
  }, 4500);

  if (visitedSuprematism) {
    statusEl.textContent = "UNSTABLE";
  }
});

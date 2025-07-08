// Données initiales, tu modifies ici ou en mode édition
let data = {
  serveurs: [
    {
      nom: "Haribo Community",
      description: "Serveur général pour la communauté Haribo, discussions, jeux, entraide.",
      lien: "https://discord.gg/haribocommunity",
      statut: "Ouvert"
    },
    {
      nom: "Omega RP",
      description: "Serveur Roleplay immersif et sérieux.",
      lien: "https://discord.gg/omegarp",
      statut: "Ouvert"
    },
    {
      nom: "Haribobot Support",
      description: "Support et aide pour le bot Haribobot.",
      lien: "https://discord.gg/haribobot",
      statut: "Ouvert"
    },
    {
      nom: "Emergency Hambourg (Privé)",
      description: "Serveur privé pour Emergency Hambourg RP.",
      lien: "#",
      statut: "Fermé"
    }
  ],
  bot: {
    nom: "Haribobot",
    description: "Bot multifonction pour gérer les serveurs Haribo.",
    commandes: [
      "!help - Liste des commandes",
      "!ban @user - Bannir un membre",
      "!kick @user - Expulser un membre",
      "!mute @user - Couper le micro",
      "!play [musique] - Jouer une musique"
    ]
  }
};

const contentDiv = document.getElementById("content");
const editBtn = document.getElementById("edit-toggle");
const saveBtn = document.getElementById("save-btn");

function loadData() {
  // Essaie de charger depuis localStorage
  const saved = localStorage.getItem("hariboHubData");
  if (saved) {
    data = JSON.parse(saved);
  }
}

function saveData() {
  localStorage.setItem("hariboHubData", JSON.stringify(data));
}

function createEditableField(text, tag = "p", isTextarea = false) {
  const el = document.createElement(tag);
  el.classList.add("editable");
  el.contentEditable = true;
  if (isTextarea) {
    // Remplacer <p> par <textarea>
    const textarea = document.createElement("textarea");
    textarea.className = "editable-textarea";
    textarea.value = text;
    return textarea;
  } else {
    el.textContent = text;
    return el;
  }
}

function renderPage(editMode = false) {
  contentDiv.innerHTML = "";

  // Serveurs
  const serveursSection = document.createElement("section");
  serveursSection.innerHTML = "<h2>🖥️ Serveurs Discord</h2>";

  data.serveurs.forEach((srv, i) => {
    const srvDiv = document.createElement("div");
    const nom = editMode ? createEditableField(srv.nom, "h3") : document.createElement("h3");
    if (!editMode) nom.textContent = srv.nom;

    const desc = editMode ? createEditableField(srv.description, "p", true) : document.createElement("p");
    if (!editMode) desc.textContent = srv.description;

    const lien = editMode ? createEditableField(srv.lien, "p") : document.createElement("p");
    if (!editMode) lien.innerHTML = `Lien : <a href="${srv.lien}" target="_blank">${srv.lien}</a>`;

    const statut = editMode ? createEditableField(srv.statut, "p") : document.createElement("p");
    statut.className = srv.statut.toLowerCase() === "ouvert" ? "status-open" : "status-closed";
    if (!editMode) statut.textContent = `Statut : ${srv.statut}`;

    srvDiv.appendChild(nom);
    srvDiv.appendChild(desc);
    srvDiv.appendChild(lien);
    srvDiv.appendChild(statut);
    serveursSection.appendChild(srvDiv);
  });
  contentDiv.appendChild(serveursSection);

  // Bot
  const botSection = document.createElement("section");
  botSection.innerHTML = `<h2>🤖 Bot Discord : ${data.bot.nom}</h2>`;
  const botDesc = editMode ? createEditableField(data.bot.description, "p", true) : document.createElement("p");
  if (!editMode) botDesc.textContent = data.bot.description;

  const commandesTitle = document.createElement("h3");
  commandesTitle.textContent = "Commandes principales :";

  const commandesList = document.createElement("ul");
  if (editMode) {
    // Edition des commandes avec textarea
    data.bot.commandes.forEach((cmd, i) => {
      const ta = document.createElement("textarea");
      ta.className = "editable-textarea";
      ta.value = cmd;
      ta.dataset.idx = i;
      commandesList.appendChild(document.createElement("li")).appendChild(ta);
    });
  } else {
    data.bot.commandes.forEach(cmd => {
      const li = document.createElement("li");
      li.textContent = cmd;
      commandesList.appendChild(li);
    });
  }

  botSection.appendChild(botDesc);
  botSection.appendChild(commandesTitle);
  botSection.appendChild(commandesList);

  contentDiv.appendChild(botSection);
}

function enterEditMode() {
  renderPage(true);
  editBtn.style.display = "none";
  saveBtn.style.display = "inline-block";
}

function exitEditMode() {
  // Récupérer les données modifiées
  const sections = contentDiv.querySelectorAll("section");

  // Serveurs
  const srvDivs = sections[0].querySelectorAll("div");
  srvDivs.forEach((div, i) => {
    const h3 = div.querySelector("h3.editable") || div.querySelector("h3");
    const pDesc = div.querySelector("textarea.editable-textarea") || div.querySelector("p.editable") || div.querySelector("p");
    const pLien = div.querySelectorAll("p.editable")[1] || div.querySelectorAll("p")[1];
    const pStatut = div.querySelectorAll("p.editable")[2] || div.querySelectorAll("p")[2];

    data.serveurs[i].nom = h3.textContent.trim();
    data.serveurs[i].description = pDesc.value !== undefined ? pDesc.value.trim() : pDesc.textContent.trim();
    data.serveurs[i].lien = pLien.textContent.trim();
    data.serveurs[i].statut = pStatut.textContent.trim();
  });

  // Bot
  const botSection = sections[1];
  const pDesc = botSection.querySelector("textarea.editable-textarea") || botSection.querySelector("p.editable") || botSection.querySelector("p");
  data.bot.description = pDesc.value !== undefined ? pDesc.value.trim() : pDesc.textContent.trim();

  // Commandes
  const textareas = botSection.querySelectorAll("textarea.editable-textarea");
  data.bot.commandes = [];
  textareas.forEach(ta => {
    data.bot.commandes.push(ta.value.trim());
  });

  saveData();
  renderPage(false);
  editBtn.style.display = "inline-block";
  saveBtn.style.display = "none";
}

editBtn.addEventListener("click", enterEditMode);
saveBtn.addEventListener("click", exitEditMode);

loadData();
renderPage(false);

const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");

let data = {
  accueilTitle: "Bienvenue sur Haribo Hub",
  accueilDesc: "Centralisez ici toutes les infos de vos serveurs Discord et bot Haribobot.",
  serveurs: [
    {
      nom: "Haribo Community",
      description: "Serveur général pour la communauté Haribo, discussions, jeux, entraide.",
      lien: "https://discord.gg/DJNF9DxcAg",
      statut: "Ouvert"
    },
    {
      nom: "Omega RP",
      description: "Serveur discord du serveur Privé EH.",
      lien: "https://discord.gg/bRXQfVcMxz",
      statut: "Ouvert"
    },
    {
      nom: "Haribobot Support",
      description: "Support et aide pour le bot Haribobot.",
      lien: "https://discord.gg/JV5FmXhkRq",
      statut: "Fermé"
    },
    {
      nom: "Emergency Hambourg (Privé)",
      description: "Serveur privé pour Emergency Hambourg RP.",
      lien: "https://www.roblox.com/games/start?placeId=7711635737&launchData=joinCode%3Dgwy3874x",
      statut: "Ouvert"
    }
  ],
  bot: {
    description: "Bot multifonction pour gérer les serveurs Haribo.",
    commandes: [
      "!help - Liste des commandes",
      "!ban @user - Bannir un membre",
      "!kick @user - Expulser un membre",
      "!mute @user - Couper le micro",
      "!play [musique] - Jouer une musique",
      "et plein d'autres encore"
    ]
  },
  contact: {
    mail: "contact@haribohub.com"
  }
};

function saveData() {
  localStorage.setItem("hariboHubData", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("hariboHubData");
  if (saved) {
    try {
      data = JSON.parse(saved);
    } catch {
      localStorage.removeItem("hariboHubData");
    }
  }
}

function createEditableField(value, tag = "p", isTextarea = false) {
  if (isTextarea) {
    const textarea = document.createElement("textarea");
    textarea.classList.add("editable-textarea");
    textarea.value = value;
    return textarea;
  } else {
    const el = document.createElement(tag);
    el.classList.add("editable");
    el.contentEditable = true;
    el.textContent = value;
    return el;
  }
}

function renderPage(editMode = false) {
  // Accueil
  const accueil = document.getElementById("accueil");
  accueil.innerHTML = "";
  if (editMode) {
    accueil.appendChild(createEditableField(data.accueilTitle, "h1"));
    accueil.appendChild(createEditableField(data.accueilDesc, "p", true));
  } else {
    const h1 = document.createElement("h1");
    h1.textContent = data.accueilTitle;
    const p = document.createElement("p");
    p.textContent = data.accueilDesc;
    accueil.appendChild(h1);
    accueil.appendChild(p);
  }

  // Serveurs
  const serveursList = document.getElementById("serveurs-list");
  serveursList.innerHTML = "";
  data.serveurs.forEach((srv, i) => {
    const div = document.createElement("div");
    if (editMode) {
      div.appendChild(createEditableField(srv.nom, "h3"));
      div.appendChild(createEditableField(srv.description, "p", true));
      div.appendChild(createEditableField(srv.lien, "p"));
      const statutField = createEditableField(srv.statut, "p");
      statutField.className = srv.statut.toLowerCase() === "ouvert" ? "status-open editable" : "status-closed editable";
      div.appendChild(statutField);
    } else {
      const h3 = document.createElement("h3");
      h3.textContent = srv.nom;
      const pDesc = document.createElement("p");
      pDesc.textContent = srv.description;
      const pLien = document.createElement("p");
      const aLien = document.createElement("a");
      aLien.href = srv.lien;
      aLien.target = "_blank";
      aLien.rel = "noopener noreferrer";
      aLien.textContent = srv.lien;
      pLien.textContent = "Lien : ";
      pLien.appendChild(aLien);
      const pStatut = document.createElement("p");
      pStatut.textContent = "Statut : " + srv.statut;
      pStatut.className = srv.statut.toLowerCase() === "ouvert" ? "status-open" : "status-closed";

      div.appendChild(h3);
      div.appendChild(pDesc);
      div.appendChild(pLien);
      div.appendChild(pStatut);
    }
    serveursList.appendChild(div);
  });

  // Bot
  const botDesc = document.getElementById("bot-desc");
  const botCommands = document.getElementById("bot-commands");
  if (editMode) {
    botDesc.innerHTML = "";
    botDesc.appendChild(createEditableField(data.bot.description, "p", true));
    botCommands.innerHTML = "";
    data.bot.commandes.forEach(cmd => {
      const li = document.createElement("li");
      const ta = document.createElement("textarea");
      ta.classList.add("editable-textarea");
      ta.value = cmd;
      li.appendChild(ta);
      botCommands.appendChild(li);
    });
  } else {
    botDesc.textContent = data.bot.description;
    botCommands.innerHTML = "";
    data.bot.commandes.forEach(cmd => {
      const li = document.createElement("li");
      li.textContent = cmd;
      botCommands.appendChild(li);
    });
  }

  // Contact
  const contactMail = document.getElementById("contact-mail");
  if (editMode) {
    const editableSpan = createEditableField(data.contact.mail, "span");
    contactMail.replaceWith(editableSpan);
    editableSpan.id = "contact-mail";
  } else {
    contactMail.textContent = data.contact.mail;
  }
}

function enterEditMode() {
  renderPage(true);
  editBtn.hidden = true;
  saveBtn.hidden = false;
  editBtn.setAttribute("aria-pressed", "true");
}

function exitEditMode() {
  // Accueil
  const accueil = document.getElementById("accueil");
  const h1 = accueil.querySelector("h1.editable");
  const p = accueil.querySelector("textarea.editable-textarea") || accueil.querySelector("p.editable");
  data.accueilTitle = h1 ? h1.textContent.trim() : data.accueilTitle;
  data.accueilDesc = p ? (p.value !== undefined ? p.value.trim() : p.textContent.trim()) : data.accueilDesc;

  // Serveurs
  const serveursList = document.getElementById("serveurs-list");
  const serveursDivs = serveursList.querySelectorAll("div");
  serveursDivs.forEach((div, i) => {
    const h3 = div.querySelector("h3.editable") || div.querySelector("h3");
    const pDesc = div.querySelector("textarea.editable-textarea") || div.querySelector("p.editable") || div.querySelector("p");
    const pLien = div.querySelectorAll("p")[1];
    const pStatut = div.querySelectorAll("p")[2];
    data.serveurs[i].nom = h3.textContent.trim();
    data.serveurs[i].description = pDesc.value !== undefined ? pDesc.value.trim() : pDesc.textContent.trim();
    data.serveurs[i].lien = pLien.textContent.trim();
    data.serveurs[i].statut = pStatut.textContent.trim();
  });

  // Bot
  const botDesc =

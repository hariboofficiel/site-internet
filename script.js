// Données initiales
let data = {
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
    nom: "Haribobot",
    description: "Bot multifonction pour gérer les serveurs Haribo.",
    commandes: [
      "!help - Liste des commandes",
      "!ban @user - Bannir un membre",
      "!kick @user - Expulser un membre",
      "!mute @user - Couper le micro",
      "!play [musique] - Jouer une musique",
      "et plein d'autres encore"
    ],
    statut: "hors-service"
  },
  contact: {
    mail: "contact@haribohub.com"
  }
};

// Références aux boutons
const editBtn = document.getElementById("edit-toggle");
const saveBtn = document.getElementById("save-btn");

// Chargement des données depuis localStorage
function loadData() {
  const saved = localStorage.getItem("hariboHubData");
  if (saved) {
    try {
      data = JSON.parse(saved);
    } catch {
      console.warn("Données locales corrompues, réinitialisation.");
      localStorage.removeItem("hariboHubData");
    }
  }
}

// Sauvegarde des données dans localStorage
function saveData() {
  localStorage.setItem("hariboHubData", JSON.stringify(data));
}

// Crée un champ éditable (textarea ou élément avec contentEditable)
function createEditableField(text, tag = "p", isTextarea = false) {
  if (isTextarea) {
    const textarea = document.createElement("textarea");
    textarea.className = "editable-textarea";
    textarea.value = text;
    return textarea;
  } else {
    const el = document.createElement(tag);
    el.classList.add("editable");
    el.contentEditable = true;
    el.textContent = text;
    return el;
  }
}

// Affiche ou met à jour la page, en mode édition ou lecture
function renderPage(editMode = false) {
  // Accueil
  const accueil = document.getElementById("accueil");
  if (editMode) {
    accueil.innerHTML = "";
    accueil.appendChild(createEditableField(data.accueilTitle || "Bienvenue sur Haribo Hub", "h1"));
    accueil.appendChild(createEditableField(data.accueilDesc || "Centralisez ici toutes les infos de tes serveurs Discord et bot Haribobot.", "p", true));
  } else {
    accueil.innerHTML = `
      <h1>${data.accueilTitle || "Bienvenue sur Haribo Hub"}</h1>
      <p>${data.accueilDesc || "Centralisez ici toutes les infos de tes serveurs Discord et bot Haribobot."}</p>
    `;
  }

  // Serveurs
  const serveursList = document.getElementById("serveurs-list");
  serveursList.innerHTML = "";
  data.serveurs.forEach((srv, i) => {
    if (editMode) {
      const container = document.createElement("div");
      container.appendChild(createEditableField(srv.nom, "h3"));
      container.appendChild(createEditableField(srv.description, "p", true));
      conta

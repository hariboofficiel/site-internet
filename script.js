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
  },
  contact: {
    mail: "contact@haribohub.com"
  }
};

const editBtn = document.getElementById("edit-toggle");
const saveBtn = document.getElementById("save-btn");

function loadData() {
  const saved = localStorage.getItem("hariboHubData");
  if (saved) {
    data = JSON.parse(saved);
  }
}

function saveData() {
  localStorage.setItem("hariboHubData", JSON.stringify(data));
}

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

function renderPage(editMode = false) {
  // Accueil
  const accueil = document.getElementById("accueil");
  if(editMode) {
    accueil.innerHTML = "";
    accueil.appendChild(createEditableField("Bienvenue sur Haribo Hub", "h1"));
    accueil.appendChild(createEditableField("Centralisez ici toutes les infos de tes serveurs Discord et bot Haribobot.", "p", true));
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
    if(editMode) {
      const container = document.createElement("div");
      container.appendChild(createEditableField(srv.nom, "h3"));
      container.appendChild(createEditableField(srv.description, "p", true));
      container.appendChild(createEditableField(srv.lien, "p"));
      const statutField = createEditableField(srv.statut, "p");
      statutField.className = srv.statut.toLowerCase() === "ouvert" ? "status-open editable" : "status-closed editable";
      container.appendChild(statutField);
      serveursList.appendChild(container);
    } else {
      serveursList.innerHTML += `
      <div>
        <h3>${srv.nom}</h3>
        <p>${srv.description}</p>
        <p>Lien : <a href="${srv.lien}" target="_blank">${srv.lien}</a></p>
        <p class="${srv.statut.toLowerCase() === "ouvert" ? "status-open" : "status-closed"}">Statut : ${srv.statut}</p>
      </div>
      `;
    }
  });

  // Bot
  const botDesc = document.getElementById("bot-desc");
  const botCommands = document.getElementById("bot-commands");
  if(editMode) {
    botDesc.innerHTML = "";
    botDesc.appendChild(createEditableField(data.bot.description, "p", true));
    botCommands.innerHTML = "";
    data.bot.commandes.forEach(cmd => {
      const ta = document.createElement("textarea");
      ta.className = "editable-textarea";
      ta.value = cmd;
      botCommands.appendChild(document.createElement("li")).appendChild(ta);
    });
  } else {
    botDesc.textContent = data.bot.description;
    botCommands.innerHTML = data.bot.commandes.map(cmd => `<li>${cmd}</li>`).join("");
  }

  // Contact
  const contactMail = document.getElementById("contact-mail");
  if(editMode) {
    contactMail.replaceWith(createEditableField(data.contact.mail, "span"));
  } else {
    contactMail.textContent = data.contact.mail;
  }
}

function enterEditMode() {
  renderPage(true);
  editBtn.style.display = "none";
  saveBtn.style.display = "inline-block";
}

function exitEditMode() {
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
  const botDesc = document.getElementById("bot-desc");
  const pDesc = botDesc.querySelector("textarea.editable-textarea") || botDesc.querySelector("p.editable") || botDesc.querySelector("p");
  data.bot.description = pDesc.value !== undefined ? pDesc.value.trim() : pDesc.textContent.trim();

  const botCommands = document.getElementById("bot-commands");
  const textareas = botCommands.querySelectorAll("textarea.editable-textarea");
  data.bot.commandes = [];
  textareas.forEach(ta => {
    data.bot.commandes.push(ta.value.trim());
  });

  // Contact
  const contactSpan = document.querySelector("#contact span.editable") || document.querySelector("#contact span");
  if(contactSpan) {
    data.contact.mail = contactSpan.textContent.trim();
  }

  saveData();
  renderPage(false);
  editBtn.style.display = "inline-block";
  saveBtn.style.display = "none";
}

editBtn.addEventListener("click", enterEditMode);
saveBtn.addEventListener("click", exitEditMode);

loadData();
renderPage(false);

const maintenance = true;

function showMaintenancePage() {
  document.body.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      height: 100vh;
      width: 100vw;
      font-family: 'Montserrat', sans-serif;
      background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6f91, #ff9671);
      background-size: 400% 400%;
      animation: gradientBG 12s ease infinite;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      overflow: hidden;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .maintenance-box {
      background: rgba(0, 0, 0, 0.35);
      padding: 40px 50px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      backdrop-filter: blur(10px);
      max-width: 600px;
      animation: fadeIn 1s ease-in-out;
    }

    .maintenance-box h1 {
      font-size: 2.7rem;
      margin-bottom: 20px;
      color: #ffffff;
      text-shadow: 0 0 10px #00000055;
    }

    .maintenance-box p {
      font-size: 1.1rem;
      margin-bottom: 15px;
      color: #e8e8e8;
      line-height: 1.5;
    }

    .spinner {
      width: 60px;
      height: 60px;
      border: 6px solid rgba(255,255,255,0.2);
      border-top: 6px solid #fff;
      border-radius: 50%;
      margin: 25px auto;
      animation: spin 1.2s linear infinite;
    }

    .join-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #5865F2;
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 10px;
      text-decoration: none;
      transition: background 0.3s ease;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .join-button:hover {
      background-color: #4752c4;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>

  <div class="maintenance-box">
    <h1>🚧 Site en maintenance</h1>

    <p>Nous travaillons actuellement sur des améliorations très cools 👨‍💻</p>
    <p>Quelques bugs, un peu de magie, beaucoup de Haribo 🍬</p>
    <p>Promis, on revient vite avec un site encore plus propre, plus rapide, plus stylé !</p>
    <p>Ton accès reviendra dès que tout sera prêt — un peu de patience ❤️</p>
    <p>Si tu veux être informé, rejoins notre serveur Discord :</p>

    <div class="spinner"></div>

    <a href="https://discord.gg/TONINVITE" target="_blank" class="join-button">
      💬 Rejoindre le Discord Haribo Community
    </a>
  </div>
  `;
}

if (maintenance) {
  showMaintenancePage();
  throw new Error("Mode maintenance activé");
}
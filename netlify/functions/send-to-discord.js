const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  // Vérifier la méthode POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON" }),
    };
  }

  // URL du webhook Discord (à mettre dans les variables d'environnement)
  const webhookURL = process.env.DISCORD_WEBHOOK;
  if (!webhookURL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Webhook Discord non défini" }),
    };
  }

  // Sections serveur
  const serveurFields = [
    { name: "🏷️ Nom du serveur", value: data.nom_serveur || "Non renseigné", inline: true },
    { name: "🎨 Thème", value: data.theme || "Non renseigné", inline: true },
    { name: "📅 Date de création", value: data.date_creation || "Non renseigné", inline: true },
    { name: "👥 Membres totaux", value: data.membres_total || "Non renseigné", inline: true },
    { name: "🔔 Membres actifs", value: data.membres_actifs || "Non renseigné", inline: true },
    { name: "🌍 Langue principale", value: data.langue || "Non renseigné", inline: true },
    { name: "🗂️ Catégorie", value: data.categorie || "Non renseigné", inline: true },
    { name: "🎯 Moyenne d’âge", value: data.age_moyen || "Non renseigné", inline: true },
    { name: "🎉 Activités", value: data.activites || "Non renseigné", inline: false },
    { name: "🤝 Partenariats existants", value: data.partenariats || "Non renseigné", inline: true },
    { name: "📢 Fréquence annonces", value: data.frequence_annonces || "Non renseigné", inline: true },
    { name: "⚡ Type de partenariat", value: data.type_partenariat || "Non renseigné", inline: true },
    { name: "🔗 Lien d’invitation", value: data.lien_invitation || "Non renseigné", inline: false },
  ];

  // Sections staff
  const staffFields = [
    { name: "🪪 Pseudo Discord", value: data.pseudo || "Non renseigné", inline: true },
    { name: "🆔 Identifiant", value: data.identifiant || "Non renseigné", inline: true },
    { name: "🎂 Âge", value: data.age || "Non renseigné", inline: true },
    { name: "🛡️ Rôle dans le serveur", value: data.role || "Non renseigné", inline: true },
    { name: "👨‍👩‍👧‍👦 Nombre de staff", value: data.staff_nombre || "Non renseigné", inline: true },
    { name: "⏰ Disponibilité", value: data.disponibilite || "Non renseigné", inline: true },
    { name: "🧩 Expérience", value: data.experience || "Non renseigné", inline: true },
    { name: "💭 Motivation", value: data.motivation || "Non renseigné", inline: false },
    { name: "📞 Contact secondaire", value: data.contact_secondaire || "Non renseigné", inline: true },
    { name: "✅ Conditions acceptées", value: data.conditions || "Non renseigné", inline: true },
    { name: "✦ Engagement", value: data.engagement || "Non renseigné", inline: true },
    { name: "✦ Ajouts", value: data.ajout || "Aucun", inline: false },
  ];

  // Construction de l'embed Discord
  const body = {
    embeds: [
      {
        title: "📌 Nouveau formulaire de partenariat",
        description: "Un nouveau serveur souhaite rejoindre notre réseau !",
        color: 0xff6a00,
        thumbnail: { url: "https://noxxworks.netlify.app/favicon.png" },
        fields: [
          { name: "📝 Informations sur le serveur", value: "\u200B", inline: false },
          ...serveurFields,
          { name: "👤 Informations sur le staff", value: "\u200B", inline: false },
          ...staffFields,
        ],
        footer: { text: "Team NoxxWorks • Formulaire Partenariat", icon_url: "https://noxxworks.netlify.app/favicon.png" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { statusCode: 200, body: JSON.stringify({ message: "Formulaire envoyé avec succès !" }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: "Erreur lors de l'envoi à Discord" }) };
  }
};

// netlify/functions/send-to-discord.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const webhookURL = process.env.DISCORD_WEBHOOK;
  if (!webhookURL) return { statusCode: 500, body: "Webhook Discord non défini" };

  // Créer des "fields" pour chaque info
  const fields = Object.keys(data).map(key => ({
    name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()), // format joli
    value: data[key] || "Non renseigné",
    inline: true
  }));

  const body = {
    embeds: [
      {
        title: "📌 Nouveau formulaire de partenariat",
        description: "Un nouveau serveur souhaite rejoindre notre réseau !",
        color: 0xff6a00, // couleur orange
        thumbnail: { url: "https://noxxworks.netlify.app/favicon.png" },
        fields: fields,
        footer: {
          text: "Team NoxxWorks • Formulaire Partenariat",
          icon_url: "https://noxxworks.netlify.app/favicon.png"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return { statusCode: 200, body: "Formulaire envoyé sur Discord avec embed !" };
  } catch (err) {
    console.error("Erreur en envoyant à Discord :", err);
    return { statusCode: 500, body: "Erreur lors de l'envoi à Discord" };
  }
};

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

  // Identifier le formulaire
  const type = data.form_type || "inconnu";
  delete data.form_type; // on ne veut pas l'afficher

  let embedTitle, embedDesc, ping = "";

  if (type === "partenariat") {
    embedTitle = "📌 Nouveau formulaire de partenariat";
    embedDesc  = "Un nouveau serveur souhaite rejoindre notre réseau !";
  } else if (type === "staff") {
    embedTitle = "📌 Nouvelle candidature Staff";
    embedDesc  = "Un membre souhaite rejoindre le staff du serveur !";
    ping = "<@&1403730494159323176>"; // ping le rôle staff
  } else {
    embedTitle = "📌 Nouveau formulaire reçu";
    embedDesc  = "Un formulaire a été envoyé.";
  }

  // Créer des "fields" pour chaque info
  const fields = Object.keys(data).map(key => ({
    name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    value: data[key] || "Non renseigné",
    inline: true
  }));

  const body = {
    content: ping,
    embeds: [
      {
        title: embedTitle,
        description: embedDesc,
        color: type === "staff" ? 0xff69b4 : 0xff6a00, // pink pour staff, orange pour partenariat
        thumbnail: { url: "https://noxxworks.netlify.app/preview-image.png" },
        fields: fields,
        footer: {
          text: `Team NoxxWorks • ${type === "staff" ? "Candidature Staff" : "Formulaire Partenariat"}`,
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
    return { statusCode: 200, body: "Formulaire envoyé sur Discord avec embed et ping !" };
  } catch (err) {
    console.error("Erreur en envoyant à Discord :", err);
    return { statusCode: 500, body: "Erreur lors de l'envoi à Discord" };
  }
};

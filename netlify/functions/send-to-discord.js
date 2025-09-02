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

  // Vérifie le type de formulaire
  const type = data.form_type || "unknown";

  let title, description, pingRole;

  if (type === "partenariat") {
    title = "📌 Nouveau formulaire de partenariat";
    description = "Un nouveau serveur souhaite rejoindre notre réseau !";
    pingRole = "<@&1403730494159323176>"; // Ping le rôle partenariat
  } else if (type === "staff") {
    title = "🛡️ Nouvelle candidature Staff";
    description = "Un membre souhaite rejoindre l'équipe du staff !";
    pingRole = "<@&1403730494159323176>"; // Ping le rôle staff (même rôle ou un autre)
  } else {
    title = "📄 Nouveau formulaire inconnu";
    description = "Un formulaire a été soumis mais son type est inconnu.";
    pingRole = ""; // Pas de ping
  }

  // Créer des fields pour l'embed
  const fields = Object.keys(data)
    .filter(key => key !== "form_type") // ne pas inclure le champ caché
    .map(key => ({
      name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      value: data[key] || "Non renseigné",
      inline: true
    }));

  const body = {
    content: pingRole, // ping du rôle
    embeds: [
      {
        title: title,
        description: description,
        color: type === "staff" ? 0x1abc9c : 0xff6a00, // turquoise pour staff, orange pour partenariat
        thumbnail: { url: "https://noxxworks.netlify.app/favicon.png" },
        fields: fields,
        footer: {
          text: "Team NoxxWorks • Formulaire",
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
    return { statusCode: 200, body: `Formulaire ${type} envoyé avec succès !` };
  } catch (err) {
    console.error("Erreur en envoyant à Discord :", err);
    return { statusCode: 500, body: "Erreur lors de l'envoi à Discord" };
  }
};

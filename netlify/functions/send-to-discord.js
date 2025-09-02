const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // Construire les champs de l'embed
  const embedFields = Object.keys(data).map(key => ({
    name: key.replace(/_/g, ' '), // remplace "_" par espace
    value: data[key] || "Non renseigné",
    inline: false
  }));

  const webhookURL = process.env.DISCORD_WEBHOOK;

  const body = {
    embeds: [{
      title: "📌 Nouveau formulaire de partenariat",
      color: 0xff6a00, // couleur orange
      fields: embedFields,
      timestamp: new Date().toISOString()
    }]
  };

  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return { statusCode: 200, body: "Formulaire envoyé sur Discord avec embed !" };
};

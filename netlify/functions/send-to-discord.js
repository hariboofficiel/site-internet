// netlify/functions/send-to-discord.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // Construire le message Discord
  let message = "**Nouveau formulaire de partenariat :**\n";
  for (let key in data) {
    message += `**${key}** : ${data[key]}\n`;
  }

  // URL du webhook Discord
  const webhookURL = process.env.DISCORD_WEBHOOK;

  // Envoyer le message
  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message })
  });

  return { statusCode: 200, body: "Formulaire envoyé sur Discord !" };
};

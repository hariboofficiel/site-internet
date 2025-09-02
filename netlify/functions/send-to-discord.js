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

const formType = data.form_type;

let embed;

if(formType === "partenariat") {
    embed = {
        title: "📌 Nouveau formulaire de partenariat",
        description: "Un nouveau serveur souhaite rejoindre notre réseau !",
        color: 0xff6a00,
        fields: Object.keys(data).filter(k => k !== "form_type").map(key => ({
            name: key.replace(/_/g," ").replace(/\b\w/g,l=>l.toUpperCase()),
            value: data[key] || "Non renseigné",
            inline: true
        })),
        timestamp: new Date().toISOString(),
        footer: { text: "Team NoxxWorks • Formulaire Partenariat" }
    }
} else if(formType === "staff") {
    embed = {
        title: "🛡️ Nouveau formulaire Staff",
        description: "Une nouvelle candidature pour rejoindre le staff !",
        color: 0x00ff99,
        fields: Object.keys(data).filter(k => k !== "form_type").map(key => ({
            name: key.replace(/_/g," ").replace(/\b\w/g,l=>l.toUpperCase()),
            value: data[key] || "Non renseigné",
            inline: true
        })),
        timestamp: new Date().toISOString(),
        footer: { text: "Team NoxxWorks • Formulaire Staff" }
    }
}

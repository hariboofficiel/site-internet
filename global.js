// global.js
const maintenanceMode = false; // ⬅️ Mets à true pour activer la maintenance 

// Redirection automatique
if (maintenanceMode) {
  // Si on n'est pas déjà sur la page de maintenance, redirige vers elle
  if (!window.location.href.includes("/maintenance")) {
    window.location.href = "https://noxxworks.netlify.app/maintenance";
  }
} else {
  // Si on est sur la page de maintenance et que la maintenance est désactivée, retourne à l'accueil
  if (window.location.href.includes("/maintenance")) {
    window.location.href = "https://noxxworks.netlify.app/";
  }
}
<script>
  
  // --- DISCORD ---
  const discordServerID = "1377633416941670625"; // remplace par ton ID Discord
  fetch(`https://discord.com/api/guilds/${1377633416941670625}/widget.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("discord-count").innerText = data.presence_count + " en ligne / " + data.members.length + " membres";
    })
    .catch(err => document.getElementById("discord-count").innerText = "Impossible");

  // --- YOUTUBE ---
  const ytChannelID = "ID_DE_TA_CHAINE"; // remplace par ton ID YouTube
  const ytAPIKey = "TA_CLE_API"; // clé API Google
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ytChannelID}&key=${ytAPIKey}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("yt-subs").innerText = data.items[0].statistics.subscriberCount + " abonnés";
    })
    .catch(err => document.getElementById("yt-subs").innerText = "Impossible");

  // --- TWITCH ---
  const twitchUser = "TON_PSEUDO"; // ton pseudo Twitch
  const twitchClientID = "TON_CLIENT_ID";
  const twitchToken = "TON_TOKEN";
  fetch(`https://api.twitch.tv/helix/users?login=${twitchUser}`, {
    headers: {
      'Client-ID': twitchClientID,
      'Authorization': 'Bearer ' + twitchToken
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("twitch-followers").innerText = data.data[0].view_count + " followers";
  })
  .catch(err => document.getElementById("twitch-followers").innerText = "Impossible");

  // --- TIKTOK ---
  const tiktokUser = "teamnoxxworks"; // pseudo TikTok
  // TikTok n’a pas d’API officielle, on peut utiliser des services externes ou laisser un lien manuel
  document.getElementById("tiktok-followers").innerHTML = `<a href="https://www.tiktok.com/@${tiktokUser}" target="_blank">Voir sur TikTok</a>`;
</script>

// global.js
const maintenanceMode = false; // ⬅️ Mets à true pour activer la maintenance 

// Redirection automatique
if (maintenanceMode) {
  // Si on n'est pas déjà sur la page de maintenance, redirige vers elle
  if (!window.location.href.includes("/maintenance")) {
    window.location.href = "https://novacorporation.online/maintenance";
  }
} else {
  // Si on est sur la page de maintenance et que la maintenance est désactivée, retourne à l'accueil
  if (window.location.href.includes("/maintenance")) {
    window.location.href = "https://novacorporation.online/";
  }
}

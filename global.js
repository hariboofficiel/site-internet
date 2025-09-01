// global.js
const maintenanceMode = false; // ⬅️ Mets à true pour activer la maintenance

if (maintenanceMode) {
  // Redirige immédiatement tous les visiteurs vers la page de maintenance
  window.location.href = "https://noxxworks.netlify.app/maintenance";
}

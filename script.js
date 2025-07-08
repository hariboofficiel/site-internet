// ACTIVE ou DESACTIVE le mode maintenance ici (true = actif, false = désactivé)
const maintenance = true;

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const size = Math.random() * 20 + 10; // 10px à 30px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10-20 sec
  bubble.style.animationDelay = `${Math.random() * 10}s`;

  return bubble;
}

function initBubbles() {
  const container = document.getElementById('bubbles-container');
  const count = 30;

  for (let i = 0; i < count; i++) {
    const bubble = createBubble();
    container.appendChild(bubble);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (!maintenance) {
    // Si maintenance désactivée, cacher la page maintenance
    const box = document.getElementById("maintenance");
    if(box) box.style.display = "none";

    // Ici tu peux mettre ton code pour afficher le vrai site
  } else {
    // Maintenance activée, init bulles animées
    initBubbles();
  }
});

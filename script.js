// MODE MAINTENANCE : change à true si besoin
const maintenanceMode = false;

// Menu burger
const toggle = document.getElementById('menu-toggle');
const links = document.getElementById('nav-links');
toggle?.addEventListener('click', () => {
  links.classList.toggle('active');
});

// Apparition animée au scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Activer/désactiver la maintenance
if (maintenanceMode) {
  document.getElementById('site-content').style.display = 'none';
  document.getElementById('maintenance-screen').style.display = 'flex';
} else {
  document.getElementById('maintenance-screen').style.display = 'none';
}

// Menu burger
const toggle = document.getElementById('menu-toggle');
const links = document.getElementById('nav-links');

toggle?.addEventListener('click', () => {
  links.classList.toggle('active');
});

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Maintenance
if (maintenanceMode) {
  document.getElementById('site-content').style.display = 'none';
  document.getElementById('maintenance-screen').style.display = 'flex';
} else {
  document.getElementById('maintenance-screen').style.display = 'none';
}

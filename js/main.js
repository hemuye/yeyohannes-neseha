const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const translateIcon = document.getElementById('translate-icon');
const overlay = document.getElementById('overlay');
const dropdowns = document.querySelectorAll('.dropdown');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('show');
  hamburger.classList.toggle('active', isOpen);
  overlay.classList.toggle('show', isOpen);
  dropdowns.forEach(dropdown => dropdown.classList.remove('active')); // Close submenus on hamburger toggle
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  hamburger.classList.remove('active');
  overlay.classList.remove('show');
});

dropdowns.forEach(dropdown => {
  const link = dropdown.querySelector('a');
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('active');
    }
  });
});

if (translateIcon) {
  translateIcon.addEventListener('click', () => {
    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
      translateElement.classList.toggle('show');
    }
  });
}

// Basic search functionality
const searchButton = document.querySelector('.search-button');
if (searchButton) {
  searchButton.addEventListener('click', () => {
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchInput.value.trim()) {
      alert(`Searching for: ${searchInput.value}`);
      searchInput.value = ''; // Clear input
    }
  });
}

// Baptism Form Handling
const baptismForm = document.querySelector('.baptism-form');
if (baptismForm) {
  baptismForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(baptismForm);
    const data = Object.fromEntries(formData);
    console.log('Baptism form submitted:', data);
    alert('Thank you! Your baptism request has been received. We will contact you soon.');
    baptismForm.reset();
  });
}